import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import Home from '../screens/Home'
import Movie from '../screens/Movie'
import TvShow from '../screens/TvShow'

const HomeStack = createStackNavigator()

const HomeNav: FC = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name='Home' component={Home} />
      <HomeStack.Screen name='Movie' component={Movie} />
      <HomeStack.Screen name='TvShow' component={TvShow} />
    </HomeStack.Navigator>
  )
}

export default HomeNav