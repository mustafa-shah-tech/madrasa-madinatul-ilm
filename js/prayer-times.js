/* ============================================================
   MADRASA MADINATUL ILM — prayer-times.js
   Fetches prayer times for Bat Khela, KPK with Caching
   ============================================================ */
const LAT = 34.6167;
const LNG = 72.0167;

const PRAYERS = [
  { key: 'Fajr',    arabic: 'الفجر',   en: 'Fajr'    },
  { key: 'Dhuhr',   arabic: 'الظهر',   en: 'Dhuhr'   },
  { key: 'Asr',     arabic: 'العصر',   en: 'Asr'     },
  { key: 'Maghrib', arabic: 'المغرب',  en: 'Maghrib' },
  { key: 'Isha',    arabic: 'العشاء',  en: 'Isha'    },
];

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
  let current = 0;
  for (let i = 0; i < prayerMins.length; i++) {
    if (prayerMins[i] <= nowMins) current = i;
  }
  return current;
}

// B5: Helper for cached data (uses pre-computed minutes array)
function getCurrentPrayerFromMins(prayerMins) {
  const now     = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  let current   = 0;
  prayerMins.forEach((m, i) => { if (m <= nowMins) current = i; });
  return current;
}

async function loadPrayerTimes() {
  const container = document.getElementById('prayer-grid');
  const dateEl    = document.getElementById('prayer-date');
  if (!container) return;

  container.innerHTML = '<div class="prayer-loading">Loading prayer times...</div>';

  // B5: Check cache (1-hour validity)
  const cacheKey = 'prayer_cache';
  const now      = Date.now();
  try {
    const raw = localStorage.getItem(cacheKey);
    if (raw) {
      const cached = JSON.parse(raw);
      if (now - cached.ts < 60 * 60 * 1000) {
        // Restore from cache
        if (dateEl) dateEl.textContent = cached.dateStr;
        container.innerHTML = '';
        cached.prayers.forEach((p, idx) => {
          const card = document.createElement('div');
          card.className = `prayer-card${idx === getCurrentPrayerFromMins(cached.prayerMins) ? ' active-prayer' : ''}`;
          card.innerHTML = `
            <span class="prayer-name-arabic">${p.arabic}</span>
            <span class="prayer-name-en">${p.en}</span>
            <span class="prayer-time">${p.time}</span>
          `;
          container.appendChild(card);
        });
        return;
      }
    }
  } catch (_) {}

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

    // Save to cache
    const prayerMins = PRAYERS.map(p => {
      const t = timings[p.key];
      if (!t) return 0;
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    });

    const cacheData = {
      ts: Date.now(),
      dateStr: dateEl ? dateEl.textContent : '',
      prayerMins,
      prayers: PRAYERS.map(p => ({
        arabic: p.arabic,
        en: p.en,
        time: to12Hour(timings[p.key])
      }))
    };
    try { localStorage.setItem(cacheKey, JSON.stringify(cacheData)); } catch (_) {}

  } catch (err) {
    console.error('Prayer times fetch failed:', err);
    container.innerHTML = PRAYERS.map(p =>
      `<div class="prayer-card">
        <span class="prayer-name-arabic">${p.arabic}</span>
        <span class="prayer-name-en">${p.en}</span>
        <span class="prayer-time">—</span>
      </div>`
    ).join('');
    if (dateEl) dateEl.textContent = 'Bat Khela, KPK · Unable to load times';
  }
}

document.addEventListener('DOMContentLoaded', loadPrayerTimes);
