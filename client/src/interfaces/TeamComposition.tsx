import { Navigate, useParams } from "react-router-dom";

function TeamComposition() {
  const lastClearedLevel = JSON.parse(
    localStorage.getItem("lastClearedLevel") || "1"
  );

  const { level } = useParams();
  let allowedLevels = [];
  for (let i = 1; i <= lastClearedLevel; i++) {
    allowedLevels.push(i);
  }
  const isAllowed = allowedLevels.includes(Number(level));
  if (!isAllowed) {
    return <Navigate to="/tower" replace />;
  }

  return <div>TeamComposition</div>;
}

export default TeamComposition;
