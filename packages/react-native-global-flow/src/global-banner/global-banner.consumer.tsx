import React from 'react';
import { View, ViewStyle } from 'react-native';
import { GlobalBannerView } from './global-banner-view';
import { useGlobalBannerStore } from './global-banner.store';

const MAIN_VIEW_STYLE: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
};

export const GlobalBannerConsumer = () => {
  const banners = useGlobalBannerStore((state) => state.banners);
  const destroyFirst = useGlobalBannerStore((state) => state.destroyFirst);

  if (banners.length <= 0) {
    return null;
  }

  const banner = banners[0];

  return (
    <View style={MAIN_VIEW_STYLE}>
      <GlobalBannerView key={banner.id} banner={banner} onFinished={destroyFirst} />
    </View>
  );
};
