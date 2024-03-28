import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {styles} from '../css/ReviewPage_CSS';

import { auth, db } from '../firebase';
import { doc, setDoc, getDocs, getDoc,addDoc, updateDoc, serverTimestamp ,Timestamp, collection} from "firebase/firestore"; 

const Star = ({ selected, onPress, index }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.starContainer}>
      <Text style={[styles.star, selected && styles.starSelected]}>★</Text>
    </TouchableOpacity>
  );
};

const ReviewPage = ({ route, navigation }) => {

  const selectedRestaurant = route.params;
  console.log(selectedRestaurant)
  console.log(selectedRestaurant.id)


  let user = auth.currentUser;

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewChange = (text) => {
    setReview(text);
  };

  const handleStarPress = (index) => {
    setRating(index + 1);
  };

  const handleSubmitReview = async () => {
    //selectedRestaurant.id can only be passed from DiningHistory.
    //If user is not editting their dining history, we will create a new document.
    if(selectedRestaurant.id == undefined){
  
      const docRef = await addDoc(collection(db, "users", user.uid, "diningHistory"), {
        date: Timestamp.now(),
        imageUrl: selectedRestaurant.imageUrl,
        name: selectedRestaurant.name,
        rating: rating,
        review: review
      });

    }
    //edit the current review and rating.
    else{
      const docRef = doc(db, "users", user.uid, "diningHistory", selectedRestaurant.id);
      await updateDoc(docRef, {
        date: Timestamp.now(),
        imageUrl: selectedRestaurant.imageUrl,
        name: selectedRestaurant.name,
        rating: rating,
        review: review
});

    }

    alert("Review submitted.");
    navigation.navigate("HomeScreen"); // Go back to the previous screen
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.container} behavior="padding" enabled>
          <Text style={styles.text}>How was...</Text>
          <Image source={selectedRestaurant.imageUrl} style={styles.ImageDesign} />
          <View style={styles.stars}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                selected={i < rating}
                onPress={() => handleStarPress(i)}
              />
            ))}
          </View>
          <TextInput
            style={styles.input}
            value={review}
            onChangeText={handleReviewChange}
            placeholder="Write your review here..."
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity onPress={handleSubmitReview} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ReviewPage
