import { useCallback } from 'react';
import { useGlobalProgressStore } from './global-progress.store';

/**
 * Return an object with two function showGlobalProgress & hideGlobalProgress.
 * You can use theses function to show or hide the global progress.
 * ```
 * // 1. Call the hook
 * const { showGlobalProgress, hideGlobalProgress } = useGlobalProgress();
 *
 * const myCallback = useCallback(async () => {
 *   // 2. Show the progress
 *   showGlobalProgress();
 *
 *   // 3. Perform your logics
 *   await myLogic();
 *
 *   // 4. Hide the progress
 *   hideGlobalProgress();
 * }, [showBanner]);
 * ```
 */
export const useGlobalProgress = () => {
  const setLoading = useGlobalProgressStore((state) => state.setLoading);

  const showGlobalProgress = useCallback(() => {
    setLoading(true);
  }, [setLoading]);

  const hideGlobalProgress = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  return { showGlobalProgress, hideGlobalProgress };
};

export const GlobalProgressManager = () => {
  const state = useGlobalProgressStore.getState();

  return {
    showGlobalProgress: () => state.setLoading(true),
    hideGlobalProgress: () => state.setLoading(false),
  };
};
