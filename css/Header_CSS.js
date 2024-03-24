import colors from "../config/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary, // primary colour
      },
    
    text1:{
        fontSize:20,
        color:"#7F2B0F",
        paddingBottom:10,
        paddingTop:20,
        paddingLeft:5,
    },
    text2:{
        fontSize:20,
        color:"#7F2B0F",
        paddingBottom:5,
        paddingLeft:12,
        marginBottom: 50,
    }

})