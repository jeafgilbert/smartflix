import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'
import Person from '../screens/Person'
import PopularPeople from '../screens/PopularPeople'

const Stack = createStackNavigator()

const PopularPeopleNav: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='PopularPeople' component={PopularPeople} />
      <Stack.Screen name='Person' component={Person} />
    </Stack.Navigator>
  )
}

export default PopularPeopleNav