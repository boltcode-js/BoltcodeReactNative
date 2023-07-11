import { create } from 'zustand/esm';
import { GlobalBanner } from './global-banner.types';

export interface GlobalBannerState {
  nextId: number;
  banners: GlobalBanner[];
  push: (type: GlobalBanner['type'], message: string, duration?: number) => void;
  destroyFirst: () => void;
}

export const useGlobalBannerStore = create<GlobalBannerState>((set, get) => ({
  nextId: 1,
  banners: [],
  push: (type: GlobalBanner['type'], message: string, duration?: number) => {
    set((old) => ({
      nextId: old.nextId + 1,
      banners: [
        ...old.banners,
        {
          id: old.nextId + 1,
          type,
          message,
          duration,
        },
      ],
    }));
  },
  destroyFirst: () => {
    if (get().banners.length > 0) {
      set((old) => ({
        banners: old.banners.filter((_b, i) => !!i),
      }));
    }
  },
}));
