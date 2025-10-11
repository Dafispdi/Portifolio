	// ===== Autoplay Music =====
function setMusic(){
  const url = document.getElementById('musicUrl').value.trim();
  if(!url){ alert('Masukkan URL audio dulu'); return; }
  localStorage.setItem('autoplay_music_url', url);
  playMusic(url);
}

function playMusic(url){
  let a = document.getElementById('autoplayAudio');
  if(!a){
    a = document.createElement('audio');
    a.id = 'autoplayAudio';
    a.src = url;
    a.autoplay = true;
    a.loop = true;
    a.crossOrigin = "anonymous";

    // ✅ Tambahkan dua baris ini
    a.playsInline = true; // biar bisa auto-play di HP (Safari/Android)
    a.muted = true;       // mulai muted dulu agar izin auto-play gak diblok

    document.body.appendChild(a);
  } else {
    a.src = url;
  }

  // tetap biarkan bagian ini
  a.muted = true;
  a.play().catch(()=>{});
  // setelah interaksi pertama → unmute
  function unlock(){
    a.muted = false;
    a.play().catch(()=>{});
    window.removeEventListener('click',unlock);
    window.removeEventListener('keydown',unlock);
  }
  window.addEventListener('click',unlock);
  window.addEventListener('keydown',unlock);
}

// load otomatis kalau sudah pernah set sebelumnya
document.addEventListener('DOMContentLoaded',()=>{
  const prev = localStorage.getItem('autoplay_music_url');
  if(prev) playMusic(prev);
});

// === THEME TOGGLER (Enhanced with animation) ===
(function(){
  const btn = document.getElementById('themeToggle');
  const KEY = 'kyxzanXsaturn-theme';
  const sysLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  function apply(mode) {
    document.body.classList.toggle('light', mode === 'light');
    btn.innerHTML = mode === 'light'
      ? '<i class="fa-solid fa-moon"></i>'
      : '<i class="fa-solid fa-sun"></i>';
  }

  // ambil mode terakhir atau system default
  const saved = localStorage.getItem(KEY);
  const startMode = saved || (sysLight ? 'light' : 'dark');
  apply(startMode);

  // animasi icon & ganti mode
  btn.addEventListener('click', () => {
    const mode = document.body.classList.contains('light') ? 'dark' : 'light';
    const icon = btn.querySelector('i');
    icon.classList.add('spin'); // efek rotasi
    setTimeout(() => icon.classList.remove('spin'), 400);
    apply(mode);
    localStorage.setItem(KEY, mode);
  });
})();
  
  // header images
  const photos=["https://files.catbox.moe/t2xxcn.jpg","https://files.catbox.moe/wju39l.jpg","https://files.catbox.moe/y95obq.jpg"];
  document.getElementById("headerImage").src=photos[Math.floor(Math.random()*photos.length)];

  function showSection(id){
    document.querySelectorAll('.card[id]').forEach(s=>s.style.display='none');
    document.getElementById(id).style.display='block';
    window.scrollTo({top:0,behavior:'smooth'});
  }
  
async function generateEktp(){
  const pv = document.getElementById("ektpPreview");
  const lk = document.getElementById("ektpLinks");
  pv.innerHTML = '<div class="spinner"></div>'; lk.style.display='none'; lk.innerHTML='';

  const fd = new FormData();
  // wajib
  fd.append('nik',  document.getElementById('e_nik').value.trim());
  fd.append('nama', document.getElementById('e_nama').value.trim());
  // lainnya (ikuti nama field dari curl)
  const get = id => document.getElementById(id).value.trim();
  const opt = (k,v)=>{ if(v) fd.append(k,v); };

  opt('ttl', get('e_ttl'));
  opt('jenis_kelamin', get('e_jk'));
  opt('golongan_darah', get('e_goldar'));
  opt('agama', get('e_agama'));
  opt('status', get('e_status'));
  opt('pekerjaan', get('e_pekerjaan'));
  opt('kewarganegaraan', get('e_kwg'));
  opt('alamat', get('e_alamat'));
  opt('rt/rw', get('e_rtrw'));
  opt('kel/desa', get('e_kel'));
  opt('kecamatan', get('e_kec'));
  opt('kota', get('e_kota'));
  opt('provinsi', get('e_prov'));
  opt('masa_berlaku', get('e_berlaku'));
  opt('terbuat', get('e_terbuat'));

  const foto = document.getElementById('e_foto').files[0];
  if (foto) fd.append('pas_photo', foto, foto.name);

  if(!fd.get('nik') || !fd.get('nama')){
    pv.innerHTML = '<div class="error">Require: NIK dan Nama wajib diisi.</div>'; 
    return;
  }

  try{
    const r = await fetch('https://api.siputzx.my.id/api/m/ektp', { method:'POST', body: fd });
    if(!r.ok) throw new Error('HTTP '+r.status);
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);

    pv.innerHTML = '';
    const img = document.createElement('img'); img.src = url; pv.appendChild(img);

    const d = document.createElement('div');
    d.className = 'dl'; d.innerText = 'Download eKTP';
    d.onclick = ()=>{ const a=document.createElement('a'); a.href=url; a.download='ektp.png'; a.click(); };
    lk.appendChild(d); lk.style.display = 'flex';
  }catch(err){
    const msg = (String(err).includes('Failed to fetch')) 
      ? 'Gagal fetch (kemungkinan CORS). Jalankan via server/proxy.' 
      : err.message;
    pv.innerHTML = '<div class="error">Gagal generate: '+msg+'</div>';
  }
}
// --- HD Picture Enhancer (FikMyDomainsz API) ---
async function enhanceHD() {
  const url = document.getElementById('hdUrl').value.trim();
  const pv = document.getElementById('hdPreview');
  const lk = document.getElementById('hdLinks');

  if (!url) {
    alert('Masukkan URL gambar dulu!');
    return;
  }

  pv.innerHTML = '<div class="spinner"></div>';
  lk.style.display = 'none';
  lk.innerHTML = '';

  try {
    const api = `https://api.fikmydomainsz.xyz/imagecreator/remini?url=${encodeURIComponent(url)}`;
    const resp = await fetch(api);

    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const ct = resp.headers.get('content-type') || '';
    let imgUrl = '';

    if (ct.includes('application/json')) {
      const data = await resp.json();
      imgUrl = data.url || data.result || data.image || data.output || null;
      if (!imgUrl) throw new Error('Tidak menemukan URL gambar di response API.');
    } else {
      const blob = await resp.blob();
      imgUrl = URL.createObjectURL(blob);
    }

    pv.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:14px;">
        <img src="${imgUrl}" alt="HD Result"
          style="max-width:320px;border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,0.35);" />
        <div style="font-size:0.9rem;color:#dbeafe;">✅ Enhanced to HD Quality</div>
      </div>
    `;

    const d = document.createElement('div');
    d.className = 'dl';
    d.innerHTML = '<i class="fa-solid fa-download"></i> Download HD';
    d.onclick = () => {
      const a = document.createElement('a');
      a.href = imgUrl;
      a.download = 'hd_result.png';
      a.click();
    };
    lk.appendChild(d);
    lk.style.display = 'flex';
  } catch (err) {
    pv.innerHTML = `<div class="error">❌ Gagal memproses: ${err.message}</div>`;
  }
}
// --- ToFigure (FikMyDomainsz API) ---
async function generateFigure() {
  const url = document.getElementById('figUrl').value.trim();
  const pv = document.getElementById('figPreview');
  const lk = document.getElementById('figLinks');

  if (!url) {
    alert('Masukkan URL gambar dulu!');
    return;
  }

  pv.innerHTML = '<div class="spinner"></div>';
  lk.style.display = 'none';
  lk.innerHTML = '';

  try {
    // endpoint baru 🔥
    const api = `https://api.fikmydomainsz.xyz/imagecreator/tofigur?url=${encodeURIComponent(url)}`;
    const resp = await fetch(api);

    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    // beberapa endpoint langsung kirim gambar (blob), ada juga yang kirim JSON
    const ct = resp.headers.get('content-type') || '';
    let imgUrl = '';

    if (ct.includes('application/json')) {
      const data = await resp.json();
      imgUrl = data.url || data.result || data.image || data.output || null;
      if (!imgUrl) throw new Error('Tidak menemukan URL gambar di response API.');
    } else {
      const blob = await resp.blob();
      imgUrl = URL.createObjectURL(blob);
    }

    // tampilkan hasil
    pv.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:14px;">
        <img src="${imgUrl}" alt="Figure Result"
          style="max-width:320px;border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,0.35);" />
        <div style="font-size:0.9rem;color:#dbeafe;">✅ Generated Figure Style</div>
      </div>
    `;

    // tombol download
    const d = document.createElement('div');
    d.className = 'dl';
    d.innerHTML = '<i class="fa-solid fa-download"></i> Download Figure';
    d.onclick = () => {
      const a = document.createElement('a');
      a.href = imgUrl;
      a.download = 'figure_result.png';
      a.click();
    };
    lk.appendChild(d);
    lk.style.display = 'flex';
  } catch (err) {
    pv.innerHTML = `<div class="error">❌ Gagal memproses: ${err.message}</div>`;
  }
}
// --- Fake XNXX Quote ---
async function generateXNXX() {
  const name = document.getElementById('xnxxName').value.trim();
  const quote = document.getElementById('xnxxQuote').value.trim();
  let likes = document.getElementById('xnxxLikes').value.trim();
  let dislikes = document.getElementById('xnxxDislikes').value.trim();

  const pv = document.getElementById('xnxxPreview');
  const lk = document.getElementById('xnxxLinks');

  // validasi wajib
  if (!name || !quote) {
    alert('Require: Nama & Quote harus diisi');
    return;
  }

  // validasi angka likes
  if (!likes) {
    likes = "0";
  } else if (isNaN(likes)) {
    alert("Likes harus berupa angka");
    return;
  }

  // validasi angka dislikes
  if (!dislikes) {
    dislikes = "0";
  } else if (isNaN(dislikes)) {
    alert("Dislikes harus berupa angka");
    return;
  }

  pv.innerHTML = '<div class="spinner"></div>';
  lk.style.display = 'none';
  lk.innerHTML = '';

  try {
    const api = `https://api.siputzx.my.id/api/canvas/fake-xnxx?name=${encodeURIComponent(name)}&quote=${encodeURIComponent(quote)}&likes=${encodeURIComponent(likes)}&dislikes=${encodeURIComponent(dislikes)}`;

    const resp = await fetch(api);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);

    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);

    pv.innerHTML = '';
    const img = document.createElement('img');
    img.src = url;
    pv.appendChild(img);

    const d = document.createElement('div');
d.className = 'dl';
d.innerText = ' Download';
d.style.marginTop = "12px";   // jarak dari gambar
d.onclick = () => {
  const a = document.createElement('a');
  a.href = url;
  a.download = 'xnxx_quote.png';
  a.click();
};

    lk.appendChild(d);
    lk.style.display = 'flex';

  } catch (err) {
    pv.innerHTML = '<div class="error">Error: ' + err.message + '</div>';
  }
}
// --- Image to Prompt (styled version) ---
async function generatePrompt() {
  const url = document.getElementById('img2Url').value.trim();
  const pv = document.getElementById('img2Preview');
  const lk = document.getElementById('img2Links');

  if (!url) {
    alert('Masukkan URL gambar dulu!');
    return;
  }

  pv.innerHTML = '<div class="spinner"></div>';
  lk.style.display = 'none';
  lk.innerHTML = '';

  try {
    const api = 'https://api.sxtream.xyz/ai/image-to-prompt?url=' + encodeURIComponent(url);
    const resp = await fetch(api);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);

    const data = await resp.json();
    let promptText = data.data || data.result || data.description || 'Tidak ada hasil ditemukan';

    // === tampilan hasil keren ===
    pv.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: left;
        gap: 14px;
        padding: 16px;
      ">
        <img src="${url}" alt="Preview Image"
          style="max-width: 320px; border-radius: 10px; box-shadow: 0 8px 22px rgba(0,0,0,0.35);" />
        <div style="
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 14px 16px;
          border-radius: 10px;
          line-height: 1.6;
          font-size: 0.95rem;
          color: #dbeafe;
          width: 100%;
        ">
          <b style="color:#4facfe;">AI Description:</b><br>
          ${promptText}
        </div>
      </div>
    `;

    // === Tombol Copy ===
    const copyBtn = document.createElement('div');
    copyBtn.className = 'dl';
    copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Prompt';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(promptText);
      copyBtn.innerHTML = '✅ Copied!';
      setTimeout(() => (copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Prompt'), 1500);
    };

    lk.innerHTML = '';
    lk.appendChild(copyBtn);
    lk.style.display = 'flex';
  } catch (err) {
    pv.innerHTML = `<div class="error">❌ Gagal memuat hasil: ${err.message}</div>`;
  }
}
// --- TikTok Downloader (robust vt.tiktok shortlink) ---
async function downloadTiktok() {
  const input = document.getElementById('tiktokUrl');
  const preview = document.getElementById('tiktokPreview');
  const links = document.getElementById('tiktokLinks');

  const rawUrl = (input.value || '').trim();
  if (!rawUrl) {
    alert('Masukkan URL TikTok dulu. Contoh: https://vt.tiktok.com/ZSDCECaLw/');
    return;
  }

  // reset UI
  preview.innerHTML = '<div class="spinner"></div>';
  links.style.display = 'none';
  links.innerHTML = '';

  // build endpoint (vt.* harus di-encode)
  const endpoint = 'https://api.siputzx.my.id/api/d/tiktok?url=' + encodeURIComponent(rawUrl);

  try {
    const resp = await fetch(endpoint, { redirect: 'follow' });

    // Kadang API balas video langsung (bukan JSON)
    const ctype = (resp.headers.get('content-type') || '').toLowerCase();
    if (!resp.ok) throw new Error('HTTP ' + resp.status);

    if (!ctype.includes('application/json')) {
      // langsung video => tampilkan tombol open/download
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      preview.innerHTML = '<video controls style="max-width:100%;border-radius:10px;"><source src="' + url + '" type="' + ctype + '"></video>';

      const d = document.createElement('div');
      d.className = 'dl';
      d.innerText = 'Download Video';
      d.onclick = () => { const a = document.createElement('a'); a.href = url; a.download = 'tiktok.mp4'; a.click(); };
      links.appendChild(d);
      links.style.display = 'flex';
      return;
    }

    // Umumnya JSON � bentuk field bisa beda-beda
    const data = await resp.json();

    // helper cari field url terbaik
    const pick = (...cands) => cands.find(u => typeof u === 'string' && u.startsWith('http'));
    // Tambahkan dukungan untuk array data.data.urls
let urlsArr = [];
try {
  urlsArr = Array.isArray(data.data?.urls) ? data.data.urls : [];
} catch {}

const videoNoWM = pick(
  data.nowm, data.no_watermark, data.hdplay, data.play,
  data.play_url, data.url, data?.video?.no_watermark,
  data?.result?.nowm, data?.result?.play,
  data?.data?.nowm, data?.data?.play,
  data?.links?.nowm, data?.download?.nowm,
  urlsArr[0] // ✅ ambil dari array urls jika ada
);
    const videoWM = pick(
      data.watermark, data?.result?.watermark, data?.data?.watermark
    );
    const audioUrl = pick(
      data.audio, data.music, data?.result?.audio, data?.data?.music
    );

    // metadata opsional
    let metaHtml = '<div style="padding:12px;text-align:left;color:#dbeafe">';
    if (data.author || data?.data?.author) metaHtml += '<b>Author:</b> ' + (data.author || data?.data?.author) + '<br>';
    if (data.title || data?.data?.title) metaHtml += '<b>Title:</b> ' + (data.title || data?.data?.title) + '<br>';
    metaHtml += '</div>';
    preview.innerHTML = metaHtml;

    const makeBtn = (label, href, downloadName) => {
      const d = document.createElement('div');
      d.className = 'dl';
      d.innerText = label;
      d.onclick = () => {
        // buka tab baru kalau bukan file langsung
        if (!/(\.mp4|\.m4a|\.mp3)(\?|$)/i.test(href)) {
          window.open(href, '_blank', 'noopener');
          return;
        }
        const a = document.createElement('a');
        a.href = href;
        if (downloadName) a.download = downloadName;
        a.click();
      };
      return d;
    };

    if (videoNoWM) links.appendChild(makeBtn('Download (no watermark)', videoNoWM, 'tiktok_nowm.mp4'));
    if (videoWM)   links.appendChild(makeBtn('Download (watermark)', videoWM, 'tiktok_wm.mp4'));
    if (audioUrl)  links.appendChild(makeBtn('Download Audio', audioUrl, 'tiktok_audio.mp3'));

    if (links.childNodes.length === 0) {
      // tampilkan raw JSON buat debugging kalau tak ada field yang ketemu
      preview.innerHTML += '<div class="small" style="margin-top:10px;color:#ffc">Tidak menemukan link download di response API.</div>' +
                           '<pre style="white-space:pre-wrap;background:#08121a;padding:10px;border-radius:8px;max-height:280px;overflow:auto;">' +
                           JSON.stringify(data, null, 2) + '</pre>';
    } else {
      links.style.display = 'flex';
    }

  } catch (err) {
    const msg = String(err).includes('Failed to fetch')
      ? 'Failed to fetch (kemungkinan CORS). Coba jalankan dari server/proxy.'
      : err.message;
    preview.innerHTML = '<div class="error">Error: ' + msg + '</div>';
  }
}

  // --- Skiplink / Bypass ---
  async function bypassLink(){
    const url=document.getElementById('skipUrl').value.trim();
    const preview=document.getElementById('skipPreview');
    const links=document.getElementById('skipLinks');
    if(!url){ alert('Masukkan link untuk dibypass.'); return; }
    preview.innerHTML='<div class="spinner"></div>';
    links.style.display='none'; links.innerHTML='';
    try{
      const api='https://api.siputzx.my.id/api/tools/skiplink?url='+encodeURIComponent(url);
      const resp=await fetch(api);
      if(!resp.ok) throw new Error('HTTP '+resp.status);
      const data=await resp.json();
      // data might contain target or final_url
      let html = '<div style="padding:12px;text-align:left;color:#dbeafe">';
      if(data.target) html += '<b>Target:</b> '+data.target+'<br>';
      if(data.final_url) html += '<b>Final URL:</b> '+data.final_url+'<br>';
      if(data.message) html += '<b>Message:</b> '+data.message+'<br>';
      html += '</div>';
      preview.innerHTML = html;
      if(data.final_url){ const d=document.createElement('div'); d.className='dl'; d.innerText='Open Final URL'; d.onclick=()=>window.open(data.final_url,'_blank','noopener'); links.appendChild(d); }
      if(links.hasChildNodes()) links.style.display='flex';
    }catch(err){ preview.innerHTML='<div class="error">Error: '+err.message+'</div>'; }
  }

// --- Imagine (updated to Pollinations) ---
async function generateImage() {
  const prompt = document.getElementById('imPrompt').value.trim();
  const style = document.getElementById('imStyle').value;
  const ar = document.getElementById('imAR').value;
  const preview = document.getElementById('imPreview');
  const links = document.getElementById('imLinks');

  if (!prompt) {
    alert('Masukkan prompt!');
    return;
  }

  // Tampilkan spinner loading
  preview.innerHTML = '<div class="spinner"></div>';
  links.style.display = 'none';
  links.innerHTML = '';

  try {
    // Bangun prompt akhir (gabung style & rasio)
    let finalPrompt = prompt;
    if (style) finalPrompt += `, style: ${style}`;
    if (ar) finalPrompt += `, aspect ratio: ${ar}`;

    // Buat URL Pollinations
    const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?model=sdxl`;

    // Bikin elemen gambar
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = prompt;
    img.onload = () => {
      preview.innerHTML = '';
      preview.appendChild(img);

      // Tombol download
      const dl = document.createElement('div');
      dl.className = 'dl';
      dl.innerText = 'Download Image';
      dl.onclick = () => {
        const a = document.createElement('a');
        a.href = imgUrl;
        a.download = 'imagine.png';
        a.click();
      };
      links.innerHTML = '';
      links.appendChild(dl);
      links.style.display = 'flex';
    };

    img.onerror = () => {
      preview.innerHTML = '<div class="error">Gagal memuat gambar dari Pollinations.</div>';
    };
  } catch (err) {
    preview.innerHTML = `<div class="error">Gagal generate: ${err.message}</div>`;
  }
}

  // --- GitHub Converter ---
  function convertUrl(){ const input=document.getElementById('githubUrl').value.trim(); const out=document.getElementById('githubOut'); if(!input.includes('github.com')){ out.innerHTML='<div class="error">Invalid GitHub URL.</div>'; return; } const raw=input.replace('github.com','raw.githubusercontent.com').replace('/blob/','/'); out.innerHTML='<div class="small">Raw URL:</div><div style="margin-top:6px;background:#08121a;padding:10px;border-radius:8px;">'+raw+'</div>'; }

  // --- QR ---
  function generateQR(){ const text=document.getElementById('qrText').value.trim(); if(!text) return; document.getElementById('qrImage').src='https://api.qrserver.com/v1/create-qr-code/?size=300x300&data='+encodeURIComponent(text); }

  // --- IQC Maker ---
  const API_BASE='https://api.sxtream.xyz/maker/iqc?text='; let lastUrl=null,lastBlob=null; async function createIQC(){ const text=document.getElementById('iqcText').value.trim(); const prev=document.getElementById('previewBox'); const btnD=document.getElementById('btnDownload'); const btnO=document.getElementById('btnOpen'); if(!text) return alert('Masukkan teks dulu!'); prev.innerHTML='<div class="spinner"></div>'; btnD.style.display='none'; btnO.style.display='none'; try{ const resp=await fetch(API_BASE+encodeURIComponent(text)); if(!resp.ok) throw new Error('HTTP '+resp.status); const blob=await resp.blob(); lastBlob=blob; lastUrl=URL.createObjectURL(blob); prev.innerHTML=''; const img=document.createElement('img'); img.src=lastUrl; prev.appendChild(img); btnD.style.display='inline-block'; btnO.style.display='inline-block'; btnD.onclick=()=>{ const a=document.createElement('a'); a.href=lastUrl; a.download='iqc.png'; a.click(); }; btnO.onclick=()=>window.open(lastUrl,'_blank','noopener'); }catch(err){ prev.innerHTML='<div class="error">Gagal memuat hasil.</div>'; } }

  // header init
  document.addEventListener('DOMContentLoaded',()=>{ document.getElementById('headerImage').src=photos[Math.floor(Math.random()*photos.length)]; });

  // initial show menu
  showSection('imagine');
  // ripple klik untuk semua .btn
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size/2;
  const y = e.clientY - rect.top - size/2;
  ripple.style.position = 'absolute';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.borderRadius = '50%';
  ripple.style.pointerEvents = 'none';
  ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,.45) 0%, rgba(255,255,255,0) 60%)';
  ripple.style.opacity = '0.6';
  ripple.style.transform = 'scale(0.2)';
  ripple.style.transition = 'transform 450ms ease, opacity 600ms ease';
  btn.appendChild(ripple);
  requestAnimationFrame(() => {
    ripple.style.transform = 'scale(1.6)';
    ripple.style.opacity = '0';
  });
  setTimeout(() => ripple.remove(), 650);
});