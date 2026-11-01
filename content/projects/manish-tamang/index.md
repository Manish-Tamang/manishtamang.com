---
title: "Portfolio Website"
description: "My personal portfolio website, a showcase of my professional journey, technical skills, and creative endeavors. Built with cutting-edge web technologies, this site offers an immersive experience into my world of development and design."
metaDescription: "My personal portfolio website, showcasing my journey, technical skills and creative work in development and design."
date: "2025-03-01T14:52:00.000Z"
updated: "2025-04-12T06:17:49Z"
projectUrl: "https://www.manishtamang.com/"
githubUrl: "https://github.com/Manish-Tamang/portfolio"
tech: ["Typescript","Nextjs","Sanity"]
cover: ./cover.webp
coverAlt: "Portfolio Website"
---

## Manish Tamang - Personal Portfolio


## 🌐 Project Overview

Welcome to my personal portfolio website, a showcase of my professional journey, technical skills, and creative endeavors. Built with cutting-edge web technologies, this site offers an immersive experience into my world of development and design.

## 📋 Table of Contents

- [Features](#-features)
- [Technologies](#-technologies)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Integrations](#-integrations)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Personal Blog:** In-depth technical insights and personal experiences
- **Interactive Project Portfolio:** Showcasing development and design work
- **Photography Gallery:** Visual storytelling through photography
- **"Uses" Page:** Detailed breakdown of my daily tools and software
- **Guestbook:** Interactive visitor messaging system
- **Protected Dashboard:** Personalized stats and insights
- **Spotify Integration:** Real-time music listening tracker
- **WakaTime Coding Stats:** Transparent view of coding activities
- **Responsive Dark/Light Themes**
- **MDX-Powered Blog Posts:** Rich, interactive content
- **SEO Optimized:** Enhanced search engine visibility

## 🚀 Technologies

- **Frontend Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content Management:** Sanity CMS
- **Authentication:** NextAuth.js, Firebase
- **Deployment:** Vercel
- **Additional Libraries:**
  - Framer Motion
  - Recharts
  - Shadcn/ui
  - Lucide React

## 🔧 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or Yarn
- Sanity CLI
- Firebase Project
- Spotify Developer Account
- WakaTime Account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Manish-Tamang/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env.local` file with the following variables:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
# ... (other Firebase configs)

# Spotify Integration
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# WakaTime Integration
WAKATIME_ACCESS_TOKEN=
WAKATIME_CLIENT_ID=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Analytics
UMAMI_API_KEY=
WEBSITE_ID=
```

### Running the Project

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📂 Project Structure

```
portfolio/
├── app/             # Next.js app directory
├── components/      # Reusable React components
├── lib/             # Utility functions
├── public/          # Static assets
├── sanity/          # Sanity CMS configuration
├── styles/          # Global and module CSS
└── types/           # TypeScript type definitions
```

## 🔗 Integrations

### Sanity CMS

Manage content through `/studio` route. Configure CORS settings in Sanity management.

### Firebase

Handles:

- View counting
- User authentication
- Guestbook messages

### Spotify & WakaTime

Real-time tracking of music and coding activities.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push and open a pull request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgements

- Next.js Community
- Sanity.io
- Vercel
- Open-source contributors
