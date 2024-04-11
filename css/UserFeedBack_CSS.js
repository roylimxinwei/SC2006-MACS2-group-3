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
    buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
    backButton: {
    backgroundColor: colors.tertiary,
    width: 40,
    height: 40,
    borderRadius: 20,
    // margin: 10,
    marginTop: 20,
    marginLeft:20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top:0,
    // left: 0,
    },
    backButtonText: {
    color: "#7F2B0F",
    // color: "#FFFFFF",
    // color: colors.secondary,
    fontSize: 15,
    fontWeight: "bold",
  },


  });