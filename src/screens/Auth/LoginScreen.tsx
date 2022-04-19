import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

const LoginScreen = () => {

    // State allows us to create variables that will re render
    // the page when they are updated.

    // In the case of "username", use username definition when
    // you want to use the value, and use setUsername to change
    // the value of username.

    // Example:
    // setUsername("Joseph4512")
    // <Text> {username} </Text>

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    // This return may only return one element.
    // By using "View" we are returning only that one view,
    // but that view contains all of our other components.
    return (
      <View style={styles.container}>
        {/* You may continue to add styling to this page by
            editing the styles of components and adding more
            views to create spacing. */}
        <Text>Please Enter your username and password</Text>
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
      </View>
    );
};

// A style sheet is used to move styling out of the body of JSX
// and also if we will be using the same styling on many components.

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });  

// We export this screen to be able to import it in other
// files, such as index.tsx, to be able to reference this
export default LoginScreen;
