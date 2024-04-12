import { StyleSheet } from "react-native";
import colors from "../config/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // marginTop: 20,
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
      hostContainer:{
        // marginBottom:10,
        justifyContent: "center",
        alignItems: "center",
      } ,
      host:{
    marginBottom:30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius:15, 
    borderColor: colors.tertiary,
    // paddingHorizontal:60, // This will be replaced by width
    paddingVertical:18,
    width: 260, // Set a specific width
      },
      hostNames:{
        fontSize: 18,
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        // margin: 8,
      },
      hostTitle:{
        fontSize: 24,
        fontWeight: "bold",
        color:"#7F2B0F",
        margin:10,
        alignSelf:"flex-start"
      },
      guest:{
    height: 240,
    alignItems: "center",
    borderWidth: 2, 
    borderRadius:15, 
    borderColor: colors.tertiary, 
    // paddingHorizontal:60, // This will be replaced by width
    paddingVertical:18,
    width: 260, // Set a specific width
      minHeight: 100, // Minimum height to show empty state
  maxHeight: 300, // Maximum height before scrolling within the FlatList
  justifyContent: "center",
  alignItems: "center",
      },
      guestContainer:{
        marginBottom:20,
        justifyContent: "center",
        alignItems: "center",
      } ,
      guestTitle:{
        fontSize: 24,
        fontWeight: "bold",
        color:"#7F2B0F",
        margin:10,
        alignSelf:"flex-start"
      },

      title: {
        fontSize: 36,
        fontWeight: "bold",
        color:"#7F2B0F",
        margin:30,
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
  partyButton: {
      backgroundColor: "#CD5C5C",
      paddingVertical: 10,
      paddingHorizontal: 50,
      borderRadius: 5,
      marginTop: 20,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
  },
  partyButtonText : {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
    });