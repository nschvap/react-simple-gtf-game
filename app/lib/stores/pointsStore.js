import { create } from "zustand";

export const pointsStore = create((set) => ({
  points: 0,
  setPoints: (q) => set(() => ({ points: q })),
  addPoints: () => set((store) => ({ points: store.points + 1 })),
}));
