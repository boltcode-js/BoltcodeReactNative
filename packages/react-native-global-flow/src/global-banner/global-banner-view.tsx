import React, { useCallback, useContext, useMemo } from 'react';
import { LayoutChangeEvent, Text, TextStyle, View } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalBanner } from './global-banner.types';
import { GlobalFlowContext } from '../global-flow.provider';
import { invertColor } from '../utils';

export type GlobalBannerViewProps = {
  banner: GlobalBanner;
  onFinished: () => void;
};

const INITIAL_OFFSET = -100000;

export const GlobalBannerView = (props: GlobalBannerViewProps) => {
  const { banner, onFinished } = props;

  const context = useContext(GlobalFlowContext);
  const insets = useSafeAreaInsets();
  const offset = useSharedValue(INITIAL_OFFSET);

  const bgColor = context.bannerConfig.bgColors[banner.type];
  const textColor = context.bannerConfig.textColors?.[banner.type];
  const duration = banner.duration || context.bannerConfig.defaultDuration;

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const height = event.nativeEvent.layout.height;

      function handleFinished(finished?: boolean) {
        'worklet';
        if (finished) {
          runOnJS(onFinished)();
        }
      }

      offset.value = -height;
      offset.value = withSequence(
        withTiming(0, { duration: 300 }),
        withDelay(duration, withTiming(-height, { duration: 300 }, handleFinished)),
      );
    },
    [offset, duration, onFinished],
  );

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
    opacity: offset.value === INITIAL_OFFSET ? 0 : 1,
    width: '100%',
    paddingTop: insets.top,
    backgroundColor: bgColor,
  }));

  const textStyle = useMemo<TextStyle[]>(
    () => [{ color: textColor || invertColor(bgColor, true) }, context.bannerConfig.textStyle],
    [bgColor, textColor, context.bannerConfig.textStyle],
  );

  return (
    <Animated.View style={animatedStyles} onLayout={handleLayout}>
      <View style={context.bannerConfig.viewStyle}>
        <Text style={textStyle}>{banner.message}</Text>
      </View>
    </Animated.View>
  );
};
