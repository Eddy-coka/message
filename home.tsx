import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, Alert,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image,
} from 'react-native';
import { db, ref, set, onValue, get, push } from './firebase';
import { useRoute } from '@react-navigation/native';
import { styles } from './style';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs'; // Pour lire les fichiers en base64

interface Message {
  id: string;
  username: string;
  text?: string;
  imageUrl?: string;
  timestamp: number;
  date: string;
}

const Home = () => {
  const route = useRoute();
  const { username, usernameC } = route.params as { username: string; usernameC: string };
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesRef, setMessagesRef] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fonction pour obtenir le chemin trié des messages
  const getSortedPath = (username1: string, username2: string) => {
    const sortedUsernames = [username1, username2].sort();
    return `messages/${sortedUsernames[0]}_${sortedUsernames[1]}`;
  };

  // Initialiser la référence Firebase pour les messages
  useEffect(() => {
    const sortedPath = getSortedPath(username, usernameC);
    const tableRef = ref(db, sortedPath);

    get(tableRef).then((snapshot) => {
      if (!snapshot.exists()) {
        set(tableRef, {}); // Créer le nœud s'il n'existe pas
      }
      setMessagesRef(tableRef); // Définir la référence des messages
    });
  }, [username, usernameC]);

  // Écouter les changements dans les messages
  useEffect(() => {
    if (!messagesRef) return;

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (!snapshot.exists()) {
        setMessages([]);
        return;
      }

      const data = snapshot.val();
      const loadedMessages: Message[] = Object.entries(data).map(([key, value]: any) => ({
        id: key,
        username: value.username,
        text: value.text,
        imageUrl: value.imageUrl,
        timestamp: value.timestamp,
        date: value.date,
      }));

      setMessages(loadedMessages.reverse());

      // Notifier pour les nouveaux messages
      const lastMessage = loadedMessages[0];
      
    });

    return () => unsubscribe();
  }, [messagesRef]);

  // Envoyer un message texte
  const sendMessage = () => {
    if (!message.trim() || !messagesRef) {
      Alert.alert('Erreur', "Impossible d'envoyer un message vide ou sans connexion Firebase.");
      return;
    }

    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      username: usernameC,
      send:username,
      text: message,
      timestamp: Date.now(),
      date: new Date().toLocaleString(),
    })
      .then(() => setMessage('')) // Réinitialiser le champ de texte
      .catch((error) => {
        console.error("Erreur lors de l'envoi du message:", error);
        Alert.alert('Erreur', "Échec de l'envoi du message. Veuillez réessayer.");
      });
  };

  // Sélectionner une image depuis la galerie
  const uploadImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8, // Réduire la qualité pour accélérer l'upload
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('L’utilisateur a annulé la sélection d’image');
        return;
      }

      if (response.errorCode) {
        console.error('Erreur de sélection d’image :', response.errorMessage);
        Alert.alert('Erreur', 'Impossible de sélectionner une image.');
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;
        await uploadToFirebase(imageUri);
      }
    });
  };

  // Convertir une image en base64
  const convertImageToBase64 = async (uri: string) => {
    try {
      const base64 = await RNFS.readFile(uri, 'base64');
      return base64;
    } catch (error) {
      console.error('Erreur lors de la conversion de l\'image en base64:', error);
      return null;
    }
  };

  // Téléverser une image sur Firebase
  const uploadToFirebase = async (uri: string) => {
    if (!uri) return;

    setIsUploading(true);
    const base64Image = await convertImageToBase64(uri);

    if (!base64Image) {
      Alert.alert('Erreur', 'Impossible de convertir l\'image en base64.');
      setIsUploading(false);
      return;
    }

    try {
      const newMessageRef = push(messagesRef);
      set(newMessageRef, {
        username: usernameC,
        imageUrl: base64Image, // Stocker l'image en base64
        timestamp: Date.now(),
        date: new Date().toLocaleString(),
      });
    } catch (error) {
      console.error("Erreur d'upload:", error);
      Alert.alert("Erreur", "Échec du téléversement de l'image.");
    } finally {
      setIsUploading(false);
    }
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

          {/* Liste des messages */}
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <View style={[styles.messageContainer, item.username === usernameC ? styles.rightMessage : styles.leftMessage]}>
                <Text style={styles.username}>{item.username}</Text>
                {item.text && <Text style={styles.messageText}>{item.text}</Text>}
                {item.imageUrl && (
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${item.imageUrl}` }}
                    style={{ width: 200, height: 200, borderRadius: 10 }}
                  />
                )}
                <Text style={styles.date}>{item.date}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            inverted
          />

          {/* Champ de saisie et boutons */}
          <View style={styles.bas}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Tapez un message"
              style={styles.inputT}
              multiline
            />
            <TouchableOpacity style={styles.buttonE} onPress={sendMessage}>
              <Text style={styles.buttonText1}>Envoyer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cam} onPress={uploadImage} disabled={isUploading}>
              <Text style={styles.buttonText}>{isUploading ? 'Téléversement...' : 'Image'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Home;