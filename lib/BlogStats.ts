import { client } from "@/sanity/lib/client";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import type { BlogPostStats } from "@/lib/types";

interface SanityPost {
  slug?: {
    current?: string;
  };
  title?: string;
}

export async function getBlogPostStats(): Promise<BlogPostStats[]> {
  try {
    const sanityQuery = `*[_type == "post"]{slug {current}, title}`;
    const sanityPosts = await client.fetch<SanityPost[]>(sanityQuery);

    if (!sanityPosts?.length) {
      console.warn("No posts found in Sanity.");
      return [];
    }

    const stats: BlogPostStats[] = sanityPosts
      .filter((post) => post.slug?.current && post.title)
      .map((post) => ({
        slug: post.slug!.current!,
        title: post.title!,
        thumbsUp: 0,
        heart: 0,
        trophy: 0,
        bookmark: 0,
        views: 0,
        totalReactions: 0,
      }));

    await Promise.all(
      stats.map(async (post) => {
        const viewDocRef = doc(db, "views", post.slug);
        const viewDocSnap = await getDoc(viewDocRef);

        if (viewDocSnap.exists()) {
          post.views = Number(viewDocSnap.data()?.count ?? 0);
        }

        const reactionDocRef = doc(db, "posts", post.slug);
        const reactionDocSnap = await getDoc(reactionDocRef);

        if (reactionDocSnap.exists()) {
          const reactionData = reactionDocSnap.data();
          post.thumbsUp = Number(reactionData?.thumbsUp ?? 0);
          post.heart = Number(reactionData?.heart ?? 0);
          post.trophy = Number(reactionData?.trophy ?? 0);
          post.bookmark = Number(reactionData?.bookmark ?? 0);
          post.totalReactions =
            post.thumbsUp + post.heart + post.trophy + post.bookmark;
        }
      })
    );

    return stats.sort((a, b) => {
      if (b.views !== a.views) {
        return b.views - a.views;
      }

      return b.totalReactions - a.totalReactions;
    });
  } catch (error) {
    console.error("Error fetching blog post stats:", error);
    return [];
  }
}
