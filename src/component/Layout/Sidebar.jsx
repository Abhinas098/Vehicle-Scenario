import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <li className="sidebar__tab">
          <Link to="/Home">Home</Link>
        </li>

        <li className="sidebar__tab">
          <Link to="/Add_scenario">Add Scenario</Link>
        </li>

        <li className="sidebar__tab">
          <Link to="/All_scenario">All Scenarios</Link>
        </li>

        <li className="sidebar__tab">
          <Link to="/Add_vehicle">Add Vehicle</Link>
        </li>
      </div>
    </>
  );
};

export default Sidebar;
