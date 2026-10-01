import Link from "next/link";
import bookmarks from "@/data/bookmarks";

const BookmarksPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-[680px] space-y-8 px-4 py-6 sm:px-6 sm:py-12">
        <header className="space-y-3">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Bookmarks
          </h1>
          <p className="text-sm leading-normal text-foreground md:text-base">
            A small collection of useful tools, resources, and places on the
            web that I keep coming back to.
          </p>
        </header>

        <ol className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.url}
              className="list-decimal py-3.5 pl-2 marker:text-sm marker:text-foreground/40 first:pt-0 last:pb-0"
            >
              <div className="pl-2">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <Link
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-foreground/90 underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                  >
                    {bookmark.title}
                  </Link>
                  <span className="text-xs text-foreground/90">
                    {bookmark.url.replace(/https?:\/\//, "")}
                  </span>
                </div>
                <p className="mt-1.5 max-w-[60ch] text-sm leading-relaxed text-foreground/90">
                  {bookmark.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <footer className="border-t border-zinc-200 pt-6 text-sm text-foreground/50 dark:border-zinc-800">
          Last updated: September 20, 2026
        </footer>
      </div>
    </main>
  );
};

export default BookmarksPage;