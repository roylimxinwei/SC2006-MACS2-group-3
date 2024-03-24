import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import { haversineDistance } from "../config/distanceCalculator";
import GlobalApi from "../config/GlobalApi";

const UserReviewScreen = ({ route }) => {
    const { placeId } = route.params;
    const [reviews, setReviews] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      };
  
      getLocation();
    }, []);
  
    useEffect(() => {
      if (placeId && userLocation) {
        const params = {
          place_id: placeId,
          key: API_KEY,
          fields: "reviews",
        };
  
        GlobalApi.GetReviews(params)
          .then((response) => {
            const reviewsData = response.result.reviews || [];
            setReviews(reviewsData);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching reviews:", error);
            setError(error);
            setLoading(false);
          });
      }
    }, [placeId, userLocation]);
  
    const displayReviews = () => {
      if (loading) {
        return <Text>Loading reviews...</Text>;
      }
  
      if (error) {
        return <Text>Error fetching reviews. Please try again later.</Text>;
      }
  
      if (reviews.length > 0) {
        return (
          <ScrollView style={styles.reviewsContainer}>
            {reviews.map((review, index) => (
              <View style={styles.reviewContainer} key={index}>
                <Text style={styles.reviewAuthor}>
                  {review.author_name} - {review.rating} ⭐
                </Text>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </ScrollView>
        );
      } else {
        return <Text>No reviews found.</Text>;
      }
    };
  
    return (
      <View style={styles.container}>
        {displayReviews()}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  reviewsContainer: {
    flex: 1,
  },
  reviewContainer: {
    marginBottom: 16,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewText: {
    fontSize: 14,
  },
});

export default UserReviewScreen;