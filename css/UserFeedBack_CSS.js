import { Dimensions, StyleSheet } from "react-native";
import colors from "../config/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor:colors.primary,
    },
    welcomeText:{
      fontSize: 24,
      fontWeight: "bold",
      textAlign:'center',
      color:"#7F2B0F",
    },
    footnote:{
        fontSize: 13,
        textAlign:'center',
        margin:10,
    },
    input:{
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 16,
        paddingHorizontal: 8,
       width:300,
    },
    button: {
      backgroundColor: "#CD5C5C",
      paddingVertical: 10,
      paddingHorizontal: 90,
      borderRadius: 5,
      marginTop: 20,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    backbutton:{
        backgroundColor: colors.tertiary,
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    } ,
    buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  });