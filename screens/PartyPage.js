import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
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
  const [party, setParty] = useState({ partyMembers: [] });
  const [memberNames, setMemberNames] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchParty = async () => {
      const ref = collection(db, "party");
      const q = query(ref, where("groupMembers", "array-contains", user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const partyDetails = querySnapshot.docs[0].data(); // Assuming single party per user for simplicity
        setParty({ ...partyDetails, partyId: querySnapshot.docs[0].id });

        // Fetch member names
        const memberNamesPromises = partyDetails.groupMembers.map(
          async (userId) => {
            const userDocRef = doc(db, "users", userId);
            const userDoc = await getDoc(userDocRef);
            return userDoc.exists()
              ? { userId: userId, name: userDoc.data().name }
              : null;
          }
        );

        const membersWithName = await Promise.all(memberNamesPromises);
        setMemberNames(membersWithName.filter(Boolean)); // Filter out any null values
      }
    };

    fetchParty();
  }, [user.uid]);

  const handleSplitCost = () => {
    console.log("Party members at time of split:", memberNames);
    // Using memberNames.length to ensure we're working with the initialized and populated array
    if (!totalCost || memberNames.length === 0) {
      console.log("Invalid total cost or empty party");
      return;
    }

    const splitCost = parseFloat(totalCost) / memberNames.length;
    console.log(`Each member should pay: ${splitCost}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Party Page</Text>
      <FlatList
        data={memberNames}
        keyExtractor={(item) => item.userId}
        renderItem={({ item }) => (
          <Text style={styles.memberName}>{item.name}</Text>
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
  memberName: {
    fontSize: 18,
    marginTop: 8,
  },
});

export default PartyPage;
