import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

export default function ViewProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>
        You can see a profile of this user in this screen.
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