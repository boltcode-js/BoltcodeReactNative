import { useDialogStore } from './dialog.store';

/**
 * Return an object like { pushDialog, cancelAllDialogs } that make you able to show and hide dialog.
 * pushDialog return a DialogHandler that you can use to interact with the dialog.
 */
export const useDialogManager = () => {
  const pushDialog = useDialogStore((state) => state.push);
  const cancelAllDialogs = useDialogStore((state) => state.cancelAll);

  return { pushDialog, cancelAllDialogs };
};

export const DialogManager = () => {
  const state = useDialogStore.getState();

  return {
    pushDialog: state.push,
    cancelAllDialogs: state.cancelAll,
  };
};
