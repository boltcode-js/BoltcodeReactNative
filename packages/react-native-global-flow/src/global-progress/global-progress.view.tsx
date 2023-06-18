import React, { useContext } from 'react';
import { View, ViewStyle } from 'react-native';
import { GlobalFlowContext } from '../global-flow.provider';

const VIEW_STYLE: ViewStyle = { flex: 1, justifyContent: 'center', alignItems: 'center' };

export const GlobalProgressView = () => {
  const context = useContext(GlobalFlowContext);
  const Component = context.progressConfig.Component;

  return (
    <View style={VIEW_STYLE}>
      <Component />
    </View>
  );
};
