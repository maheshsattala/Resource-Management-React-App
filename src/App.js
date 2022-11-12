import { Route, Routes } from "react-router-dom";
import AddResource from "./components/AddResource";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/resource/add" element={<AddResource />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
