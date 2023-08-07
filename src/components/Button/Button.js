import React from 'react'
import { View, TouchableOpacity, Text,Image } from 'react-native';
import styles from './ButtonStyle';

const Button = ({ text, onPress, loading,image }) => {

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            disabled={loading}>
            <Text style={styles.title}>{text}</Text>

        </TouchableOpacity>
    )
}
export default Button;