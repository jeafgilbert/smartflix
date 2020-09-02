import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FC, useContext, useState } from 'react'
import { Animated, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Switch from '../components/Switch'
import ThemeContext from '../contexts/ThemeContext'
import HomeNav from '../navigations/HomeNav'
import LiveNav from '../navigations/LiveNav'
import PopularPeopleNav from '../navigations/PopularPeopleNav'
import SearchNav from '../navigations/SearchNav'
import Saved from './Saved'

const Tab = createBottomTabNavigator()
const menuHeight = 200

const Board: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [offsetY] = useState(new Animated.Value(0))
  const [opacityAnim] = useState(new Animated.Value(0))
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
      <Animated.View style={[styles.menuWrap, { transform: [{ translateY: offsetY }], backgroundColor: theme.modalBackground }]}>
        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <EntypoIcon name='moon' size={24} color={theme.color} style={styles.menuItemIcon} /><Text style={[styles.menuItemText, { color: theme.color }]}>Mode Gelap</Text>
          </View>
          <Switch onToggle={toggleTheme} on={true} />
        </View>
      </Animated.View>
      <View style={styles.headerBar}>
        <Image style={styles.headerBg} source={require('../assets/images/header-bg.png')} />
        <Image style={styles.logo} source={require('../assets/images/logo-pink.png')}></Image>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Icon name='menu' size={32} color={theme.darkTintColor} />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        tabBarOptions={{
          inactiveTintColor: theme.tintColor,
          activeTintColor: theme.tintColorActive,
          inactiveBackgroundColor: theme.bottomTabBackground,
          activeBackgroundColor: theme.bottomTabBackground,
          tabStyle: { borderTopWidth: 0 },
          style: { borderTopWidth: 0, elevation: 0 },
        }}
      >
        <Tab.Screen
          name='Home'
          component={HomeNav}
          options={{
            tabBarLabel: 'Beranda',
            tabBarIcon: ({ color, size }) => (
              <Icon name='home' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='People'
          component={PopularPeopleNav}
          options={{
            tabBarLabel: 'Populer',
            tabBarIcon: ({ color, size }) => (
              <Icon name='people' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Live'
          component={LiveNav}
          options={{
            tabBarLabel: 'Langsung',
            tabBarIcon: ({ color, size }) => (
              <Icon name='play-circle-outline' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Search'
          component={SearchNav}
          options={{
            tabBarLabel: 'Cari',
            tabBarIcon: ({ color, size }) => (
              <Icon name='search' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name='Saved'
          component={Saved}
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
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 18,
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
  headerBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 50,
  },
  menuButton: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: '#000',
  },
  logo: {
    width: 150,
    height: 30,
  },
})