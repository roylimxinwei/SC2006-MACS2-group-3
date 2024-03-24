import { StyleSheet } from "react-native";  
import colors from '../config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    paddingTop:120,
    paddingBottom:300,
},
  ImageDesign: {
    borderRadius: 130,
    width: 250,
    height: 250,
    bottom: 50,
  },
  loginText: {
    color: "#7F2B0F",
    fontSize: 24,
    marginBottom: 20,
    bottom: 10,
  },
  input: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#CD5C5C",
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 5,
    marginBottom: 10,
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
  signUpText: {
    color: "#7F2B0F",
    textDecorationLine: "underline",
    fontSize: 16,
    top: 10,
  },
  padpad:{
    color: "transparent",
    backgroundColor: colors.primary,
  }
});
