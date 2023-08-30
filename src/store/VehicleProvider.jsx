import { createContext } from "react";
import useLocalStorage from "../hook/useLocalStorage";

const initValue = [];
export const VehicleContext = createContext(initValue);

const VehicleProvider = ({ children }) => {
  const [vehicle, setVehicle] = useLocalStorage("vehicle", []);

  const addVehicle = (data) => {
    setVehicle((prevState) => [...prevState, data]);
  };

  const removeVehicle = (id) => {
    setVehicle((prevState) => prevState.filter((s) => s.id !== id));
  };

  const removeAllVehicle = () => {
    setVehicle([]);
  };

  const editItem = (task) => {
    setVehicle((prevState) =>
      prevState.map((t) =>
        t.id === task.id
          ? {
              ...t,
              id: Math.random(),
              Direction: task.Direction,
              PositionX: task.PositionX,
              PositionY: task.PositionY,
              ScenarioList: task.ScenarioList,
              Speed: task.Speed,
              VehicleName: task.VehicleName,
            }
          : t
      )
    );
  };

  const updatedValue = {
    vehicles: vehicle,
    addVehicle: addVehicle,
    removeVehicle: removeVehicle,
    editItem: editItem,
    removeAllVehicle: removeAllVehicle,
  };

  return (
    <VehicleContext.Provider value={updatedValue}>
      {children}
    </VehicleContext.Provider>
  );
};

export default VehicleProvider;
