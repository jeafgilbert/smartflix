import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import Live from '../screens/Live'
import Movie from '../screens/Movie'
import TvShow from '../screens/TvShow'

const Stack = createStackNavigator()

const SearchNav: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Live' component={Live} />
      <Stack.Screen name='Movie' component={Movie} />
      <Stack.Screen name='TvShow' component={TvShow} />
    </Stack.Navigator>
  )
}

export default SearchNav