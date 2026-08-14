# Zaid | Principal Excel VBA Automation Engineer

This repository houses the code for a premium, single-page professional consulting portfolio designed to highlight high-end VBA and automation solutions.

## Architecture

This project is built using a modern, scalable React framework and utility styling approach:

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Typing**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui & Radix UI Primitives
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

## Folder Structure

The project has been architected for scalability into a multi-page platform if required in the future. 

```bash
/
├── public/                 # Static assets (images, icons, favicons)
│   └── assets/             # Project-specific graphics
├── src/                    # Source Code
│   ├── animations/         # Reusable Framer Motion variants
│   ├── app/                # Next.js App Router (pages, layouts, robots, sitemap)
│   ├── components/         # React Components
│   │   ├── layout/         # High-level wrappers (Navbar, Footer)
│   │   ├── sections/       # Section components (Hero, FAQ, Case Studies)
│   │   ├── shared/         # Reusable bits (Motion Wrappers, TechBadges)
│   │   └── ui/             # shadcn/ui generic primitives
│   ├── config/             # Environment & site configurations
│   ├── constants/          # Static content arrays (Decoupled copy)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions (cn, standard helpers)
│   ├── styles/             # Global CSS variables
│   └── types/              # Global TypeScript interfaces
└── .prettierrc             # Standardized code formatting rules
```

## Setup & Development

### 1. Installation
Install the project dependencies:
```bash
npm install
```

### 2. Development Server
Start the development server with Turbopack:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the application.

### 3. Production Build
Verify the application for production (this executes Next.js static compilation and runs type checks):
```bash
npm run build
```

## Styling Conventions

- All component files use Tailwind CSS utility classes.
- The base theme variables (e.g. `--background`, `--primary`) are configured entirely in `src/app/globals.css`. 
- **Dark Mode**: The design assumes a permanent "dark mode" state in order to achieve a sleek, premium SaaS aesthetic. `layout.tsx` enforces `className="dark"`.

## Adding New Sections
If adding new sections to the single-page scroll:
1. Create a `<YourSection />` component in `src/components/sections/`.
2. Ensure you give the outer `<section>` wrapper an `id` that matches the anchor tags (e.g., `<section id="your-section">`).
3. Import and place it in `src/app/page.tsx`.
4. Update the text constants in `src/constants/content.ts` instead of hardcoding strings in the components.

