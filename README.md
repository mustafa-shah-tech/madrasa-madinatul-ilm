# مدرسہ مدینۃ العلم — Madrasa Madinatul Ilm Website

A fully static, GitHub Pages-compatible website for **Madrasa Madinatul Ilm, Bat Khela, KPK, Pakistan**.

---

## 🗂️ Project Structure

```
madrasa-madinatul-ilm/
├── index.html          → Home page
├── about.html          → About the Madrasa
├── courses.html        → Course programs
├── gallery.html        → Photo gallery
├── contact.html        → Contact & inquiry form
├── css/
│   ├── style.css       → All styles & components
│   ├── animations.css  → Keyframes & scroll reveal
│   └── responsive.css  → Mobile/tablet breakpoints
├── js/
│   ├── main.js         → Navbar, scroll, counters, footer injection
│   ├── prayer-times.js → Live prayer times from Aladhan API
│   └── ayah.js         → Daily Ayah from AlQuran Cloud API
├── data/
│   └── courses.json    → Course data (reference)
├── assets/
│   ├── logo.png        ← ⚠️ DROP YOUR LOGO HERE
│   └── images/         ← ⚠️ DROP YOUR PHOTOS HERE
└── README.md
```

---

## ⚙️ Setup Steps

### 1. Add Your Logo
- Place your logo image in `assets/logo.png`
- It will appear automatically in the navbar, hero, and footer

### 2. Add Your Phone Number
- Open `js/main.js`
- Line 4: Replace `'92XXXXXXXXXX'` with your actual WhatsApp number
  ```js
  const PHONE_NUMBER = '923001234567'; // Format: 92 + number (no +, no spaces)
  ```

### 3. Add Photos to Gallery
- Place photos in `assets/images/`
- Open `gallery.html`
- Replace each `gallery-item-placeholder` div with an `<img>` tag:
  ```html
  <img src="assets/images/your-photo.jpg" alt="Description">
  ```

### 4. Update Contact Info
- Open `contact.html` — update address, phone number, and office hours
- The map is embedded for Bat Khela — replace the iframe `src` with a more precise pin if needed

### 5. Update Stats (Optional)
- Open `index.html`
- Find the `stats-grid` section
- Change `data-target` values to match your actual numbers

---

## 🌐 GitHub Pages Deployment

1. Create a new GitHub repository (e.g., `madrasa-madinatul-ilm`)
2. Upload all project files
3. Go to **Settings → Pages**
4. Set source to **main branch / root folder**
5. Your site will be live at: `https://yourusername.github.io/madrasa-madinatul-ilm/`

---

## 🔌 APIs Used (Free, No Key Required)

| API | Purpose | URL |
|---|---|---|
| AlQuran Cloud | Daily Ayah (Arabic + English + Urdu) | `api.alquran.cloud` |
| Aladhan | Prayer times for Bat Khela | `api.aladhan.com` |

Both APIs are free and require no API key. They work directly from the browser.

---

## 📱 Features

- ✅ Fully responsive (mobile-first)
- ✅ Trilingual: Arabic, Urdu, English
- ✅ Ayah of the Day (auto-refreshes daily)
- ✅ Live prayer times for Bat Khela
- ✅ WhatsApp contact integration
- ✅ Scroll animations & counter effects
- ✅ Islamic geometric patterns & design
- ✅ SEO meta tags
- ✅ No database, no backend, no build step
- ✅ GitHub Pages compatible

---

## 🎨 Color Palette

| Color | Hex | Use |
|---|---|---|
| Deep Green | `#0A2E16` | Dark sections, footer |
| Islamic Green | `#1B6B2F` | Primary brand color |
| Gold | `#C9A84C` | Accents, highlights |
| Red | `#B71C1C` | Logo accent |
| Cream | `#FDF9F0` | Background |

---

*Made for the service of the Ummah — Bat Khela, Khyber Pakhtunkhwa, Pakistan*
