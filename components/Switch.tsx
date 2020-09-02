import React, { FC, useState } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface Props {
  onToggle: () => void,
  on: boolean
}

const Switch: FC<Props> = ({ onToggle, on }) => {
  const [offsetX] = useState(new Animated.Value(!on ? 0 : 22))
  const [opacityAnim] = useState(new Animated.Value(!on ? 0 : 1))
  const [isOn, setIsOn] = useState(on || false)

  const toggle = () => {
    if (!isOn) {
      setIsOn(true)
    }

    Animated.timing(offsetX, {
      toValue: !isOn ? 22 : 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => {
      if (isOn) {
        setIsOn(false)
      }
    })

    Animated.timing(opacityAnim, {
      toValue: !isOn ? 1 : 0,
      duration: 120,
      useNativeDriver: true,
    }).start()

    onToggle()
  }

  return (
    <TouchableWithoutFeedback onPress={toggle} style={styles.switch}>
      <Animated.View style={[styles.onIndicator, { opacity: opacityAnim }]}></Animated.View>
      <Animated.View style={[styles.handle, { transform: [{ translateX: offsetX }] }]}></Animated.View>
    </TouchableWithoutFeedback>
  )
}

export default Switch

const styles = StyleSheet.create({
  switch: {
    overflow: 'hidden',
    width: 54,
    height: 32,
    borderColor: '#ccc',
    borderRadius: 16,
    backgroundColor: '#ccc',
  },
  onIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#4192ee',
  },
  handle: {
    width: 26,
    height: 26,
    margin: 3,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
})