import React from 'react';
import { View, ViewStyle } from 'react-native';
import { GlobalProgressView } from './global-progress.view';
import { useGlobalProgressStore } from './global-progress.store';

const MAIN_VIEW_STYLE: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
};

export const GlobalProgressConsumer = () => {
  const isLoading = useGlobalProgressStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <View style={MAIN_VIEW_STYLE}>
        <GlobalProgressView />
      </View>
    );
  } else {
    return null;
  }
};
