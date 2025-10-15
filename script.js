/* =============================================
✨ Winlaos168 — Premium Glow V2 (JR x Top)
============================================= */
document.addEventListener("DOMContentLoaded", () => {
  /* ✅ เสียงคลิกทุกปุ่ม + เมนู 3 ขีด (JR x Top Premium Touch) */
  const clickSound = new Audio("sounds/click.mp3");
  clickSound.volume = 0.8;

  clickSound.addEventListener("error", () => {
    console.warn("⚠️ ไม่พบไฟล์เสียง: sounds/click.mp3");
  });

  // ✅ เล่นเสียงเฉพาะเมื่อคลิกปุ่ม / ลิงก์ / เมนู
  document.addEventListener("pointerup", (e) => {
    const target = e.target;
    if (target.matches("button, a, .menu-btn, .dropdown a")) {
      try {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
      } catch (err) {
        console.warn("Click sound error:", err);
      }
    }
  });

  /* ✅ เมนู 3 ขีด (Pointer Edition) */
  const menuBtn = document.getElementById("menuBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (menuBtn && dropdownMenu) {
    let isOpen = false;
    let isLocked = false;

    // ✅ เปิด / ปิด เมนู
    menuBtn.addEventListener("pointerup", (e) => {
      e.stopPropagation(); // กันคลิกทะลุ
      if (isLocked) return;
      isLocked = true;
      setTimeout(() => (isLocked = false), 250);

      isOpen = !isOpen;
      menuBtn.classList.toggle("active", isOpen);
      dropdownMenu.classList.toggle("show", isOpen);

      try {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
      } catch {}
    });

    // ✅ ปิดเมนูเมื่อกดลิงก์ในเมนู
    dropdownMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("pointerup", () => {
        menuBtn.classList.remove("active");
        dropdownMenu.classList.remove("show");
        isOpen = false;
        try {
          clickSound.currentTime = 0;
          clickSound.play().catch(() => {});
        } catch {}
      });
    });

    // ✅ ปิดเมนูเมื่อคลิกนอกเมนู
    document.addEventListener("pointerup", (e) => {
      if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        menuBtn.classList.remove("active");
        dropdownMenu.classList.remove("show");
        isOpen = false;
       }
    });
  }
  /* ✅ ปิดเมนูอัตโนมัติเมื่อคลิก link (เฉพาะมือถือ) */
const menuLinks = document.querySelectorAll('#dropdownMenu a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (dropdownMenu.classList.contains('show')) {
      dropdownMenu.classList.remove('show'); // ปิดเมนู
    }
  });
});



 /* ✅ Jackpot + Online */
  const jackpotEl = document.getElementById("jackpotNumber");
  const onlineEl = document.getElementById("onlineNumber");
  function animateNumber(el, start, end, duration = 1200) {
    const diff = end - start;
    const t0 = performance.now();
    function tick(t) {
      const p = Math.min((t - t0) / duration, 1);
      const val = Math.floor(start + diff * (0.5 - Math.cos(p * Math.PI) / 2));
      el.textContent = val.toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  setInterval(() => {
    const jNow = parseInt((jackpotEl.textContent || "0").replace(/,/g, "")) || 12345678;
    const oNow = parseInt((onlineEl.textContent || "0").replace(/,/g, "")) || 1234;
    animateNumber(jackpotEl, jNow, jNow + Math.floor(Math.random() * 5000 + 2000));
    animateNumber(onlineEl, oNow, oNow + Math.floor(Math.random() * 30 - 10));
  }, 7000);

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

  /* ✅ ແຈ້ງຖອນທະນາຄານ (JR x Top Refined Version) */
const bankData = [
  { bank: "images/banks/bcel.webp", name: "BCEL" },
  { bank: "images/banks/jdb.webp", name: "JDB" },
  { bank: "images/banks/stb.webp", name: "STB" },
  { bank: "images/banks/ldb.webp", name: "LDB" }
];

const notiWrap = document.getElementById("notifications");

function randomUser() {
  return "xxxx" + Math.floor(1000 + Math.random() * 9000) + "xx";
}

function randomAmount() {
  const min = 600000, max = 2500000;
  const value = Math.floor(Math.random() * (max - min + 1)) + min;
  return value.toLocaleString("lo-LA") + " ₭";
}

/* ✅ ฟังก์ชันหลัก (ใช้ class แทน inline style) */
function showBankNotification(data) {
  const user = randomUser();
  const amount = randomAmount();
  const now = new Date();
  const date = now.toLocaleDateString("lo-LA");
  const time = now.toLocaleTimeString("lo-LA", { hour12: false });

  const box = document.createElement("div");
  box.className = "notification hidden"; // เริ่มต้นแบบซ่อนก่อน
  box.innerHTML = `
    <img src="${data.bank}" class="bank-logo" alt="bank" loading="lazy">
    <div>
      <div>ຜູ້ໃຊ້: <b>${user}</b></div>
      <div>ຍອດຖອນ: <span class="highlight">${amount}</span></div>
      <div>ທະນາຄານ: ຖອນຈາກລະບົບອັດຕະໂນມັດ (${data.name})</div>
      <div class="time">${date} ${time}</div>
    </div>
  `;

  notiWrap.appendChild(box);

  // ✅ Fade-in ลื่น ๆ โดยใช้ class
  requestAnimationFrame(() => box.classList.add("show"));

  // ✅ Fade-out หลัง 12 วินาที
  setTimeout(() => {
    box.classList.remove("show");
    box.classList.add("hide");
    setTimeout(() => box.remove(), 600);
  }, 12000);
}

/* ✅ สุ่มแสดงทุก 5–7 วิ */
function startBankLoop() {
  setInterval(() => {
    const item = bankData[Math.floor(Math.random() * bankData.length)];
    showBankNotification(item);
  }, Math.floor(Math.random() * 2000 + 5000));
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
  function randomStars(){return "⭐⭐⭐⭐⭐";}
  function randomTime(){return Math.floor(Math.random()*5+1)+" ຊົ່ວໂມງຜ່ານມາ";}
  function addReview(r){
    let item = document.createElement("div");
    item.className = "review-box";
    item.innerHTML = `
      <img src="${r.avatar}" alt="">
      <div><p>“ ${r.text} ”</p><p style="color:#00ffa3;">- ${r.name}</p><p style="color:#FFD700;">${randomStars()}</p><p style="color:#aaa;">${randomTime()}</p></div>`;
    reviewWrap.appendChild(item);
  }
  for(let i=0;i<5;i++) addReview(reviews[i]);
  setInterval(()=>{
    reviewWrap.firstChild.remove();
    addReview(reviews[Math.floor(Math.random()*reviews.length)]);
  },4000);



  /* ✅ ยอดเคลื่อนไหวเพิ่มเติม */
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

  // 🔹 ยอดฝากวันนี้
  const depositTodayEl = document.getElementById("depositToday");
  let depositVal = parseInt(depositTodayEl.textContent.replace(/,/g, ""));
  setInterval(() => {
    const plus = Math.floor(Math.random() * 10000 + 5000);
    animateStat(depositTodayEl, depositVal, depositVal + plus);
    depositVal += plus;
  }, 5000);

  // 🔹 ยอดถอนเดือนนี้
  const withdrawEl = document.getElementById("monthlyWithdraw");
  let withdrawVal = parseInt(withdrawEl.textContent.replace(/,/g, ""));
  setInterval(() => {
    const plus = Math.floor(Math.random() * 50000 + 10000);
    animateStat(withdrawEl, withdrawVal, withdrawVal + plus);
    withdrawVal += plus;
  }, 7000);

  // 🔹 สมาชิกใหม่วันนี้
  const memberEl = document.getElementById("newMembers");
  let memberVal = parseInt(memberEl.textContent.replace(/,/g, ""));
  setInterval(() => {
    const plus = Math.floor(Math.random() * 3 + 1);
    animateStat(memberEl, memberVal, memberVal + plus);
    memberVal += plus;
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


