import colors from '../config/colors';
import {StyleSheet} from "react-native";
  
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	header: {
		alignItems: 'center',
	},
	title: {
		fontSize: 40,
		marginBottom: 50,
		marginTop: 50,
		textAlign: 'center',
		padding: 20,
	},
	subtitle: {
		fontSize: 20,
		marginBottom: 50,
		paddingBottom: 50,
	},
	section: {
		alignItems: 'center',
		justifyContent: "center",
		marginBottom: 50,
		marginHorizontal: 25,
		alignContent: 'center',
	},
	sectionTitle: {
		fontSize: 20,
		marginBottom: 20,
	},
	sectionText: {
		fontSize: 15,
		marginBottom: 20,
		textAlign: 'center',
	},
	slider: {
		width: 300,
	},
	nextButton: {
		marginTop: 0,
		marginBottom: 50,
		padding: 10,
		backgroundColor: '#007AFF',
		borderRadius: 20,
		backgroundColor: "#CD5C5C",
		paddingVertical: 10,
		paddingHorizontal: 90,
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		top: 10,
	},
	nextButtonText: {
		color: '#fff',
		fontSize: 18,
	},
	OperationStatusButton: {
		circleSize: 30,
		barHeight: 50,
		circleBorderWidth: 2,
		backgroundActive: 'green',
		backgroundInactive: '#DC4731',
		circleActiveColor: '#30a566',
		circleInActiveColor: '#DC4731',
		changeValueImmediately: true, // if rendering inside circle, change state immediately or wait for animation to complete
		outerCircleStyle: {}, // style for outer animated circle
		switchLeftPx: 10, // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
		switchRightPx: 2, // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
		switchWidthMultiplier: 10, // multiplied by the `circleSize` prop to calculate total width of the Switch
		switchBorderRadius: 25,
		alignContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
});
