// winlaos-register-bridge.js
/* Winlaos Register Bridge - improved */
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

// แนะนำ: เก็บ URL ของ Google Apps Script ใน environment variable
const TARGET_URL = process.env.TARGET_URL || "https://script.google.com/macros/s/AKfy.../exec";

// Middleware
app.use(cors()); // อนุญาต CORS สำหรับทุกโดเมน (ถ้าต้องการจำกัด ให้ตั้งเป็น origin เฉพาะ)
app.use(express.json({ limit: "15mb" })); // รองรับ payload ใหญ่ ๆ (base64 รูป)
app.use(express.urlencoded({ extended: true, limit: "15mb" })); // ถ้าใครส่ง form data แบบ urlencoded

// ตอบ OPTIONS สำหรับ preflight (ปกติ cors() จัดให้ แต่เก็บไว้แน่นอน)
app.options("*", cors());

// Health check
app.get("/", (req, res) => {
  res.type("text").send("✅ Winlaos Register Bridge Active");
});

// Main proxy route
app.post("/register", async (req, res) => {
  try {
    // ถ้าต้องการ ดู payload ใน logs ชั่วคราว uncomment ข้างล่าง (อย่าเปิดใน production มาก)
    // console.log("Payload:", JSON.stringify(req.body).slice(0,3000));

    // ส่งต่อไป Google Apps Script (POST JSON)
    const forwardResp = await fetch(TARGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const text = await forwardResp.text();

    // ถ้า target ส่ง JSON กลับมา ให้แปลงกลับเป็น JSON ก่อนส่ง
    try {
      const parsed = JSON.parse(text);
      // preserve status code จาก target ถ้าต้องการ:
      res.status(forwardResp.status).json(parsed);
    } catch (e) {
      // ไม่ใช่ JSON — ส่งเป็น text (หรือเป็น JSON field)
      res.status(forwardResp.status).json({ success: true, data: text });
    }
  } catch (err) {
    console.error("Bridge Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start
app.listen(PORT, () => console.log(`🚀 Bridge running on port ${PORT}`));
