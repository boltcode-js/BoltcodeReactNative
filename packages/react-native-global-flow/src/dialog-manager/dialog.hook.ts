import { useCallback, useContext } from 'react';
import { GlobalFlowContext } from '../global-flow.provider';
import { DialogComponent } from './dialog.types';
import { DialogConfig } from './dialog.config';

/**
 * Return an object like { pushDialog, cancelAllDialogs } that make you able to show and hide dialog.
 * pushDialog return a DialogHandler that you can use to interact with the dialog.
 */
export const useDialogManager = () => {
  const context = useContext(GlobalFlowContext);
  const dialogManager = context.dialogManager;

  const pushDialog = useCallback(
    <Args extends any, Result extends any>(
      dialog: DialogComponent<Args, Result>,
      args: Args,
      config?: Partial<DialogConfig>,
    ) => {
      return dialogManager.current.push(dialog, args, config);
    },
    [dialogManager],
  );

  const cancelAllDialogs = useCallback(() => {
    return dialogManager.current.cancelAll();
  }, [dialogManager]);

  return { pushDialog, cancelAllDialogs };
};
