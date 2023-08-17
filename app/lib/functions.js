// image url https://github.com/stefangabos/world_countries/blob/master/data/flags/64x64/al.png

import data from "./data.json";

const getRandomCountry = () => {
  return data.sort(() => Math.random() - 0.5)[
    Math.floor(Math.random() * data.length)
  ];
};

const getPosibleOptions = () => {
  const posibleOptions = [];

  while (posibleOptions.length < 4) {
    const option = getRandomCountry();

    if (
      posibleOptions.length > 1 &&
      posibleOptions.some((x) => x.id === option.id)
    )
      continue;

    posibleOptions.push(option);
  }

  return posibleOptions;
};

export const getGameObject = () => {
  const gameOptions = getPosibleOptions();
  return {
    options: gameOptions,
    correct: gameOptions.sort(() => Math.random() - 0.5)[
      Math.floor(Math.random() * gameOptions.length)
    ],
  };
};
