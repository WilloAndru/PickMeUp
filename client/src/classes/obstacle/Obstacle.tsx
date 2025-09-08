import React from "react";

type ObstacleProps = {
  image: string;
  x: number;
  y: number;
  size?: number;
};

function Obstacle({ image, x, y, size }: ObstacleProps) {
  return (
    <div
      className="absolute"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        transform: "translateY(-100%)",
        width: size,
      }}
    >
      <img src={`/Obstacles/${image}`} alt="Obstacle" />
    </div>
  );
}

export default React.memo(Obstacle);
