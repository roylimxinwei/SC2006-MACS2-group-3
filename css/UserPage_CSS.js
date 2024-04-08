import { StyleSheet } from "react-native";
import colors from "../config/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },  
  container2: {
    marginBottom:70,
  }, 
  pointsText:{
    fontWeight: "bold",
    textAlign:'center',
    marginBottom:20,
    fontSize: 18,
    color:"#7F2B0F",
  },
  icon:{
    height:300,
    width:300,
  },
  container3: {
    flexDirection:'row',
    gap:40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    top: 70,
    position: "absolute",
    color:"#7F2B0F",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 300,
    marginVertical: 10,
    paddingHorizontal: 10,
  },

  partyText: {
     color: "#FFFFFF", 
     fontSize: 16, 
     fontWeight: "bold" 
    },
  partyButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    bottom: 20,
    backgroundColor:colors.tertiary,
  },
});
