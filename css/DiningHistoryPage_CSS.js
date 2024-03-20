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
});
