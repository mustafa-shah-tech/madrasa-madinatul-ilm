/* ============================================================
   MADRASA MADINATUL ILM — prayer-times.js
   Fetches prayer times for Bat Khela, KPK from Aladhan API
   With 1-hour caching for performance
   ============================================================ */

// Bat Khela coordinates
const LAT = 34.6167;
const LNG = 72.0167;

// Prayer display config
const PRAYERS = [
  { key: 'Fajr',    arabic: 'الفجر',   en: 'Fajr'    },
  { key: 'Dhuhr',   arabic: 'الظهر',   en: 'Dhuhr'   },
  { key: 'Asr',     arabic: 'العصر',   en: 'Asr'     },
  { key: 'Maghrib', arabic: 'المغرب',  en: 'Maghrib' },
  { key: 'Isha',    arabic: 'العشاء',  en: 'Isha'    },
];

// Cache helper: 1 hour
const CACHE_KEY = 'madrasa_prayer_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

function getCachedPrayerTimes() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();
    
    if (now - timestamp < CACHE_DURATION) {
      return data;
    }
    
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (e) {
    console.warn('Cache read error:', e);
    return null;
  }
}

function setCachedPrayerTimes(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (e) {
    console.warn('Cache write error:', e);
  }
}

function to12Hour(timeStr) {
  if (!timeStr) return '—';
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour   = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

function getCurrentPrayer(timings) {
  const now     = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();

  const prayerMins = PRAYERS.map(p => {
    const t = timings[p.key];
    if (!t) return Infinity;
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  });

  // Find the last prayer that has passed (that's the current prayer)
  let current = 0;
  for (let i = 0; i < prayerMins.length; i++) {
    if (prayerMins[i] <= nowMins) current = i;
  }
  return current;
}

async function loadPrayerTimes() {
  const container = document.getElementById('prayer-grid');
  const dateEl    = document.getElementById('prayer-date');

  if (!container) return;

  // Check cache first
  const cached = getCachedPrayerTimes();
  if (cached) {
    const { timings, date, hijri } = cached;
    
    if (dateEl) {
      dateEl.textContent = `${date} | ${hijri.day} ${hijri.month.en} ${hijri.year} AH`;
    }

    const activePrayer = getCurrentPrayer(timings);

    container.innerHTML = '';
    PRAYERS.forEach((prayer, idx) => {
      const card = document.createElement('div');
      card.className = `prayer-card${idx === activePrayer ? ' active-prayer' : ''}`;
      card.innerHTML = `
        <span class="prayer-name-arabic">${prayer.arabic}</span>
        <span class="prayer-name-en">${prayer.en}</span>
        <span class="prayer-time">${to12Hour(timings[prayer.key])}</span>
      `;
      container.appendChild(card);
    });
    return;
  }

  // Show loading state
  container.innerHTML = '<p class="prayer-loading">Loading prayer times...</p>';

  try {
    const today   = new Date();
    const ts      = Math.floor(today.getTime() / 1000);
    const url     = `https://api.aladhan.com/v1/timings/${ts}?latitude=${LAT}&longitude=${LNG}&method=1`;

    const res     = await fetch(url);
    if (!res.ok) throw new Error('API error');
    const data    = await res.json();

    const timings = data.data.timings;
    const date    = data.data.date.readable;
    const hijri   = data.data.date.hijri;

    // Cache the result
    setCachedPrayerTimes({ timings, date, hijri });

    if (dateEl) {
      dateEl.textContent = `${date} | ${hijri.day} ${hijri.month.en} ${hijri.year} AH`;
    }

    const activePrayer = getCurrentPrayer(timings);

    container.innerHTML = '';
    PRAYERS.forEach((prayer, idx) => {
      const card = document.createElement('div');
      card.className = `prayer-card${idx === activePrayer ? ' active-prayer' : ''}`;
      card.innerHTML = `
        <span class="prayer-name-arabic">${prayer.arabic}</span>
        <span class="prayer-name-en">${prayer.en}</span>
        <span class="prayer-time">${to12Hour(timings[prayer.key])}</span>
      `;
      container.appendChild(card);
    });

  } catch (err) {
    console.error('Prayer times fetch failed:', err);
    container.innerHTML = PRAYERS.map(p => `
      <div class="prayer-card">
        <span class="prayer-name-arabic">${p.arabic}</span>
        <span class="prayer-name-en">${p.en}</span>
        <span class="prayer-time">—</span>
      </div>
    `).join('');

    if (dateEl) dateEl.textContent = 'Bat Khela, KPK · Unable to load times';
  }
}

document.addEventListener('DOMContentLoaded', loadPrayerTimes);
