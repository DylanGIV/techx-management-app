import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text } from 'react-native-paper';

const ClientHomeScreen = (props : any) => {



    
    return (
    
        <View style={styles.wrapperView}>
            <Text>
                In Client side
            </Text>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wrapperView: {
      flex: 1,
    },

  });
    
export default ClientHomeScreen;
