import "./App.css";
import Reg from "./Pages/reg";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Ahomepage from "./Pages/Ahomepage";
import CreateQuery from "./Pages/CreateQuery";
import ForgotPass from "./Components/ForgotPass (1)";
import { APIProvider } from "./API/APIProvider";

// rafce

function App() {  
  return (
    <div className="background">
      <APIProvider>
        <Routes>
          <Route path="/reg" exact element={<Reg />} />
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Ahomepage admin={true} />} />
          <Route path="/createquery" element={<CreateQuery />} />
          <Route path="/allframes" element={<Ahomepage admin={false} />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
        </Routes>
      </APIProvider>
    </div>
  );
}

export default App;

