import React, { useContext, useState } from "react";
import { StateContext } from "../../store/ScenarioProvider";

import { useLocation, useNavigate } from "react-router-dom";

const AddScenario = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname;
  const { state } = location || { state: "none" };

  const { addToLocal, editItem } = useContext(StateContext);

  // Newly Add Scenario
  const submitHandler = (e) => {
    e.preventDefault();
    const newObj = {
      s_id: Math.random(),
      s_name: name,
      s_num: number,
    };
    addToLocal(newObj);
    navigate("/All_scenario");
  };

  // Update Existing Scenario
  const updateHandler = (e) => {
    e.preventDefault();
    const newObj = {
      s_id: state,
      s_name: name,
      s_num: number,
    };
    editItem(newObj);
    navigate("/All_scenario");
  };

  // Clear input field onclick
  const resetHandler = () => {
    setName("");
    setNumber("");
  };

  return (
    <form
      onSubmit={path === "/updateScenario" ? updateHandler : submitHandler}
      className="add__scenario"
    >
      {path === "/updateScenario" ? (
        <h2>Update Scenario</h2>
      ) : (
        <h2>Add Scenario</h2>
      )}
      <div className="Card">
        <div className="addScenario__data">
          <div>
            <label>Scenario Name</label>
            <input
              type="text"
              placeholder="Text Scenario"
              required
              value={name}
              onInput={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Scenario Time (seconds)</label>
            <input
              type="number"
              value={number}
              onInput={(e) => setNumber(e.target.value)}
              placeholder="10"
              required
              min={0}
            />
          </div>
        </div>
      </div>
      <div className="addScenario__btn">
        {path === "/updateScenario" ? (
          <button type="submit">Update</button>
        ) : (
          <button type="submit">Add</button>
        )}
        <button onClick={resetHandler} type="reset">
          Reset
        </button>
        <button
          onClick={() => {
            path !== "/updateScenario"
              ? navigate("/Home")
              : navigate("/All_scenario");
          }}
          type="button"
        >
          Go back
        </button>
      </div>
    </form>
  );
};

export default AddScenario;
