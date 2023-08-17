import { create } from "zustand";

export const pointsStore = create((set) => ({
  points: 0,
  setPoints: (q) => set(() => ({ points: parseInt(q) })),
  addPoints: () => set((store) => ({ points: store.points + 1 })),
}));
