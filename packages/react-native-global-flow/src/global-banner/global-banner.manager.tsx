import React from 'react';
import { View, ViewStyle } from 'react-native';
import { GlobalBannerView } from './global-banner-view';
import { GlobalBanner } from './global-banner.types';

const MAIN_VIEW_STYLE: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
};

export class GlobalBannerManager extends React.Component<{}, { banners: GlobalBanner[] }> {
  private nextId = 1;

  constructor(props: {}) {
    super(props);
    this.state = { banners: [] };
  }

  push(type: GlobalBanner['type'], message: string, duration: number) {
    this.setState((old) => ({
      banners: [
        ...old.banners,
        {
          id: this.nextId++,
          type,
          message,
          duration,
        },
      ],
    }));
  }

  // Let the arrow function to keep this
  private destroyBanner = () => {
    if (this.state.banners.length > 0) {
      this.setState((old) => ({
        banners: old.banners.filter((_b, i) => !!i),
      }));
    }
  };

  render() {
    if (this.state.banners.length <= 0) {
      return null;
    }

    const banner = this.state.banners[0];

    return (
      <View style={MAIN_VIEW_STYLE}>
        <GlobalBannerView key={banner.id} banner={banner} onFinished={this.destroyBanner} />
      </View>
    );
  }
}
