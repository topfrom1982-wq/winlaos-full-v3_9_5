/* ===========================================================
🔇 JR x Top — Silent-Safe Global Click System (2025 Edition)
✨ ระบบเสียงคลิกกลาง ไม่หยุดเพลง / YouTube / TikTok
=========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  let audioCtx = null;
  let clickBuffer = null;

  // ✅ โหลดเสียงคลิกครั้งเดียว (ไม่รบกวนเสียงอื่น)
  async function loadClickSound() {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const response = await fetch("sounds/click.mp3");
      const arrayBuffer = await response.arrayBuffer();
      clickBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      console.log("✅ JR Silent-Safe Sound Loaded");
    } catch (err) {
      console.warn("⚠️ Load sound error:", err);
    }
  }

  // ✅ เล่นเสียงคลิก โดยไม่เปิด AudioSession ใหม่
  function playClickSound() {
    if (!audioCtx || !clickBuffer) return;
    const source = audioCtx.createBufferSource();
    source.buffer = clickBuffer;
    source.connect(audioCtx.destination);
    source.start(0);
  }

  // ✅ เริ่มโหลดหลังจาก user แตะครั้งแรก (เพื่อผ่าน policy iOS)
  document.addEventListener("pointerdown", () => {
    if (!audioCtx) loadClickSound();
  }, { once: true });

  // ✅ ให้ทุกที่ในเว็บใช้เสียงเดียวกัน (global)
  window.playClickSound = playClickSound;

  // ✅ คลิกปุ่ม / ลิงก์ / เมนู ใด ๆ ก็เล่นเสียงเดียวกัน
  document.addEventListener("pointerup", (e) => {
    const t = e.target;
    if (t.closest("video") || t.closest("iframe")) return;
    if (t.matches("button, a, .menu-btn, .dropdown a")) playClickSound();
  });

  console.log("✅ JR x Top Silent-Safe Global Sound System Active");


/* ✅ Jackpot + Online (JR x Top Realistic Persistent Edition) */
const jackpotEl = document.getElementById("jackpotNumber");
const onlineEl = document.getElementById("onlineNumber");

function easeOutQuad(t) { return t * (2 - t); }

function animateNumber(el, start, end, duration = 1500) {
  const diff = end - start;
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = easeOutQuad(progress);
    const val = Math.floor(start + diff * eased);
    el.textContent = val.toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ✅ โหลดค่าจาก localStorage */
let jackpotVal = parseInt(localStorage.getItem("jackpotVal")) || Math.floor(12000000 + Math.random() * 3000000);
let onlineVal  = parseInt(localStorage.getItem("onlineVal"))  || Math.floor(1000 + Math.random() * 800);

jackpotEl.textContent = jackpotVal.toLocaleString();
onlineEl.textContent  = onlineVal.toLocaleString();

/* ✅ Timestamp ล่าสุดที่อัปเดต (กัน refresh แล้วเลขหยุดนิ่งเกินไป) */
const lastUpdate = parseInt(localStorage.getItem("jackpotTime")) || Date.now();
const timeDiff = (Date.now() - lastUpdate) / 1000; // วินาที
if (timeDiff > 10) {
  // ถ้าปิดหน้าไว้หลายชั่วโมง ให้ขยับ jackpot ตามเวลาที่ผ่าน
  const offlineGain = Math.floor(timeDiff * (Math.random() * 5 + 2)); // โตช้าแต่ต่อเนื่อง
  jackpotVal += offlineGain;
}

/* ✅ ฟังก์ชันอัปเดตต่อเนื่อง */
setInterval(() => {
  const jNext = jackpotVal + Math.floor(Math.random() * 2000 + 800); // ขึ้น ~800–2800
  let oNext   = onlineVal + Math.floor(Math.random() * 20 - 5);
  if (oNext < 900) oNext = 900;

  animateNumber(jackpotEl, jackpotVal, jNext, 1800);
  animateNumber(onlineEl, onlineVal, oNext, 1200);

  jackpotVal = jNext;
  onlineVal = oNext;

  // ✅ เก็บค่าล่าสุดไว้ใน localStorage
  localStorage.setItem("jackpotVal", jackpotVal);
  localStorage.setItem("onlineVal", onlineVal);
  localStorage.setItem("jackpotTime", Date.now());
}, 8000);

  /* ✅ ฟีดผู้ชนะล่าสุด */
  const winnerBox = document.getElementById("winnerTicker");
  const winnerTicker = winnerBox ? winnerBox.querySelector(".scroll-text") : null;
  if (winnerBox && winnerTicker) {
    const winnerNames = ["ນ້ຳຝົນ", "ລິນດາລັດ", "ກີຕ້າ", "ຕຸກຕິກ", "ອາລີ້", "ຊ້າງນ້ອຍ"];
    const winnerGames = ["PG SOFT", "PRAGMATIC PLAY", "SEXY BACCARAT", "SBO PLUS", "GOLD FISH"];

    function generateWinnerFeed() {
      let text = "";
      for (let i = 0; i < 10; i++) {
        const name = winnerNames[Math.floor(Math.random() * winnerNames.length)];
        const game = winnerGames[Math.floor(Math.random() * winnerGames.length)];
        const prize = (Math.floor(Math.random() * 1500000) + 50000).toLocaleString("lo-LA");
        text += `💰 ${name} ຊະນະ ${game} ຈຳນວນ ${prize} ₭ — `;
      }
      winnerTicker.innerHTML = text;
    }

    function cycleWinnerFeed() {
      winnerBox.classList.add("fade-out");
      setTimeout(() => {
        generateWinnerFeed();
        winnerBox.classList.remove("fade-out");
      }, 1200);
    }

    generateWinnerFeed();
    setInterval(cycleWinnerFeed, 180000);
  }
/* ===========================================================
🍔 JR x Top — Premium Glow Hamburger Menu (Fix 2025)
=========================================================== */
const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

if (menuBtn && dropdownMenu) {
  let isOpen = false;
  let isLocked = false;

  // ✅ เปิด / ปิด เมนู
  menuBtn.addEventListener("pointerup", (e) => {
    e.stopPropagation();
    if (isLocked) return;
    isLocked = true;
    setTimeout(() => (isLocked = false), 250);

    isOpen = !isOpen;
    menuBtn.classList.toggle("active", isOpen);
    dropdownMenu.classList.toggle("show", isOpen);

    // ✅ เล่นเสียงคลิก
    if (window.playClickSound) playClickSound();
  });

  // ✅ ปิดเมนูเมื่อกดลิงก์ใน dropdown
  dropdownMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("pointerup", () => {
      if (window.playClickSound) playClickSound();
      setTimeout(() => {
        menuBtn.classList.remove("active");
        dropdownMenu.classList.remove("show");
        isOpen = false;
      }, 150);
    });
  });

  // ✅ ปิดเมนูเมื่อคลิกนอก
  document.addEventListener("pointerup", (e) => {
    if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
      menuBtn.classList.remove("active");
      dropdownMenu.classList.remove("show");
      isOpen = false;
    }
  });

  console.log("✅ JR x Top Menu System Active");
} else {
  console.warn("⚠️ ไม่พบ #menuBtn หรือ #dropdownMenu");
}

  /* ✅ ສະໄລດໂປຣໂມຊັ່ນ */
  const promoImgs = [
    "images/promotions/top/bonus1.webp",
    "images/promotions/top/bonus2.webp",
    "images/promotions/top/bonus3.webp",
    "images/promotions/bottom/bonus5.webp",
    "images/promotions/bottom/bonus4.webp"
  ];
  const promoImgEl = document.getElementById("promoTopImg");
  const dotsEl = document.getElementById("promoTopDots");
  function buildDots(n, activeIdx) {
    dotsEl.innerHTML = "";
    for (let i = 0; i < n; i++) {
      const d = document.createElement("div");
      d.className = "dot" + (i === activeIdx ? " active" : "");
      dotsEl.appendChild(d);
    }
  }
  let pIdx = 0;
  function setPromo(idx) {
    promoImgEl.classList.add("fade-out");
    setTimeout(() => {
      promoImgEl.src = promoImgs[idx];
      promoImgEl.onerror = () => { promoImgEl.src = "images/promo-default.webp"; };
      promoImgEl.onload = () => { promoImgEl.classList.remove("fade-out"); };
      buildDots(promoImgs.length, idx);
    }, 200);
  }
  setPromo(pIdx);
  setInterval(() => { pIdx = (pIdx + 1) % promoImgs.length; setPromo(pIdx); }, 4000);

  /* ✅ ແຈ້ງຖອນທະນາຄານ (JR x Top Refined+Real Edition) */
const bankData = [
  { bank: "images/banks/bcel.webp", name: "BCEL" },
  { bank: "images/banks/jdb.webp", name: "JDB" },
  { bank: "images/banks/stb.webp", name: "STB" },
  { bank: "images/banks/ldb.webp", name: "LDB" }
];

const notiWrap = document.getElementById("notifications");

function randomUser() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const prefix = letters[Math.floor(Math.random() * letters.length)];
  return prefix + "***" + Math.floor(1000 + Math.random() * 9000);
}

function randomAmount() {
  const r = Math.random();
  let min, max;
  if (r < 0.7) { min = 600000; max = 1200000; }  // ถอนเล็ก
  else { min = 1200000; max = 2500000; }         // ถอนใหญ่
  const value = Math.floor(Math.random() * (max - min + 1)) + min;
  return value.toLocaleString("lo-LA") + " ₭";
}

function getTimeNow() {
  const d = new Date();
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const day = d.getDate();
  const month = d.getMonth() + 1;
  return `${day}/${month} ${h}:${m}`;
}

/* ✅ ฟังก์ชันหลัก */
function showBankNotification(data) {
  const user = randomUser();
  const amount = randomAmount();
  const time = getTimeNow();

  const box = document.createElement("div");
  box.className = "notification";
  box.innerHTML = `
    <img src="${data.bank}" class="bank-logo" alt="bank" loading="lazy">
    <div>
      <div>ຜູ້ໃຊ້: <b>${user}</b></div>
      <div>ຍອດຖອນ: <span class="highlight">${amount}</span></div>
      <div>ທະນາຄານ: ຖອນຈາກລະບົບອັດຕະໂນມັດ (${data.name})</div>
      <div class="time">${time}</div>
    </div>
  `;

  notiWrap.prepend(box); // ดันอันใหม่ไว้บนสุด
  requestAnimationFrame(() => box.classList.add("show"));

  // จำกัดไม่ให้เกิน 3 กล่อง
  if (notiWrap.children.length > 3) {
    notiWrap.lastElementChild.remove();
  }

  // ลบหลัง 12 วิ
  setTimeout(() => {
    box.classList.remove("show");
    box.classList.add("hide");
    setTimeout(() => box.remove(), 600);
  }, 12000);
}

/* ✅ สุ่มแสดงแบบไม่ fix interval */
function startBankLoop() {
  const delay = Math.floor(Math.random() * 3000 + 5000); // 5–8 วิ
  setTimeout(() => {
    const item = bankData[Math.floor(Math.random() * bankData.length)];
    showBankNotification(item);
    startBankLoop(); // เรียกซ้ำแบบ recursive เพื่อสุ่ม delay ใหม่
  }, delay);
}

notiWrap.innerHTML = "";
startBankLoop();


  /* ✅ ວິຈານລູກຄ້າ (30) */
  const reviews = [
    {name:"ລິນດາລັດ", text:"ບໍລິການໄວ ແລະ ທີມງານຊ່ວຍເຫຼືອດີ", avatar:"https://img5.pic.in.th/file/secure-sv1/550128489_122095563081038031_5887138736067878129_n.jpg"},
    {name:"ນ້ຳຟ້າ", text:"ຖອນເງິນໄວ ບໍ່ເຄີຍມີປັນຫາ", avatar:"https://img5.pic.in.th/file/secure-sv1/543550628_760798210076793_2707806559083622458_n.jpg"},
    {name:"ນ້ຳຝົນ", text:"ເວັບນີ້ເຊື່ອຖືໄດ້ ໂປຣໂມຊັ່ນຫຼາຍ", avatar:"https://img2.pic.in.th/pic/546511412_674055395729831_1181635161007905733_n.jpg"},
    {name:"ກອນ", text:"ຫຼິ້ນງ່າຍ ໄດ້ເງິນແທ້", avatar:"https://img2.pic.in.th/pic/547103390_122093982885029740_7042522169543632437_n.jpg"},
    {name:"ແອນນາ", text:"ມັກຫຼາຍ ຊ່ວນໝູ່ມາຫຼິ້ນ", avatar:"https://img2.pic.in.th/pic/547285522_122134136240892649_5177635328625468116_n.jpg"},
    {name:"ຈິນຕະນາ", text:"ບໍລິການດີຫຼາຍ ແນະນຳໃຫ້ລອງ", avatar:"https://img5.pic.in.th/file/secure-sv1/548200613_122093584335034544_2106831417635738231_n.jpg"},
    {name:"ຕຸກຕິກ", text:"ເປັນສະມາຊິກປະຈຳ ບໍ່ຜິດຫວັງ", avatar:"https://img2.pic.in.th/pic/534797352_4407363862886141_2419767759568461434_n.jpg"},
    {name:"ກີຕ້າ", text:"ເວັບນີ້ຫຼິ້ນງ່າຍຮອງຮັບທຸກລະບົບ", avatar:"https://img5.pic.in.th/file/secure-sv1/536284607_732838972910153_1169568118359232777_n.jpg"},
    {name:"ສຸກສັນ", text:"ໂປຣໂມຊັ່ນຄຸ້ມຄ່າ", avatar:"https://img2.pic.in.th/pic/538210393_1973531793404827_5184108892011599560_n.jpg"},
    {name:"ແອນ", text:"ມັກຫຼາຍ ບໍລິການວ່ອງໄວ", avatar:"https://img5.pic.in.th/file/secure-sv1/540779032_24382549251436746_1857433111476967778_n.jpg"},
    {name:"ເມ", text:"ສະດວກ ປອດໄພ ໜ້າເຊື່ອຖື", avatar:"https://img2.pic.in.th/pic/541431417_1306810134487536_2144338052717761883_n.jpg"},
    {name:"ໝວຍ", text:"ມີຫຼາຍເກມ ໃຫ້ເລືອກເລີຍ", avatar:"https://img5.pic.in.th/file/secure-sv1/526604350_1769844330287777_6941691698300287003_n.jpg"},
    {name:"ກີ້", text:"ບໍ່ຜິດຫວັງ ກັບການບໍລິການ", avatar:"https://img2.pic.in.th/pic/528177426_736557402568008_7687911717991714979_n.jpg"},
    {name:"ໂອປໍ", text:"ກົດຖອນໄວ ເງິນເຂົ້າທັນທີ", avatar:"https://img5.pic.in.th/file/secure-sv1/529214085_122135070902860190_6359140182351644089_n.jpg"},
    {name:"ແນັດ", text:"ເວັບເຊື່ອຖືໄດ້ ບໍ່ມີໂກງ", avatar:"https://img2.pic.in.th/pic/531218827_122115803084952921_3920147918967332462_n.jpg"},
    {name:"ນຸ່ນ", text:"ເວັບນີ້ແນະນຳເລີຍ", avatar:"https://img5.pic.in.th/file/secure-sv1/533618024_122139186572836581_3687185032198771603_n.jpg"},
    {name:"ນຸ", text:"ໄດ້ຮັບໂບນັດແທ້", avatar:"https://img2.pic.in.th/pic/526536654_1269430161570135_1262152791376978809_n.jpg"},
    {name:"ນຶກ", text:"ມັກເວັບນີ້ຫຼາຍ ບໍ່ເຄີຍມີປັນຫາ", avatar:"https://img5.pic.in.th/file/secure-sv1/518223207_724577883771717_5811256173544120751_n.jpg"},
    {name:"ນິວ", text:"ສະດວກທຸກຢ່າງ ວ່ອງໄວທັນໃຈ", avatar:"https://img2.pic.in.th/pic/517427036_122191855514277603_6335196101792456626_n.jpg"},
    {name:"ໂດ້", text:"ມັກໂປຣໂມຊັ່ນ VIP ຫຼາຍ", avatar:"https://img5.pic.in.th/file/secure-sv1/515490787_4030219443790883_6598097993034412953_n.jpg"},
    {name:"ແບ້ງ", text:"ທີມງານບໍລິການໄວ ມີຄວາມເປັນມືອາຊີບ", avatar:"https://img2.pic.in.th/pic/491841668_656625900591935_4894284445723748076_n.jpg"},
    {name:"ກິ່ງ", text:"ເປັນສະມາຊິກຫຼາຍປີ ບໍ່ເຄີຍຜິດຫວັງ", avatar:"https://img5.pic.in.th/file/secure-sv1/492001511_677639154988670_9045433838331136597_n.jpg"},
    {name:"ກ້ານ", text:"ເວັບນີ້ດີທີ່ສຸດເທົ່າທີ່ເຄີຍຫຼິ້ນ", avatar:"https://img2.pic.in.th/pic/495352499_2475737112788961_7145488973319756028_n.jpg"},
    {name:"ອາລີ້", text:"ເປັນປະສົບການທີ່ດີ", avatar:"https://img5.pic.in.th/file/secure-sv1/502938518_3742263599251635_34751559895479050_n.jpg"},
    {name:"ລ້ອມດາວ", text:"ບໍລິການຕະຫຼອດ 24 ຊົ່ວໂມງ", avatar:"https://img2.pic.in.th/pic/507739995_1058229113079590_6615581554701945731_n.jpg"},
    {name:"ມີ່ມີ່", text:"ບໍ່ມີການຫັກຄ່າທຳນຽມ", avatar:"https://img5.pic.in.th/file/secure-sv1/473079843_122205842858192845_5455390554681490634_n.jpg"},
    {name:"ອາພິລັກ", text:"ບໍ່ເຄີຍຜິດຫວັງເລີຍ", avatar:"https://img2.pic.in.th/pic/468552592_1017947943428300_745514133268500761_n.jpg"},
    {name:"ຊ້າງນ້ອຍ", text:"ໂອນໄວ ຕິດຕໍ່ງ່າຍ", avatar:"https://img5.pic.in.th/file/secure-sv1/461971660_2949960001828126_2719539843506884679_n.jpg"},
    {name:"ໂອເລ້", text:"ປະທັບໃຈ ແນະນຳເພື່ອນໆ", avatar:"https://img2.pic.in.th/pic/75196488_410309246325754_9086307694725300224_n.jpg"},
    {name:"ຄຳແພງ", text:"ສະດວກວ່ອງໄວ ບໍ່ມີສະດຸດ", avatar:"https://img5.pic.in.th/file/secure-sv1/68832647_2653568178001350_4867734543932588032_n.jpg"}
  ];

const reviewWrap = document.getElementById("review-list");
function randomStars(){ return "⭐⭐⭐⭐⭐"; }
function randomTime(){ return Math.floor(Math.random()*5+1)+" ຊົ່ວໂມງຜ່ານມາ"; }

function addReview(r, fade=true){
  const item = document.createElement("div");
  item.className = "review-box";
  if (fade) item.classList.add("fade-in");
  item.innerHTML = `
    <img src="${r.avatar}" alt="" referrerpolicy="no-referrer">
    <div>
      <p>“ ${r.text} ”</p>
      <p style="color:#00ffa3;">- ${r.name}</p>
      <p style="color:#FFD700;">${randomStars()}</p>
      <p style="color:#aaa;">${randomTime()}</p>
    </div>`;
  reviewWrap.appendChild(item);
}

/* โหลด 5 อันแรก */
for (let i = 0; i < 5; i++) addReview(reviews[i], true);

/* สุ่มเปลี่ยนทุก 4 วิ + กันซ้ำติดกัน */
let lastIdx = -1;
function getRandomIndexExcept(except){
  let idx;
  do { idx = Math.floor(Math.random()*reviews.length); } while (idx === except);
  return idx;
}

setInterval(() => {
  const first = reviewWrap.firstElementChild;
  if (!first) return;

  first.classList.add("fade-out");
  setTimeout(() => {
    first.remove();
    const idx = getRandomIndexExcept(lastIdx);
    lastIdx = idx;
    addReview(reviews[idx], true);
  }, 750); // ตรงกับระยะอนิเมชั่น
}, 4000);


  /* ✅ ยอดเคลื่อนไหวเพิ่มเติม (JR x Top Persistent Stats Edition) */
function animateStat(el, start, end, duration = 2000) {
  const diff = end - start;
  const startTime = performance.now();
  function update(t) {
    const p = Math.min((t - startTime) / duration, 1);
    const val = Math.floor(start + diff * p);
    el.textContent = val.toLocaleString("lo-LA");
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ✅ ฟังก์ชันโหลดค่าจาก localStorage */
function getStoredValue(key, fallback) {
  const v = localStorage.getItem(key);
  return v ? parseInt(v) : fallback;
}

/* ✅ ฟังก์ชันบันทึกค่ากลับ localStorage */
function storeValue(key, value) {
  localStorage.setItem(key, value);
}

/* 🔹 ยอดฝากวันนี้ */
const depositTodayEl = document.getElementById("depositToday");
let depositVal = getStoredValue("depositTodayVal", 500000); // ค่าตั้งต้นครั้งแรก
depositTodayEl.textContent = depositVal.toLocaleString("lo-LA");

setInterval(() => {
  const plus = Math.floor(Math.random() * 10000 + 5000);
  const newVal = depositVal + plus;
  animateStat(depositTodayEl, depositVal, newVal);
  depositVal = newVal;
  storeValue("depositTodayVal", depositVal);
}, 5000);

/* 🔹 ยอดถอนเดือนนี้ */
const withdrawEl = document.getElementById("monthlyWithdraw");
let withdrawVal = getStoredValue("withdrawVal", 35000000);
withdrawEl.textContent = withdrawVal.toLocaleString("lo-LA");

setInterval(() => {
  const plus = Math.floor(Math.random() * 50000 + 10000);
  const newVal = withdrawVal + plus;
  animateStat(withdrawEl, withdrawVal, newVal);
  withdrawVal = newVal;
  storeValue("withdrawVal", withdrawVal);
}, 7000);

/* 🔹 สมาชิกใหม่วันนี้ */
const memberEl = document.getElementById("newMembers");
let memberVal = getStoredValue("memberVal", 135);
memberEl.textContent = memberVal.toLocaleString("lo-LA");

setInterval(() => {
  const plus = Math.floor(Math.random() * 3 + 1);
  const newVal = memberVal + plus;
  animateStat(memberEl, memberVal, newVal);
  memberVal = newVal;
  storeValue("memberVal", memberVal);
}, 8000);

  /* ✅ โหลดบทความ */
  async function loadArticles() {
    const container = document.getElementById('articles');
    if (!container) return;
    try {
      const articleList = [
        "baccarat-guide.html",
        "slot-tips.html",
        "football.html"
      ];
      const articles = [];
      for (let file of articleList) {
        const res = await fetch(`articles/${file}`);
        const text = await res.text();
        const title = (text.match(/<h1[^>]*>(.*?)<\/h1>/i) || [])[1] || 'ບົດຄວາມໃໝ່';
        const desc = (text.match(/<meta name="description" content="(.*?)"/i) || [])[1] || '';
        const image = (text.match(/<img[^>]+src="([^"]+)"/i) || [])[1] || 'images/default.webp';
        const date = (text.match(/ວັນທີ\s*:?<\/strong>\s*(.*?)<\/p>/i) || [])[1] || '';
        articles.push({ title, desc, image, file, date });
      }
      container.innerHTML = articles.map(a => `
        <a href="articles/${a.file}" class="article-card">
          <img src="${a.image}" alt="${a.title}" loading="lazy">
          <div class="info">
            <h3>${a.title}</h3>
            <p>${a.desc}</p>
            <span class="date">${a.date}</span>
          </div>
        </a>
      `).join('');
    } catch (err) {
      console.error("❌ โหลดบทความล้มเหลว:", err);
    }
  }
  loadArticles();
});