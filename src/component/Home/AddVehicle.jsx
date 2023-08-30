import React, { useContext, useState } from "react";
import { StateContext } from "../../store/ScenarioProvider";
import { VehicleContext } from "../../store/VehicleProvider";
import { useLocation, useNavigate } from "react-router-dom";

const AddVehicle = () => {
  const { scenarios } = useContext(StateContext);
  const { addVehicle, editItem } = useContext(VehicleContext);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { state } = location || { state: "none" };

  const initState = {
    ScenarioList: "",
    VehicleName: "",
    Speed: null,
    PositionX: null,
    PositionY: null,
    Direction: "",
  };
  const [data, setData] = useState(initState);

  // Set data on every Keystroke
  const onChangeData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // On New Added Vehicle
  const submitHandler = (e) => {
    e.preventDefault();
    addVehicle({ ...data, id: Math.random() });
    navigate("/Home");
  };

  // Update Existing Vehicle
  const updateHandler = (e) => {
    e.preventDefault();
    editItem({ ...data, id: state.id, ScenarioList: state.scenario });
    navigate("/Home");
  };

  // Onclick clear input field.
  const resetHandler = () => {
    setData("");
  };

  return (
    <form
      onSubmit={path === "/updateVehicles" ? updateHandler : submitHandler}
      className="add__vehicle"
    >
      {path === "/updateVehicles" ? (
        <h2>Update Vehicle</h2>
      ) : (
        <h2>Add Vehicle</h2>
      )}
      <div className="Card">
        <div className="card">
          <div>
            <label>Scenario List</label>

            <select
              name="ScenarioList"
              id="cars"
              required
              onChange={(e) => onChangeData(e)}
            >
              {path !== "/updateVehicles" ? (
                <>
                  <option value="">Select Scenario</option>
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
                </>
              ) : (
                <>
                  <option value={JSON.parse(state.scenario).name}>
                    {JSON.parse(state.scenario).name}
                  </option>
                </>
              )}
            </select>
          </div>
          <div>
            <label>Vehicle Name</label>
            <input
              type="text"
              placeholder="10"
              required
              onChange={(e) => onChangeData(e)}
              name="VehicleName"
            />
          </div>

          <div>
            <label> Speed </label>
            <input
              type="number"
              placeholder="10"
              required
              min={1}
              onChange={(e) => onChangeData(e)}
              name="Speed"
            />
          </div>
        </div>

        <div className="card">
          <div>
            <label>Position X</label>
            <input
              type="number"
              required
              onChange={(e) => onChangeData(e)}
              name="PositionX"
              min={1}
              max={250}
              placeholder="Max 250"
            />
          </div>

          <div>
            <label>Position Y</label>
            <input
              type="number"
              required
              onChange={(e) => onChangeData(e)}
              name="PositionY"
              min={1}
              max={140}
              placeholder="Max 140"
            />
          </div>
          <div>
            <label>Direction</label>
            <select
              name="Direction"
              id="direction"
              required
              onChange={(e) => onChangeData(e)}
            >
              <option value="">Select Direction</option>
              <option value="Towards">Towards</option>
              <option value="Backward">Backward</option>
              <option value="Upwards">Upwards</option>
              <option value="Downwards">Downwards</option>
            </select>
          </div>
        </div>
      </div>

      <div className="addScenario__btn">
        {path === "/updateVehicles" ? (
          <button type="submit">Update</button>
        ) : (
          <button type="submit">Add</button>
        )}
        <button onClick={resetHandler} type="reset">
          Reset
        </button>
        <button
          onClick={() => {
            path !== "/updateVehicles"
              ? navigate("/All_scenario")
              : navigate("/Home");
          }}
          type="button"
        >
          Go back
        </button>
      </div>
    </form>
  );
};

export default AddVehicle;
