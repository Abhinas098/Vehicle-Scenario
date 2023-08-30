import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../store/ScenarioProvider";
import { VehicleContext } from "../../store/VehicleProvider";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const { scenarios } = useContext(StateContext);
  const { vehicles, removeVehicle } = useContext(VehicleContext);

  const [obj, setObj] = useState();

  const init = JSON.stringify({ id: null });
  const [scenario, setScenario] = useState(init);
  const [moving, setMoving] = useState(false);

  // Move Vehicle Onclick
  const startMove = () => {
    setMoving(true);
  };
  const stopMove = () => {
    setMoving(false);
  };

  // get Data  to render in UI
  const { id } = scenario && JSON.parse(scenario);

  useEffect(() => {
    let arr = [];
    vehicles.map((v, i) => {
      if (v.ScenarioList && JSON.parse(v.ScenarioList).id === id) {
        arr.push({
          id: v.id,
          VehicleId: i,
          ScenarioList: v.ScenarioList,
          VehicleName: v.VehicleName,
          PositionX: v.PositionX,
          PositionY: v.PositionY,
          Speed: v.Speed,
          Direction: v.Direction,
        });
      }
      return arr;
    });
    setObj(arr);
  }, [id, vehicles]);

  // Delete vehicle Onclick
  const deleteVehicle = (id) => {
    removeVehicle(id);
  };

  // Edit Vehicle
  const editVehicleHandler = (id, scenario) => {
    navigate("/updateVehicles", { state: { id, scenario } });
  };

  return (
    <div className="home">
      <div className="home__header">
        <label>Scenario List</label>
        <select
          name="ScenarioList"
          id="cars"
          onChange={(e) => setScenario(e.target.value)}
        >
          <option value={init}>Select Scenario</option>
          {scenarios.map((scenario, i) => (
            <option
              key={i}
              value={JSON.stringify({
                name: scenario.s_name,
                id: scenario.s_id,
              })}
            >
              {scenario.s_name}{" "}
            </option>
          ))}
        </select>
      </div>
      <div className="home__table">
        {obj !== null && obj !== undefined && obj.length !== 0 && (
          <table>
            <thead>
              <tr>
                <th scope="col">Vehicle Id</th>
                <th scope="col">Vehicle Name</th>
                <th scope="col">Position X</th>
                <th scope="col">Position Y</th>
                <th scope="col">Speed</th>
                <th scope="col">Direction</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>

            <tbody>
              {obj.map((v, i) => (
                <tr key={i}>
                  <td data-label="Vehicle Id">{i}</td>
                  <td data-label="Vehicle Name">{v.VehicleName}</td>
                  <td data-label="Position X">{v.PositionX}</td>
                  <td data-label="Position Y">{v.PositionY}</td>
                  <td data-label="Speed">{v.Speed}</td>
                  <td data-label="Direction">{v.Direction}</td>
                  <td
                    style={{ cursor: "pointer" }}
                    data-label="Edit"
                    onClick={() => editVehicleHandler(v.id, v.ScenarioList)}
                  >
                    <ModeEditIcon />
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteVehicle(v.id)}
                    data-label="Delete"
                  >
                    <DeleteForeverIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="home__buttons">
        <button onClick={startMove}>Start Simulation</button>
        <button onClick={stopMove}>Stop Simulation</button>
      </div>
      <div className="graph">
        {obj !== null && obj !== undefined && obj.length !== 0 && (
          <>
            {obj.map((v, i) => (
              <>
                {moving ? (
                  <div
                    className="moving__vehicles"
                    style={{
                      animation: `${v.Direction} ${v.Speed}s infinite`,
                      translate: `${+v.PositionX}px ${+v.PositionY}px`,
                    }}
                  >
                    {i}
                  </div>
                ) : (
                  <>
                    <div
                      key={i}
                      className="moving__vehicles"
                      style={{
                        translate: `${+v.PositionX}px ${+v.PositionY}px`,
                      }}
                    >
                      {i}
                    </div>
                  </>
                )}
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
