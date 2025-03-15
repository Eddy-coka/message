import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { db, ref, set, onValue } from './firebase';

const Enregistrer = ({ navigation }) => {
  const [name, setname] = useState('');
  const [psd, setpsd] = useState('');

  const verification = () => {
    if (!name.trim()) {
      Alert.alert('Erreur', 'Le nom d\'utilisateur ne peut pas être vide');
      return;
    }
    
    if (!psd.trim()) {
      Alert.alert('Erreur', 'Le mot de passe ne peut pas être vide');
      return;
    }

    const ver = ref(db, 'utilisateurs');
    onValue(ver, (snapshot) => {
      const data = snapshot.val();
      for (let key in data) {
        if (data[key].username === name) {
          Alert.alert('Validez', 'Vous avez déjà un compte');
          navigation.navigate('login');
          break; // Sortir de la fonction si l'utilisateur existe
        }
      }
      // Si l'utilisateur n'existe pas, on enregistre le nouvel utilisateur
      implementation();
    });
  };

  const implementation = () => {
    const messageRef = ref(db, 'utilisateurs/' + name);
    set(messageRef, {
      username: name,
      psd: psd,
      
    })
      .then(() => {
        Alert.alert('Succès', 'Inscription réussie');
        navigation.navigate('login');
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
        Alert.alert('Erreur', 'Échec de l\'inscription');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={(text) => setname(text)}
        placeholder="Nom d'utilisateur"
        placeholderTextColor="white"
        style={styles.input}
      />
      <TextInput
        value={psd}
        onChangeText={(text) => setpsd(text)}
        placeholder="Mot de passe"
        placeholderTextColor="white"
        secureTextEntry={true}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={verification}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', // Fond sombre
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    bottom: '20%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    bottom: '15%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Enregistrer;
