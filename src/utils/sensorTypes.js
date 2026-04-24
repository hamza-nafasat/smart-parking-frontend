export const severityOptions = [
  { option: 'Low', value: 'low' },
  { option: 'Medium', value: 'medium' },
  { option: 'High', value: 'high' },
  { option: 'Critical', value: 'critical' },
];

export const sensorTypes = [
  // { option: 'Occupancy', value: 'occupancy' },
  { option: 'Ultrasonic', value: 'ultraSonicSensor' },
  { option: 'Camera', value: 'cameraSensor' },
];

export const SENSOR_ALERT_FIELDS = {
  occupancy: {
    label: 'Occupancy Status',
    type: 'boolean',
  },
  ultraSonicSensor: {
    label: 'Distance Threshold',
    type: 'range',
    unit: 'cm',
  },
  cameraSensor: {
    label: 'Observation Duration',
    type: 'range',
    unit: 'sec',
  },
};

export const formatSensorType = (type) => {
  if (type === 'ultraSonicSensor') return 'Ultrasonic';
  if (type === 'cameraSensor') return 'Camera';
  return type;
};

export const getSensorFieldConfig = (type) => {
  return SENSOR_ALERT_FIELDS[type] || { label: 'Reading', type: 'range', unit: '' };
};
