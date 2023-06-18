# Dialog Manager

It's often painful to create Dialog in React, in general you have to do a lot of redundant stuff:

- Create states to manage if the dialog is open
- Create callbacks to manage onClose & onResult on the dialog
- Add the Dialog in the JSX and bind the props

This pattern make the use of Dialog difficult to read, because it doesn't follow the user flow in the app.

This library makes dialog easy to create & use. Indeed, dialogs are managed at the top level of the application
by the `GlobalFlowProvider` component. Anywhere in you application, you can simply use the hook `useDialogManager`
to interact with Dialog.

## Create a Dialog

A dialog is a component that match the model `DialogComponent`:
```ts
type DialogComponent<Args extends any, Result extends any> = (props: DialogContext<Args, Result>) => JSX.Element
```

It's means the dialog take few params in props:
```
export type DialogContext<Args extends any, Result extends any> = {
  args: Args;
  onConfirm: (result: Result) => void;
  onCancel: () => void;
};
```

These props will be injected by the DialogManager, the only things to know is:
- args is a template type, so you can pass any params to your dialog.
- The dialog should call onConfirm to resolve the promise.
- The dialog should call onCancel to reject the promise.
- The JSX of a dialog only exists when the dialog is open, so the args props should always be defined
- Don't use Modal component in your dialog implementation, everything is managed under the hood. 

Example:
```tsx
export const TestDialog = (
  props: DialogContext<
    { text: string; }, // Take an object with a text field as params
    string // Return a string directly
  >,
) => {
  const { args, onConfirm, onCancel } = props;

  const [value, setValue] = useState('');

  return (
    <View style={{ backgroundColor: args.color, padding: 50, marginTop: args.marginTop }}>
      {/* how the text from args */}
      <Text>{args.text}</Text>
      <Input value={value} onChangeText={(text) => setValue(text)} />

      {/* Resolve the promise with the value */}
      <Button title="Confirm" onPress={() => onConfirm(value)} />
      
      {/* Reject the promise using onCancel */}
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};
```

## Use the dialog

A dialog in now really easy to consume with the `useDialogManager` hook:

```tsx
export const MyComponent = () => {
  // 1. Use the hook
  const { pushDialog, cancelAllDialogs } = useDialogManager();
  
  const handleOpenDialog = useCallback(async () => {
    try {
      // 2. Push the dialog, and get a handler dialog
      const handler = pushDialog(
          TestDialog, // The component of the dialog
          { text: 'Hello world' }, // Args to pass to the dialoig
          // Optionnal options:
          {
              backgroundColor: 'grey', // The background color that cover the entire screen
              animationType: 'slide', // Animation when showing the dialog
              quitOnTouchOutside: true, // Should we cancel the dialog when touch outside
          }
      );
      
      // You can use the handler to force resolve, reject
      // handler.confirm('result')
      // handler.cancel()
      
      // Or just wait the usual flow.
      const result = await handler.waitPromise(); // Result is a string in this case (inferred from the type of TestDialog)
      
      // If you don't care about the success of a dialog (or don't want to manage try catch), you can use:
      const result = await handler.waitIgnoreCancel(); // Return undefined in case of failure and a string in case of success
      
      console.log('Result: ', result);
    } catch (e) {
      console.log('Dialog cancel');
    }
  }, [dialogManager]);

  return (
    <View>
      <Button title="Open the dialog" onPress={handleOpenDialog} />
    </View>
  );
};
```
