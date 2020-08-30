import React, { FC, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ThemeContext from '../contexts/ThemeContext'

const Settings: FC = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text>Settings</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 40,
  },
})