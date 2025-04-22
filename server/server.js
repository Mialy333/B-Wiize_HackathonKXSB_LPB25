const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

// 1. Initialise Express
const app = express();
const PORT = 3001;

// 2. Middlewares de base
app.use(express.json());
app.use(cors());

// 3. Route TTS
app.post("/api/tts", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    res.set("Content-Type", "audio/wav");
    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error("Erreur TTS:", error.response?.data || error.message);
    res.status(500).json({
      error: "Erreur de synthèse vocale",
      details: error.response?.data || error.message,
    });
  }
});

// 4. Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
