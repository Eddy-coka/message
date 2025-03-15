import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { db, ref, onValue } from './firebase';
import { styles } from './style';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Importer le type de navigation
import { useRoute } from '@react-navigation/native';
// Définir les types de navigation pour ton stack
type RootStackParamList = {
  home: undefined;

};

interface Utilisateurs {
  username: string;
}

// Définir le type de navigation pour ton composant
type ChoixNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

interface ChoixProps {
  navigation: ChoixNavigationProp;
}
const Choix = ({ navigation }: ChoixProps) => {
  const [Utilisateurs, setUtilisateurs] = useState<Utilisateurs[]>([]);
  const route = useRoute();
  const { usernameC } = route.params as { usernameC: string}; 
 
  useEffect(() => {
    const messagesRef = ref(db, 'utilisateurs');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const utilisateursList: Utilisateurs[] = [];

      for (let key in data) {
        utilisateursList.push({
          username: data[key].username,
  
        });
      }

      setUtilisateurs(utilisateursList); // Mettre à jour les utilisateurs
    });
  }, []);

  const handleItemPress = (username: string) => {
    navigation.navigate('home', { username,usernameC});; // Passer 'username' en paramètre
    };

  return (
    <View style={styles.inner1}>
      {/* Utilisation de FlatList pour la liste défilable */}
      <Text style={styles.username}>Emetteur : {usernameC}</Text>
      <FlatList
        data={Utilisateurs}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item.username)}>
            <View style={styles.messageContainer1}>
              <Text style={styles.username1}>{item.username}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item.username + index} // Utilisation de 'username' comme clé unique
        inverted // Afficher les nouveaux utilisateurs en haut
      />
    </View>
  );
};

export default Choix;
