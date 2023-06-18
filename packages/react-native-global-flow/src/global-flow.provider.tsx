import React, { useMemo, useRef } from 'react';
import { DIALOG_DEFAULT_CONFIG, DialogConfig } from './dialog-manager/dialog.config';
import { DialogManager } from './dialog-manager/dialog.manager';
import { deepMerge, DeepPartial } from './utils';
import { GlobalBannerManager } from './global-banner/global-banner.manager';
import { GLOBAL_BANNER_DEFAULT_CONFIG, GlobalBannerConfig } from './global-banner/global-banner.config';
import { GLOBAL_PROGRESS_DEFAULT_CONFIG, GlobalProgressConfig } from './global-progress/global-progress.config';
import { GlobalProgressManager } from './global-progress/global-progress.manager';

export const GlobalFlowContext = React.createContext<{
  dialogManager: React.MutableRefObject<DialogManager>;
  defaultDialogConfig: DialogConfig;
  bannerManager: React.MutableRefObject<GlobalBannerManager>;
  bannerConfig: GlobalBannerConfig;
  progressManager: React.MutableRefObject<GlobalProgressManager>;
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

  const dialogManager = useRef<DialogManager>();
  const defaultDialogConfig = useMemo(
    () => deepMerge(DIALOG_DEFAULT_CONFIG, props.defaultDialogConfig),
    [props.defaultDialogConfig],
  );

  const bannerManager = useRef<GlobalBannerManager>();
  const bannerConfig = useMemo<GlobalBannerConfig>(
    () => deepMerge(GLOBAL_BANNER_DEFAULT_CONFIG, props.bannerConfig),
    [props.bannerConfig],
  );

  const progressManager = useRef<GlobalProgressManager>();
  const progressConfig = useMemo<GlobalProgressConfig>(
    () => deepMerge(GLOBAL_PROGRESS_DEFAULT_CONFIG, props.progressConfig),
    [props.progressConfig],
  );

  return (
    <GlobalFlowContext.Provider
      value={{ dialogManager, defaultDialogConfig, bannerManager, bannerConfig, progressManager, progressConfig }}>
      {children}
      {/* IMPORTANT: Put managers at the end to be above every other elements in the app */}
      <DialogManager ref={dialogManager} />
      <GlobalBannerManager ref={bannerManager} />
      <GlobalProgressManager ref={progressManager} />
    </GlobalFlowContext.Provider>
  );
};
