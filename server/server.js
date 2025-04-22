const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Route TTS (Text-to-Speech)
app.post("/api/tts", async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech",
      { inputs: text },
      { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}` } }
    );
    res.set("Content-Type", "audio/wav");
    res.send(response.data);
  } catch (error) {
    console.error("Erreur TTS:", error);
    res.status(500).json({ error: "Erreur de synthèse vocale" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
