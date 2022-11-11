import { Route, Routes } from "react-router-dom";
import AddResource from "./components/AddResource";
import Home from "./components/Home";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/resource/add" element={<AddResource />} />
      </Routes>
    </div>
  );
}

export default App;
