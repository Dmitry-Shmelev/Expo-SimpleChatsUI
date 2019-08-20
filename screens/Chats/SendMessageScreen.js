import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

export default function SendMessageScreen() {
  return (
    <View style={styles.container}>
      <Text>
        You can send a message in this screen.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})