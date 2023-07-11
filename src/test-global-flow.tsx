import React, { useCallback } from 'react';
import { Button, View } from 'react-native';
import {
  useDialogManager,
  useGlobalBanner,
  useGlobalProgress,
  GlobalBannerManager,
  GlobalProgressManager,
  DialogManager,
} from '../packages/react-native-global-flow/src';
import { TestDialog } from './dialogs/test-dialog';

export const TestGlobalFlow = () => {
  const showBanner = useGlobalBanner();
  const { pushDialog } = useDialogManager();
  const { showGlobalProgress, hideGlobalProgress } = useGlobalProgress();

  const handleOpenDialogHook = useCallback(async () => {
    await pushDialog(TestDialog, null, {
      animationType: 'slide',
      quitOnTouchOutside: true,
    }).waitIgnoreCancel();
  }, [pushDialog]);

  const handleOpenDialogManager = useCallback(async () => {
    await DialogManager()
      .pushDialog(TestDialog, null, {
        animationType: 'slide',
        quitOnTouchOutside: true,
      })
      .waitIgnoreCancel();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Info" onPress={() => showBanner('info', 'Info message')} />
      <Button title="Warn" onPress={() => showBanner('warn', 'Warning message')} />
      <Button title="Error" onPress={() => GlobalBannerManager().show('error', 'Error message')} />
      <Button title="Success" onPress={() => GlobalBannerManager().show('success', 'Success message')} />
      <Button title="Dialog (hook)" onPress={handleOpenDialogHook} />
      <Button title="Dialog (manager)" onPress={handleOpenDialogManager} />
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
