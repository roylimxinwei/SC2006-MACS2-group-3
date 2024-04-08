import { useIsFocused } from "@react-navigation/native";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  updateDoc
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { auth, db } from "../firebase";
import { styles } from "../css/FriendsPage_CSS.js";

const FriendsPage = ({navigation}) => {
  const [friendCode, setFriendCode] = useState("");
  const [friendName, setFriendName] = useState("");
  let [currentUsers, setCurrentUsers] = useState([]);
  let [friends, setFriends] = useState([]);
  let [party, setParty] = useState([]);
  

  let user = auth.currentUser;
  const isFocused = useIsFocused();

  const fetchData = async () => {
    //get all users to check if they are your friends
    let tempCurrentUsers = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      tempCurrentUsers.push({
        referralCode: doc.data().referralCode,
        userId: doc.id,
      });
    });

    setCurrentUsers(tempCurrentUsers);

    //https://firebase.google.com/docs/firestore/query-data/queries
   const tempGuests = await getParty();

    //get all your current friends(and check whether they are in a party) and put them in the scrollview.
    let tempFriends = [];
    let isInParty = false;
    const querySnapshot3 = await getDocs(
      collection(db, "users", user.uid, "friends")
    );

    querySnapshot3.forEach((doc) => {
       isInParty = false;
      //check if the friend is also in the party:
      console.log("length"+tempGuests)
      if(tempGuests.length > 0){
      for (let x = 0; x < tempGuests.guests.length; x++) {
        console.log("guest: "+tempGuests.guests[x])
        console.log("doc.id: "+doc.id)
        if (doc.id == tempGuests.guests[x]) {
          console.log("isinparty true")
          isInParty = true;
        }
      } 
    }
      tempFriends.push({
        amountOwed: doc.data().amountOwed,
        name: doc.data().name,
        //userId will be useful for handleAddToParty
        userId: doc.id,
        isInParty: isInParty,
      });
      
    });
    setFriends(tempFriends);
    console.log(tempFriends)
  };

  const getParty = async () =>{
     //https://firebase.google.com/docs/firestore/query-data/queries
     let tempParty = [];
     const ref = collection(db, "party");
     const q = query(ref, where("host", "==", user.uid));
     const querySnapshot2 = await getDocs(q);
     querySnapshot2.forEach((doc) => {
       // doc.data() is never undefined for query doc snapshots
       partyDetails = {
         partyId: doc.id,
         host: doc.data().host,
         guests: doc.data().guests,
         partyMembers: doc.data().groupMembers
       }
       tempParty = partyDetails
       tempParty.length = 1
     });
       setParty(tempParty);
     console.log("party details: "+tempParty.partyId);
     return tempParty;
  }

  const addFriend = async () => {
    let codeDoesNotExist = true;
    let friendId = "";

    //for all current users that is in the app, we check if the QR code is legit so we can add
    //as friend.
    for (let i = 0; i < currentUsers.length; i++) {
      if (friendCode == currentUsers[i].referralCode) {
        codeDoesNotExist = false;
        friendId = currentUsers[i].userId;
      }
    }
    if (!codeDoesNotExist) {
      await setDoc(doc(db, "users", user.uid, "friends", friendId), {
        name: friendName,
        amountOwed: 0,
      }).then(() => {});

      let currentUsername = "";
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        currentUsername = docSnap.data().name;
      }
      //for the friend, we add the current user as friend too.
      await setDoc(doc(db, "users", friendId, "friends", user.uid), {
        name: currentUsername,
        amountOwed: 0,
      }).then(() => {});

      alert("Friend added");
      fetchData();
    } else {
      alert("Please enter a valid Eater's Code");
    }
  };
  //add someone to your party.
  const handleAddToParty = async (friend,index) => {

    setFriends((prevFriends) => {
      const newFriends = [...prevFriends];  
      newFriends[index].isInParty = true;
      return newFriends;
  
    });    

  };

  const handleRemoveFromParty = (friend,index) => {

    setFriends((prevFriends) => {
      const newFriends = [...prevFriends];  
      newFriends[index].isInParty = false;
      return newFriends;
  
    });
  
  };

  const confirmParty = async () => {

    const tempParty = []

    for(let i = 0;i<friends.length; i++)
    {
        if(friends[i].isInParty == true){
          tempParty.push(friends[i].userId)
        }
  
    }

    if(party.partyId != null){  
      console.log("update doc")
      const updateDocRef = doc(db, "party", party.partyId);
      await updateDoc(updateDocRef, {
        host: user.uid,
        guests: tempParty
      }).then(()=>{
        alert("Party Setting Saved!")
        getParty();
      });

    }
    else{
    await addDoc(collection(db, "party"), {
      host: user.uid,
      guests: tempParty
    }).then(() => {
      alert("Party Setting Saved!")
      getParty();
    });
  }
  }

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [navigation, isFocused]);

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
        {/* ScrollView for friends list */}
        {
          <ScrollView style={styles.friendsList}>
            {friends.map((friend, index) => (
              <View key={index} style={styles.friendItem}>
                {/* <Image source={place.imageUrl} style={styles.ImageDesign} /> */}
                <View style={styles.userInfo}>
                  <Image
                    style={styles.buttonImage}
                    source={require("../assets/profileicon.png")} // replace with your button image path
                  />
                  <View style={styles.nameOwe}>
                    <Text style={styles.friendUsername}>
                      Name: {friend.name}
                    </Text>
                    <Text style={styles.friendUsername}>
                      Amount Owed: ${friend.amountOwed}
                    </Text>
                  </View>
                </View>

                {/* If friend is not in party with user, allow them to add friend party. */}
                {!friend.isInParty && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleAddToParty(friend,index)}
                  >
                    <Text style={styles.buttonText}>Add to Party {friend.isInParty}</Text>
                  </TouchableOpacity>
                )}

                {/* If friend is in party with user, allow them to remove friend from party. */}
                {friend.isInParty && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleRemoveFromParty(friend,index)}
                  >
                    <Text style={styles.buttonText}>Remove from Party {friend.isInParty}</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>
        } 
        <TouchableOpacity
                    style={styles.button2}
                    onPress={() => confirmParty()}
                  >
                    <Text style={styles.buttonText2}>Confirm Party</Text>
                  </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FriendsPage;
