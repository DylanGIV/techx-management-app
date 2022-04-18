import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        returnKeyType="next"
      />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <Button  mode='contained' >
        Log in
      </Button>
      <StatusBar style="auto" />
    </View>
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
