"use client";

import { useEffect, useState } from "react";
import { generarPista, getGameObject } from "./lib/functions";
import Game from "./components/Game";
import { gameStore } from "./lib/stores/gameStore";
import { pointsStore } from "./lib/stores/pointsStore";

export default function Home() {
  const { setAlreadyGuessed, setShowOptions, hint, showHint, alreadyGuessed } =
    gameStore((store) => store);
  const [gameObject, setGameObject] = useState({});
  const { setPoints, points } = pointsStore((store) => store);
  const [record, setRecord] = useState(null);
  const [hintShow, setHintShow] = useState(false);

  useEffect(() => {
    setGameObject(getGameObject());

    if (localStorage.getItem("top-points")) {
      setRecord(localStorage.getItem("top-points"));
    }

    if (localStorage.getItem("points")) {
      const localPoints = localStorage.getItem(points);

      setPoints(localPoints);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("top-points")) {
      setRecord(localStorage.getItem("top-points"));
    }
  }, [points]);

  const nextCountry = () => {
    if (hintShow) {
      setHintShow(false);
      showHint(false);
    }
    setGameObject(getGameObject());
    setAlreadyGuessed(false);
    setShowOptions(false);
  };

  return (
    <main className="min-h-screen bg-zinc-200 px-5 lg:px-0">
      <h1 className="text-zinc-900 text-center font-black text-2xl lg:text-5xl py-5">
        ¡Adiviná la bandera!
      </h1>
      <h2 className="text-center text-2xl font-light">Racha: {points}</h2>
      {record && (
        <h2 className="text-center text-2xl font-light pb-5">
          Record: {record}
        </h2>
      )}
      {gameObject.options && (
        <Game gameObject={gameObject} nextCountry={nextCountry} />
      )}
      {hint && (
        <div className="flex justify-center mt-5">
          <button
            disabled={hintShow}
            onClick={(e) => {
              if (alreadyGuessed) return;
              e.target.textContent = generarPista(gameObject.correct.name);
              setHintShow(true);
            }}
            className="px-3 py-1 border-[1px] border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white duration-200 mx-auto"
          >
            Ver pista
          </button>
        </div>
      )}
    </main>
  );
}
