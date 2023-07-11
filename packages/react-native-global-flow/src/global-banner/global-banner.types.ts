export type GlobalBannerType = 'info' | 'warn' | 'error' | 'success';

export type GlobalBanner = {
  id: number;
  type: GlobalBannerType;
  message: string;
  duration?: number;
};

export const BANNER_SHORT = 1200;
export const BANNER_LONG = 2000;
