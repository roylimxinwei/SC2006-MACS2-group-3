import { Dimensions, StyleSheet } from "react-native";
import colors from "../config/colors";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor:colors.primary,
    },
    welcomeText:{
        fontSize:18,
        
    },
    input:{
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginTop: 16,
        paddingHorizontal: 8,
       width:300,
    },

  });