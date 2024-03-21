import React from "react";
import { 
  Text, 
  View, 
  FlatList, 
  Image,
  TouchableOpacity
} from "react-native";
import {styles} from "../css/DiningHistoryPage_CSS";

// Mock data for the history of dining
const diningHistoryData = [
  {
    id: '1',
    name: 'ARestaurantName',
    image: require('../assets/restaurant1_placeholder.jpg'), // replace with actual image path
    review: 'Best food I had in a century',
    date: '8/2/2024',
    rating: 3.5,
  },
  {
    id: '2',
    name: 'AnotherRestaurantName',
    image: require('../assets/restaurant2_placeholder.png'), // replace with actual image path
    review: 'Food is great but Utena chan is greater ~',
    date: '20/12/2023',
    rating: 4,
  },
  // Add more items here
];


const DiningHistoryPage = ({navigation}) => {

  const handleSeeAllReview = () => {
  }

  const handleEditReview = () => {
    // TBD: delete the original review first
    // then create a new review by navigating to the review page
    navigation.navigate("ReviewPage")
  }

  const handleDeleteReview = () => {
  }

  // Render each item in the history list
  const renderHistoryItem = ({ item }) => (
    <View style={styles.card}>
      <Image style={styles.image} source={item.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          {/* We render the stars based on the rating here */}
          {Array.from({ length: 5 }, (_, index) => (
            <Text key={index} style={styles.star}>
              {index < Math.floor(item.rating) ? '★' : '☆'}
            </Text>
          ))}
        </View>
        <Text style={styles.review}>{item.review}</Text>
        <Text style={styles.date}>{item.date}</Text>

        {/* Button Container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleSeeAllReview}
          >
            <Text style={styles.buttonText}>See All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleEditReview}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleDeleteReview}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Dining History</Text>
      <FlatList
        data={diningHistoryData}
        renderItem={renderHistoryItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default DiningHistoryPage;
