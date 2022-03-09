import "./App.css";
import Reg from "./reg";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Ahomepage from "./Ahomepage";
// import Login from "./Login";
// import Test from "./test";

// rafce

function App() {
  return (
    <div className="background">
      <Routes>
        <Route path="/" element={<Reg />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Ahomepage/>} />
      </Routes>
    </div>
  );
}

export default App;
