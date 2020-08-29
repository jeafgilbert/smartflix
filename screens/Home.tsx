import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/logo-pink.png')}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  logo: {
    width: 200,
    height: 40,
  },
})