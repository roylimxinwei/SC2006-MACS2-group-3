//notification.js
import React from "react";
import { Button, Text, View } from "react-native";

const Notification = ({ isVisible, setIsVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationText}>
        A nearby place is within 500 meters!
      </Text>
      <Button title="Close" onPress={() => setIsVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notificationText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Notification;
