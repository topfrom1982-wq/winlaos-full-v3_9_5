console.log("✅ register-popup.js (JR x Top Premium Edition) loaded");

(() => {
  const popup = document.getElementById("signupPopup");
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const openBtn = document.getElementById("openSignup");
  const closeBtn = document.getElementById("closePopup");

  const API_URL = "https://winlaos-register-bridge.onrender.com/register";
  const WA_NUMBER = "8562076355481";
  const clickSound = new Audio("sounds/click.mp3");
  let lastSubmitTime = 0;

  /* ✅ Toast แจ้งเตือน */
  function showToast(msg, type = "info") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 20);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  /* ✅ Popup Animation (Zoom-in) */
  if (popup && openBtn && closeBtn) {
    popup.classList.add("popup-hidden");

    openBtn.onclick = () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
  popup.classList.add("show");       // ✅ เพิ่มบรรทัดนี้
  popup.classList.remove("popup-hidden");
};

closeBtn.onclick = () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
  popup.classList.remove("show");    // ✅ เพิ่มบรรทัดนี้
  popup.classList.add("popup-hidden");
};


    window.onclick = (e) => {
      if (e.target === popup) {
        popup.classList.add("popup-hidden");
        setTimeout(() => (popup.style.display = "none"), 300);
      }
    };
  }

  /* ✅ โหลดค่าที่เคยกรอกจาก LocalStorage */
  ["fullname", "phone", "bankName", "bankNumber"].forEach((id) => {
    const saved = localStorage.getItem(id);
    if (saved) {
      const el = document.getElementById(id);
      if (el) el.value = saved;
    }
  });

  /* ✅ บันทึกอัตโนมัติเมื่อพิมพ์ */
  document
    .querySelectorAll("#fullname,#phone,#bankName,#bankNumber")
    .forEach((el) => {
      el.addEventListener("input", () =>
        localStorage.setItem(el.id, el.value)
      );
    });

  /* ✅ ตรวจสอบข้อมูลเบื้องต้น */
  function validateInput(phone, bankNumber) {
    if (!/^[0-9]{8,10}$/.test(phone)) {
      showToast("⚠️ ເບີໂທບໍ່ຖືກຕ້ອງ", "warn");
      return false;
    }
    if (!/^[0-9]{6,20}$/.test(bankNumber)) {
      showToast("⚠️ ເລກບັນຊີບໍ່ຖືກຕ້ອງ", "warn");
      return false;
    }
    return true;
  }

  /* ✅ Spinner Overlay */
  let spinner = document.getElementById("loadingOverlay");
  if (!spinner) {
    spinner = document.createElement("div");
    spinner.id = "loadingOverlay";
    spinner.innerHTML = `<div class="spinner"></div>`;
    document.body.appendChild(spinner);
    spinner.style.display = "none";
  }
  const showLoading = (show) => {
    spinner.style.display = show ? "flex" : "none";
  };

  /* ✅ ปุ่ม Next */
  const nextBtn = document.getElementById("nextStep");
  if (nextBtn) {
    nextBtn.onclick = () => {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});

      const fullname = document.getElementById("fullname").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const bank = document.getElementById("bankName").value.trim();
      const acc = document.getElementById("bankNumber").value.trim();
      const qr = document.getElementById("qrCustomer").files[0];

      if (!fullname || !phone || !bank || !acc || !qr) {
        showToast("⚠️ ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ", "warn");
        return;
      }
      if (!validateInput(phone, acc)) return;

      step1.classList.add("fade-out");
      setTimeout(() => {
        step1.classList.add("hidden");
        step2.classList.remove("hidden");
        step2.classList.add("fade-in");
        setTimeout(() => step2.classList.remove("fade-in"), 400);
      }, 250);
    };
  }

  /* ✅ แปลงรูปเป็น Base64 */
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  /* ✅ ปุ่มส่งข้อมูล */
  const submitBtn = document.getElementById("submitAll");
  if (submitBtn) {
    submitBtn.onclick = async () => {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});

      const now = Date.now();
      if (now - lastSubmitTime < 4000) {
        showToast("⏳ ກະລຸນາລໍຖ້າ 3 ວິນາທີ", "warn");
        return;
      }
      lastSubmitTime = now;
      submitBtn.disabled = true;

      const fullname = document.getElementById("fullname").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const bankName = document.getElementById("bankName").value.trim();
      const bankNumber = document.getElementById("bankNumber").value.trim();
      const qrFile = document.getElementById("qrCustomer").files[0];
      const slipFile = document.getElementById("slipUpload").files[0];

      if (!validateInput(phone, bankNumber)) {
        submitBtn.disabled = false;
        return;
      }
      if (!slipFile) {
        showToast("⚠️ ກະລຸນາອັບໂຫລດສະລິບຝາກເງິນ", "warn");
        submitBtn.disabled = false;
        return;
      }

      showLoading(true);
      try {
        const qrBase64 = qrFile ? await toBase64(qrFile) : "";
        const slipBase64 = slipFile ? await toBase64(slipFile) : "";
        const payload = {
          fullname,
          phone,
          bankName,
          bankNumber,
          qrCustomer: qrBase64,
          slipUpload: slipBase64,
        };

        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await res.json();
        showLoading(false);

        if (result.duplicate) {
          showToast("⚠️ ທ່ານມີຍູສແລ້ວ ຕິດຕໍ່ແອດມິນ", "warn");
          window.open(
            `https://wa.me/${WA_NUMBER}?text=ສະບາຍດີ ຂ້ອຍມີຍູສແລ້ວ ຕ້ອງການຕິດຕໍ່ແອດ`,
            "_blank"
          );
        } else if (result.success) {
          step2.classList.add("fade-out");
          setTimeout(() => {
            step2.classList.add("hidden");
            step3.classList.remove("hidden");
            step3.classList.add("fade-in");
            setTimeout(() => step3.classList.remove("fade-in"), 400);
          }, 300);

          const msg = encodeURIComponent(
            `ຮັບຍູສເຊີ້\n👤 ${fullname}\n📞 ${phone}\n🏦 ${bankName} - ${bankNumber}`
          );
          document.getElementById(
            "waLink"
          ).href = `https://wa.me/${WA_NUMBER}?text=${msg}`;
          showToast("✅ ສຳເລັດ! ຕິດຕໍ່ແອດມິນເພື່ອຮັບຍູສເຊີ້", "success");
        } else {
          showToast(
            "❌ ສົ່ງບໍ່ສຳເລັດ: " + (result.error || ""),
            "error"
          );
        }
      } catch (e) {
        showLoading(false);
        showToast("❌ ຜິດພາດ: " + e.message, "error");
      }

      submitBtn.disabled = false;
    };
  }
})();
/* ✅ Preview Slip + Change Button */
const slipInput = document.getElementById("slipUpload");
const chooseBtn = document.getElementById("chooseSlip");
const changeBtn = document.getElementById("changeSlip");
const slipPreviewWrap = document.getElementById("slipPreviewWrap");
const slipPreview = document.getElementById("slipPreview");

if (chooseBtn && slipInput) {
  chooseBtn.onclick = () => slipInput.click();
}

if (changeBtn) {
  changeBtn.onclick = () => slipInput.click();
}

if (slipInput) {
  slipInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      slipPreview.src = reader.result;
      slipPreviewWrap.classList.remove("hidden");
      chooseBtn.classList.add("hidden");
      changeBtn.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  });
}
