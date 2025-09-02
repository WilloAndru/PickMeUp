import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./interfaces/Home";
import Tower from "./interfaces/Tower";
import Gacha from "./interfaces/Gacha";
import Characters from "./interfaces/Characters";
import TeamComposition from "./interfaces/TeamComposition";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Tower />} path="/tower" />
        <Route element={<Gacha />} path="/gacha" />
        <Route element={<Characters />} path="/characters" />
        <Route element={<TeamComposition />} path="/teamComposition/:level" />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
