import React from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './CardStyle';

const Card=(props)=>{

    return(
    <View style={styles.conatiner}>
        <Text style={styles.text}>{props.text}</Text>
        <View style={styles.inner_container}>
            <Text style={styles.info}>{props.info}</Text>
        </View>
    </View>

    )
}

export default Card;