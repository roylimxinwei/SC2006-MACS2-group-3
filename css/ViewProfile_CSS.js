import colors from '../config/colors';
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    viewProfile:{
        flex: 1,
        backgroundColor: colors.primary, // Replace with your desired background color
    },
    detailContainer: {
        flexDirection: "row",
        marginTop:20,
        marginLeft:50
    },
    profileDetails:{
        marginTop:30,
        marginLeft:20
    },
    username:{
        fontSize: 20  
    },
    editProfile:{
        marginTop: 5,
        fontSize: 13,
        textDecorationLine: "underline"
    },
    headerText:{
        fontSize: 25
    },
    sectionText:{
        fontSize: 18
    },
    ImageDesign:{
        width: 100,
        height: 100
    },
    ImageContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop:10
    },
    FoodDesign: {
        width: 50,
        height: 50,
    },
    TouchableImage:{
        borderCurve: true,
        borderColor: colors.secondary,
        borderRadius: 4,
        padding: 5,
        borderWidth: 2.5,
    },
    slider:{
        marginLeft:40,
        marginTop:10
    },
    rangeSlider: {     
        width: 300,           
    },
    switch:{
        marginLeft:50,
        marginTop:10
    }
});
