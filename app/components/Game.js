import Image from "next/image";
import GameOption from "./GameOption";
import { useState } from "react";
import { gameStore } from "../lib/stores/gameStore";
import LoadingBar from "./LoadingBar";
import { pointsStore } from "../lib/stores/pointsStore";

function Game({ gameObject, nextCountry }) {
  const { alreadyGuessed, showOptions, setShowOptions } = gameStore(
    (store) => store
  );
  const { points } = pointsStore((store) => store);

  return (
    <section className="p-4 bg-gray-300 w-full lg:w-1/3 mx-auto rounded-lg shadow-md">
      <div className="flex justify-center flex-col items-center">
        <h2 className="text-zinc-900 font-medium text-lg lg:text-2xl">¿De qué país es?</h2>
        <Image
          alt="Game Image"
          src={`https://github.com/stefangabos/world_countries/blob/master/data/flags/128x128/${gameObject.correct.alpha2}.png?raw=true`}
          width={100}
          height={200}
          loading="eager"
          priority={true}
          onLoad={() => setShowOptions(true)}
        ></Image>
      </div>
      {showOptions ? (
        <div className="flex justify-center mt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-5">
            {gameObject.options.map((option, i) => (
              <GameOption
                correct={gameObject.correct}
                option={option}
                key={i}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-2">
          <LoadingBar />
        </div>
      )}
      {alreadyGuessed && (
        <div className="flex justify-center mt-5">
          <button
            onClick={nextCountry}
            className="px-3 py-1 border-[1px] border-zinc-500 text-zinc-500 rounded-lg hover:bg-zinc-500 hover:text-zinc-800 duration-200 mx-auto"
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
}

export default Game;
