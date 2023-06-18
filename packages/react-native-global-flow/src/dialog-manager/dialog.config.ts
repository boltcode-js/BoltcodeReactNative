import { DialogViewProps } from './dialog.view';

export type DialogConfig = {
  /**
   * Background color applied to the whole screen, you can use alpha channel if you don't want to hide completely the screen.
   */
  backgroundColor: string;

  /**
   * Animation used when dialog is shown
   */
  animationType: DialogViewProps['animationType'];

  /**
   * Automatically cancel the dialog when touch outside of the view
   */
  quitOnTouchOutside: boolean;
};

export const DIALOG_DEFAULT_CONFIG: DialogConfig = {
  backgroundColor: '#e1e3e67f',
  animationType: 'none',
  quitOnTouchOutside: false,
};
