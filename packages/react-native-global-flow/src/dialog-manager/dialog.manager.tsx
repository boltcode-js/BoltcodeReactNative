import React, { useContext, useMemo } from 'react';
import { DialogComponent, DialogHandler, DialogInstance } from './dialog.types';
import { DialogView } from './dialog.view';
import { DialogConfig } from './dialog.config';
import { GlobalFlowContext } from '../global-flow.provider';
import { deepMerge } from '../utils';

const callInterceptor = async <T extends any>(
  result: T,
  interceptor?: (result: T) => boolean | Promise<boolean>,
): Promise<boolean> => {
  if (!interceptor) {
    return true;
  }

  const callResult = interceptor(result);
  if (typeof callResult === 'boolean') {
    return callResult;
  } else {
    return await callResult;
  }
};

const ShowModal = (props: { dial: DialogInstance<any, any> }) => {
  const { dial } = props;

  const Component = dial.Component;

  const context = useContext(GlobalFlowContext);

  const config = useMemo<DialogConfig>(
    () => deepMerge(context.defaultDialogConfig, dial.config),
    [context.defaultDialogConfig, dial.config],
  );

  return (
    <DialogView
      backgroundColor={config.backgroundColor}
      animationType={config.animationType}
      onClickOutside={config.quitOnTouchOutside ? dial.context.onCancel : undefined}>
      <Component key={`component-${dial.id}`} {...dial.context} />
    </DialogView>
  );
};

export class DialogManager extends React.Component<{}, { dialogs: DialogInstance<any, any>[] }> {
  private nextId = 1;

  constructor(props: {}) {
    super(props);
    this.state = { dialogs: [] };
  }

  private closeDialog(id: number) {
    this.setState((prev) => ({
      dialogs: prev.dialogs.filter((x) => x.id !== id),
    }));
  }

  cancelAll() {
    for (let i = this.state.dialogs.length - 1; i >= 0; i--) {
      this.state.dialogs[i].context.onCancel();
    }
  }

  push<Args extends any, Result extends any>(
    dialog: DialogComponent<Args, Result>,
    args: Args,
    config?: Partial<DialogConfig>,
  ) {
    const dialogId = ++this.nextId;

    let resolvePromise: (value: Result | PromiseLike<Result>) => void;
    let rejectPromise: (reason?: any) => void;
    const promise = new Promise<Result>((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });

    let interceptor: (result: Result) => boolean | Promise<boolean>;
    const dialogInstance: DialogInstance<Args, Result> = {
      id: dialogId,
      Component: dialog,
      context: {
        args,
        open: true,
        onConfirm: (result: Result) => {
          callInterceptor(result, interceptor).then((next) => {
            if (next) {
              resolvePromise(result);
              this.closeDialog(dialogId);
            }
          });
        },
        onCancel: () => {
          rejectPromise();
          this.closeDialog(dialogId);
        },
      },
      config: config,
    };

    const handler: DialogHandler<Result> = {
      id: dialogId,
      confirm: dialogInstance.context.onConfirm,
      cancel: dialogInstance.context.onCancel,
      waitPromise: () => promise,
      waitIgnoreCancel: () => {
        return new Promise((resolve) => {
          promise.then(resolve).catch(() => resolve(undefined));
        });
      },
      setInterceptor: undefined,
    };
    handler.setInterceptor = (_i) => {
      interceptor = _i;
      return handler;
    };

    this.setState((prev) => ({
      dialogs: [...prev.dialogs, dialogInstance],
    }));

    return handler;
  }

  render() {
    if (this.state.dialogs.length <= 0) {
      return null;
    }

    return (
      <>
        {this.state.dialogs.map((dial) => (
          <ShowModal key={`dialog-${dial.id}`} dial={dial} />
        ))}
      </>
    );
  }
}
