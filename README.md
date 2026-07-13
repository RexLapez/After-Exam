# AFTER EXAM — Career PathFinder

> **One exam measured your score. It didn't measure your future.**

AFTER EXAM is a premium, interactive career guidance platform for students who didn't qualify NEET or JEE. It maps out high-paying alternative career paths in Health Sciences, Biotechnology, and Computing through a stunning neural-network-style PathFinder visualization.

## ✨ Features

- **Interactive PathFinder** — A React-powered neural pathway engine that guides students through Streams → Domains → Degrees → Career Outcomes with smooth animations and detailed career profiles.
- **50+ Course Detail Pages** — Rich career profiles (`/courses/[slug]`) explaining degrees, duration, eligibility, semester roadmap, good for / avoid if pointers, salary timelines in Indian Rupees, and FAQs, complete with a dynamic fallback generator.
- **Career Comparison Matrix** — Side-by-side comparison of NEET vs alternative career paths (salary, duration, fees, global scope).
- **Colleges & Exams Registry** — Mapped profiles of premium institutions (including top government universities like DU, BHU, CURAJ, and private ones like VIT, MAHE) linked dynamically to entrance criteria (NEET-UG, CUET-UG, etc.).
- **Premium Landing Stats** — Beautiful, viewport-animated, minimalist counter statistics section above the footer tracking career paths, courses, and colleges.
- **Community Q&A** — Student discussion forum with upvoting, categories, real-time Supabase interactions, and robust client-side fallbacks for offline safety.
- **Night Sky Theme** — Twinkling stars, shooting star animations, glassmorphic UI design throughout.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla + React) |
| PathFinder Engine | React 18 + Framer Motion + TypeScript |
| Styling | Tailwind CSS + Custom CSS |
| Build Tool | Vite |
| Icons | Lucide React |
| Database | Supabase (Auth & Realtime Database) |

## 📁 Project Structure

```
AfterExam/
├── index.html              # Landing Page
├── explore/                # PathFinder page wrapper
├── community/              # Community Q&A page wrapper
├── courses/                # Course details page wrapper
├── components/             # React UI components (pathfinder, course/page modules)
├── css/                    # Stylesheets (main, course, explore)
├── js/                     # JavaScript & JSX entry points
├── data/                   # TSX registries (courses, colleges, exams, careers)
├── public/                 # Static public assets
├── vite.config.js          # Vite config with multi-page entrypoints
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📄 Pages

| Page | URL | Description |
|------|-----|-------------|
| Landing Page | `/` | Hero, career streams, comparison table, FAQs, premium stats |
| PathFinder | `/explore` | Interactive neural career pathway engine |
| Community | `/community` | Student Q&A discussion forum with local mock safety fallbacks |
| Course Profile | `/courses/[slug]` | Premium career profile page (e.g. `/courses/mbbs`, `/courses/bams`) |

## 📜 License

© 2026 AFTER EXAM. All rights reserved.
