import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import cors from "cors";
import FormData from "form-data";

const app = express();
app.use(cors());
const upload = multer();

const HF_URL = "https://duoclc-khogiaychecklc.hf.space/run/predict";

app.post("/check", upload.single("file"), async (req, res) => {
  try {
    const form = new FormData();
    form.append("data", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const hfRes = await fetch(HF_URL, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });

    const result = await hfRes.json();
    res.json(result);
  } catch (err) {
    console.error("🔥 Lỗi proxy:", err);
    res.status(500).json({ error: "Lỗi proxy server khi gọi AI" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server đang chạy tại http://localhost:3000/check");
});
