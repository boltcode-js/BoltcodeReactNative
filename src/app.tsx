/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GlobalFlowProvider } from '../packages/react-native-global-flow/src';
import { RootNavigator } from './navigation/root-navigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <GlobalFlowProvider>
        <RootNavigator />
      </GlobalFlowProvider>
    </SafeAreaProvider>
  );
};

export default App;
