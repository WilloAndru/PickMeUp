import { useRef, useEffect } from "react";

interface CharacterCanvasProps {
  hairColor?: string;
  skinColor?: string;
  clothesColor?: string;
}

export const CharacterCanvas: React.FC<CharacterCanvasProps> = ({
  hairColor,
  skinColor,
  clothesColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bodyImg = new Image();
    const hairImg = new Image();
    const clothesImg = new Image();

    bodyImg.src = "/sprites/base.png";
    hairImg.src = "/sprites/hair.png";
    clothesImg.src = "/sprites/clothes.png";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(bodyImg, 0, 0);
      ctx.drawImage(hairImg, 0, 0);
      ctx.drawImage(clothesImg, 0, 0);
    };

    bodyImg.onload = draw;
    hairImg.onload = draw;
    clothesImg.onload = draw;
  }, [hairColor, skinColor, clothesColor]);

  return <canvas ref={canvasRef} width={64} height={64} />;
};
