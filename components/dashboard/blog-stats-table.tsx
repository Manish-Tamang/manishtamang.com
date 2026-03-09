"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ListFilter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sounds } from "@/lib/sounds";
import type { BlogPostStats } from "@/lib/types";

interface BlogStatsTableProps {
  posts: BlogPostStats[];
}

type SortMode = "views" | "reactions";

function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function BlogStatsTable({ posts }: BlogStatsTableProps) {
  const [sortMode, setSortMode] = useState<SortMode>("views");

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (sortMode === "views") {
        if (b.views !== a.views) {
          return b.views - a.views;
        }

        return b.totalReactions - a.totalReactions;
      }

      if (b.totalReactions !== a.totalReactions) {
        return b.totalReactions - a.totalReactions;
      }

      return b.views - a.views;
    });
  }, [posts, sortMode]);

  if (!posts.length) {
    return (
      <div className="rounded-lg bg-zinc-50 px-4 py-6 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
        No blog stats available yet.
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-xl bg-zinc-50/70 p-3 dark:bg-zinc-900/60">
      <div className="flex items-center justify-between gap-3 px-1">
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Sorted by {sortMode === "views" ? "Most Views" : "Most Reactions"}
        </p>
        <button
          onClick={() => {
            sounds.click();
            setSortMode((prev) => (prev === "views" ? "reactions" : "views"));
          }}
          onMouseEnter={() => sounds.tick()}
          className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 cursor-pointer dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
        >
          <ListFilter className="h-4 w-4" />
          {sortMode === "views" ? "Most Views" : "Most Reactions"}
        </button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-right">#</TableHead>
            <TableHead>Post</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Reactions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPosts.map((post, index) => {
            return (
              <TableRow key={post.slug} className="hover:bg-zinc-100/70 dark:hover:bg-zinc-800/40">
                <TableCell className="text-right tabular-nums text-zinc-500 dark:text-zinc-400">
                  {index + 1}
                </TableCell>
                <TableCell className="max-w-88 truncate font-medium text-zinc-800 dark:text-zinc-100">
                  <Link
                    className="hover:underline"
                    href={`/blog/${post.slug}`}
                    onMouseEnter={() => sounds.tick()}
                    onClick={() => sounds.click()}
                  >
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium text-zinc-700 dark:text-zinc-300">
                  {formatCount(post.views)}
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium text-zinc-700 dark:text-zinc-300">
                  {formatCount(post.totalReactions)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
