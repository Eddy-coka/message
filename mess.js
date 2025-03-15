import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import database from '@react-native-firebase/database';

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const onValueChange = database()
      .ref('/messages')
      .on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMessages(Object.values(data));
        }
      });

    return () => database().ref('/messages').off('value', onValueChange);
  }, []);

  const sendMessage = () => {
    database()
      .ref('/messages')
      .push()
      .set({
        text: message,
        timestamp: Date.now(),
      })
      .then(() => setMessage(''))
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default App;