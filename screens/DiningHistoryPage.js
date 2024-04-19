import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	FlatList,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native";
import { styles } from "../css/DiningHistoryPage_CSS";

import { auth, db, storage } from "../firebase";
import {
	doc,
	setDoc,
	getDoc,
	updateDoc,
	getDocs,
	collection,
	Timestamp,
	deleteDoc,
} from "firebase/firestore";

/**
 * DiningHistoryPage component
 * Displays the user's dining history
 * @param {Object} navigation - React Navigation navigation object
 */
const DiningHistoryPage = ({ navigation }) => {
	const [diningHistoryData, setDiningHistoryData] = useState([]);

	/**
	 * Fetches the user's dining history data from Firebase Firestore
	 */
	const fetchData = async () => {
		const updatedData = [];
		const querySnapshot = await getDocs(
			collection(db, "users", auth.currentUser.uid, "diningHistory")
		);
		querySnapshot.forEach((doc) => {
			let date = doc.data().date.toDate();
			let dateFormat = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
			updatedData.push({
				id: doc.id,
				name: doc.data().name,
				imageUrl: doc.data().imageUrl,
				review: doc.data().review,
				date: dateFormat.toString(),
				rating: doc.data().rating,
			});
		});
		setDiningHistoryData(updatedData);
	};

	/**
	 * Handles the editing of a review
	 * @param {Object} item - The selected review item
	 */
	const handleEditReview = (item) => {
		navigation.navigate("ReviewPage", item);
	};

	/**
	 * Handles the deletion of a review
	 * @param {Object} item - The selected review item
	 */
	const handleDeleteReview = async (item) => {
		Alert.alert(
			"Delete Review Confirmation",
			"Are you sure you want to delete your review?",
			[
				{
					text: "Yes",
					onPress: async () =>
						await deleteDoc(doc(db, "users", auth.currentUser.uid, "diningHistory", item.id))
							.then(
								alert("Review Deleted!"),
								fetchData()
							),
				},
				{ text: "No", onPress: () => console.log("OK Pressed") },
			],
			{ cancelable: true }
		);
	};

	/**
	 * Renders a single item in the dining history list
	 * @param {Object} item - The review item to render
	 */
	const renderHistoryItem = ({ item }) => (
		<View style={styles.card}>
			<Image style={styles.image} source={item.imageUrl} resizeMode="cover" />
			<View style={styles.detailsContainer}>
				<Text style={styles.name}>{item.name}</Text>
				<View style={styles.ratingContainer}>
					{Array.from({ length: 5 }, (_, index) => (
						<Text key={index} style={styles.star}>
							{index < Math.floor(item.rating) ? "★" : "☆"}
						</Text>
					))}
				</View>
				<Text style={styles.review}>{item.review}</Text>
				<Text style={styles.date}>{item.date}</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={() => handleEditReview(item)}>
						<Text style={styles.buttonText}>Edit</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={() => handleDeleteReview(item)}>
						<Text style={styles.buttonText}>Delete</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.headingContainer}>
				<Text style={styles.title}>Your Dining History</Text>
				<TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={styles.backButton}>
					<Text style={styles.backButtonText}>X</Text>
				</TouchableOpacity>
			</View>
			<FlatList data={diningHistoryData} renderItem={renderHistoryItem} keyExtractor={(item) => item.id} />
		</View>
	);
};

export default DiningHistoryPage;