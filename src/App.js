import "./App.css";
import Home from "./component/Home/Home";
import Sidebar from "./component/Layout/Sidebar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddScenario from "./component/Scenario/AddScenario";
import AllScenario from "./component/Scenario/AllScenario";
import AddVehicle from "./component/Home/AddVehicle";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="Home" element={<Home />}></Route>
          <Route path="Add_scenario" element={<AddScenario />}></Route>
          <Route path="updateScenario" element={<AddScenario />}></Route>
          <Route path="All_scenario" element={<AllScenario />}></Route>
          <Route path="Add_vehicle" element={<AddVehicle />}></Route>
          <Route path="updateVehicles" element={<AddVehicle />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
