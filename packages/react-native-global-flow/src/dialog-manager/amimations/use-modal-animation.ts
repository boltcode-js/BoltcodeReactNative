import { useEffect, useRef } from 'react';
import { useWindowDimensions, ViewStyle } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { DialogViewProps } from '../dialog.view';

const MAIN_VIEW_STYLE: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 0,
  elevation: 0,
};

export const useModalAnimation = (animationType: DialogViewProps['animationType']) => {
  const ref = useRef(animationType);
  if (ref.current !== animationType) {
    throw new Error("You can't change the animationType of a Modal during it's lifecycle");
  }

  /* eslint-disable react-hooks/rules-of-hooks */
  if (animationType === 'slide') {
    const winSize = useWindowDimensions();
    const offset = useSharedValue(winSize.height);

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateY: offset.value }],
      ...MAIN_VIEW_STYLE,
    }));

    useEffect(() => {
      offset.value = withTiming(0, { duration: 300 });
    }, [offset]);

    return animatedStyles;
  } else if (animationType === 'fade') {
    const opacity = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => ({
      opacity: opacity.value,
      ...MAIN_VIEW_STYLE,
    }));

    useEffect(() => {
      opacity.value = withTiming(1, { duration: 300 });
    }, [opacity]);

    return animatedStyles;
  } else {
    return useAnimatedStyle(() => MAIN_VIEW_STYLE);
  }
  /* eslint-enable react-hooks/rules-of-hooks */
};
