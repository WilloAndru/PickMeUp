import { Navigate } from "react-router-dom";

export const restrictLevelsByURL = (level: number, redirectURL: string) => {
  const lastClearedLevel = JSON.parse(
    localStorage.getItem("lastClearedLevel") || "1"
  );

  const allowedLevels = Array.from(
    { length: lastClearedLevel },
    (_, i) => i + 1
  );

  const isAllowed = allowedLevels.includes(Number(level));

  if (!isAllowed) {
    return <Navigate to={`/${redirectURL}`} replace />;
  }

  return null;
};
