Swathi K N · Portfolio
My personal portfolio, designed like a vintage scrapbook: paper textures, cut-out letters, washi tape and die-cut tech stickers, with smooth scroll animations throughout.

I'm a Computer Science graduate and software engineer working across backend, full-stack and AI. This site shows the projects I've built, my experience, and how to reach me.

Highlights
Handwritten intro. "booting up my corner of the internet…" writes itself while a strip of washi tape fills as the loading bar. It plays once per visit.
Cut-out hero. My name is spelled in ransom-note paper scraps that drop in one by one, over a slowly turning starburst, surrounded by floating tech stickers.
Stacking project cards. Each project is a polaroid taped onto colored paper. On desktop the cards stack over each other as you scroll, and the screenshots tilt in 3D under the cursor.
Scroll-lit About section. The opening statement lights up word by word as you scroll.
Tech stack pop-up. The "my tech stack" tag in the hero opens every tool I work with, grouped by area.
Smooth scrolling with Lenis, kept in sync with GSAP ScrollTrigger.
Light and dark themes, a responsive layout, and full support for reduced motion.
Built with
Purpose	Tools
Framework	React 19, Vite 7
Styling	Tailwind CSS v4
Animation	Framer Motion, GSAP ScrollTrigger
Scrolling	Lenis
Icons	lucide-react, hand-drawn SVG stickers
Fonts	Fraunces, Bricolage Grotesque, Gochi Hand, IBM Plex Mono
Hosting	Vercel
Run it locally
npm install
npm run dev
The site runs at http://localhost:5173. To make a production build:

npm run build
Project structure
src/
├── App.jsx              # Page layout and the intro hand-off
├── index.css            # Palette, paper texture, tape, scallops and other shared styles
├── data/content.js      # All the text: profile, projects, experience, skills, links
├── hooks/               # Smooth scrolling and the navbar's active-section tracking
├── components/          # Intro, stickers, cut-out letters, navbar, footer, tech stack…
└── sections/            # Hero, Projects, About, Contact
Editing content
All the copy lives in src/data/content.js, so most updates never touch a component. Add a project by adding an entry to projects with a title, description, stack, screenshot (in public/projects/), and optional GitHub and live demo links.

Contact
Email: swathikn6142@gmail.com
LinkedIn: linkedin.com/in/swathikn
GitHub: github.com/swathikn61
