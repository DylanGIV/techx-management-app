import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import configureStore from './src/redux/store'
import { Provider } from 'react-redux';
import AppContent from './src';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { store, persistor } = configureStore()


export default function App() {

  return (
    <SafeAreaProvider>
      <Provider store={store}>
      {/* AppContent is imported from index.tsx in the src folder
          and the current screens are located in src/screens/Auth/Admin
          This will help keep our App.tsx file cleaner */}
        <AppContent />
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
