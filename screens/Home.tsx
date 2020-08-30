import React, { FC, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import ThemeContext from '../contexts/ThemeContext'

const Home: FC = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.body}>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flexGrow: 1,
  },
})