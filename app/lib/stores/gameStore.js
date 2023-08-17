import { create } from "zustand";

export const gameStore = create((set) => ({
  alreadyGuessed: false,
  setAlreadyGuessed: (state) => set(() => ({ alreadyGuessed: state })),
  showOptions: false,
  setShowOptions: (state) => set(() => ({ showOptions: state })),
}));
