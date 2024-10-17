import cityImg from "./assets/city.jpg";
import building from "./assets/building.png";
import plane from "./assets/plane.png";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [buildingHeight, setBuildingHeight] = useState(160);
  const [planePosFromTop, setPlanePosFromTop] = useState(175);
  const [buildingPos, setBuildingPos] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isOver, setIsOver] = useState(false);


  useEffect(() => {
    let animatePlaneId;
    const animatePlane = () => {
      setPlanePosFromTop((prevPos) => {
        if (prevPos < 380) {
          return prevPos + 1;
        } else {
          setIsOver(true);
          return;
        }
      });
      animatePlaneId = requestAnimationFrame(animatePlane);
    }
    if (isStarted) {
      animatePlaneId = requestAnimationFrame(animatePlane);
    }

    return () => cancelAnimationFrame(animatePlaneId);
  }, [isStarted]);

  const handleSpacePress = (event) => {
    if (event.key === " ") {
      event.preventDefault(); 
      setPlanePosFromTop((prevPos) => {
        if (prevPos > 2) {
          return prevPos - 50;
        } else {
          return 0;
        }
      });
    }
  };
  
  useEffect(() => {
    window.addEventListener("keydown", handleSpacePress);
    return () => {
      window.removeEventListener("keydown", handleSpacePress);
    };
  }, []);


  useEffect(() => {
    let animationFrameId;
    const animateBuilding = () => {
      setBuildingPos((prevPos) => {
        if (prevPos < 500) {
          return prevPos + 1;
        } else {
          return 0;
        }
      });
      animationFrameId = requestAnimationFrame(animateBuilding);
    };
    if (isStarted) {
      animationFrameId = requestAnimationFrame(animateBuilding);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isStarted]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div
        className="object-contain relative border-2 border-cyan-600 rounded-md"
        style={{
          backgroundImage: `url(${cityImg})`,
          backgroundRepeat: "no-repeat",
          height: "400px",
          backgroundSize: "cover",
          width: "600px",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div>
          <img
            src={plane}
            alt="plane"
            className={`z-50 absolute h-14 w-24 left-14`}
            style={{ top: `${planePosFromTop}px` }}
          />
          <img
            src={building}
            className="absolute w-24 bottom-0"
            style={{
              height: `${buildingHeight}px`,
              right: `${buildingPos}px`,
            }}
          />
          <img
            src={building}
            className="absolute w-24 transform -scale-y-100 top-0"
            style={{
              height: `${buildingHeight}px`,
              right: `${buildingPos}px`,
            }}
          />
        </div>
      </div>
      <button
        className="mt-4 px-3 py-2 outline-teal-400 hover:bg-teal-400 hover:text-white rounded-lg shadow-md outline"
        onClick={() => setIsStarted((prev) => !prev)}
      >
        {isStarted ? "Pause Game ⏸" : "Start Game ▶️"}
      </button>
    </div>
  );
}

export default App;
