import { StyleSheet } from "react-native";
import colors from "../config/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        
      },
      title: {
        marginTop: 16,
        fontSize: 24,
        fontWeight: "bold",
        color:"#7F2B0F",
        marginBottom:30,
        marginTop:40,
      },
      input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 16,
        paddingHorizontal: 8,
      },
      button: {
          backgroundColor: "#CD5C5C",
          paddingVertical: 5,
          paddingHorizontal: 45,
          borderRadius: 5,
          marginTop:70,
          marginBottom: 10,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          marginLeft: "auto",
          top: 5,
        },
        buttonText: {
          color: "#FFFFFF",
          fontSize: 12,
        },
      guestNames: {
        fontSize: 18,
        marginTop: 8,
      },
      hostName:{
          fontSize: 22,
        marginTop: 8,
      },
      partyItem: {
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: colors.tertiary, 
          borderRadius: 5,
          paddingHorizontal:40,
          paddingVertical:30,
        },
    });