import { useState, useEffect } from "react";

export function VoiceAssistant() {
  const [audioUrl, setAudioUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  // Initialise la reconnaissance vocale
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("SpeechRecognition non supporté");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.error("Erreur:", event.error);
    };

    if (listening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [listening]);

  const handleTTS = async () => {
    if (!transcript) return;
    try {
      const response = await fetch("http://localhost:3001/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript }),
      });
      const audioBlob = await response.blob();
      setAudioUrl(URL.createObjectURL(audioBlob));
    } catch (error) {
      console.error("Erreur TTS:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <button
        onClick={() => setListening(!listening)}
        className={`px-4 py-2 ${
          listening ? "bg-red-500" : "bg-blue-500"
        } text-white rounded`}
      >
        {listening ? "Arrêter" : "Parler"}
      </button>
      <p className="mt-2">{transcript}</p>
      <button
        onClick={handleTTS}
        disabled={!transcript}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
      >
        Lire la réponse
      </button>
      {audioUrl && <audio src={audioUrl} controls className="mt-4" />}
    </div>
  );
}
