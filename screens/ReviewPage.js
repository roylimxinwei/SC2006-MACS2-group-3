import React, { useState } from "react";
import {
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {styles} from '../css/ReviewPage_CSS';

const Star = ({ selected, onPress, index }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.starContainer}>
      <Text style={[styles.star, selected && styles.starSelected]}>★</Text>
    </TouchableOpacity>
  );
};

const ReviewPage = ({ navigation }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleReviewChange = (text) => {
    setReview(text);
  };

  const handleStarPress = (index) => {
    setRating(index + 1);
  };

  const handleSubmitReview = () => {
    // Add your logic to submit the review
    // For example, you can send the review and rating to your server or save it in the device storage
    console.log("Review submitted:", review, rating);
    navigation.navigate("HomeScreen"); // Go back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Write a review!</Text>
      <Image
        style={styles.image}
        source={require("../assets/restaurant.png")}
      />
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
  );
};

export default ReviewPage;
