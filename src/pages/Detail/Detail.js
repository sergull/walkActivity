import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Polyline, AnimatedRegion } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Button from "../../components/Button"
import imagePath from "../Utilities/imagePath";
import axios from 'axios';
import { API_KEY } from '../../../config';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';




function convertSecondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const Detail = ({ route }) => {
    const { item } = route.params;
    const formatTime = convertSecondsToHMS(item.time);
    const [region, setRegion] = useState(null);


    const getCurrentLocationAnimation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                });
            },
            error => console.log('Error:', error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <MapView style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                }}
                    initialRegion={{
                        latitude: 41.0082,
                        longitude: 28.9784,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={region}
                >

                    {item.startLocation && (
                        <Marker coordinate={item.startLocation} title="Başlangıç Noktası" />
                    )}
                    {item.finishLocation && (
                        <Marker coordinate={item.finishLocation} title="Şu Anki Konum" />
                    )}

                    <Polyline
                        coordinates={item.coordinates}
                        strokeColor="#FF9300"
                        strokeWidth={7}
                    />

                </MapView>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                    }}
                    onPress={getCurrentLocationAnimation}
                >
                    <Image source={imagePath.greenIndicator} />
                </TouchableOpacity>
            </View>

            <View style={{ paddingBottom: 20, margin: 10 }}>
                <View style={{ flexDirection: "row", marginVertical: 5, justifyContent: "space-around" }}>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ fontSize: 40, alignSelf: "center", fontWeight: "800" }}>{item.distance.toFixed(2)}</Text>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>MESAFE (KM)</Text>
                    </View>

                    <View style={{ flexDirection: "column" }}>
                        <Text style={{ fontSize: 40, alignSelf: "center", fontWeight: "800" }}>{item.speed.toFixed(2)}</Text>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>ORT. HIZ (KM/SA)</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "column", }}>
                    <Text style={{ fontSize: 40, alignSelf: "center", fontWeight: "800" }}>{formatTime}</Text>
                    <Text style={{ fontSize: 15, fontWeight: "500", alignSelf: "center" }}>SÜRE</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 18,
    },
});

export default Detail;
