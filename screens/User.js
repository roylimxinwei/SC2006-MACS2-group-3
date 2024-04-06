import { useIsFocused } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { auth, db } from "../firebase";

const UserScreen = ({ navigation, route }) => {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [redeemPoints, setRedeemPoints] = useState(0);

  const isFocused = useIsFocused();
  let user = auth.currentUser;

  const fetchData = async () => {
    // setCurrentUser(user)
    // User is signed in
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    if (docSnap.exists()) {
      setCurrentPoints(docSnap.data().points);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [navigation, isFocused]);

  const redeem = async () => {
    // Handle redeeming points here
    console.log("Redeeming points:", redeemPoints);

    let currentPoints = 0;
    const docRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
      currentPoints = docSnap.data().points
      console.log("current points: "+docSnap.data().points)
      console.log("redeem points: "+redeemPoints)
      if(docSnap.data().points < redeemPoints){
      alert("You do not have enough points.")
      }
      else{
      currentPoints = currentPoints - redeemPoints;
      }

		}
      const updateDocRef = doc(db, "users", user.uid);
      await updateDoc(updateDocRef, {
        points: currentPoints
      }).then((data)=>{
        let dollars = redeemPoints * 0.1
        setCurrentPoints(currentPoints)
        alert("Succesfully redeemed $"+dollars.toFixed(2))
   });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
        <Text style={styles.pointsText}>Points: {currentPoints}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter points to redeem"
          value={redeemPoints}
          onChangeText={(text) => setRedeemPoints(parseInt(text))}
          keyboardType="numeric"
        />
        <Button title="Redeem" onPress={redeem} />
      </View>
    </TouchableWithoutFeedback>
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
