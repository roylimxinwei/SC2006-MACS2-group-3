import React from "react";
import { Text, View } from "react-native";
import { styles } from "../css/Header_CSS";

export default function Header({ user }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text1}> Welcome {user.email}</Text>
      <Text style={styles.text2}>Try something new today!</Text>
    </View>
    
  );
}
