/******************************************************
 🌉 Winlaos Register Bridge (Permanent CORS Bypass)
 Version: 1.0
-------------------------------------------------------
 ✅ ใช้ Node.js สร้าง Proxy ส่งต่อข้อมูลไป Google Script
 ✅ รองรับ JSON / File Upload
 ✅ ปลอดภัยจาก CORS ถาวร
******************************************************/

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 8080;

// URL ของ Google Script (อันจริงที่ใช้อยู่)
const TARGET_URL = "https://script.google.com/macros/s/AKfycbwobt8KmY4r9vAyX1WBQnbdhmTmCyS8a2xHc-IFDkuW5UoZSylxZF9qrlipzLrMB_KY/exec";

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Route หลัก
app.post("/register", async (req, res) => {
  try {
    const response = await fetch(TARGET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.text();
    res.set("Access-Control-Allow-Origin", "*");
    res.type("json").send(data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ทดสอบดูว่าเซิร์ฟเวอร์ Bridge ทำงานอยู่ไหม
app.get("/", (req, res) => {
  res.send("✅ Winlaos Register Bridge Active");
});

// เริ่มรัน
app.listen(PORT, () => console.log(`🚀 Bridge running on port ${PORT}`));
