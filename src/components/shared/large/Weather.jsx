import React, { useEffect, useState } from "react";
import WeatherIcon from "../../../assets/svgs/dashboard/WeatherIcon";
import Sun from "../../../assets/svgs/dashboard/Sun";

const Weather = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const [trimDay, setTrimDay] = useState("");

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();

      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      const formattedTime = `${hours}:${minutes} ${ampm}`;
      setCurrentTime(formattedTime);

      const day = now.toLocaleDateString("en-US", { weekday: "long" });
      setCurrentDay(day);

      const formattedDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setCurrentDate(formattedDate);

      const cutDay = day.slice(0, 3);
      setTrimDay(cutDay);
    };

    updateTimeAndDate();
    const intervalId = setInterval(updateTimeAndDate, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center gap-6 xl:gap-10 mb-3">
        <Sun />
        <div>
          <h3 className="text-[#0B7661] font-[500] text-sm sm:text-lg  md:text-xl lg:text-left 2xl:text-right">
            {currentDay}, 17 C
          </h3>
          <h3 className="text-[#0B7661] font-[600] text-lg lg:text-3xl 2xl:text-4xl">
            {currentTime}
          </h3>
          <h3 className="text-[rgb(11,118,97)] font-[500] text-sm md:text-dm 2xl:text-base text-center">
            {currentDate}
          </h3>
        </div>
      </div>
      <Range trimDay={trimDay} />
    </div>
  );
};

export default Weather;

const Range = ({ trimDay }) => {
  return (
    <div className={`flex gap-2 items-center  `}>
      <div className="w-full ">
        <Bar
          minValue={6}
          maxValue={25}
          currentValue={19}
          day="Mon"
          trimDay={trimDay}
        />
        <Bar
          minValue={1}
          maxValue={10}
          currentValue={5}
          day="Tue"
          trimDay={trimDay}
        />
        <Bar
          minValue={10}
          maxValue={23}
          currentValue={15}
          day="Wed"
          trimDay={trimDay}
        />
        <Bar
          minValue={8}
          maxValue={30}
          currentValue={9}
          day="Thu"
          trimDay={trimDay}
        />
        <Bar
          minValue={20}
          maxValue={31}
          currentValue={25}
          day="Fri"
          trimDay={trimDay}
        />
        <Bar
          minValue={10}
          maxValue={28}
          currentValue={11}
          day="Sat"
          trimDay={trimDay}
        />
        <Bar
          minValue={6}
          maxValue={20}
          currentValue={14}
          day="Sun"
          trimDay={trimDay}
        />
      </div>
    </div>
  );
};

const Bar = ({ minValue, maxValue, currentValue, day, trimDay }) => {
  const totalRange = 31 - 1;
  const minPercentage = ((minValue - 1) / totalRange) * 100;
  const maxPercentage = ((maxValue - 1) / totalRange) * 100;
  const currentPercentage = ((currentValue - 1) / totalRange) * 100;

  const gradientStyle = {
    background: `linear-gradient(to right, #5ADA9A, #F4EA7DCC, #FF9F52)`,
    width: `${maxPercentage - minPercentage}%`,
    height: "100%",
    position: "absolute",
    left: `${minPercentage}%`,
  };
  return (
    <div
      className={`flex gap-1 my-3 ${
        day == trimDay ? "text-black" : "text-[#5C5B5B50]"
      } `}
    >
      <h5 className="text-sm w-[45px]">{day}</h5>
      <span>
        <WeatherIcon />
      </span>
      <h3 className="text-sm min-w-[20px]">{minValue}</h3>
      <div className="relative w-full h-6 bg-[#B6D2C480] rounded-xl">
        <div className="h-full rounded-xl" style={gradientStyle}></div>

        <div
          className="absolute h-5 w-5 border-[2px]  border-white bg-[#0B7661] rounded-full"
          style={{
            left: `${currentPercentage}%`,
            transform: "translateX(-50%)",
            top: "2px",
          }}
        ></div>
      </div>
      <h3 className="text-sm min-w-[20px]">{maxValue}</h3>
    </div>
  );
};
