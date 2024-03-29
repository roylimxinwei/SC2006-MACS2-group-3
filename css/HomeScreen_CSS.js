import colors from "../config/colors";
import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get('window').height; 

export const styles = StyleSheet.create({
  headerContainer:{
    position:"absolute",
    width:"100%",
  },

  dismissButtonJiak:{
    backgroundColor: colors.tertiary,
    position: "relative",
    justifyContent:"center",
    alignItems:"center",
    // width:120,
    marginTop:15,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 39,
    paddingLeft: 39,
    borderRadius: 15,
    marginLeft:130,
    right:15,
  },
  JiakText:{
    fontSize:16,
  },
  CloseText:{
    fontSize:16,
  },
  dismissButtonClose:{
    position: "absolute",
    top:3,
    right:-15,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 35,
    paddingLeft: 35,
    borderRadius: 15,
  },
  ReviewText:{
    fontSize:14,
    color:"#7F2B0F",
    textDecorationLine:"underline",
  },
  UserReviewButton:{
    backgroundColor: colors.secondary, // or any color you'd like for this button
    position: "relative",
    justifyContent:"center",
    alignItems:"center",
    // width: 60, // match the width of the Jiak button or as needed
    height: 45, // match the height of the Jiak button or as needed
    borderRadius: 15,
    padding:8,
    paddingRight:15,
    paddingLeft:15,
    // paddingLeft:10,
    
  },
  reviewButtonImage:{
    width: 35, // Set the width of your button image
    height: 35, // Set the height of your button image
  },
  container: {
    flex: 1,
    alignItems: "center", // Centers objects according to the secondary axis
    justifyContent: "center", // Centers the object according to main axis
    backgroundColor: colors.primary, // primary colour
  },
  ImageDesign: {
    width: 100,
    height: 100,
    marginRight: 10, // Add some space between the image and the text
  },
  button: {
    position: "absolute",
    top:50,
    right:20,
    backgroundColor: colors.primary,
    marginBottom: 10,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonImage: {
    width: 70, // Set the width of your button image
    height: 70, // Set the height of your button image
    borderRadius: 70, // Makes the image round
  },
  signUpText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  switch:{
    position:"absolute",
    top:90,
    left:15,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  restaurantIcon: {
    width: 30,
    height: 30,
    borderRadius: 15, // Half of the width and height to make it circular
    backgroundColor: 'rgba(255, 0, 0, 0.5)', // Red color with 50% opacity
  },
  historyButton: {
    position: "absolute", // Position the button over the screen
    right: 20, // Distance from the left
    top: 650, // Distance from the bottom
    backgroundColor: "#CD5C5C", // Replace with your desired button color
    borderRadius: 35, // Ensure this is half of the width and height for a perfect circle
    overflow: "hidden", // Ensures the image doesn't bleed outside the border radius
    alignItems: "center", // Centers objects according to the secondary axis
    justifyContent: "center", // Centers the object according to main axis

  },
  icon :{
    width: 40, // Set the width of your image
    height: 40, // Set the height of your image to the same value to maintain aspect ratio
    borderRadius: 20, // Half the width or height to make it round
  },
  calloutContainer: {
    width: 200,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color:"#7F2B0F",
    marginBottom: 5,

  },
  calloutDescription: {
    fontSize: 14,
    padding:1,
    color:"#7F2B0F",
  },
  restaurantPopUp: {
    position: 'absolute',
    top: screenHeight * 2 / 3, // Set top to 2/3 of the screen height
    left: 0,
    right: 0,
    // marginBottom: 500,
    paddingBottom: 500,
    height: screenHeight / 3,
    backgroundColor: colors.primary,
    zIndex: 10,
  } ,
  contentContainer: {
    flex:5,
    flexDirection: 'row', // Align children horizontally
    padding: 10, // Add some padding around the content
    justifyContent: 'space-evenly', // this will distribute space evenly around the elements
    alignItems: 'center', // this will align items vertically in the center
    flexWrap: 'wrap', // This will allow the content to wrap to the next line if needed
    paddingRight: 30, // Adjust this value so it's at least as large as the dismissButtonClose width
    marginBottom:300,
  },
  padpad:{
    color: "transparent",
    backgroundColor: colors.primary,
    paddingBottom:100,
  },
  textContainer: {
    flex: 1, // Take up remaining space
    justifyContent: 'center', // Center text vertically
  },
  popupContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 10,
    zIndex: 1,
  },
  popupText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  scrollContainer: {
    position: "absolute",
    top: 290, // You can adjust the top value to your preference
    left: 10,
    right: 10,
    bottom:20,
    backgroundColor: colors.primary,
  },
  restaurantContainer: {
    position: "relative",
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
});
