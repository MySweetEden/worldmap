import { BrowserRouter, Routes, Route } from "react-router-dom";
import Worldmap from "./components/Worldmap";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Worldmap />} />
        <Route path="/:params" element={<Worldmap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;