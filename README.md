# Pasha.dev

Personal portfolio website for Anwaripasha Akbar, a software engineer based in Jakarta. The site highlights selected work, professional experience, engineering tools, and contact information.

## Built With

- React 18
- Vite
- Tailwind CSS
- React Scroll
- ESLint

## Features

- Responsive layout for desktop and mobile
- Mobile navigation with accessible controls
- Portfolio projects with confidential-project states
- Experience timeline
- Professional technology toolkit
- Reduced-motion and reduced-transparency support
- Keyboard focus states and accessible social links
- GitHub Pages deployment support

## Getting Started

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm run build     # Create a production build
npm run preview   # Preview the production build locally
```

## Project Structure

```text
src/
├── assets/          # Portfolio and project imagery
├── components/      # Page sections and reusable UI pieces
├── App.jsx          # Page composition
├── index.css        # Global design system and responsive styles
└── main.jsx         # React entry point
```

## Deployment

The project includes a GitHub Actions workflow for GitHub Pages. Set `GITHUB_PAGES=true` when building for the repository base path:

```bash
GITHUB_PAGES=true npm run build
```

The project-specific `apple-design` skill is tracked through `skills-lock.json`. Its local agent files are intentionally ignored by Git.
