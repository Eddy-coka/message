import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 20,
    },
    inner: {
        flex: 1,
        justifyContent: "center",
    }, 
    inner1: {
        flex:1,
        backgroundColor: "#121212",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#1E90FF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        bottom:'13%'
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    username:{
        color: "#FFD700",
        fontWeight: "bold",
        fontSize:20
    },
    username1:{
        
        padding: 20,
        marginHorizontal:'50',
        color: "#FFD700",
        fontWeight: "bold",
        fontSize:20
    },
    messageContainer1: {
        left:'10%',
        width:'80%',
        borderRadius: 20,
        borderRadius:8,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        marginBottom:20,
        
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
      },
    messageText: {
        color: "white",
        fontWeight: "bold",
        fontSize:20
    },
    rightMessage: {
        alignSelf: 'flex-end',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
      leftMessage: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
     
    date: {
          fontSize: 12,
          color: '#888',
          marginTop: 5,
    },
    input: {
          backgroundColor: '#fff',
          borderRadius: 30,
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginBottom: 15,
          fontSize: 16,
          height: 50,
          borderWidth: 1,
          borderColor: '#ccc',
        },
        button: {
          backgroundColor: '#4caf50',
          borderRadius: 30,
          paddingVertical: 10,
          alignItems: 'center',
        },
        buttonText: {
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
        },
    });
      

