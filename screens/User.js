import React, { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth, db } from "../firebase";

const UserScreen = ({ navigation, route }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        setPoints(data.points);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const redeemPoints = () => {
    // Handle redeeming points here
    console.log("Redeeming points:", points);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.friendButton}
        onPress={() => navigation.navigate("FriendsPage")}
      >
        <Text style={styles.friendText}>Friends</Text>
      </Pressable>

      <Pressable
        style={styles.partyButton}
        onPress={() => navigation.navigate("PartyPage")}
      >
        <Text style={styles.partyText}>Party</Text>
      </Pressable>

      <Text style={styles.title}>Redeem Points</Text>
      <Text style={styles.pointsText}>Points: {points}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter points to redeem"
        value={points}
        onChangeText={(text) => setPoints(parseInt(text))}
        keyboardType="numeric"
      />
      <Button title="Redeem" onPress={redeemPoints} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  friendText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  friendButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    bottom: 20,
  },
  partyText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  partyButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    bottom: 10,
  },
});

export default UserScreen;
