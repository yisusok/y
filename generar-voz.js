const { ElevenLabsClient } = require("elevenlabs");
const fs = require("fs");
const path = require("path");

// Reemplaza con tu API Key real
const client = new ElevenLabsClient({
  apiKey: "TU_API_KEY_AQUÍ", 
});

async function generarAudio(texto) {
  try {
    console.log("⏳ Generando audio en ElevenLabs...");
    
    const audio = await client.generate({
      voice: "Rachel", // Puedes cambiar el ID de la voz
      model_id: "eleven_multilingual_v2",
      text: texto,
    });

    // Guardamos directamente en la carpeta public de Remotion
    const fileName = "voz_eleven.mp3";
    const outputPath = path.join(__dirname, "public", fileName);
    const fileStream = fs.createWriteStream(outputPath);

    audio.pipe(fileStream);

    return new Promise((resolve, reject) => {
      fileStream.on("finish", () => {
        console.log(`✅ Audio guardado en: /public/${fileName}`);
        resolve(fileName);
      });
      fileStream.on("error", reject);
    });
  } catch (error) {
    console.error("❌ Error generando audio:", error);
  }
}

// Ejecución de prueba
generarAudio("Hola, este es un audio generado localmente para mi proyecto de Remotion."); //aca deberia ir el promp generado por nexos