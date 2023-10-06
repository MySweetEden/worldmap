import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Worldmap from './components/Worldmap_old';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Worldmap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;