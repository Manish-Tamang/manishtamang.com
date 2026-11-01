---
title: "LyricsVerse"
description: "A deep dive into LyricsVerse, a sleek, community-driven lyrics platform built with Next.js and Firebase. Discover its dual interface architecture, from the public-facing site to the secure admin dashboard. We explore the modern tech stack, including Server Actions and NextAuth.js, that powers this scalable web application."
metaDescription: "A deep dive into LyricsVerse, a community lyrics platform built with Next.js and Firebase, from the public site to the admin dashboard."
date: "2025-07-13T15:54:00.000Z"
updated: "2025-07-13T15:57:12Z"
projectUrl: "https://lyricsverse.vercel.app/"
githubUrl: "https://github.com/Manish-Tamang/lyrics-webapp"
tech: ["Nextjs","TailwindCSS","ShadcnUI"]
cover: ./cover.webp
coverAlt: "LyricsVerse"
---

Welcome to an inside look at LyricsVerse, a clean, minimalist, and feature-rich web application dedicated to being the largest bank of Nepali song lyrics. This project was built from the ground up to provide a seamless experience for music lovers to discover and for contributors to share lyrics.

This post will break down the project's core functionalities, architectural patterns, and the powerful technology stack that brings it to life.


## Core Functionality: A Dual-Interface Approach

One of the key architectural decisions in LyricsVerse is the separation of the application into two distinct parts using Next.js Route Groups: a public-facing site `(site)` and a secure admin dashboard `(admin)`.

### 1. The Public Site `(site)`

This is the heart of the platform, where users interact with the lyrics collection.

*   **Discover Music:** The homepage (`app/(site)/page.tsx`) welcomes users with curated lists of **Recent Songs** and **Popular Songs**, the latter ranked by view counts.
*   **Dynamic Song & Artist Pages:** Users can navigate to dedicated pages for every song (`/song/[slug]`) and artist (`/artists/[slug]`). Song pages feature metadata, cover art, and a view counter (`/components/view-counter.tsx`) that updates through a dedicated API route (`/app/api/views/[slug]/route.ts`).
*   **Intelligent Lyrics Display:** The `LyricsDisplay` component (`/components/lyrics-display.tsx`) is designed to handle multilingual content gracefully. It detects Devanagari script and applies a specific font (`font-matangi`) to ensure perfect rendering for Nepali lyrics, while using a default font for English parts.
*   **Enhanced User Experience:** For an immersive experience, a `PageAutoScroll` component (`/components/lyrics-auto-scroll.tsx`) allows users to have the lyrics scroll automatically at their preferred speed.
*   **Community Contributions:** A dedicated "Submit Lyrics" page (`/app/(site)/submit-lyrics/page.tsx`) provides a user-friendly form for the community to contribute new songs to the database.

### 2. The Admin Dashboard `(admin)`

The admin dashboard is a secure, protected area for moderators to manage the platform's content.

*   **Secure Access:** The entire `/admin` route is protected by `middleware.ts`, which works with NextAuth.js. It checks for a valid session and an `isAdmin` flag on the user's token before granting access. Non-admin users are redirected to a login page.
*   **Authentication:** Admin authentication is handled by NextAuth.js (`/app/api/auth/[...nextauth]/route.ts`) using a Google Provider. Admin roles are assigned based on a predefined list of emails stored in environment variables (`/lib/auth.ts`).
*   **Submission Management:** The central feature of the admin panel is the submissions table (`/app/(admin)/page.tsx`). Here, admins can review all user-submitted lyrics, which are initially marked with a "pending" status.
*   **Approve/Reject Workflow:** Using Next.js Server Actions (`/app/(admin)/admin/submissions/actions.ts`), admins can approve or reject submissions.
    *   **On Approval:** A new document is created in the public `songs` collection in Firestore, and the original submission's status is updated to "approved". This action uses a Firestore `writeBatch` to ensure atomicity.
    *   **On Rejection:** The submission's status is simply updated to "rejected".
*   **Content Overview:** The dashboard also provides views for managing existing songs and artists (`/admin/artists/page.tsx`, `/admin/songs/page.tsx`).

## The Technology Stack

LyricsVerse is built on a modern, robust, and scalable technology stack, leveraging the strengths of each tool.

*   **Framework:** **Next.js 14** (App Router) serves as the foundation. Its features are used extensively:
    *   **App Router:** For a clear, file-system-based routing structure.
    *   **Server Components:** To fetch data directly from the database on the server, reducing client-side bundle size and improving initial load times (e.g., `app/(site)/page.tsx`).
    *   **Route Groups:** To create distinct application sections like `(site)` and `(admin)` with their own layouts without affecting the URL.
    *   **Server Actions:** To handle mutations and backend logic securely, collocated with the components that use them, simplifying the codebase.

*   **Database & Backend:** **Firebase** is the backend-as-a-service of choice.
    *   **Firestore:** A NoSQL, real-time database used to store all data, including songs, artists, users, and submissions.
    *   **Firebase Storage:** Used to host images like artist profiles and song cover art (`/lib/auth.ts` contains logic for uploading admin profile pictures).

*   **UI & Styling:**
    *   **Tailwind CSS:** For a utility-first styling approach that is highly customizable and maintainable.
    *   **shadcn/ui:** Provides the building blocks for the user interface. It offers a set of beautifully designed, unstyled, and accessible components (see `/components/ui`) that are copied into the project, giving full control over their code and styling.
    *   **Custom Components:** Built on top of shadcn/ui to create application-specific elements like `SongCard`, `ArtistCard`, and the various admin tables.

*   **Authentication:** **NextAuth.js** is used for its simplicity and power in handling authentication. It integrates seamlessly with Next.js and provides the logic for the Google sign-in and session management that protects the admin dashboard.

*   **Form Management:** **React Hook Form** combined with **Zod** for schema validation ensures that forms, like the "Submit Lyrics" form, are robust, type-safe, and provide excellent user feedback.

*   **Language:** The entire project is written in **TypeScript**, ensuring type safety and improving developer experience and code quality.

## Final Words

LyricsVerse is a testament to the power of modern web technologies. By combining the strengths of Next.js, Firebase, and Tailwind CSS, it delivers a high-performance, scalable, and maintainable application. The clear separation between the public site and the admin dashboard, powered by a robust authentication and content management workflow, makes it a perfect blueprint for building modern, community-driven platforms.
