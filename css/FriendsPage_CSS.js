import colors from "../config/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop:30,
        color:"#7F2B0F",
      },
      input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: "100%",
      },
      friendsList: {
        width: "100%",
        marginTop: 20,
        paddingBottom:200,
        flex: 1,
      },
      friendItem: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.tertiary, 
        borderRadius: 5,
      },
      friendUsername: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
      },
      amountOwed: {
        fontSize: 16,
      },
      button: {
        backgroundColor: colors.secondary,
        paddingVertical: 5,
        paddingHorizontal: 45,
        borderRadius: 5,
        marginBottom: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginLeft: "auto",
        top: 5,
      },
      buttonInParty: {
        backgroundColor: "green",
        paddingVertical: 5,
        paddingHorizontal: 45,
        borderRadius: 5,
        marginBottom: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginLeft: "auto",
        top: 5,
      } ,
      button2: {
        backgroundColor: "#CD5C5C",
        paddingVertical: 12,
        paddingHorizontal: 45,
        borderRadius: 5,
        marginBottom: 30,
        marginTop: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginLeft: "auto",
        top: 5,

      },
      button3: {
        backgroundColor: "#CD5C5C",
        paddingVertical: 12,
        paddingHorizontal: 45,
        borderRadius: 5,
        // marginBottom: 60,
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
        fontWeight: "bold",
      },
      buttonText2: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
      },
      buttonImage: {
        width: 70, // Set the width of your button image
        height: 70, // Set the height of your button image
        borderRadius: 70, // Makes the image round
        left: -5,
      },
      userInfo: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        marginLeft: 10,
      },
      nameOwe: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        marginLeft: 10,
        top: 15,
      },
      pad: {
        color: "transparent",
        backgroundColor: colors.primary,
        paddingBottom: 200,
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