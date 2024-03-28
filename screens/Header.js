import React from "react";
import { Text, View } from "react-native";
import { styles } from "../css/Header_CSS";

export default function Header({ username }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}> Welcome {username}</Text>
      <Text style={styles.text2}>Try something new today!</Text>
    </View>
    
  );
}
