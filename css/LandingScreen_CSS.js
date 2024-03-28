import colors from '../config/colors';
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Centers objects according to the secondary axis
    justifyContent: "center", // Centers the object according to main axis
    backgroundColor: colors.secondary, // Background colour of secondary
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 20,
  },
  jiakText: {
    fontSize: 30,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 40,
  }, 
  button: {
    backgroundColor: "#CD5C5C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
