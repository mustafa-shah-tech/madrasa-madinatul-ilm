<div align="center">
  <img src="assets/favicon.png" alt="Madrasa Logo" width="120" style="margin-bottom: 20px;">
  
  # 🕌 Madrasa Madinatul Ilm 
  ### **مدرسہ مدینۃ العلم** 

  *A centre of Islamic knowledge and spiritual excellence in Bat Khela, Khyber Pakhtunkhwa.*

  [![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-2ea44f?style=for-the-badge&logo=github)](https://mustafa-shah-tech.github.io/madrasa-madinatul-ilm/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
</div>

<br>

A fully modern, static, mobile-first website tailored for an Islamic educational institution. Designed with a premium aesthetic blending traditional Islamic art motifs with contemporary web design principles. Built using Vanilla HTML, CSS, and JS, making it extremely lightweight and perfectly suited for free hosting on GitHub Pages.

<div align="center">
  <a href="https://mustafa-shah-tech.github.io/madrasa-madinatul-ilm/" target="_blank">
    <strong>View Live Website »</strong>
  </a>
</div>

---

## ✨ Key Features

- 📱 **Mobile-First Responsiveness:** Flawless rendering entirely down to 320px displays.
- 🔠 **Trilingual Typography:** Hand-picked web fonts for beautiful Arabic (`Amiri`), refined Urdu (`Noto Nastaliq Urdu`), and modern English (`Cormorant Garamond` & `Lato`).
- 🕌 **Daily Ayah Integration:** Fetches the Ayah of the day in Arabic, English, and Urdu using the AlQuran Cloud API. Implements 24-hour `localStorage` caching to maximize performance.
- 🕒 **Live Prayer Times:** Auto-updating prayer times for Bat Khela using the Aladhan API.
- 💳 **Donations Page:** Comprehensive donation flows featuring robust clipboard 'Copy' utilities for IBANs and JazzCash numbers.
- 💬 **WhatsApp Integration:** Immediate contact and student sponsorship inquiries dynamically routed to WhatsApp.
- 🎨 **Premium Aesthetic:** Smooth glass-morphism overlays, custom Islamic geometric CSS patterns, hardware-accelerated scroll-reveals, and a bespoke color palette (Deep Greens & Gold).

---

## 🗂️ Architecture & Project Structure

The project employs a clean Vanilla stack (no frameworks, no bundlers) for maximum maintainability and longevity without dependency rot.

```text
madrasa-madinatul-ilm/
├── index.html           # Landing page with hero, courses preview, and stats
├── about.html           # History, Mission, Vision, and Educational Pillars
├── courses.html         # Detailed curriculum (Qaida, Hifz, Dars-e-Nizami)
├── gallery.html         # Photo gallery with custom JS lightbox
├── contact.html         # Location data, hours, and WhatsApp inquiry form
├── donation.html        # Bank/JazzCash details, sponsorship, & Isaal-e-Sawab
├── css/
│   ├── style.css        # CSS logic (Variables, Typography, Components)
│   ├── animations.css   # Keyframe definitions and IntersectionObserver classes
│   └── responsive.css   # Centralized @media queries cascading down to 360px
├── js/
│   ├── main.js          # DOM injection (Nav/Footer), UI observers, core logic
│   ├── prayer-times.js  # Async fetching & DOM painting for Aladhan API
│   └── ayah.js          # Async fetching & robust caching for AlQuran Cloud
└── assets/              # Static media (Logos, favicons, gallery images)
```

> **Note on DOM Injection:** To maintain DRY (Don't Repeat Yourself) principles in a static environment without a build step, the Navbar and Footer are injected dynamically via generic placeholders (`<div id="navbar-placeholder"></div>`) through `js/main.js`.

---

## 🚀 Setup & Customization Guide

### 1. Logo & Branding
Drop your production-ready logo into the assets folder.
`assets/logo.png`
*(It will automatically propagate to the hero section, navbar, and footer).*

### 2. Contact Routing (WhatsApp)
The site uses direct WhatsApp routing for all forms and CTAs. Update the unified phone number constant in `js/main.js` (Line 8).
```javascript
// Remove + and formatting, use country code directly
const PHONE_NUMBER = '923144928492'; 
```

### 3. Gallery Population
Drop your high-quality Madrasa images into `assets/images/`. Then, update the `<img>` tags found inside the `.gallery-grid` of `gallery.html`.

### 4. Updating the Stats
Open `index.html` and modify the `data-target` attributes inside the `<section class="stats-bar">` to reflect current student rolls and graduates.
```html
<div class="stat-number" data-target="350" data-suffix="+">0+</div>
```

---

## 🔌 API Integrations

The website leverages powerful, keyless REST APIs directly from the client side:

1. **[AlQuran Cloud API](https://alquran.cloud/api)**
   - **Endpoint:** `/v1/ayah/{number}/editions/quran-uthmani,en.asad,ur.jalandhry`
   - **Handling:** Managed in `js/ayah.js`. Utilizes day-of-year calculation to rotate verses daily. Caches aggressively to `localStorage` to eliminate redundant network requests.

2. **[Aladhan API](https://aladhan.com/prayer-times-api)**
   - **Endpoint:** `/v1/timingsByCity`
   - **Handling:** Managed in `js/prayer-times.js`. Calculates the next upcoming prayer dynamically and highlights it in gold on the UI.

---

## 🎨 Design System

The UI uses a carefully curated CSS variable token system (`:root` in `style.css`) to enforce consistency.

| Color Token | Hex | Application |
|---|---|---|
| `--green-900` | `<span style="color:#0A2E16">#0A2E16</span>` | Deep backgrounds, Hero gradients, Footer |
| `--green-700` | `<span style="color:#1B6B2F">#1B6B2F</span>` | Primary buttons, primary borders, headers |
| `--green-300` | `<span style="color:#6DBD8A">#6DBD8A</span>` | Soft accents, subtle icons |
| `--gold`      | `<span style="color:#C9A84C">#C9A84C</span>` | Call-to-actions, Arabic typography headers |
| `--cream`     | `<span style="color:#FDF9F0">#FDF9F0</span>` | Warm page base background |

---

## 🌐 Deployment (GitHub Pages)

Because this project is 100% static, deployment to GitHub Pages takes under 60 seconds.

1. Init a new repo and push this codebase to the `main` branch.
2. Navigate to your repository's **Settings** > **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder.
5. Click **Save**. GitHub Actions will automatically build and deploy your site securely over HTTPS.

---

<div align="center">
  <p><i>"Seeking knowledge is an obligation upon every Muslim."</i></p>
  <p><b>طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى مَا كُلِّ مُسْلِمٍ</b></p>
  <p>— Sunan Ibn Majah</p>
</div>
