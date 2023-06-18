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
import { TestGlobalFlow } from './test-global-flow';
import { GlobalFlowProvider } from '../packages/react-native-global-flow/src';

const App = () => {
  return (
    <SafeAreaProvider>
      <GlobalFlowProvider>
        <TestGlobalFlow />
      </GlobalFlowProvider>
    </SafeAreaProvider>
  );
};

export default App;
