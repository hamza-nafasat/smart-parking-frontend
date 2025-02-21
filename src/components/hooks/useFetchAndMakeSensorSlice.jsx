import { useCallback, useEffect } from "react";
import { useGetAllSensorsQuery } from "../../redux/apis/sensorApis";
import { useDispatch } from "react-redux";
import { addAllSensors, addAvailableSensors } from "../../redux/slices/sensorSlice";

const useFetchAndMakeSensorSlice = () => {
  const dispatch = useDispatch();
  const { data: sensors, refetch } = useGetAllSensorsQuery();
  // Refetch function
  const refetchHook = useCallback(() => refetch(), [refetch]);
  useEffect(() => {
    if (!sensors?.data) return; // Prevent unnecessary execution
    dispatch(addAllSensors(sensors.data));
    const availableSensors = sensors.data.filter((sensor) => !sensor.isConnected);
    dispatch(addAvailableSensors(availableSensors));
  }, [sensors?.data, dispatch]);

  return { refetchHook };
};

export default useFetchAndMakeSensorSlice;
