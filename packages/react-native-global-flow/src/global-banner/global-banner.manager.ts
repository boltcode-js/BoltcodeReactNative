import { useGlobalBannerStore } from './global-banner.store';

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
export const useGlobalBanner = () => useGlobalBannerStore((state) => state.push);
