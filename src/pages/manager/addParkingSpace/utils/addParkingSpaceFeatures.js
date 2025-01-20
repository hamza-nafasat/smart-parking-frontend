// getCroppedImg.js
const getCroppedImg = (imageSrc, crop) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 500;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, "image/jpeg");
    };
  });
};

const sensors = [
  { option: "Sensor-01", value: "sensor-01" },
  { option: "Sensor-02", value: "sensor-02" },
  { option: "Sensor-03", value: "sensor-03" },
  { option: "Sensor-04", value: "sensor-04" },
  { option: "Sensor-05", value: "sensor-05" },
];

export { getCroppedImg, sensors };
