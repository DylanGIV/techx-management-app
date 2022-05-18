import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const AllScreen = () => {

    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.wrapperView}>
            <View style={styles.wrapperView}>
              <Text>
                Good morning! All here.
              </Text>
            </View>
          </View>
      </SafeAreaView>

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

export default AllScreen;
