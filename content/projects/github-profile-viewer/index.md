---
title: "GitHub Profile Viewer"
description: "A simple web application built with Next.js that allows users to search for and view GitHub profiles. It utilizes the GitHub API to fetch user information and displays it in a clean and organized manner."
metaDescription: "A Next.js app for searching and viewing GitHub profiles, using the GitHub API to show user information in a clean layout."
date: "2024-12-18T14:52:00.000Z"
updated: "2025-09-13T14:53:14Z"
projectUrl: "https://github-user-profile-viewer.vercel.app/"
githubUrl: "https://github.com/Manish-Tamang/github-profile-fetcher"
tech: ["github","user","profile","react"]
cover: ./cover.webp
coverAlt: "GitHub Profile Viewer"
---

A simple web application built with Next.js that allows users to search for and view GitHub profiles. It utilizes the GitHub API to fetch user information and displays it in a clean and organized manner.

## Features

- **GitHub Profile Search:** Enter a GitHub username to fetch and display the user's profile.
- **Profile Information Display:** Shows essential details such as name, username, bio, company, location, blog, Twitter, followers, following, public repositories, and join date.
- **Responsive Design:** The application is designed to work well on various screen sizes and devices.
- **Loading State:** Displays a loading skeleton while fetching user data for a better user experience.
- **Error Handling:** Notifies the user when a GitHub profile isn't found.
- **Dark Mode Support:** Leverages `next-themes` to respect system preferences and provide a dark mode version.
- **shadcn/ui components:** Uses pre-built components for UI elements like inputs, buttons, cards, avatars, and more for consistency.

## Technologies Used

- **Next.js:** A React framework for building web applications.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **shadcn/ui:** A collection of reusable UI components for React.
- **react-hook-form:** For form handling
- **embla-carousel-react:** For carousel component
- **recharts:** For charting component
- **vaul:** For the Drawer component
- **clsx and tailwind-merge:** For conditional and merging classes
- **lucide-react:** For icons
- **next-themes:** For theme management
- **zod:** For schema validation
- **input-otp:** For OTP input component
- **react-day-picker:** For the date picker

## Getting Started

Follow these steps to run the project on your local machine:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Manish-Tamang/github-profile-fetcher.git
   cd github-profile-fetcher
   ```

2. **Install Dependencies:**

```Bash
npm install
```
3. **Start the Development Server:**
```Bash
npm run dev
```


Open your browser and visit http://localhost:3000 to view the application.

## Project Structure

```
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Specifies intentionally untracked files that Git should ignore
├── app                      # Next.js app directory
│   ├── globals.css          # Global CSS styles
│   ├── layout.tsx           # Layout component for the application
│   └── page.tsx             # Main page of the application
├── components.json          # Configuration for shadcn/ui
├── components               # Reusable components
│   └── ui                   # UI components from shadcn/ui
│       ├── accordion.tsx        
│       ├── alert-dialog.tsx  
│       ├── alert.tsx       
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx      
│       ├── badge.tsx       
│       ├── breadcrumb.tsx 
│       ├── button.tsx      
│       ├── calendar.tsx    
│       ├── card.tsx        
│       ├── carousel.tsx    
│       ├── chart.tsx       
│       ├── checkbox.tsx    
│       ├── collapsible.tsx 
│       ├── command.tsx    
│       ├── context-menu.tsx
│       ├── dialog.tsx       
│       ├── drawer.tsx      
│       ├── dropdown-menu.tsx
│       ├── form.tsx       
│       ├── hover-card.tsx    
│       ├── input-otp.tsx  
│       ├── input.tsx       
│       ├── label.tsx       
│       ├── menubar.tsx    
│       ├── navigation-menu.tsx
│       ├── pagination.tsx   
│       ├── popover.tsx       
│       ├── progress.tsx     
│       ├── radio-group.tsx 
│       ├── resizable.tsx  
│       ├── scroll-area.tsx
│       ├── select.tsx     
│       ├── separator.tsx
│       ├── sheet.tsx       
│       ├── skeleton.tsx    
│       ├── slider.tsx      
│       ├── sonner.tsx  
│       ├── switch.tsx      
│       ├── table.tsx    
│       ├── tabs.tsx         
│       ├── textarea.tsx   
│       ├── toast.tsx    
│       ├── toaster.tsx    
│       ├── toggle-group.tsx
│       ├── toggle.tsx    
│       └── tooltip.tsx     
├── hooks                    # Custom React hooks
│   └── use-toast.ts         # Custom toast hook
├── lib                      # Utility functions
│   └── utils.ts             # Utility functions
├── next.config.js          # Next.js configuration
├── package-lock.json        # Dependency lock file
├── package.json             # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── readme.md                # This file
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```
