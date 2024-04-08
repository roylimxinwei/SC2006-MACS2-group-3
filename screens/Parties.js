import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc
  } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
  import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView
  } from "react-native";
  import { auth, db } from "../firebase"; // Ensure these are correctly imported

  
  const Parties = ({ navigation }) => {
    const [parties, setParties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [guestNames, setGuestNames] = useState([]);
    const user = auth.currentUser;

    
    const fetchParties = async () => {
        //get guest names
        let tempParties = [];
        const ref = collection(db, "party");
        const q = query(ref, where("guests", "array-contains", user.uid));
        const querySnapshot = await getDocs(q);
        await querySnapshot.forEach(async (document) => {
            const partyDetails = document.data();
            partyDetails.partyId = document.id;
            partyDetails.hostId =  document.data().host
          // Fetch member and host names
          const guestListPromises = partyDetails.guests.map(
            async (userId) => {
              const userDocRef = doc(db, "users", userId);
              const userDoc = await getDoc(userDocRef);
              return userDoc.exists()
                ? { userId: userId, name: userDoc.data().name }
                : null;
            }
          );
  
          // Fetch member and host namesr
          
          const userDocRef = doc(db, "users", partyDetails.host);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            partyDetails.hostName = userDoc.data().name
          }
        console.log("pushed")
          const guestList = await Promise.all(guestListPromises);
           tempParties.push({
            partyId: partyDetails.partyId,
            hostName: partyDetails.hostName,
            hostId: partyDetails.hostId,
            guestList: guestList
        });
        console.log(querySnapshot.size)
            if(tempParties.length == querySnapshot.size){
            setParties(tempParties);
            console.log("set parties")
            console.log(tempParties)
            console.log("loading finished")
            setIsLoading(false)
            }
            else
            setIsLoading(true)
        });

      };
    
    const removeFromParty = async (item) =>{

        //we filter out the record where it is the user's id. 
        // console.log(item)
        const updatedGuestList = item.guestList.filter(
            (guest) => guest.userId !== user.uid
          );

          //reconstruct the item but change the guestList.
          const newItem = {
            ...item,
            guestList: updatedGuestList,
          };

          console.log(newItem)

        const updateDocRef = doc(db, "party", newItem.partyId);
        await updateDoc(updateDocRef, {
          host: newItem.hostId,
          guests: newItem.guestList
        }).then(()=>{
          alert("Removed From Party!")
          fetchParties();
        });
    }

    useEffect(() => {


        fetchParties()
        console.log("useeffect")
    }, []);

    return (
        console.log("rendered"),
        <View style={styles.container}>
        <Text style={styles.title}>Joined Parties</Text>
    
        <ScrollView style={styles.scrollView} keyExtractor={(item) => item.partyId}>
          {parties.map((item) => (
            <View key={item.partyId} style={styles.partyItem}>
              <Text style={styles.hostName}>Host Name: {item.hostName}</Text>
              <Text style={styles.guestNames}>Guest List:</Text>
              <ScrollView style={styles.guestListScrollView}>
                {item.guestList.map((guest) => (
                  <Text key={guest.userId} style={styles.guestNames}>
                    {guest.name}
                  </Text>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={styles.button}
                onPress={() => removeFromParty(item)}
              >
                <Text style={styles.buttonText}>Remove from Party</Text>
              </TouchableOpacity>
            </View>
    
          ))}
    
        </ScrollView>

    
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
        backgroundColor: "#CD5C5C",
        paddingVertical: 5,
        paddingHorizontal: 45,
        borderRadius: 5,
        marginBottom: 10,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginLeft: "auto",
        top: 5,
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 12,
      },
    guestNames: {
      fontSize: 18,
      marginTop: 8,
    },
    hostName:{
        fontSize: 22,
      marginTop: 8,
    },
    partyItem: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
      },
  });
  
  export default Parties;
  