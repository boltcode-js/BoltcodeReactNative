import { useCallback, useContext } from 'react';
import { GlobalFlowContext } from '../global-flow.provider';

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
  const context = useContext(GlobalFlowContext);

  const showGlobalProgress = useCallback(() => {
    context.progressManager.current.show();
  }, [context.progressManager]);

  const hideGlobalProgress = useCallback(() => {
    context.progressManager.current.hide();
  }, [context.progressManager]);

  return { showGlobalProgress, hideGlobalProgress };
};
