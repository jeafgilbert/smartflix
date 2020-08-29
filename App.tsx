import React, { FunctionComponent, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Board from './screens/Board'
import Splash from './screens/Splash'

const MainStack = createStackNavigator();

const App: FunctionComponent = () => {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsInitializing(false);
    }, 1000);
  })

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {
          isInitializing
            ? <MainStack.Screen name="SplashScreen" component={Splash} />
            : <MainStack.Screen name="BoardScreen" component={Board} />
        }
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default App