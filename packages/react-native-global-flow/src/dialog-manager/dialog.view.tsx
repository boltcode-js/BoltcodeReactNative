import { BackHandler, Platform, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import Animated from 'react-native-reanimated';
import { useModalAnimation } from './amimations/use-modal-animation';
import { DialogConfig } from './dialog.config';

export type DialogViewProps = DialogConfig & {
  onCancel: () => void;
  children: any;
};

const OUTSIDE_VIEW_STYLE: ViewStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 0,
  elevation: 0,
};

const useCancelOnBackButton = (androidCancelOnClickBack: boolean, onCancel: () => void) => {
  if (Platform.OS !== 'android') {
    return;
  }

  /* eslint-disable react-hooks/rules-of-hooks */
  const initialValue = useRef(androidCancelOnClickBack);
  if (initialValue.current !== androidCancelOnClickBack) {
    throw new Error("You can't change the androidCancelOnClickBack of a Modal during it's lifecycle");
  }

  useEffect(() => {
    function cancelOnBack() {
      if (androidCancelOnClickBack) {
        onCancel();
      }
      return true;
    }

    const sub = BackHandler.addEventListener('hardwareBackPress', cancelOnBack);

    return () => {
      sub.remove();
    };
  }, [androidCancelOnClickBack, onCancel]);

  /* eslint-enable react-hooks/rules-of-hooks */
};

export const DialogView = (props: DialogViewProps) => {
  const {
    backgroundColor,
    animationType,
    onCancel,
    quitOnTouchOutside,
    androidCancelOnClickBack,
    keyboardBehavior,
    children,
  } = props;

  const outsideViewStyle = useMemo(() => [OUTSIDE_VIEW_STYLE, { backgroundColor }], [backgroundColor]);
  const animatedStyles = useModalAnimation(animationType, keyboardBehavior);
  useCancelOnBackButton(androidCancelOnClickBack, onCancel);

  return (
    <Animated.View style={animatedStyles}>
      <TouchableWithoutFeedback onPress={quitOnTouchOutside ? onCancel : undefined}>
        <View style={outsideViewStyle} />
      </TouchableWithoutFeedback>
      {children}
    </Animated.View>
  );
};
