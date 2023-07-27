import React, { useCallback } from 'react';
import { Button, View } from 'react-native';
import {
  DialogManager,
  GlobalBannerManager,
  GlobalProgressManager,
  useDialogManager,
  useGlobalBanner,
  useGlobalProgress,
} from '../../packages/react-native-global-flow/src';
import { TestDialog } from './dialogs/test-dialog';
import { KeyboardDialog } from './dialogs/keyboard-dialog';

export const GlobalFlowScreen = () => {
  const showBanner = useGlobalBanner();
  const { pushDialog } = useDialogManager();
  const { showGlobalProgress, hideGlobalProgress } = useGlobalProgress();

  const handleOpenDialogHook = useCallback(async () => {
    await pushDialog(TestDialog, null, {
      animationType: 'slide',
      quitOnTouchOutside: false,
      androidCancelOnClickBack: false,
    }).waitIgnoreCancel();
  }, [pushDialog]);

  const handleOpenDialogManager = useCallback(async () => {
    await DialogManager()
      .pushDialog(TestDialog, null, {
        animationType: 'slide',
        quitOnTouchOutside: true,
        androidCancelOnClickBack: true,
      })
      .waitIgnoreCancel();
  }, []);

  const handleOpenKeyboardDialog = useCallback(async () => {
    await DialogManager()
      .pushDialog(KeyboardDialog, null, {
        animationType: 'slide',
        quitOnTouchOutside: true,
        keyboardBehavior: 'padding',
      })
      .waitIgnoreCancel();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Info" onPress={() => showBanner('info', 'Info message')} />
      <Button title="Warn" onPress={() => showBanner('warn', 'Warning message')} />
      <Button title="Error" onPress={() => GlobalBannerManager().show('error', 'Error message')} />
      <Button title="Success" onPress={() => GlobalBannerManager().show('success', 'Success message')} />
      <Button title="Dialog (can't touch outside)" onPress={handleOpenDialogHook} />
      <Button title="Dialog (can touch outside)" onPress={handleOpenDialogManager} />
      <Button title="Keyboard Dialog (manager)" onPress={handleOpenKeyboardDialog} />
      <Button
        title="Progress (hook)"
        onPress={() => {
          showGlobalProgress();
          setTimeout(hideGlobalProgress, 2500);
        }}
      />
      <Button
        title="Progress (manager)"
        onPress={() => {
          GlobalProgressManager().showGlobalProgress();
          setTimeout(GlobalProgressManager().hideGlobalProgress, 2500);
        }}
      />
    </View>
  );
};
