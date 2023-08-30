import { createContext } from "react";
// localStorage Data
import useLocalStorage from "../hook/useLocalStorage";

const initialState = [];
export const StateContext = createContext(initialState);

export const StateProvider = ({ children }) => {
  const [scenario, setScenario] = useLocalStorage("scenario", []);

  const addToLocal = (data) => {
    setScenario((prevState) => [...prevState, data]);
  };

  const removeAll = () => {
    setScenario([]);
  };

  const removeOneItem = (id) => {
    setScenario((prevState) => prevState.filter((s) => s.s_id !== id));
  };

  const editItem = (data) => {
    setScenario((prevState) =>
      prevState.map((e) =>
        e.s_id === data.s_id
          ? {
              ...e,
              s_id: Math.random(),
              s_name: data.s_name,
              s_num: data.s_num,
            }
          : e
      )
    );
  };

  const updatedValue = {
    scenarios: scenario,
    addToLocal: addToLocal,
    removeAll: removeAll,
    removeOneItem: removeOneItem,
    editItem: editItem,
  };

  return (
    <StateContext.Provider value={updatedValue}>
      {children}
    </StateContext.Provider>
  );
};
