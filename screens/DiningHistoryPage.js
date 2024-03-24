import React, {useState, useEffect} from "react";
import { 
  Text, 
  View, 
  FlatList, 
  Image,
  TouchableOpacity,
} from "react-native";
import {styles} from "../css/DiningHistoryPage_CSS";

import { auth, db, storage} from '../firebase';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, Timestamp} from "firebase/firestore"; 

// const diningHistoryData = [
//   {
//     id: '1',
//     name: 'ARestaurantName',
//     image: require('../assets/restaurant1_placeholder.jpg'), // replace with actual image path
//     review: 'Best food I had in a century',
//     date: '8/2/2024',
//     rating: 3.5,
//   },
//   {
//     id: '2',
//     name: 'AnotherRestaurantName',
//     image: require('../assets/restaurant2_placeholder.png'), // replace with actual image path
//     review: 'Food is great but Utena chan is greater ~',
//     date: '20/12/2023',
//     rating: 4,
//   },
//   // Add more items here
// ];

const DiningHistoryPage = ({navigation}) => {

  const [diningHistoryData, setDiningHistoryData] = useState([]);


  const fetchData = async () =>{
    
    let user = auth.currentUser;
    const updatedData = [];
    const querySnapshot = await getDocs(collection(db, "users", user.uid, "diningHistory"));
      querySnapshot.forEach((doc) => {

        console.log("date:")
        let date = doc.data().date.toDate();
        let dateFormat = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        updatedData.push({
          id : doc.id,
          name: doc.data().name,
          image: doc.data().imageUrl, // replace with actual image path
          review: doc.data().review,
          date: dateFormat.toString(),
          rating: doc.data().rating,
    })

      }); 
      console.log(updatedData)
      setDiningHistoryData(updatedData)
}

useEffect(() => {
  fetchData();
}, []);

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
      <Image style={styles.image} source={{ uri: item.image }} 
      resizeMode="cover"
      />
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
