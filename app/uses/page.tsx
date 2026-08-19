"use client";

import React from "react";
import { UsesGrid } from "@/components/uses";
import bookmarks from "@/data/bookmarks";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UsesPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-[610px] px-4 sm:px-6 py-6 sm:py-12 space-y-12 sm:space-y-16">
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
            My Gear & Uses
          </h1>
          <p className="text-foreground leading-normal text-sm md:text-base">
            A peek into the tools and technologies I use daily.
          </p>
        </header>
        <section>
          <UsesGrid />
        </section>
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Bookmarks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarks.map((bookmark, index) => (
              <Link
                key={index}
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 rounded-[4px] bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-2 text-foreground/50 text-xs sm:text-sm">
                  <span className="truncate">
                    {bookmark.url.replace(/https?:\/\//, "")}
                  </span>
                  <ExternalLink className="w-3 h-3 flex-shrink-0 group-hover:text-foreground/70 transition-colors" />
                </div>
                <h3 className="text-base sm:text-md font-semibold text-foreground mb-1">
                  {bookmark.title}
                </h3>
                <p className="text-xs sm:text-xs text-foreground/70 leading-relaxed">
                  {bookmark.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
        <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
          <p className="text-sm text-foreground/50">
            This page is inspired by{" "}
            <Link
              href="https://sayandey.dev/utilities"
              className="underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sayan Dey
            </Link>
            .
          </p>
          <p className="text-sm text-foreground/50">
            Last Updated:{" "}
            <span className="font-medium text-foreground/70">
              October 15, 2025
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default UsesPage;
