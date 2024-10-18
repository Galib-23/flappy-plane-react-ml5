import cityImg from "./assets/city.jpg";
import building from "./assets/building.png";
import plane from "./assets/plane.png";
import { useState } from "react";
import { useEffect } from "react";
import boom from "./assets/boom.png";
import Video from "./components/Video";

function App() {
  const [buildingHeight, setBuildingHeight] = useState(160);
  const [planePosFromTop, setPlanePosFromTop] = useState(175);
  const [buildingPos, setBuildingPos] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);

  useEffect(() => {
    let animatePlaneId;
    const animatePlane = () => {
      setPlanePosFromTop((prevPos) => {
        if (prevPos < 150 && buildingPos > 375) {
          setIsOver(true);
          setIsStarted(false);
        }
        if (prevPos > 265 && buildingPos > 375) {
          setIsOver(true);
          setIsStarted(false);
        }
        if (prevPos < 380) {
          return prevPos + 1;
        } else {
          setIsOver(true);
          setIsStarted(false);
          return;
        }
      });
      animatePlaneId = requestAnimationFrame(animatePlane);
    };
    if (isStarted) {
      animatePlaneId = requestAnimationFrame(animatePlane);
    }

    return () => cancelAnimationFrame(animatePlaneId);
  }, [buildingPos, isStarted]);

  const handleSpacePress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      setPlanePosFromTop((prevPos) => {
        if (prevPos > 2) {
          return prevPos - 50;
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
    if (isStarted && !isOver) {
      animationFrameId = requestAnimationFrame(animateBuilding);
    }
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOver, isStarted]);

  return (
    <div className="flex min-h-screen justify-around">
      {isVideoOn && (
        <div className="flex min-h-screen flex-col justify-center">
          <Video isVideoOn={isVideoOn} setIsVideoOn={setIsVideoOn} />
        </div>
      )}
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="my-5 text-teal-400 font-bold text-4xl">Flappy Plane</h1>
        <div
          className="object-contain relative border-2 border-cyan-600 rounded-sm shadow-md"
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
            {isOver && (
              <div>
                <div className="absolute top-[170px] left-32 z-30 text-center text-red-600">
                  <h1 className="text-4xl font-bold">
                    9-1-1 It&apos;s an emergency!
                  </h1>
                  <p>Game Over</p>
                </div>
                <img
                  src={boom}
                  alt=""
                  className="h-full w-full absolute z-20"
                />
              </div>
            )}
            <img
              src={plane}
              alt="plane"
              className={`z-10 absolute h-10 w-20 left-14`}
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

        <div className="flex gap-6">
          {!isVideoOn && (
            <button
              className="mt-4 px-3 py-2 outline-rose-500 hover:bg-rose-500 text-rose-500 hover:text-white rounded-lg shadow-md outline"
              onClick={() => setIsVideoOn(true)}
            >
              Gesture Control 🖐
            </button>
          )}
          {!isStarted && !isOver && (
            <button
              className="mt-4 px-3 text-teal-400 py-2 outline-teal-400 hover:bg-teal-400 hover:text-white rounded-lg shadow-lg outline"
              onClick={() => setIsStarted(true)}
            >
              Start Game
            </button>
          )}
          {isOver && (
            <button
              className="mt-4 px-3 py-2 outline-teal-400 hover:bg-teal-400 hover:text-white rounded-lg shadow-md outline"
              onClick={() => {
                setBuildingPos(0);
                setPlanePosFromTop(175);
                setIsOver(false);
                setIsStarted(true);
              }}
            >
              Restart Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
