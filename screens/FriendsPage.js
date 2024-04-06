import React, {useState, useEffect} from "react";
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ScrollView
} from "react-native";
import { auth, db, storage} from '../firebase';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, Timestamp, deleteDoc, addDoc} from "firebase/firestore"; 
import { useIsFocused } from "@react-navigation/native";


const FriendsPage = (navigation) => {
  const [friendCode, setFriendCode] = useState("");
  const [friendName, setFriendName] = useState("");
  let [currentUsers, setCurrentUsers] = useState([]);
  let [friends, setFriends] = useState([]);

  let user = auth.currentUser;
  const isFocused = useIsFocused();

  const fetchData = async () =>{

		let user = auth.currentUser;
    let tempCurrentUser = [];
		const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
		console.log(doc.data())
		console.log(doc.id)
			tempCurrentUser.push({
			referralCode: doc.data().referralCode,
			userId: doc.id
		})
		
	  })

	  setCurrentUsers(tempCurrentUser)

    let tempFriends = [];
		const querySnapshot2 = await getDocs(collection(db, "users",user.uid,"friends"));
      querySnapshot2.forEach((doc) => {
		console.log(doc.data())
		console.log(doc.id)
    tempFriends.push({
			amountOwed: doc.data().amountOwed,
			name: doc.data().name
		})
		
	  })

    setFriends(tempFriends)

	}

  const addFriend = async () => {
    let codeDoesNotExist = true;
    let friendId = "";
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
      alert("Friend added")
    }); 
  }
  else{
    alert("Please enter a valid Eater's Code")
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
        { <ScrollView style={styles.friendsList}>
          {friends.map((friend, index) => (
            <View key={index} style={styles.friendItem}>
               {/* <Image source={place.imageUrl} style={styles.ImageDesign} /> */}
              <Text style={styles.friendUsername}>{friend.name}</Text>
              <Text style={styles.friendUsername}>{friend.amountOwed}</Text>
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
});

export default FriendsPage;