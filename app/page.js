"use client";

import { useEffect, useState } from "react";
import { getGameObject } from "./lib/functions";
import Game from "./components/Game";
import { gameStore } from "./lib/stores/gameStore";
import { pointsStore } from "./lib/stores/pointsStore";

export default function Home() {
  const { setAlreadyGuessed, setShowOptions } = gameStore((store) => store);
  const [gameObject, setGameObject] = useState({});
  const { setPoints, points } = pointsStore((store) => store);

  useEffect(() => {
    setGameObject(getGameObject());

    if (localStorage.getItem("points")) {
      const localPoints = parseInt(localStorage.getItem(points));

      setPoints(localPoints);
    }
  }, []);

  const nextCountry = () => {
    setGameObject(getGameObject());
    setAlreadyGuessed(false);
    setShowOptions(false);
  };

  return (
    <main className="min-h-screen bg-zinc-200 px-5 lg:px-0">
      <h1 className="text-zinc-900 text-center font-black text-2xl lg:text-5xl py-5">
        ¡Adiviná la bandera!
      </h1>
      <h2 className="text-center text-2xl font-light pb-5">Racha: {points}</h2>
      {gameObject.options && (
        <Game gameObject={gameObject} nextCountry={nextCountry} />
      )}
    </main>
  );
}
