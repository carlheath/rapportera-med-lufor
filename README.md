````markdown
# LUFOR – Report Drone Sightings

[![Deploy with Lovable](https://img.shields.io/badge/Deploy%20with-Lovable-4E46E6?style=flat)](https://lovable.dev/projects/592cc309-838d-4a02-824a-e27f59cc82ff)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?logo=tailwindcss)](https://tailwindcss.com/)

---

## Overview

**LUFOR** is an open-source system for reporting and monitoring drone sightings.  
It enables fast public reporting and real-time monitoring to improve airspace situational awareness.

[**Live demo on Lovable.dev**](https://lovable.dev/projects/592cc309-838d-4a02-824a-e27f59cc82ff)

---

## Features

- One-click drone reporting (no login required)
- Real-time activity & risk alerts
- Accessible & responsive (WCAG-compliant, mobile-ready)
- Modern frontend: Vite, React, TypeScript, shadcn/ui, Tailwind CSS

---

## Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/carlheath/rapportera-med-lufor.git
cd rapportera-med-lufor
````

### 2. Install dependencies

```sh
npm install
```

### 3. Start the development server

```sh
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Deployment

### Deploy via Lovable.dev

* Open the project on [Lovable.dev](https://lovable.dev/projects/592cc309-838d-4a02-824a-e27f59cc82ff)
* Click **Share → Publish**
* [Custom domain setup guide](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

### Deploy to Vercel, Netlify, or any static host

LUFOR is a standard Vite/React SPA and can be deployed anywhere that supports static site hosting:

#### Vercel

1. Push your fork to GitHub
2. Go to [vercel.com](https://vercel.com/) and import your repository
3. Set `Framework Preset` to **Vite**
4. Build & deploy (default settings work out-of-the-box)

#### Netlify

1. Push your fork to GitHub
2. Go to [netlify.com](https://netlify.com/) and link your repository
3. Set `Build command` to `npm run build`
4. Set `Publish directory` to `dist`
5. Deploy

#### Manual (static hosting)

1. Build the app:

   ```sh
   npm run build
   ```

2. Serve the files in the `dist` folder on any static web server (e.g. [serve](https://www.npmjs.com/package/serve), Nginx, Apache, S3+CloudFront, etc):

   ```sh
   npx serve dist
   ```

---

## Editing the Code

* **With Lovable.dev:** [Edit directly in the browser](https://lovable.dev/projects/592cc309-838d-4a02-824a-e27f59cc82ff)
* **Locally:** Use your favorite code editor and push changes to your fork.
* **GitHub Codespaces:** Click **Code → Codespaces → New codespace** for browser-based development.
* **Directly on GitHub:** Click the pencil icon on any file in the repo.

---

## License

MIT © [Carl Heath](https://github.com/carlheath)

---

> Help improve airspace awareness. Report drone sightings with LUFOR.

```
```
