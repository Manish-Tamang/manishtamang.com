/* Everything interactive on /guestbook. The list is server-rendered; see refresh(). */
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "astro:env/client";

const MAX_IMAGE = 5 * 1024 * 1024;

const list = document.querySelector<HTMLElement>("[data-guestbook-list]")!;
const dialog = document.querySelector<HTMLDialogElement>(
  "[data-delete-dialog]",
)!;
const toastEl = document.querySelector<HTMLElement>("[data-toast]")!;
const form = document.querySelector<HTMLFormElement>("[data-guestbook-form]");
let imageFile: File | null = null;
let toastTimer: number;

const toast = (message: string) => {
  toastEl.textContent = message;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (toastEl.hidden = true), 3000);
};

const json = (method: string, body: unknown) => ({
  method,
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

// The page is the template: fetch it again and swap in the new list
const refresh = async () => {
  const html = await (await fetch(location.pathname)).text();
  const next = new DOMParser()
    .parseFromString(html, "text/html")
    .querySelector("[data-guestbook-list]");
  if (next) list.replaceChildren(...next.childNodes);
};

const uploadImage = async (file: File) => {
  const extension = file.name.split(".").pop();
  const path = `guestbook/${form!.dataset.user}/${crypto.randomUUID()}.${extension}`;
  const response = await fetch(
    `${PUBLIC_SUPABASE_URL}/storage/v1/object/primary/${path}`,
    {
      method: "POST",
      headers: {
        apikey: PUBLIC_SUPABASE_ANON_KEY!,
        authorization: `Bearer ${PUBLIC_SUPABASE_ANON_KEY}`,
        "content-type": file.type,
      },
      body: file,
    },
  );
  if (!response.ok) throw new Error("Upload failed");
  return `${PUBLIC_SUPABASE_URL}/storage/v1/object/public/primary/${path}`;
};

const setImage = (file: File | null) => {
  imageFile = file;
  const preview = form!.querySelector<HTMLElement>("[data-preview]")!;
  preview.querySelector("img")!.src = file ? URL.createObjectURL(file) : "";
  preview.hidden = !file;
  if (!file)
    form!.querySelector<HTMLInputElement>('[name="image"]')!.value = "";
};

for (const button of document.querySelectorAll<HTMLElement>("[data-sign-in]")) {
  button.addEventListener("click", async () => {
    try {
      const response = await fetch(
        "/api/auth/sign-in/social",
        json("POST", {
          provider: button.dataset.signIn,
          callbackURL: "/guestbook",
        }),
      );
      const { url } = await response.json();
      location.href = url;
    } catch {
      toast(`Failed to sign in with ${button.dataset.signIn}`);
    }
  });
}

document
  .querySelector("[data-sign-out]")
  ?.addEventListener("click", async () => {
    await fetch("/api/auth/sign-out", json("POST", {}));
    location.reload();
  });

document
  .querySelector("[data-remove-image]")
  ?.addEventListener("click", () => setImage(null));

form
  ?.querySelector<HTMLInputElement>('[name="image"]')!
  .addEventListener("change", (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE)
      return toast("Image size should be less than 5MB");
    setImage(file);
  });

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = form.querySelector<HTMLInputElement>('[name="message"]')!;
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const message = input.value.trim();
  if (!message && !imageFile) return;

  const setBusy = (busy: boolean) => {
    submit.disabled = busy;
    form.querySelector("[data-send-icon]")!.classList.toggle("hidden", busy);
    form
      .querySelector("[data-send-spinner]")!
      .classList.toggle("hidden", !busy);
  };

  setBusy(true);
  try {
    const attachment_url = imageFile ? await uploadImage(imageFile) : null;
    const response = await fetch(
      "/api/guestbook",
      json("POST", { message, attachment_url }),
    );
    if (!response.ok) throw new Error();
    input.value = "";
    // Lets the rich text preview hide itself
    input.dispatchEvent(new Event("input"));
    setImage(null);
    toast("Message posted!");
    await refresh();
  } catch {
    toast("Failed to post message");
  } finally {
    setBusy(false);
  }
});

const actions: Record<
  string,
  (id: string, target: HTMLElement, entry: HTMLElement) => void | Promise<void>
> = {
  copy: async (id) => {
    await navigator.clipboard.writeText(
      `${location.origin}${location.pathname}#${id}`,
    );
    toast("Link copied to clipboard");
  },
  more: (_id, target, entry) => {
    const full = entry.querySelector<HTMLElement>("[data-full]")!;
    const short = entry.querySelector<HTMLElement>("[data-short]")!;
    full.hidden = !full.hidden;
    short.hidden = !full.hidden;
    target.textContent = full.hidden ? "See more" : "See less";
  },
  reply: (_id, _target, entry) => {
    const reply = entry.querySelector<HTMLFormElement>("[data-reply-form]")!;
    reply.hidden = false;
    reply.querySelector("input")!.focus();
  },
  "cancel-reply": (_id, _target, entry) => {
    entry.querySelector<HTMLFormElement>("[data-reply-form]")!.hidden = true;
  },
  like: (id, target, entry) => {
    if (!target.dataset.liked)
      entry.querySelector("[data-heart-pop]")?.classList.remove("hidden");
    return update(id, { type: "like" });
  },
  react: (id, target) =>
    update(id, { type: "react", emoji: target.dataset.emoji }),
  delete: (id) => {
    dialog.dataset.id = id;
    dialog.returnValue = "";
    dialog.showModal();
  },
};

const update = async (id: string, body: object) => {
  const response = await fetch(
    "/api/guestbook",
    json("PATCH", { id, ...body }),
  );
  if (response.ok) await refresh();
  else toast("Failed to update");
};

list.addEventListener("click", (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>(
    "[data-action]",
  );
  const entry = target?.closest<HTMLElement>("[data-entry]");
  if (target && entry)
    actions[target.dataset.action!](entry.dataset.entry!, target, entry);
});

list.addEventListener("submit", async (event) => {
  event.preventDefault();
  const reply = event.target as HTMLFormElement;
  const input = reply.querySelector("input")!;
  const parent_id = reply.closest<HTMLElement>("[data-entry]")!.dataset.entry;
  if (!input.value.trim()) return;

  const response = await fetch(
    "/api/guestbook",
    json("POST", { message: input.value.trim(), parent_id }),
  );
  if (!response.ok) return toast("Failed to post reply");
  toast("Reply posted!");
  await refresh();
});

dialog.addEventListener("close", async () => {
  if (dialog.returnValue !== "delete") return;
  const response = await fetch(`/api/guestbook?id=${dialog.dataset.id}`, {
    method: "DELETE",
  });
  if (!response.ok) return toast("Failed to delete");
  toast("Deleted");
  await refresh();
});

const sortButtons = document.querySelectorAll<HTMLElement>("[data-sort]");
for (const button of sortButtons) {
  button.addEventListener("click", () => {
    list.classList.toggle("flex-col-reverse", button.dataset.sort === "oldest");
    for (const other of sortButtons)
      other.classList.toggle("bg-zinc-100", other === button);
    for (const other of sortButtons)
      other.classList.toggle("dark:bg-zinc-800", other === button);
    document.querySelector<HTMLDetailsElement>("[data-sort-menu]")!.open =
      false;
  });
}

// Old links could use a name instead of an id: /guestbook#jane-doe
const hash = decodeURIComponent(location.hash.slice(1)).toLowerCase();
if (hash && !document.getElementById(hash)) {
  for (const entry of list.querySelectorAll<HTMLElement>("[data-name]")) {
    const name = entry.dataset.name!.toLowerCase();
    if (name === hash || name.replace(/\s+/g, "-") === hash) {
      entry.scrollIntoView({ behavior: "smooth", block: "center" });
      break;
    }
  }
}
