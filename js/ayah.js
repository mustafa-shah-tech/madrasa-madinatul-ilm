/* ============================================================
   MADRASA MADINATUL ILM — ayah.js
   Fetches a daily Ayah from Al-Quran Cloud API with Caching
   ============================================================ */
function getDayOfYear() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff  = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getDailyAyahNumber() {
  const day = getDayOfYear();
  return (day % 6236) + 1;
}

async function loadAyah() {
  const arabicEl = document.getElementById('ayah-arabic');
  const engEl    = document.getElementById('ayah-english');
  const urduEl   = document.getElementById('ayah-urdu');
  const refEl    = document.getElementById('ayah-ref');

  if (!arabicEl) return;

  arabicEl.textContent = 'جاری ہے...';
  arabicEl.classList.add('ayah-loading');

  // B4: Check localStorage cache (24-hour validity)
  const today     = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  const cacheKey  = 'ayah_cache';
  let cached      = null;

  try {
    const raw = localStorage.getItem(cacheKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.date === today) cached = parsed;
    }
  } catch (_) {}

  if (cached) {
    arabicEl.classList.remove('ayah-loading');
    arabicEl.classList.add('ayah-fade');
    arabicEl.textContent = cached.arabic;
    if (engEl)  engEl.textContent  = cached.english;
    if (urduEl) urduEl.textContent = cached.urdu;
    if (refEl)  refEl.textContent  = cached.ref;
    return;
  }

  try {
    const ayahNum = getDailyAyahNumber();
    const res = await fetch(
      `https://api.alquran.cloud/v1/ayah/${ayahNum}/editions/quran-uthmani,en.asad,ur.jalandhry`
    );
    if (!res.ok) throw new Error('API error');
    const data = await res.json();

    const editions = data.data;
    const arabic   = editions.find(e => e.edition.identifier === 'quran-uthmani');
    const english  = editions.find(e => e.edition.identifier === 'en.asad');
    const urdu     = editions.find(e => e.edition.identifier === 'ur.jalandhry');

    if (!arabic) throw new Error('No Arabic data');

    const surahAr   = arabic.surah.name;
    const surahName = arabic.surah.englishName;
    const ayahNo    = arabic.numberInSurah;

    const result = {
      date:    today,
      arabic:  arabic.text,
      english: english ? `"${english.text}"` : '',
      urdu:    urdu    ? urdu.text            : '',
      ref:     `— ${surahAr} (${surahName}) : ${ayahNo}`
    };

    try { localStorage.setItem(cacheKey, JSON.stringify(result)); } catch (_) {}

    arabicEl.classList.remove('ayah-loading');
    arabicEl.classList.add('ayah-fade');
    arabicEl.textContent = result.arabic;
    if (engEl)  engEl.textContent  = result.english;
    if (urduEl) urduEl.textContent = result.urdu;
    if (refEl)  refEl.textContent  = result.ref;

  } catch (err) {
    console.error('Ayah fetch failed:', err);
    arabicEl.classList.remove('ayah-loading');
    arabicEl.textContent = 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ';
    if (engEl)  engEl.textContent  = '"This is the Book about which there is no doubt."';
    if (urduEl) urduEl.textContent = 'یہ وہ کتاب ہے جس میں کوئی شک نہیں۔';
    if (refEl)  refEl.textContent  = '— سورة البقرة (Al-Baqarah) : 2';
  }
}

document.addEventListener('DOMContentLoaded', loadAyah);
