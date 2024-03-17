import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../config/colors";

export default function Header(){
    return(
        <View style ={styles.container}>
            <Text style = {styles.text1}> Welcome XXX</Text>
            <Text style = {styles.text2}>Try something new today!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary, // primary colour
      },
    
    text1:{
        fontSize:26,
        paddingBottom:10,
        paddingTop:20,
        paddingLeft:5,
    },
    text2:{
        fontSize:20,
        paddingBottom:5,
        paddingLeft:12,
        marginBottom: 50,
    }

})