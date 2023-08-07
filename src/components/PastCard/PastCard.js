import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const PastCard = ({date, distance, longPress,onPress}) => {

    return(
        <TouchableOpacity style={styles.container} onLongPress={longPress}>
                <View style={styles.distanceContainer}>
                    <Text style={styles.distanceText}>{distance} KM</Text>
                </View>
                <View style={styles.inner_container}>
                    <View style={styles.info_container}>
                        <Text style={styles.dateText}>{date}</Text>
                        <TouchableOpacity style={{paddingLeft:5,margin:5}}>
                            <Icon name="arrow-forward-ios" size={30} color="#FF9300" onPress={onPress} /> 
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
    )

}

export default PastCard;

const styles = StyleSheet.create({
    container: {
        flex:1,
        borderWidth: 1,
       // borderBottomColor: '#FCF9BE',
        borderColor: 'white',
        backgroundColor: 'white',
        margin: 15,
        flexDirection: 'row',
         borderBottomLeftRadius:50,
        borderTopLeftRadius:50,
        borderBottomRightRadius:15,
        borderTopRightRadius:15,
        padding: 20,
        alignContent: 'space-around',
        justifyContent: 'flex-end',
        alignItems: 'center',
        //borderRadius: 15,
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
         elevation: 15,
       
        //shadowColor: '#00acee'
    },
    distanceContainer: {
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderRadius: 30,
        padding: 17,
        backgroundColor: '#FF9300',
        borderColor: '#FF9300',


    },
    inner_container: {
        flex: 1,
        alignItems:"flex-end",
       // backgroundColor:'red',
       justifyContent:"space-around"
    },
    info_container: {
        flex: 1,
        flexDirection:"row",
        alignItems: 'center',
        alignItems:"center",
        // borderWidth:1,
        // backgroundColor:'#FCF9BE',
        // borderColor:'#FCF9BE',
        // borderRadius:20

    },
    distanceText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        color: 'white'
    },
    dateText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
         color:'#FF9300',
         //backgroundColor:'red'
       // color: '#2B3A55'
    },

})
