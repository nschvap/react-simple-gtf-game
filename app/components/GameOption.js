import { useEffect, useReducer, useState } from "react";
import { gameStore } from "../lib/stores/gameStore";
import { pointsStore } from "../lib/stores/pointsStore";

function GameOption({ option, correct }) {
  const { alreadyGuessed, setAlreadyGuessed, showHint } = gameStore(
    (store) => store
  );
  const { points, addPoints, setPoints } = pointsStore((store) => store);
  const [guessed, setGuessed] = useState(null);
  const [wrong, setWrong] = useState(null);

  const checkOption = (id) => {
    setAlreadyGuessed(true);

    if (id === correct.id) {
      setGuessed(true);
      addPoints();
      localStorage.setItem("points", points + 1);

      if ((points + 1) % 5 === 0) {
        showHint(true);
      }
    } else {
      if (localStorage.getItem("top-points")) {
        const record = localStorage.getItem("top-points");

        if (points > record) {
          localStorage.setItem("top-points", points);
        }
      } else {
        localStorage.setItem("top-points", points);
      }

      setWrong(true);
      setPoints(0);
      localStorage.setItem("points", 0);
    }
  };

  useEffect(() => {
    setGuessed(null);
    setWrong(null);
  }, [option]);

  if (correct.id === option.id && alreadyGuessed)
    return (
      <button
        disabled
        onClick={(e) => checkOption(option.id)}
        className="w-full px-3 py-1 border-[1px] border-green-300 rounded-lg bg-green-300 text-green-800 lg:duration-200"
      >
        {option.name}
      </button>
    );

  if (guessed)
    return (
      <button
        disabled
        onClick={(e) => checkOption(option.id)}
        className="w-full px-3 py-1 border-[1px] border-green-300 rounded-lg bg-green-300 text-green-800 lg:duration-200"
      >
        {option.name}
      </button>
    );

  if (wrong)
    return (
      <button
        disabled
        onClick={(e) => checkOption(option.id)}
        className="w-full px-3 py-1 border-[1px] border-red-300 rounded-lg bg-red-300 text-red-800 lg:duration-200"
      >
        {option.name}
      </button>
    );

  return (
    <button
      disabled={alreadyGuessed}
      onClick={(e) => checkOption(option.id)}
      className={`${
        alreadyGuessed && "pointer-events-none"
      } w-full  px-3 py-1 text-zinc-500 border-[1px] border-zinc-500 rounded-lg hover:bg-zinc-500 hover:text-zinc-800 lg:duration-200`}
    >
      {option.name}
    </button>
  );
}

export default GameOption;
