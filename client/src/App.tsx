import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./interfaces/Home";
import Tower from "./interfaces/Tower";
import Gacha from "./interfaces/Gacha";
import Characters from "./interfaces/Characters";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Tower />} path="/tower" />
        <Route element={<Gacha />} path="/gacha" />
        <Route element={<Characters />} path="/characters" />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
