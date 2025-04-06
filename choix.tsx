import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { db, ref, onValue } from './firebase';
import { styles } from './style';
import { update  } from './firebase.js';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import { sendLocalNotification } from './notifications';

type RootStackParamList = {
  home: undefined;
};

interface Utilisateurs {
  username: string;
}

type ChoixNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

interface ChoixProps {
  navigation: ChoixNavigationProp;
}

const Choix = ({ navigation }: ChoixProps) => {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateurs[]>([]);
  const [messagesNonLus, setMessagesNonLus] = useState<Set<string>>(new Set()); // Stocke les messages non lus
  const route = useRoute();
  const { usernameC } = route.params as { usernameC: string };

  // Charger la liste des utilisateurs
  useEffect(() => {
    const utilisateursRef = ref(db, 'utilisateurs');
    const unsubscribeUtilisateurs = onValue(utilisateursRef, (snapshot) => {
      const data = snapshot.val();
      const utilisateursList: Utilisateurs[] = [];

      for (let key in data) {
        if (data[key].username !== usernameC) {
          utilisateursList.push({
            username: data[key].username,
          });
        }
      }

      setUtilisateurs(utilisateursList);
    });

    return () => unsubscribeUtilisateurs();
  }, [usernameC]);

  // Écouter les nouveaux messages pour l'utilisateur actuel
  useEffect(() => {
    const messagesRef = ref(db, 'messages');
  
    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
  
      Object.entries(data).forEach(([chatKey, messages]) => {
        if (!messages || typeof messages !== 'object') return;
  
        Object.entries(messages).forEach(([messageKey, message]) => {
          if (!message || typeof message !== 'object') return;
  
          // Vérifier si le message est destiné à l'utilisateur actuel ET qu'il n'a pas été lu
          if (message.send === usernameC && !message.read) {
            sendLocalNotification(
              `Nouveau message de ${message.username}`,
              `${message.text || 'Vide'}`,
            );
  
            // 🟢 Mettre à jour Firebase pour marquer le message comme lu
            const messageRef = ref(db, `messages/${chatKey}/${messageKey}`);
            update(messageRef, { read: true }); // ⬅ Ajout de `read: true`
          }
        });
      });
    });
  
    return () => unsubscribeMessages();
  }, [usernameC]);
  
  // Naviguer vers l'écran de chat et marquer les messages du contact comme lus
  const handleItemPress = (username: string) => {
    setMessagesNonLus((prev) => {
      const updatedMessages = new Set(prev);
      updatedMessages.forEach((messageKey) => {
        if (messageKey.includes(username)) {
          updatedMessages.delete(messageKey);
        }
      });
      return updatedMessages;
    });

    navigation.navigate('home', { username, usernameC });
  };

  return (
    <View style={styles.inner1}>
      <Text style={styles.username}>Emetteur : {usernameC}</Text>
      <FlatList
        data={utilisateurs}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemPress(item.username)}>
            <View style={styles.messageContainer1}>
              <Text style={styles.username1}>
                {item.username} {messagesNonLus.has(item.username) ? '🔔' : ''}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item.username + index}
      />
    </View>
  );
};

export default Choix;
