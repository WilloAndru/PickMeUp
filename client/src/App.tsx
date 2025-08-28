import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lobby from "./interfaces/Lobby";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Lobby />} path="/" />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
