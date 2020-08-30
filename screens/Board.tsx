import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FC, useContext, useState } from 'react'
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ThemeContext from '../contexts/ThemeContext'
import Home from './Home'

const Tab = createBottomTabNavigator()
const menuHeight = 200

const Board: FC = () => {
  const { theme } = useContext(ThemeContext)
  const [offsetY, setOffsetY] = useState(new Animated.Value(0))
  const [opacityAnim, setOpacityAnim] = useState(new Animated.Value(0))
  const [isMenuShown, setIsMenuShown] = useState(false)

  const toggleMenu = () => {
    if (!isMenuShown) {
      setIsMenuShown(true)
    }

    Animated.timing(offsetY, {
      toValue: !isMenuShown ? -menuHeight : 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => {
      if (isMenuShown) {
        setIsMenuShown(false)
      }
    })

    Animated.timing(opacityAnim, {
      toValue: !isMenuShown ? 0.6 : 0,
      duration: 120,
      useNativeDriver: true,
    }).start()
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.menuOverlay, { top: isMenuShown ? 0 : '100%', opacity: opacityAnim }]}>
        <TouchableWithoutFeedback onPress={toggleMenu} style={styles.menuOverlayClickable}>
          <View style={styles.menuOverlayClickableInner}></View>
        </TouchableWithoutFeedback>
      </Animated.View>
      <Animated.View style={[styles.menuWrap, { transform: [{ translateY: offsetY }] }]}>
        <Text>Menu Item</Text>
      </Animated.View>
      <View style={styles.headerBar}>
        <Image style={styles.logo} source={require('../assets/images/logo-pink.png')}></Image>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name='menu' size={32} color={theme.color} />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        tabBarOptions={{
          inactiveTintColor: theme.bottomTabTintColor,
          activeTintColor: theme.bottomTabTintColorActive,
          inactiveBackgroundColor: theme.bottomTabBackground,
          activeBackgroundColor: theme.bottomTabBackground,
          tabStyle: { borderTopWidth: 0 },
          style: { borderTopWidth: 0, elevation: 0 },
        }}
      >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarLabel: 'Beranda',
            tabBarIcon: ({ color, size }) => (
              <Icon name='home' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='People'
          component={Home}
          options={{
            tabBarLabel: 'Populer',
            tabBarIcon: ({ color, size }) => (
              <Icon name='people' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Profile'
          component={Home}
          options={{
            tabBarLabel: 'Langsung',
            tabBarIcon: ({ color, size }) => (
              <Icon name='play-circle-outline' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Search'
          component={Home}
          options={{
            tabBarLabel: 'Cari',
            tabBarIcon: ({ color, size }) => (
              <Icon name='search' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Messages'
          component={Home}
          options={{
            tabBarLabel: 'Tersimpan',
            tabBarIcon: ({ color, size }) => (
              <Icon name='bookmark' color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export default Board

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: '#111',
  },
  menuOverlayClickable: {
    flex: 1,
  },
  menuOverlayClickableInner: {
    flex: 1,
  },
  menuWrap: {
    width: '100%',
    height: menuHeight,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 9999,
    top: '100%',
    paddingVertical: 28,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  headerBar: {
    width: '100%',
    height: 50,
    position: 'absolute',
    zIndex: 1,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  logo: {
    width: 150,
    height: 30,
  },
})