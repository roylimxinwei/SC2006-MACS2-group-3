import colors from '../config/colors';
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: colors.primary,
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
	    backbutton:{
        backgroundColor: "#CD5C5C",
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    } ,
    buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
	textAlign: 'center',
  },
});
