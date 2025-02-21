import { useEffect } from "react";

const useDisableNumberInputScroll = () => {
  useEffect(() => {
    const handleWheel = (event) => {
      if (document.activeElement && document.activeElement.type === "number") {
        event.preventDefault();
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);
};

export default useDisableNumberInputScroll;
