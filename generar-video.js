const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Reemplaza con tus credenciales de Kling o el proxy que uses
const API_KEY = "TU_API_KEY_AQUÍ";

async function generarVideo(prompt) {
  try {
    console.log("⏳ Solicitando video a Kling...");

    // 1. Iniciar la tarea (POST)
    // Nota: La URL exacta depende de si usas el portal global o un partner
    const response = await axios.post('https://api.klingai.com/v1/videos/text2video', {
      prompt: prompt,
      model_name: "kling-v1",
      duration: "5"
    }, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });

    const taskId = response.data.data.task_id;
    console.log(`✅ Tarea creada: ${taskId}. Esperando procesamiento...`);

    // 2. Polling (Consultar hasta que esté listo)
    let videoUrl = null;
    while (!videoUrl) {
      const statusRes = await axios.get(`https://api.klingai.com/v1/videos/tasks/${taskId}`, {
        headers: { 'Authorization': `Bearer ${API_KEY}` }
      });

      const status = statusRes.data.data.task_status;
      if (status === 'SUCCEEDED') {
        videoUrl = statusRes.data.data.task_result.videos[0].url;
      } else if (status === 'FAILED') {
        throw new Error("La generación de video falló");
      } else {
        console.log("... el video se está procesando...");
        await new Promise(resolve => setTimeout(resolve, 10000)); // Esperar 10s
      }
    }

    // 3. Descargar el video a /public
    console.log("📥 Descargando video generado...");
    const outputPath = path.join(__dirname, "public", "fondo_kling.mp4");
    const writer = fs.createWriteStream(outputPath);
    
    const videoStream = await axios.get(videoUrl, { responseType: 'stream' });
    videoStream.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log("✅ Video guardado en: /public/fondo_kling.mp4");
        resolve();
      });
      writer.on('error', reject);
    });

  } catch (error) {
    console.error("❌ Error con Kling:", error.response?.data || error.message);
  }
}

generarVideo("Un programador trabajando en un entorno futurista, luces led azules, estilo cinematográfico"); //propmt generado por nexos