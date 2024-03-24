import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0D9",
  },
  text: {
    fontSize: 20,
    position: "absolute",
    top: 20,
    left: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: 350,
    height: 75,
    marginBottom: 10,
  },
  ImageDesign: {
    width: 300,
    height: 300,
    bottom: 50,
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
  stars: {
    flexDirection: "row",
    marginBottom: 20,
  },
  starContainer: {
    padding: 5,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  starSelected: {
    color: "#FFD700",
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 1,
  },
});
