import React, { useContext, useMemo } from 'react';
import { DialogInstance } from './dialog.types';
import { DialogView } from './dialog.view';
import { DialogConfig } from './dialog.config';
import { GlobalFlowContext } from '../global-flow.provider';
import { deepMerge } from '../utils';
import { useDialogStore } from './dialog.store';

const ShowModal = (props: { dial: DialogInstance<any, any> }) => {
  const { dial } = props;

  const Component = dial.Component;
  const context = useContext(GlobalFlowContext);

  const config = useMemo<DialogConfig>(
    () => deepMerge(context.defaultDialogConfig, dial.config),
    [context.defaultDialogConfig, dial.config],
  );

  return (
    <DialogView onCancel={dial.context.onCancel} {...config}>
      <Component key={`component-${dial.id}`} {...dial.context} />
    </DialogView>
  );
};

export const DialogConsumer = () => {
  const dialogs = useDialogStore((state) => state.dialogs);

  if (dialogs.length <= 0) {
    return null;
  }

  return (
    <>
      {dialogs.map((dial) => (
        <ShowModal key={`dialog-${dial.id}`} dial={dial} />
      ))}
    </>
  );
};
