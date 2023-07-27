import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect, useRef } from 'react';
import { Keyboard, KeyboardEvent, Platform, ViewStyle } from 'react-native';
import { DialogConfig } from '../dialog.config';

export const useModalKeyboardAnimation = (keyboardBehavior: DialogConfig['keyboardBehavior']): ViewStyle => {
  const initialMode = useRef(keyboardBehavior);
  if (initialMode.current !== keyboardBehavior) {
    throw new Error("You can't change the keyboardBehavior of a Modal during it's lifecycle");
  }

  console.log('keyboardBehavior: ', keyboardBehavior);
  if (!keyboardBehavior) {
    return {};
  }

  /* eslint-disable react-hooks/rules-of-hooks */
  const offsetY = useSharedValue(0);

  useEffect(() => {
    function onKeyboardShow(e: KeyboardEvent) {
      offsetY.value = withTiming(e.endCoordinates.height, { duration: Platform.OS === 'android' ? 50 : 300 });
    }

    function onKeyboardHide() {
      offsetY.value = withTiming(0, { duration: Platform.OS === 'android' ? 50 : 300 });
    }

    const showSubscription = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      onKeyboardShow,
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      onKeyboardHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [offsetY]);

  return useAnimatedStyle(() => ({
    paddingBottom: offsetY.value,
  }));
  /* eslint-enable react-hooks/rules-of-hooks */
};
