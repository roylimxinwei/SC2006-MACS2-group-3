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
// import { styles } from "../css/FriendsPage_CSS.js";

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
   const tempParty = await getParty();

    //get all your current friends(and check whether they are in a party) and put them in the scrollview.
    let tempFriends = [];
    let isInParty = false;
    const querySnapshot3 = await getDocs(
      collection(db, "users", user.uid, "friends")
    );

    querySnapshot3.forEach((doc) => {
       isInParty = false;
      //check if the friend is also in the party:
      console.log("length"+tempFriends)
      if(tempParty.length > 0){
      for (let x = 0; x < tempParty.partyMembers.length; x++) {
        console.log("member: "+tempParty.partyMembers[x])
          console.log("doc id: "+doc.id)
        if (doc.id == tempParty.partyMembers[x]) {

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
     const q = query(ref, where("groupMembers", "array-contains", user.uid));
     const querySnapshot2 = await getDocs(q);
     querySnapshot2.forEach((doc) => {
      console.log("foreach")
       // doc.data() is never undefined for query doc snapshots
       partyDetails = {
         partyId: doc.id,
         partyMembers: doc.data().groupMembers
       }
       tempParty = partyDetails
       tempParty.length = 1
     });
       setParty(tempParty);
     console.log("party details: "+tempParty.partyMembers);
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

    if(party.length > 0 && party.partyMembers.length > 0 ){  
      tempParty.push(user.uid)
      const updateDocRef = doc(db, "party", party.partyId);
      await updateDoc(updateDocRef, {
        groupMembers: tempParty
      }).then(()=>{
        alert("Party Setting Saved!")
      });

    }
    else{
      tempParty.push(user.uid)
    await addDoc(collection(db, "party"), {
      groupMembers: tempParty,
    }).then(() => {
      alert("Party Setting Saved!")
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
                    style={styles.button}
                    onPress={() => confirmParty()}
                  >
                    <Text style={styles.buttonText}>Confirm Party</Text>
                  </TouchableOpacity>
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
  friendsList: {
    width: "100%",
    marginTop: 20,
  },
  friendItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  friendUsername: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  amountOwed: {
    fontSize: 16,
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
  buttonImage: {
    width: 70, // Set the width of your button image
    height: 70, // Set the height of your button image
    borderRadius: 70, // Makes the image round
    left: -5,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  nameOwe: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
    top: 15,
  },
});

export default FriendsPage;
