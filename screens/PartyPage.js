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
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth, db } from "../firebase"; // Ensure these are correctly imported

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
    checkEmpty();
    console.log("Party members at time of split:", guestNames);

    if (!totalCost || guestNames.length === 0) {
      console.log("Invalid total cost or empty party");
      return;
    }

    const splitCost = parseFloat(totalCost) / (guestNames.length + 1);
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
      alert("success!");
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
    <View style={styles.container}>
      <Text style={styles.title}>Party Page</Text>
      <Text style={styles.guestNames}>Host Name: {hostName}</Text>

      <Text style={styles.guestNames}>Guest List:</Text>
      <FlatList
        data={guestNames}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => (
          <Text style={styles.guestNames}>{item.name}</Text>
        )}
      />
      <TextInput
        placeholder="Enter total cost spent"
        keyboardType="numeric"
        value={totalCost}
        onChangeText={(text) => setTotalCost(text)}
        style={styles.input}
      />
      <Button title="Split Cost" onPress={handleSplitCost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 16,
    paddingHorizontal: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  guestNames: {
    fontSize: 18,
    marginTop: 8,
  },
});

export default PartyPage;
