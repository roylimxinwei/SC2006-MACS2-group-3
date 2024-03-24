import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0D9",
  },
  text: {
    fontSize: 25,
    color:"#7F2B0F",
    position: "absolute",
    top: 40,
    left: 30,
    paddingBottom:20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: 350,
    height: 75,
    marginBottom: 30,
    top:130,
  },
  ImageDesign: {
    width: 280,
    height: 280,
    top:100,
  },
  button: {
    backgroundColor: "#CD5C5C",
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 5,
    marginBottom: 500,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    top:130,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop:-20,
  },
  starContainer: {
    padding: 5,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
    top:130,
  },
  starSelected: {
    color: "#FFD700",
  },
  image: {
    width: 300,
    height: 300,
  },
  scrollViewContainer: {
    flex: 5,
    backgroundColor: "#F5FCFF",
    backgroundColor: "#FFF0D9",
  },

});
