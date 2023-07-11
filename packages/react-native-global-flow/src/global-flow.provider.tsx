import React, { useMemo } from 'react';
import { DIALOG_DEFAULT_CONFIG, DialogConfig } from './dialog-manager/dialog.config';
import { deepMerge, DeepPartial } from './utils';
import { GlobalBannerConsumer } from './global-banner/global-banner.consumer';
import { GLOBAL_BANNER_DEFAULT_CONFIG, GlobalBannerConfig } from './global-banner/global-banner.config';
import { GLOBAL_PROGRESS_DEFAULT_CONFIG, GlobalProgressConfig } from './global-progress/global-progress.config';
import { DialogConsumer } from './dialog-manager/dialog.consumer';
import { GlobalProgressConsumer } from './global-progress/global-progress.consumer';

export const GlobalFlowContext = React.createContext<{
  defaultDialogConfig: DialogConfig;
  bannerConfig: GlobalBannerConfig;
  progressConfig: GlobalProgressConfig;
}>(undefined);

export type GlobalFlowProviderProps = {
  defaultDialogConfig?: Partial<DialogConfig>;
  bannerConfig?: DeepPartial<GlobalBannerConfig>;
  progressConfig?: Partial<GlobalProgressConfig>;
  children: any;
};

export const GlobalFlowProvider = (props: GlobalFlowProviderProps) => {
  const { children } = props;

  const defaultDialogConfig = useMemo(
    () => deepMerge(DIALOG_DEFAULT_CONFIG, props.defaultDialogConfig),
    [props.defaultDialogConfig],
  );

  const bannerConfig = useMemo<GlobalBannerConfig>(
    () => deepMerge(GLOBAL_BANNER_DEFAULT_CONFIG, props.bannerConfig),
    [props.bannerConfig],
  );

  const progressConfig = useMemo<GlobalProgressConfig>(
    () => deepMerge(GLOBAL_PROGRESS_DEFAULT_CONFIG, props.progressConfig),
    [props.progressConfig],
  );

  return (
    <GlobalFlowContext.Provider value={{ defaultDialogConfig, bannerConfig, progressConfig }}>
      {children}
      {/* IMPORTANT: Put consumers at the end to be above every other elements in the app */}
      <DialogConsumer />
      <GlobalProgressConsumer />
      <GlobalBannerConsumer />
    </GlobalFlowContext.Provider>
  );
};
