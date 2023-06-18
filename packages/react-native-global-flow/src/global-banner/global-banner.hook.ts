import { useCallback, useContext } from 'react';
import { GlobalFlowContext } from '../global-flow.provider';
import { GlobalBannerType } from './global-banner.types';

/**
 * Return a function that you can call to display a banner.
 * ```
 * // 1. Call the hook
 * const showBanner = useGlobalBanner();
 *
 * const myCallback = useCallback(() => {
 *   // 2. When you need it, show the banner
 *   showBanner('info', "Hello World !", BANNER_SHORT);
 * }, [showBanner]);
 * ```
 */
export const useGlobalBanner = () => {
  const context = useContext(GlobalFlowContext);

  return useCallback(
    (type: GlobalBannerType, message: string, duration?: number) => {
      context.bannerManager.current.push(type, message, duration || context.bannerConfig.defaultDuration);
    },
    [context.bannerManager, context.bannerConfig.defaultDuration],
  );
};
