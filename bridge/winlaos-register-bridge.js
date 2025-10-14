/******************************************************
 🌉 Winlaos Register Bridge (Permanent CORS Bypass)
 Version: 1.1 — Fixed for Express 5.x
******************************************************/

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 8080;

// ใช้ environment variable จาก Render ถ้ามี
const TARGET_URL =
  process.env.TARGET_URL ||
  "https://script.google.com/macros/s/AKfycbwobt8KmY4r9vAyX1WBQnbdhmTmCyS8a2xHc-IFDkuW5UoZSylxZF9qrlipzLrMB_KY/exec";

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ✅ Route หลัก — สมัครสมาชิก
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
    console.error("❌ Error in /register:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ ตรวจสุขภาพเซิร์ฟเวอร์
app.get("/", (req, res) => {
  res.send("✅ Winlaos Register Bridge Active");
});

// ✅ Route fallback (Express 5-compatible)
app.use((req, res) => {
  res.status(404).send("Not found");
});

// ✅ Start server
app.listen(PORT, () =>
  console.log(`🚀 Bridge running on port ${PORT}`)
);
