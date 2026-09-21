export type GuestbookReaction = {
  emoji: string;
  count: number;
};

export type GuestbookEntry = {
  id: string;
  name: string;
  image_url: string | null;
  message: string;
  timestamp: string;
  parent_id: string | null;
  attachment_url: string | null;
  isAdminAuthor: boolean;
  isMine: boolean;
  likesCount: number;
  likedByMe: boolean;
  likedByAdmin: boolean;
  reactions: GuestbookReaction[];
  myReaction: string | null;
  adminReaction: string | null;
  replies?: GuestbookEntry[];
};

export type RawGuestbookEntry = {
  id: string;
  name: string;
  email?: string | null;
  image_url: string | null;
  message: string;
  timestamp: string;
  parent_id: string | null;
  likes?: string[] | null;
  reactions?: string[] | null;
  attachment_url: string | null;
};

export function getAdminEmail() {
  return (
    process.env.ADMIN_EMAIL ||
    process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
    "maneshtamang833@gmail.com"
  ).toLowerCase();
}

function normalizeEmail(email?: string | null) {
  return (email || "").trim().toLowerCase();
}

function reactionEmoji(reaction: string) {
  if (!reaction.includes(":")) return "🙏";
  return reaction.slice(0, reaction.indexOf(":"));
}

function reactionEmail(reaction: string) {
  if (!reaction.includes(":")) return normalizeEmail(reaction);
  return normalizeEmail(reaction.slice(reaction.indexOf(":") + 1));
}

export function toPublicGuestbookEntry(
  entry: RawGuestbookEntry,
  viewerEmail?: string | null,
): Omit<GuestbookEntry, "replies"> {
  const adminEmail = getAdminEmail();
  const viewer = normalizeEmail(viewerEmail);
  const author = normalizeEmail(entry.email);
  const likes = entry.likes || [];
  const reactions = entry.reactions || [];

  const reactionGroups = reactions.reduce<Record<string, number>>((acc, reaction) => {
    const emoji = reactionEmoji(reaction);
    acc[emoji] = (acc[emoji] || 0) + 1;
    return acc;
  }, {});

  const myReaction = viewer
    ? reactions.find((reaction) => reactionEmail(reaction) === viewer)
    : undefined;
  const adminReaction = reactions.find(
    (reaction) => reactionEmail(reaction) === adminEmail,
  );

  return {
    id: entry.id,
    name: entry.name,
    image_url: entry.image_url,
    message: entry.message || "",
    timestamp: entry.timestamp,
    parent_id: entry.parent_id,
    attachment_url: entry.attachment_url,
    isAdminAuthor: author === adminEmail,
    isMine: Boolean(viewer && author === viewer),
    likesCount: likes.length,
    likedByMe: Boolean(
      viewer && likes.some((email) => normalizeEmail(email) === viewer),
    ),
    likedByAdmin: likes.some((email) => normalizeEmail(email) === adminEmail),
    reactions: Object.entries(reactionGroups).map(([emoji, count]) => ({
      emoji,
      count,
    })),
    myReaction: myReaction ? reactionEmoji(myReaction) : null,
    adminReaction: adminReaction ? reactionEmoji(adminReaction) : null,
  };
}
