// src/Root.tsx
import { Composition, staticFile } from 'remotion'; // Importamos staticFile
import { MyComposition } from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MiVideoIA"
        component={MyComposition as React.FC<any>}
        durationInFrames={150} // 5 segundos a 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          // Apuntamos a los nombres de archivo que generan tus scripts
          videoUrl: staticFile("fondo_kling.mp4"),
          audioUrl: staticFile("voz_eleven.mp3"),
          subtitulos: "Este es el resultado de la integración local"
        }}
      />
    </>
  );
};