/* ============================================================
   MADRASA MADINATUL ILM — ayah.js
   Fetches a daily Ayah from Al-Quran Cloud API
   Arabic + English + Urdu translations
   ============================================================ */

// Use day-of-year as seed so same ayah shows all day
function getDayOfYear() {
  const now   = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff  = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Quran has 6236 ayahs — pick by day of year (cycles through year)
function getDailyAyahNumber() {
  const day = getDayOfYear();
  return (day % 6236) + 1; // 1-indexed
}

async function loadAyah() {
  const arabicEl  = document.getElementById('ayah-arabic');
  const engEl     = document.getElementById('ayah-english');
  const urduEl    = document.getElementById('ayah-urdu');
  const refEl     = document.getElementById('ayah-ref');

  if (!arabicEl) return;

  // Show loading
  arabicEl.textContent = 'جاری ہے...';
  arabicEl.classList.add('ayah-loading');

  try {
    const ayahNum = getDailyAyahNumber();

    // Fetch Arabic + English + Urdu in one call
    const res  = await fetch(
      `https://api.alquran.cloud/v1/ayah/${ayahNum}/editions/quran-uthmani,en.asad,ur.jalandhry`
    );

    if (!res.ok) throw new Error('API error');
    const data = await res.json();

    const editions  = data.data;
    const arabic    = editions.find(e => e.edition.identifier === 'quran-uthmani');
    const english   = editions.find(e => e.edition.identifier === 'en.asad');
    const urdu      = editions.find(e => e.edition.identifier === 'ur.jalandhry');

    if (!arabic) throw new Error('No Arabic data');

    const surahName = arabic.surah.englishName;
    const surahAr   = arabic.surah.name;
    const ayahNo    = arabic.numberInSurah;

    arabicEl.classList.remove('ayah-loading');
    arabicEl.classList.add('ayah-fade');
    arabicEl.textContent = arabic.text;

    if (engEl)  engEl.textContent  = english  ? `"${english.text}"` : '';
    if (urduEl) urduEl.textContent = urdu      ? urdu.text          : '';
    if (refEl)  refEl.textContent  = `— ${surahAr} (${surahName}) : ${ayahNo}`;

  } catch (err) {
    console.error('Ayah fetch failed:', err);

    // Hardcoded fallback ayah (Al-Baqarah 2:2)
    arabicEl.classList.remove('ayah-loading');
    arabicEl.textContent = 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ';
    if (engEl)  engEl.textContent  = '"This is the Book about which there is no doubt, guidance for those who are God-fearing."';
    if (urduEl) urduEl.textContent = 'یہ وہ کتاب ہے جس میں کوئی شک نہیں، پرہیزگاروں کے لیے ہدایت ہے۔';
    if (refEl)  refEl.textContent  = '— سورة البقرة (Al-Baqarah) : 2';
  }
}

document.addEventListener('DOMContentLoaded', loadAyah);
