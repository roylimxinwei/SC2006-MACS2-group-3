import React, { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

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
    navigation.goBack(); // Go back to the previous screen
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0D9",
  },
  text: {
    fontSize: 20,
    position: "absolute",
    top: 45,
    left: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 8,
    width: 350,
    height: 150,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#CD5C5C",
    paddingVertical: 10,
    paddingHorizontal: 90,
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
    fontSize: 18,
  },
  stars: {
    flexDirection: "row",
    marginBottom: 10,
  },
  starContainer: {
    padding: 5,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  starSelected: {
    color: "#FFD700",
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 1,
  },
});

export default ReviewPage;
