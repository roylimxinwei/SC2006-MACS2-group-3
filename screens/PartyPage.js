import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "../css/PartyPage_CSS.js"; // Ensure these are correctly imported
import { auth, db } from "../firebase";

const PartyPage = ({ navigation }) => {
  const [totalCost, setTotalCost] = useState("");
  const [party, setParty] = useState({ guestNames: [], hostName: "" });
  const [guestNames, setGuestNames] = useState([]);
  const [guestIDs, setGuestIDs] = useState([]);
  const [hostName, setHostName] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    const fetchParty = async () => {
      //get guest names
      const ref = collection(db, "party");
      const q = query(ref, where("host", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const partyDetails = querySnapshot.docs[0].data(); // Assuming single party per user for simplicity
        setParty({ ...partyDetails, partyId: querySnapshot.docs[0].id });
        console.log(partyDetails);
        // Fetch member and host names
        const guestNamesPromises = partyDetails.guests.map(async (userId) => {
          const userDocRef = doc(db, "users", userId);
          const userDoc = await getDoc(userDocRef);
          return userDoc.exists()
            ? { userId: userId, name: userDoc.data().name }
            : null;
        });

        // Fetch member and host names
        const userDocRef = doc(db, "users", partyDetails.host);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setHostName(userDoc.data().name);
        }

        const guestsNames = await Promise.all(guestNamesPromises);
        setGuestNames(guestsNames.filter(Boolean)); // Filter out any null values

        // Get list of guest user IDs
        const guestIDs = guestsNames.map((guest) => guest.userId);
        setGuestIDs(guestIDs);
      }
    };

    fetchParty();
  }, [user.uid]);

  const handleSplitCost = async () => {
    // Ensure handleSplitCost is declared as async
    // checkEmpty();
    console.log("Party members at time of split:", guestNames);

    if (guestNames.length === 0) {
      Alert.alert("Empty Party", "Add some friends to start the party");
      console.log("Empty party");
      return;
    }

      if (!totalCost || totalCost <= 0 || isNaN(totalCost)) {
        Alert.alert("Error", "Enter a valid cost to split");
        console.log("Invalid total cost or empty party");
        return;
      }

      const splitCost = parseFloat((totalCost / (guestNames.length + 1)).toFixed(2));
      console.log(`Each member should pay: ${splitCost}`);

    try {
      // Use Promise.all to wait for all the update promises to resolve.
      await Promise.all(
        guestIDs.map(async (guest) => {
          // Ensure each callback is async as well
          const guestRef = doc(db, "users", user.uid, "friends", guest); // Assuming guest has a userId property
          await updateDoc(guestRef, {
            amountOwed: splitCost,
          });
        })
      );

      console.log("All guests' amount owed updated.");
      Alert.alert("Let's Party!", 'Each guest need to pay $' + splitCost);
    } catch (error) {
      console.error("Error updating guests' amount owed:", error);
    }
  };

  const checkEmpty = () => {
    if (guestNames.length === 0) {
      alert("You have no guests");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {/* <ScrollView> */}

      <View style={styles.container}>
        <Text style={styles.title}>Your Party</Text>

        <View style={styles.hostContainer}>
        <Text style={styles.hostTitle}>Host</Text>
        <View style={styles.host}>
          <Text style={styles.hostNames}>{hostName == '' ? "No party created" : hostName}</Text>
        </View>
        </View>

        <View style={styles.guestContainer}>
        <Text style={styles.guestTitle}>Guests</Text>
        <View style={styles.guest}>
          <FlatList
            data={guestNames}
            style={styles.list}
            keyExtractor={(item) => item.userId}
            renderItem={({ item }) => (
              <Text style={styles.guestNames}>{item.name}</Text>
            )}
            ListEmptyComponent={<Text style={styles.guestNames}>No guests added</Text>}
          />
        </View>
        </View>
        
          <TextInput
            placeholder="Enter total cost spent"
            keyboardType="numeric"
            value={totalCost}
            onChangeText={(text) => setTotalCost(text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSplitCost} style={styles.partyButton}>
            <Text style={styles.partyButtonText}>Split Cost</Text>
          </TouchableOpacity>
        
            <TouchableOpacity onPress={() => navigation.navigate('User')} style={styles.backButton}>
              <Text style={styles.backButtonText}>X</Text>
            </TouchableOpacity>
      </View>
          {/* </ScrollView> */}

    </TouchableWithoutFeedback>
  );
};

export default PartyPage;
