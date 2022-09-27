import "./App.css";
import MainComponent from "./components/MainComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleCard from "./components/SingleCard";
import { useSelector } from "react-redux";
import OnlyAudio from "./components/OnlyAudio";

function App() {
  const Results = useSelector((state) => state.allResults.results);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainComponent />}></Route>
        <Route path="/cardclick" element={<SingleCard props={Results} />} />
        <Route path="/AudioPlayer" element={<OnlyAudio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
