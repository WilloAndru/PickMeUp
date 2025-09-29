import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./interfaces/Home";
import Tower from "./interfaces/Tower";
import Gacha from "./interfaces/Gacha";
import Characters from "./interfaces/Characters";
import TeamComposition from "./interfaces/TeamComposition";
import Battlefield from "./interfaces/Battlefield";
import ResultsGacha from "./interfaces/ResultsGacha";
import DetailsCharacter from "./interfaces/DetailsCharacter";
import { EntitiesProvider } from "./context/Context";

const App = () => {
  return (
    <EntitiesProvider>
      <BrowserRouter basename="/PickMeUp">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Tower />} path="/tower" />
          <Route element={<Gacha />} path="/gacha" />
          <Route element={<Characters />} path="/characters" />
          <Route element={<TeamComposition />} path="/teamComposition/:level" />
          <Route element={<Battlefield />} path="/battlefield/:level" />
          <Route element={<ResultsGacha />} path="/resultsGacha" />
          <Route element={<DetailsCharacter />} path="/detailsCharacter/:id" />
        </Routes>
      </BrowserRouter>
    </EntitiesProvider>
  );
};
export default App;
