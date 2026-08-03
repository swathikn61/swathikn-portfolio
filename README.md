# Swathi K N — Portfolio

A minimal, responsive personal portfolio built with React, Vite and Tailwind CSS v4.

## Stack

| Purpose   | Choice                                    |
| --------- | ----------------------------------------- |
| Framework | React 19 + Vite 7                         |
| Styling   | Tailwind CSS v4 (`@tailwindcss/vite`)     |
| Animation | Framer Motion (respects reduced-motion)   |
| Icons     | lucide-react                              |
| Fonts     | Inter + JetBrains Mono (Google Fonts)     |

## Getting started

```bash
npm install
```

```bash
npm run dev
```

The dev server runs at `http://localhost:5173`.

Other scripts:

```bash
npm run build
```

```bash
npm run preview
```

## Project structure

```
src/
├── App.jsx                 # Section composition
├── index.css               # Tailwind import, theme tokens, base styles
├── data/
│   └── content.js          # ← All site copy lives here
├── hooks/
│   └── useActiveSection.js # Scroll-spy for the navbar
├── components/             # Reusable, presentational
│   ├── Badge.jsx
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── Reveal.jsx          # Scroll-triggered fade-in wrapper
│   ├── Section.jsx
│   ├── SectionHeading.jsx
│   ├── SocialLinks.jsx
│   └── ThemeToggle.jsx
└── sections/               # One file per page section
    ├── Hero.jsx
    ├── About.jsx
    ├── Skills.jsx
    ├── Projects.jsx
    ├── Experience.jsx
    ├── Education.jsx
    ├── Resume.jsx
    └── Contact.jsx
```

## Editing content

Almost nothing needs a component change. Open [`src/data/content.js`](src/data/content.js) and edit
the exported objects — `profile`, `socials`, `navLinks`, `about`, `skills`, `projects`,
`experience`, `education`, `certifications` and `activities`. Every section maps straight over
those arrays.

A few common edits:

- **Add a project** — push an object onto `projects` with `title`, `blurb`, `stack`, `points` and `tag`.
- **Add a job** — push onto `experience`; the timeline renders any number of entries.
- **Swap the resume PDF** — replace `public/Swathi_K_N_Resume.pdf` and update `profile.resumeUrl`
  and `profile.resumeFileName`.
- **Change the accent colour** — the site uses Tailwind's `indigo`. Find-and-replace `indigo` with
  another Tailwind hue (e.g. `emerald`, `sky`) across `src/`.

## Theming

Light and dark are both supported. The initial theme comes from `localStorage`, falling back to the
OS preference, and is applied by a small inline script in `index.html` so there is no flash of the
wrong theme on load. `ThemeToggle` flips the `dark` class on `<html>` and persists the choice.

## Accessibility

- Skip-to-content link, semantic landmarks and labelled icon buttons.
- Visible focus rings on all interactive elements.
- All animation collapses to near-instant under `prefers-reduced-motion: reduce`.

## Deploying to Vercel

The repo includes [`vercel.json`](vercel.json), so Vercel needs no manual configuration.

**Option A — dashboard**

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import that repository.
3. Vercel detects Vite automatically (build `npm run build`, output `dist`). Click **Deploy**.

**Option B — CLI**

```bash
npx vercel
```

Then promote it to production:

```bash
npx vercel --prod
```

Any push to the default branch redeploys automatically.
