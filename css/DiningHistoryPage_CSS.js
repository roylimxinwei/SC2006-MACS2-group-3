import colors from "../config/colors";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color:"#7F2B0F",
    marginVertical: 20,
    marginLeft: 10,
  },
  card: {
    borderRadius: 15,
    backgroundColor: '#FFF',
    marginBottom: 20,
    overflow: "hidden",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  detailsContainer: {
    padding: 20,
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  star: {
    margin: 1,
    color: "#FFD700", // Star color
  },
  review: {
    color: "#6e6969",
  },
  date: {
    color: "#6e6969",
    fontSize: 12,
  },
  backButton: {
    backgroundColor: colors.tertiary,
    // paddingVertical: 10,
    // paddingHorizontal: 50,
    width: 40,
    height: 40,
    borderRadius: 20,
    // margin: 10,
    marginTop: 20,
    marginLeft:20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    // left: 0,
    },
    backButtonText: {
    color: "#7F2B0F",
    // color: "#FFFFFF",
    // color: colors.secondary,
    fontSize: 15,
    fontWeight: "bold",
  },
  headingContainer: {
    flexDirection: "row",
  }
});
