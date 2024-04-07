import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const PartyPage = ({ route, navigation }) => {
  const [totalCost, setTotalCost] = useState(0);
  let partyMembers = route.params;

  const handleSplitCost = () => {
    let splitCost = totalCost / 2; //partyMembers.length;
    // Here, you can handle what to do with the split cost. For example, you can display it or save it.
    console.log(splitCost);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PartyPage</Text>
      <TextInput
        placeholder="Enter total cost spent"
        keyboardType="numeric"
        value={totalCost}
        onChangeText={(text) => setTotalCost(parseFloat(text))}
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
});

export default PartyPage;