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
  Image,
} from "react-native";
import { auth, db } from "../firebase";
import {styles} from '../css/UserPage_CSS';

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
      currentPoints = docSnap.data().points;
      console.log("current points: " + docSnap.data().points);
      console.log("redeem points: " + redeemPoints);
      if (docSnap.data().points < redeemPoints) {
        alert("You do not have enough points.");
        return; // Add a return statement here to exit the function if the user doesn't have enough points
      } else {
        currentPoints = currentPoints - redeemPoints;
      }
    }
    const updateDocRef = doc(db, "users", user.uid);
    await updateDoc(updateDocRef, {
      points: currentPoints,
    }).then((data) => {
      let dollars = redeemPoints * 0.1;
      setCurrentPoints(currentPoints);
      alert("Succesfully redeemed $" + dollars.toFixed(2));
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
      <Text style={styles.title}>Redeem Points</Text>
      
      <Image source={require("../assets/restaurant.png")} style={styles.icon}/>

      <View style={styles.container2}>
        <Text style={styles.pointsText}>Current Points: {currentPoints}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter points to redeem"
          value={redeemPoints}
          onChangeText={(text) => setRedeemPoints(parseInt(text))}
          keyboardType="numeric"
        />
        <Button title="Redeem" onPress={redeem}   />
      </View>

        <View style={styles.container3}>
         <Pressable
          style={styles.partyButton}
          onPress={() => navigation.navigate("FriendsPage")}
        >
          <Text style={styles.partyText}>Friends</Text>
        </Pressable>

        <Pressable
          style={styles.partyButton}
          onPress={() => navigation.navigate("PartyPage")}
        >
          <Text style={styles.partyText}>Split cost</Text>
        </Pressable>

        <Pressable
          style={styles.partyButton}
          onPress={() => navigation.navigate("Parties")}
        >
          <Text style={styles.partyText}>Parties</Text>
        </Pressable> 
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
};



export default UserScreen;
