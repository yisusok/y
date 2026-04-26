const { generarAudio } = require('./generar-voz');
const { generarVideo } = require('./generar-video');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function start() {
  try {
    await Promise.all([
      generarAudio("Contenido para mi canal"),
      generarVideo("Un timelapse de una ciudad")
    ]);

    console.log("🚀 Ambos assets listos. Renderizando...");
    await execPromise("npx remotion render src/index.tsx MiVideoIA out.mp4");
    console.log("✨ Proceso terminado con éxito.");
  } catch (e) {
    console.error("💀 Falló el pipeline:", e);
  }
}

start();