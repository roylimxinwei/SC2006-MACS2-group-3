import { StyleSheet } from "react-native";
import colors from "../config/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
      },
      container2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        marginBottom:20,
      },
      host:{
        marginBottom:30,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius:15, 
        borderColor: colors.tertiary, 
        paddingHorizontal:60,
        paddingVertical:20,
      },
      hostNames:{
        fontSize: 18,
        marginTop: 8,

      },
      guest:{
        height:240,
        alignItems: "center",
        borderWidth: 1, 
        borderRadius:15, 
        borderColor: colors.tertiary, 
        paddingHorizontal:60,
        paddingVertical:20,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        color:"#7F2B0F",
        marginBottom:20,
        marginTop:50,
      },
      input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 16,
        paddingHorizontal: 8,
       width:250,
      },
      button: {
        marginTop: 16,
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        borderRadius: 4,
      },
      buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
      },
      guestNames: {
        fontSize: 18,
        marginTop: 8,
 
      },
    });