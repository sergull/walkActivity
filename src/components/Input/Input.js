import React from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './InputStyle';

const Input = ({ placeholder, onType, value, iconName, isSecure, forgot }) => {

    return (
        <View style={styles.container}>
            
            <TextInput
                autoCapitalize='none'
                style={styles.input}
                placeholder={placeholder}
                onChangeText={onType}
                secureTextEntry={isSecure} 
                value={value}/>
            <Icon name={iconName}
                style={styles.icon}
               // value={value}
                size={20} />
            <TouchableOpacity
                style={styles.button}
                onPress={() => { }}>
                <Text
                    style={styles.button_text}>{forgot}</Text>
            </TouchableOpacity>


        </View>
    )


}

export default Input;