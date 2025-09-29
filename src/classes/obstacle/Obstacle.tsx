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
      <img src={`${import.meta.env.BASE_URL}${image}`} alt="Obstacle" />
    </div>
  );
}

export default Obstacle;
