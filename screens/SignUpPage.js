// SignUpPage.js

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SignUpPage = () => {
  return (
    <View style={styles.container}>
      <Text>This is the sign up page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0D9", // Replace with your desired background color
  },
});

export default SignUpPage;
