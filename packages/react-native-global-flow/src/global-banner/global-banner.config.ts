import { TextStyle, ViewStyle } from 'react-native';
import { BANNER_SHORT } from './global-banner.types';

export type GlobalBannerConfig = {
  bgColors: {
    error: string;
    warn: string;
    info: string;
    success: string;
  };
  textColors?: {
    error?: string;
    warn?: string;
    info?: string;
    success?: string;
  };
  textStyle: TextStyle;
  viewStyle: ViewStyle;
  defaultDuration: number;
};

export const GLOBAL_BANNER_DEFAULT_CONFIG: GlobalBannerConfig = {
  bgColors: {
    error: 'red',
    warn: 'orange',
    info: 'blue',
    success: 'green',
  },
  textStyle: { fontSize: 16, fontWeight: '500', textAlign: 'center' },
  viewStyle: { padding: 10 },
  defaultDuration: BANNER_SHORT,
};
