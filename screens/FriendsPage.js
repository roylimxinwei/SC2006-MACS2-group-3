import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { db } from "../firebase";

const FriendsPage = () => {
  const [friendCode, setFriendCode] = useState("");
  const [friendName, setFriendName] = useState("");

  const addFriend = async () => {
    const friendRef = doc(db, "users", friendCode);
    const friendSnap = await getDoc(friendRef);
    if (friendSnap.exists()) {
      const friendData = friendSnap.data();
      const newFriend = {
        name: friendData.name,
        friendCode: friendCode,
        timestamp: Timestamp.now(),
      };
      await setDoc(doc(db, "friends", friendCode), newFriend);
      setFriendCode("");
      setFriendName("");
      alert("Friend added successfully!");
    } else {
      alert("Friend not found.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Friend</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter friend code"
          value={friendCode}
          onChangeText={(text) => setFriendCode(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter friend name"
          value={friendName}
          onChangeText={(text) => setFriendName(text)}
        />
        <Button title="Add Friend" onPress={addFriend} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "100%",
  },
});

export default FriendsPage;
