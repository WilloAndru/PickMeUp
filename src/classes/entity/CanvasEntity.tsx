import { useRef, useEffect } from "react";

type CanvasEntityProps = {
  character: {
    colors: string[];
    [key: string]: string | number | boolean | string[];
  };
  scale?: number;
};

export const CanvasEntity = ({ character, scale = 1 }: CanvasEntityProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Aplicamos referencia al canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Generamos canvas
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Lista de las imagenes del cuerpo
    const images = [
      `${import.meta.env.BASE_URL}black.png`,
      `${import.meta.env.BASE_URL}white.png`,
      `${import.meta.env.BASE_URL}gray.png`,
      `${import.meta.env.BASE_URL}skin.png`,
      `${import.meta.env.BASE_URL}skin-dark.png`,
      `${import.meta.env.BASE_URL}iris.png`,
      `${import.meta.env.BASE_URL}iris-dark.png`,
      `${import.meta.env.BASE_URL}clothe.png`,
      `${import.meta.env.BASE_URL}clothe-dark.png`,
      `${import.meta.env.BASE_URL}hair-light.png`,
      `${import.meta.env.BASE_URL}hair.png`,
      `${import.meta.env.BASE_URL}hair-dark.png`,
    ];

    // Variables temporales
    const loadedImages: HTMLImageElement[] = [];
    let loaded = 0;

    // Generamos cada imagen
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "anonymous";

      img.onload = () => {
        loadedImages[index] = img;
        loaded++;

        // Establecemos escalado de la imagen
        canvas.width = loadedImages[0].width * scale;
        canvas.height = loadedImages[0].height * scale;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        loadedImages.forEach((img, i) => {
          // Generamos canvas temporal de cada parte para evitar el bug del mismo color para todo
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = img.width * scale;
          tempCanvas.height = img.height * scale;
          const tempCtx = tempCanvas.getContext("2d")!;

          // Hacemos la imagen nítida y la dibujamos
          tempCtx.imageSmoothingEnabled = false;
          tempCtx.drawImage(img, 0, 0, img.width * scale, img.height * scale);

          // Solo aplicamos color si es color aleatorio
          if (i > 2) {
            tempCtx.globalCompositeOperation = "source-atop";
            tempCtx.fillStyle = character.colors[i - 3];
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

            // Reseteamos el modo de composición
            tempCtx.globalCompositeOperation = "source-over";
          }

          // Dibujamos el resultado final de la parte en el canvas principal
          ctx.drawImage(tempCanvas, 0, 0);
        });
      };
    });
  }, []);

  return <canvas ref={canvasRef} />;
};
