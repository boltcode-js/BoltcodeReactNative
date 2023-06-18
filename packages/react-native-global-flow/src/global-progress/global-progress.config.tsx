import React from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';

export type GlobalProgressConfig = {
  Component: React.FunctionComponent | React.ComponentClass;
};

const DEFAULT_COMPONENT_STYLE: ViewStyle = {
  backgroundColor: '#f0f0f0',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 50,
  borderRadius: 12,
};

const DefaultComponent = () => (
  <View style={DEFAULT_COMPONENT_STYLE}>
    <ActivityIndicator size="large" />
  </View>
);

export const GLOBAL_PROGRESS_DEFAULT_CONFIG: GlobalProgressConfig = {
  Component: DefaultComponent,
};
