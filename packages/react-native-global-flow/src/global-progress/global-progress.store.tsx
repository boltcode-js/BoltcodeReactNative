import { create } from 'zustand/esm';

export interface GlobalProgressState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useGlobalProgressStore = create<GlobalProgressState>((set) => ({
  isLoading: false,
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
