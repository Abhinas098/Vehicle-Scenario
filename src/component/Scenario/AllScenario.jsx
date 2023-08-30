import React, { useContext } from "react";

// Material-Icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useNavigate } from "react-router-dom";

import { StateContext } from "../../store/ScenarioProvider";
import { VehicleContext } from "../../store/VehicleProvider";

const AllScenario = () => {
  const { scenarios, removeAll, removeOneItem } = useContext(StateContext);
  const { vehicles, removeAllVehicle } = useContext(VehicleContext);

  const history = useNavigate();

  // remove all items
  const deleteHandler = () => {
    removeAll();
    removeAllVehicle();
  };

  // delete one item
  const deleteOne = (id) => {
    removeOneItem(id);
  };

  // edit item
  const editHandler = (id) => {
    history("/updateScenario", { state: id });
  };

  return (
    <div className="all__scenario">
      <div className="allScenario__head">
        <div className="h2">
          <h2>All Scenario</h2>
        </div>

        <div className="allScenario__btn">
          <button onClick={() => history("/Add_scenario")}>New Scenario</button>
          <button onClick={() => history("/Add_vehicle")}>Add Vehicle</button>
          <button onClick={deleteHandler}>Delete All</button>
        </div>
      </div>
      {scenarios.length !== 0 ? (
        <div className="allScenario__table">
          <table>
            <thead>
              <tr>
                <th scope="col">Scenario Id</th>
                <th scope="col">Scenario Name</th>
                <th scope="col">Scenario Time</th>
                <th scope="col">Number of Vehicle</th>
                <th scope="col">Add Vehicle</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((scenario, i) => (
                <tr key={i}>
                  <td data-label="Scenario Id">{i}</td>
                  <td data-label="Scenario Name">{scenario.s_name}</td>
                  <td data-label="Scenario Time">{scenario.s_num} s</td>
                  <td data-label="Number of Vehicle">
                    {vehicles &&
                      vehicles.filter(
                        (vehicle) =>
                          vehicle.ScenarioList &&
                          JSON.parse(vehicle.ScenarioList).id === scenario.s_id
                      ).length}
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    data-label="Add Vehicle"
                    onClick={() => history("/Add_vehicle")}
                  >
                    <AddCircleIcon />
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    data-label="Edit"
                    onClick={() => editHandler(scenario.s_id)}
                  >
                    <ModeEditIcon />
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteOne(scenario.s_id)}
                    data-label="Delete"
                  >
                    <DeleteForeverIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <p>Please Add minimum one Scenario</p>
        </>
      )}
    </div>
  );
};

export default AllScenario;
