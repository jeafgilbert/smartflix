import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Home from './Home'

const MainTab = createBottomTabNavigator()

export default function App() {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name='Messages'
        component={Home}
        options={{
          tabBarLabel: 'Pesan',
          tabBarIcon: ({ color, size }) => (
            <Icon name='chat' color={color} size={size} />
          ),
        }}
      />
      <MainTab.Screen
        name='Profile'
        component={Home}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Icon name='person' color={color} size={size} />
          ),
        }}
      /> 
    </MainTab.Navigator>
  )
}