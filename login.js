import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput,Alert } from 'react-native';
import { db, ref, set, onValue } from './firebase'

const Login = ({ navigation }) => {
  const [name, setname] = useState('');
  const [psd, setpsd] = useState('');
  const verification = () => {
      if (!name.trim()) {
        Alert.alert('Erreur', "Le nom d'utilisateur ne peut pas être vide");
        return;
      }
    
      if (!psd.trim()) {
        Alert.alert('Erreur', "Le mot de passe ne peut pas être vide");
        return;
      }
    
      const ver = ref(db, 'utilisateurs');
    
      onValue(ver, (snapshot) => {
        const data = snapshot.val();
        let userExists = false;
        for (let key in data) {
          if (data[key].username === name && data[key].psd === psd) {
            userExists = true;
          navigation.navigate('choix', { usernameC: name });
            
            break; // Sortir de la boucle dès qu'on trouve un utilisateur valide
          }
        }
    
        if (!userExists) {
          Alert.alert('Erreur', 'Nom d\'utilisateur ou mot de passe incorrect');
        }
    
      }, { onlyOnce: true }); // Lire les données une seule fois
    };
    
const enregistrer=()=>{
  navigation.navigate('enregistrer')
}





  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={(text) => setname(text)}
        placeholder="name"
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
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={enregistrer}>
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
    bottom:'20%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    bottom:'15%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Login;
