import React, { useCallback } from 'react';
import { Button, View } from 'react-native';
import { useDialogManager, useGlobalBanner, useGlobalProgress } from '../packages/react-native-global-flow/src';
import { TestDialog } from './dialogs/test-dialog';

export const TestGlobalFlow = () => {
  const showBanner = useGlobalBanner();
  const { pushDialog } = useDialogManager();
  const { showGlobalProgress, hideGlobalProgress } = useGlobalProgress();

  const handleOpenDialog = useCallback(async () => {
    await pushDialog(TestDialog, null, {
      animationType: 'slide',
      quitOnTouchOutside: true,
    }).waitIgnoreCancel();
  }, [pushDialog]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Info" onPress={() => showBanner('info', 'Info message')} />
      <Button title="Warn" onPress={() => showBanner('warn', 'Warning message')} />
      <Button title="Error" onPress={() => showBanner('error', 'Error message')} />
      <Button title="Success" onPress={() => showBanner('success', 'Success message')} />
      <Button title="Dialog" onPress={handleOpenDialog} />
      <Button
        title="Progress"
        onPress={() => {
          showGlobalProgress();
          setTimeout(hideGlobalProgress, 2500);
        }}
      />
    </View>
  );
};
