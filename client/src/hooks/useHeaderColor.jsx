import { useEffect, useState } from "react";

const useHeaderColor = () => {
  const [headerColor, setHeaderColor] = useState(false);
  //to handle shadow of header
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 8) {
        setHeaderColor("linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)");
      } else {
        setHeaderColor("linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)");
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return headerColor;
};

export default useHeaderColor;
