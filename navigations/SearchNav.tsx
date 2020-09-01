import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import Movie from '../screens/Movie'
import Person from '../screens/Person'
import Search from '../screens/Search'
import TvShow from '../screens/TvShow'

const Stack = createStackNavigator()

const SearchNav: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Search' component={Search} />
      <Stack.Screen name='Movie' component={Movie} />
      <Stack.Screen name='TvShow' component={TvShow} />
      <Stack.Screen name='Person' component={Person} />
    </Stack.Navigator>
  )
}

export default SearchNav