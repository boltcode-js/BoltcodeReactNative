import React from 'react';
import { View, ViewStyle } from 'react-native';
import { GlobalProgressView } from './global-progress.view';

const MAIN_VIEW_STYLE: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
};

export class GlobalProgressManager extends React.Component<{}, { isLoading: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { isLoading: false };
  }

  show() {
    this.setState({ isLoading: true });
  }

  hide() {
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={MAIN_VIEW_STYLE}>
          <GlobalProgressView />
        </View>
      );
    } else {
      return null;
    }
  }
}
