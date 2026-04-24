export const createBuildingOptions = (buildings) => {
  return (buildings || []).map((b) => {
    const building = b.building || b; // Handle both nested and flat structures
    return {
      option: building.name,
      value: building._id,
    };
  });
};

export const createFloorOptions = (floors) => {
  return (floors || []).map((f) => {
    const floor = f.floor || f; // Handle potential nesting
    return {
      option: floor.name,
      value: floor._id,
    };
  });
};

export const createSensorOptions = (sensors, formatter) => {
  return (sensors || []).map((s) => ({
    id: s._id,
    name: s.name,
    type: s.sensorType === 'ULTRASONIC' ? 'ultraSonicSensor' : 'cameraSensor',
  }));
};
