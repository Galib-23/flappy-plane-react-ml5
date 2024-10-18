import cityImg from "./assets/city.jpg";
import building from "./assets/building.png";
import plane from "./assets/plane.png";
import { useState } from "react";
import { useEffect } from "react";
import boom from "./assets/boom.png";
import Video from "./components/Video";
import Swal from "sweetalert2";
import { FaGithub } from "react-icons/fa";

function App() {
  //const [buildingHeight, setBuildingHeight] = useState(160);
  const buildingHeight = 160;
  const [planePosFromTop, setPlanePosFromTop] = useState(175);
  const [buildingPos, setBuildingPos] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [fist, setFist] = useState(true);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

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
          return prevPos + 0.5;
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

  useEffect(() => {
    if (!fist) {
      setPlanePosFromTop((prevPos) => {
        const newPos = prevPos - 40;
        return newPos > 0 ? newPos : 0;
      });
    }
  }, [fist]);

  const handleSpacePress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      setPlanePosFromTop((prevPos) => {
        if (prevPos > 2) {
          return prevPos - 30;
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
    if (isOver && !isStarted) {
      setFinalScore(score);
      setScore(0);
    }
    let animationFrameId;
    const animateBuilding = () => {
      setBuildingPos((prevPos) => {
        if (prevPos < 500) {
          return prevPos + 1;
        } else {
          setScore((prevScore) => prevScore + 1);
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

  const handleDontClick = () => {
    Swal.fire({
      title: "I knew you would click 😒",
      text: "As you have clicked, checkout my other projects here 🤗",
      showConfirmButton: false,
      footer: '<a style="text-decoration: underline; font-weight: 600; color: blue;" target="_blank" rel="noopener noreferrer" href="https://portfolio-galib.web.app/" >View Portfolio</a>'
    });
  }

  return (
    <div>
      <div className="w-full py-3 bg-teal-100 flex gap-2 justify-end px-4">
        <button onClick={handleDontClick} className="px-2 py-2 text-white hover:bg-teal-700 transition shadow-md bg-teal-500 rounded-lg">
          Don&apos;t click here ⚠️
        </button>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/Galib-23/flappy-plane-react-ml5">
        <button onClick={handleDontClick} className="px-2 py-2 text-white bg-slate-700  hover:bg-slate-500 transition shadow-md rounded-lg flex items-center gap-2">
          Github <FaGithub />
        </button>
        </a>
      </div>
      <h1 className="mt-5 text-teal-400 font-bold text-4xl text-center">
            Flappy Plane
          </h1>
      <div className="flex min-h-screen justify-evenly">
        {isVideoOn && (
          <div className="flex min-h-screen flex-col">
            <Video
              setFist={setFist}
              isVideoOn={isVideoOn}
              setIsVideoOn={setIsVideoOn}
            />
          </div>
        )}
        <div className="min-h-screen flex flex-col items-center">
          <p className="text-sm mb-2 mt-2">Press <span className="font-bold">Space</span> to controll the plane</p>
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
                    <p className="text-base">Game Over</p>
                    <p className="text-lg text-teal-500 font-semibold">
                      Your Score: {finalScore}
                    </p>
                  </div>
                  <img
                    src={boom}
                    alt=""
                    className="h-full w-full absolute z-20"
                  />
                </div>
              )}
              <h2 className="left-3 top-3 absolute text-cyan-400 text-2xl z-40 font-semibold">
                Score: {score}
              </h2>
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
    </div>
  );
}

export default App;
