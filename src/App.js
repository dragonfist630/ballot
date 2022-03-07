import "./App.css";
import Nav from "./nav";
import Reg from "./reg";
import {Routes, Route} from "react-router-dom";
import Login from "./Login";
// import Login from "./Login";
// import Test from "./test";

// rafce

function App() {
  return (
    <div className="background">
      <Nav />
      <Routes>
      <Route path="/" element={<Reg/>}/>
      <Route path="/login" element={<Login/>}/>
      
      </Routes>
    </div>
  );
}

export default App;
