import "./App.css";
import Nav from "./nav";
import Reg from "./reg";
// import Login from "./Login";
// import Test from "./test";

// rafce

function App() {
  return (
    <div className="background">
      <Nav />
      <div  className="container_wrap">
      <Reg />
      {/* <Login/> */}
      </div>
    </div>
  );
}

export default App;
