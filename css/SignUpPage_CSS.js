import colors from '../config/colors';
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        paddingTop:120,
        paddingBottom: 150,
    },
    ImageDesign: {
        borderRadius: 130,
        width: 250,
        height: 250,
        bottom: 50,
    },
    title: {
        color: "#7F2B0F",
        fontSize: 24,
        marginBottom: 20,
        bottom: 10,
    },
    input: {
        width: "80%",
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    input2:{
        width: "80%",
        borderColor: "gray",
        borderWidth: 1,
        padding: 1,
        marginBottom: 1000,
        borderRadius: 5,
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
        top: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
    },
});
