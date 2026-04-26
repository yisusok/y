import React from 'react';
import { AbsoluteFill, Video, Audio } from 'remotion';

export interface MyVideoProps {
  videoUrl: string;
  audioUrl: string;
  subtitulos: string;
}

export const MyComposition: React.FC<MyVideoProps> = ({ 
  videoUrl, 
  audioUrl, 
  subtitulos 
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      {/* Video de Kling - Asegúrate de que la URL sea directa al .mp4 */}
      <Video src={videoUrl} />
      
      {/* Audio de ElevenLabs */}
      <Audio src={audioUrl} />

      <div style={{
        position: 'absolute', 
        bottom: 100, 
        width: '100%', 
        textAlign: 'center', 
        fontSize: 70, 
        color: 'white',
        fontFamily: 'Arial',
        textShadow: '4px 4px 10px rgba(0,0,0,1)'
      }}>
        {subtitulos}
      </div>
    </AbsoluteFill>
  );
};