const { ElevenLabsClient } = require("elevenlabs");
const fs = require("fs");
const path = require("path");

const client = new ElevenLabsClient({ apiKey: "TU_API_KEY" });

// Quitamos la ejecución inmediata y lo hacemos una función exportable
async function generarAudio(texto) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("🎙️ ElevenLabs: Iniciando generación...");
      const audio = await client.generate({
        voice: "Rachel",
        model_id: "eleven_multilingual_v2",
        text: texto,
      });

      const fileName = "voz_eleven.mp3";
      const outputPath = path.join(__dirname, "public", fileName);
      const fileStream = fs.createWriteStream(outputPath);

      audio.pipe(fileStream);
      fileStream.on("finish", () => {
        console.log("✅ ElevenLabs: Audio guardado.");
        resolve(fileName);
      });
      fileStream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
}

// ESTO ES LO MÁS IMPORTANTE:
module.exports = { generarAudio };