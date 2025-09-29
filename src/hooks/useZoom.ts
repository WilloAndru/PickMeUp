import { useState, useEffect, useRef } from "react";

export function useZoom(initialZoom = 1, minZoom = 1, maxZoom = 4) {
  const [zoom, setZoom] = useState(initialZoom);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();

    const scaleFactor = 1.2; // factor de zoom por paso de rueda
    let newZoom = zoom;

    if (event.deltaY < 0) {
      // acercar
      newZoom = zoom * scaleFactor;
    } else {
      // alejar
      newZoom = zoom / scaleFactor;
    }

    // Limitar entre minZoom y maxZoom
    newZoom = Math.min(maxZoom, Math.max(minZoom, newZoom));

    setZoom(newZoom);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [zoom]);

  return { zoom, containerRef };
}
