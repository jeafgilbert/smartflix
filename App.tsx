import React, { FC, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Board from './screens/Board'
import Splash from './screens/Splash'
import { ThemeProvider } from './providers/ThemeProvider'

const MainStack = createStackNavigator();

const App: FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsInitializing(false);
    }, 1000);
  })

  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
          {
            isInitializing
              ? <MainStack.Screen name="SplashScreen" component={Splash} />
              : <MainStack.Screen name="BoardScreen" component={Board} />
          }
        </MainStack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App