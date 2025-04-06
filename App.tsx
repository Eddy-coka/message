import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from './login';  // Première page
import enregistrer from './enregistrer';
import choix from './choix';
import home from './home';
import { initializeApp,  } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth ,update  } from './firebase.js';
const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Écouter l'état de connexion de l'utilisateur
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Si l'utilisateur est connecté, on met à jour l'état
      } else {
        setUser(null); // Si l'utilisateur n'est pas connecté, l'état est nul
      }
    });

    // Nettoyage de l'abonnement quand le composant est démonté
    return () => unsubscribe();
  }, []);
  
  // Demande de permission pour les notifications
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