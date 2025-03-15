import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Alert,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { db, ref, set, onValue, get, push } from './firebase';
import { useRoute } from '@react-navigation/native';
import { styles } from './style';

interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: number;
  date: string;
}

const Home = () => {
  const route = useRoute();
  const { username, usernameC } = route.params as { username: string; usernameC: string };
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesRef, setMessagesRef] = useState<any>(null); // Référence Firebase

  // Fonction pour générer un chemin unique basé sur les noms des utilisateurs
  const getSortedPath = (username1: string, username2: string) => {
    const sortedUsernames = [username1, username2].sort(); // Assurer un ordre constant
    return `messages/${sortedUsernames[0]}_${sortedUsernames[1]}`;
  };

  // Vérification et configuration de la référence Firebase
  useEffect(() => {
    const sortedPath = getSortedPath(username, usernameC);
    const tableRef = ref(db, sortedPath);

    get(tableRef).then((snapshot) => {
      setMessagesRef(tableRef); // Définir la référence immédiatement, même si vide
      if (!snapshot.exists()) {
        set(tableRef, {}); // Créer la structure si elle n'existe pas
      }
    });
  }, [username, usernameC]);

  // Récupération des messages en temps réel
  useEffect(() => {
    if (!messagesRef) return;

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages: Message[] = [];

      if (data) {
        Object.entries(data).forEach(([key, value]: any) => {
          if (value && value.username && value.text) { // Vérifier si les données sont valides
            loadedMessages.push({
              id: key,
              username: value.username,
              text: value.text,
              timestamp: value.timestamp,
              date: value.date,
            });
          }
        });
      }

      setMessages(loadedMessages.reverse()); // Affichage en ordre inverse
    });

    return () => unsubscribe(); // Nettoyer l'écouteur
  }, [messagesRef]);

  // Fonction pour envoyer un message
  const sendMessage = () => {
    if (!message.trim()) {
      Alert.alert('Erreur', 'Le message ne peut pas être vide');
      return;
    }

    if (!messagesRef) {
      Alert.alert('Erreur', 'La référence Firebase est introuvable');
      return;
    }

    const newMessageRef = push(messagesRef); // Générer un ID unique pour le message

    set(newMessageRef, {
      username: usernameC, // Expéditeur
      text: message,
      timestamp: Date.now(),
      date: new Date().toLocaleString(),
    })
      .then(() => setMessage('')) // Réinitialiser le champ de message
      .catch((error) => console.error("Erreur lors de l'envoi du message:", error));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'android' ? 120 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.username}>{usernameC} a envoyé à : {username}</Text>

          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageContainer,
                  item.username === usernameC ? styles.rightMessage : styles.leftMessage,
                ]}
              >
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            inverted // Afficher les messages récents en premier
          />

          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Tapez un message"
            style={styles.input}
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={sendMessage}>
            <Text style={styles.buttonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Home;
