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
        fontSize: 30,
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
          marginTop:30,
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
          //fontWeight: "bold",
          color: "#FFFFFF",
          fontSize: 14,
        },
      guestNames: {
        fontSize: 18,
        marginTop: 8,
      },
      nameTitles:{
        fontSize: 24,
        fontWeight: "bold",
        color:"#7F2B0F",
        //margin:10,
        alignSelf:"flex-start"
      } ,
      nameTitles2:{
        fontSize: 24,
        fontWeight: "bold",
        color:"#7F2B0F",
        marginTop:10,
        alignSelf:"flex-start"
      } ,

      hostName:{
          fontSize: 22,
        marginTop: 8,
      },
      partyItem: {
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
          padding: 5,
          borderWidth: 2,
          borderColor: colors.tertiary, 
          borderRadius: 5,
          paddingHorizontal:40,
          paddingVertical:30,
        },
              backButton: {
    backgroundColor: colors.tertiary,
    // paddingVertical: 10,
    // paddingHorizontal: 50,
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