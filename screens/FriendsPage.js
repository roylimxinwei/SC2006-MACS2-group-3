import React, {useState, useEffect} from "react";
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import { auth, db, storage} from '../firebase';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, Timestamp, deleteDoc, addDoc, query, where} from "firebase/firestore"; 
import { useIsFocused } from "@react-navigation/native";
// import { styles } from "../css/FriendsPage_CSS.js";  



const FriendsPage = (navigation) => {
  const [friendCode, setFriendCode] = useState("");
  const [friendName, setFriendName] = useState("");
  let [currentUsers, setCurrentUsers] = useState([]);
  let [friends, setFriends] = useState([]);
  let [party, setParty] = useState([]);

  let user = auth.currentUser;
  const isFocused = useIsFocused();

  const fetchData = async () =>{

    //get all users to check if they are your friends
    let tempCurrentUsers = [];
		const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {

			tempCurrentUsers.push({
			referralCode: doc.data().referralCode,
			userId: doc.id
		})
		
	  })

	  setCurrentUsers(tempCurrentUsers)

        //check whether user is in a party. If so, get those that are in the party.
        //the information will be useful when we display the friend scrollview.
          // let tempParty = [];
          // const querySnapshot3 = await getDocs(collection(db, "party"));
          // querySnapshot3.forEach((doc) => {
          //   tempParty = doc.data().groupMembers
          //   console.log(tempParty)
          // for(let i = 0; i < tempParty.length; i++){
          //   if(tempParty[i] == user.uid){
          //     //we break because we found the party that we want.
          //     setParty(tempParty);
          //       break;
          //   }
          // }
          
          // })
            
          
    //https://firebase.google.com/docs/firestore/query-data/queries
    let tempParty = [];
    const ref = collection(db, "party");
    const q = query(ref, where("groupMembers", "array-contains", user.uid));
    const querySnapshot2 = await getDocs(q);
    querySnapshot2.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tempParty = doc.data().groupMembers
      setParty(tempParty);
      console.log(doc.data())
      console.log("hi")
    });

    

    //get all your current friends and put them in the scrollview.
    let tempFriends = [];
		const querySnapshot3 = await getDocs(collection(db, "users",user.uid,"friends"));
    querySnapshot3.forEach((doc) => {
        let isInParty = false;
        //check if the friend is also in the party:
        for(let x=0; x< tempParty.length; x++){
          if(doc.id == tempParty[x]){
            isInParty = true;
            break;
          }
        }

    tempFriends.push({
			amountOwed: doc.data().amountOwed,
			name: doc.data().name,
      //userId will be useful for handleAddToParty
      userId: doc.id,
      isInParty: isInParty
		})
		
	  })

    setFriends(tempFriends)


	}

  const addFriend = async () => {
    let codeDoesNotExist = true;
    let friendId = "";

    //for all current users that is in the app, we check if the QR code is legit so we can add
    //as friend.
    for(let i=0; i<currentUsers.length; i++){

      if(friendCode == currentUsers[i].referralCode){
        codeDoesNotExist = false;
        friendId = currentUsers[i].userId;
    }

  }
    if(!codeDoesNotExist){
    await setDoc(doc(db, "users", user.uid, "friends", friendId), {
      name: friendName,
      amountOwed: 0,
    }).then(()=>{
      
    }); 

    let currentUsername = "";
    const docRef = doc(db, "users", user.uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
      currentUsername = docSnap.data().name

    }
    //for the friend, we add the current user as friend too.
    await setDoc(doc(db, "users", friendId, "friends", user.uid), {
      name: currentUsername,
      amountOwed: 0,  
    }).then(()=>{
      
    }); 

    alert("Friend added")
    fetchData();
  }
  else{
    alert("Please enter a valid Eater's Code")
  }

} 
  //add someone to your party.
  const handleAddToParty = async (friend) => {
    let groupMembers = []
    //current implementation is only for a 2 person party. Further considerations for
    //how handleAddToParty should be done.
    groupMembers.push(user.uid);
    groupMembers.push(friend.userId);

    await addDoc(collection(db, "party"), {
      groupMembers: groupMembers
    }).then(()=>{ 
      fetchData();
    }); 

  }

  const handleRemoveFromParty = async (friend) => {



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
        { <ScrollView style={styles.friendsList}>
          {friends.map((friend, index) => (
            <View key={index} style={styles.friendItem}>
               {/* <Image source={place.imageUrl} style={styles.ImageDesign} /> */}
              <Text style={styles.friendUsername}>Name: {friend.name}</Text>
              <Text style={styles.friendUsername}>Amount Owed: ${friend.amountOwed}</Text>

              {/* If friend is not in party with user, allow them to add friend party. */}
              {!friend.isInParty && <TouchableOpacity 
            style={styles.button}
            onPress={() => handleAddToParty(friend)}>
            <Text style={styles.buttonText}
            
            >Add to Party
            </Text>
          </TouchableOpacity>}

          {/* If friend is in party with user, allow them to remove friend from party. */}
              {friend.isInParty && <TouchableOpacity 
            style={styles.button}
            onPress={() => handleRemoveFromParty(friend)}>
            <Text style={styles.buttonText}
            
            >Remove from Party
            </Text>
          </TouchableOpacity>}

          </View>

        ))}
        </ScrollView>
         }
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
},
buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
}
});

export default FriendsPage;