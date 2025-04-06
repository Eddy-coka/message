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
        flex: 1,
        backgroundColor: "#121212",
       
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
        marginTop:'5%',
        marginEnd:'5%',
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
        inputT: {
          textDecorationLine:'20',
          color: '#fff',
          left:'11%',
          borderRadius: 5,
          paddingHorizontal: 15,
          paddingVertical: 10,
        top:'4%',
          fontSize: 16,
          width:'75%',
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
       
          bas: {
            marginTop:5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
          },
          inputT: {
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            color:'white',
            borderRadius: 8,
            height:'150%',
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginRight: 10,
            fontSize: 16,
          },
          buttonE: {
            backgroundColor: '#4CAF50',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          },
          buttonText1: {
            color: '#fff',
            fontSize: 16,
          },
          cam: {
            backgroundColor: '#FF5722',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          },
          buttonText: {
            color: '#fff',
            fontSize: 16,
          },
        
        
})
      

