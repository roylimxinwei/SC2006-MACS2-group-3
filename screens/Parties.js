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
    ScrollView,
    Alert
  } from "react-native";
  import { auth, db } from "../firebase";
  import { styles } from "../css/Parties_CSS.js"; // Ensure these are correctly imported

  
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
        if(querySnapshot.size == 0){
            setIsLoading(false)
            setParties([])
        }
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
        console.log("item: "+item.guestList)
        const updatedGuestList = item.guestList.filter(
            (guest) => guest.userId !== user.uid
          );

          console.log("updated guest list" +updatedGuestList[0])

          let guestList = []

          for(let i = 0; i<updatedGuestList.length;i++){
            guestList.push(updatedGuestList[i].userId)
          }

          //reconstruct the item but change the guestList.
          const newItem = {
            ...item,
            guestList: guestList,
          };

          console.log(newItem)

        const updateDocRef = doc(db, "party", newItem.partyId);
        await updateDoc(updateDocRef, {
          host: newItem.hostId,
          guests: newItem.guestList
        }).then(()=>{
          Alert.alert("Success", "You have left this Party!")
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
              <Text style={styles.nameTitles}>Host</Text>
              <Text style={styles.hostName}>{item.hostName}</Text>
              <Text style={styles.nameTitles2}>Guests</Text>
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
                <Text style={styles.buttonText}>Leave this Party</Text>
              </TouchableOpacity>
            </View>
    
          ))}
    
        </ScrollView>
                      <TouchableOpacity onPress={() => navigation.navigate('User')} style={styles.backButton}>
              <Text style={styles.backButtonText}>X</Text>
            </TouchableOpacity>


    
      </View>
    );
  };
  

  export default Parties;
  