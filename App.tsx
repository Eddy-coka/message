import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from './login';  // Première page
import enregistrer from './enregistrer'
import choix from './choix'
import home from './home'
 // Deuxième page

const Stack = createStackNavigator();
const id=null
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="enregistrer" component={enregistrer} />
        <Stack.Screen name="home" component={home} />
        <Stack.Screen name="choix" component={choix} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
