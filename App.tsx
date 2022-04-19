import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-native-paper';
import AppContent from './src';

export default function App() {

  return (
    <Provider >
      {/* AppContent is imported from index.tsx in the src folder
          and the current screens are located in src/screens/Auth/Admin
          This will help keep our App.tsx file cleaner */}
      <AppContent />
    </Provider>
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
