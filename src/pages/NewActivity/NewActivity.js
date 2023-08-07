import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
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


const WalkTrackerApp = () => {
  const [startLocation, setStartLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [distance, setDistance] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [region, setRegion] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const formatTime = convertSecondsToHMS(elapsedTime);
  const [watchId, setWatchId] = useState(null)



  // useEffect(() => {
  //   let watchId;
  //   if (isTracking) {
  //     watchId = Geolocation.watchPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setCurrentLocation({ latitude, longitude });
  //         setCoordinates((prevCoordinates) => [
  //           ...prevCoordinates,
  //           { latitude, longitude },
  //         ]);
  //       },
  //       (error) => console.log(error.message),
  //       { enableHighAccuracy: true, distanceFilter: 10 }
  //     );
  //   }

  //   return () => {
  //     if (watchId) Geolocation.clearWatch(watchId);
  //   };
  // }, [isTracking]);


  // useEffect(() => {
  //   if (isTracking) {
  //     setWatchId(Geolocation.watchPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setCurrentLocation({ latitude, longitude });
  //         setCoordinates((prevCoordinates) => [
  //           ...prevCoordinates,
  //           { latitude, longitude },
  //         ]);
  //       },
  //       (error) => console.log(error.message),
  //       { enableHighAccuracy: true, distanceFilter: 10 }
  //     ))
  //   }
  //   Geolocation.clearWatch(watchId)
  //   // return () => {
  //   //   if (watchId) ;
  //   // };
  // }, [isTracking]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude);
      },
      error => console.log('Error:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);


  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();

    setCurrentDate(date + "/" + month + "/" + year)
  }, [])


  const getCurrentLocationAnimation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => console.log('Error:', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };



  const handleStart = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setStartLocation({ latitude, longitude });
        setCurrentLocation({ latitude, longitude });
        setIsTracking(true);
        setCoordinates([{ latitude, longitude }]);
        setDistance(0);
        setElapsedTime(0);

        setWatchId(Geolocation.watchPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  setCurrentLocation({ latitude, longitude });
                  setCoordinates((prevCoordinates) => [
                    ...prevCoordinates,
                    { latitude, longitude },
                  ]);
                },
                (error) => console.log(error.message),
                { enableHighAccuracy: true, distanceFilter: 10 }
              ))

      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const handleStop = async () => {
    setIsTracking(false);
    const lastCoordinate = coordinates[coordinates.length - 1];
    setCoordinates((prevCoordinates) => [...prevCoordinates, lastCoordinate]);
    Geolocation.clearWatch(watchId)

    const contentObject = {
      distance: distance,
      time: elapsedTime,
      speed: averageSpeed,
      date: currentDate,
      userId: auth().currentUser.uid,
      coordinates: coordinates,
      startLocation: startLocation,
      finishLocation: currentLocation,
    }

    await firestore().collection("newActivity").add(contentObject)
      .then(() => console.log("update"))
  };

  const calculateDistance = () => {
    let totalDistance = 0;
    for (let i = 1; i < coordinates.length; i++) {
      const prevCoord = coordinates[i - 1];
      const currentCoord = coordinates[i];
      totalDistance += calculateDistanceBetweenCoords(prevCoord, currentCoord);
    }
    return totalDistance;
  };

  const calculateDistanceBetweenCoords = (coord1, coord2) => {
    const earthRadius = 6371; // Earth's radius in km
    const dLat = degToRad(coord2.latitude - coord1.latitude);
    const dLon = degToRad(coord2.longitude - coord1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(coord1.latitude)) *
      Math.cos(degToRad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  };

  const degToRad = (deg) => deg * (Math.PI / 180);

  const averageSpeed =
    distance > 0 && elapsedTime > 0 ? (distance / elapsedTime) * 3600 : 0;

  useEffect(() => {
    let timer;
    if (isTracking) {
      timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        setDistance(calculateDistance());
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTracking, coordinates]);



  const weatherIcon = {
    Thunderstorm: 'flash-on',
    Drizzle: 'grain',
    Rain: 'umbrella',
    Snow: 'ac-unit',
    Atmosphere: 'filter-drama',
    Clear: 'wb-sunny',
    Clouds: 'cloud',
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", paddingTop: 35, margin: 15, justifyContent: "space-between" }}>
        <Text style={{ fontSize: 20, color: "#FF9300", fontWeight: "500" }}>{currentDate}</Text>
      
          {/* <Text style={{ fontSize: 20, marginRight:10, color:"#FF9300" }}>{weatherData.main.temp} °C</Text>
          <Icon name={weatherIcon[weatherData.weather[0].main]} size={30} color="#FF9300" /> */}
          {/* <Text style={{ fontSize: 20, marginRight: 10, color: "#FF9300" }}>{!!weatherData ? weatherData.main.temp : ""} °C</Text>
          <Icon name={!!weatherData ? weatherIcon[weatherData.weather[0].main] : ""} size={30} color="#FF9300" /> */}
          {!!weatherData ? (
            <View  style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginRight: 10, color: "#FF9300" }}>
              {weatherData.main.temp} °C
            </Text>
            <Icon name={weatherIcon[weatherData.weather[0].main]} size={30} color="#FF9300" />
            </View>
          ) : (
            <ActivityIndicator size="small" color="orange" />
          )}
      </View>
      <View style={styles.container}>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 41.0082,
            longitude: 28.9784,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={region}
        >
          {startLocation && (
            <Marker coordinate={startLocation} title="Başlangıç Noktası" />
          )}
          {currentLocation && (
            <Marker coordinate={currentLocation} title="Şu Anki Konum" />
          )}
          {coordinates.length > 0 && (
            <Polyline
              coordinates={coordinates}
              strokeColor="#FF9300"
              strokeWidth={7}
            />
          )}
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
      <View style={{ flexDirection: "row", marginVertical: 5, justifyContent: "space-around" }}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 40, alignSelf: "center", fontWeight: "800" }}>{distance.toFixed(2)}</Text>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>MESAFE (KM)</Text>
        </View>

        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 40, alignSelf: "center", fontWeight: "800" }}>{averageSpeed.toFixed(2)}</Text>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>ORT. HIZ (KM/SA)</Text>
        </View>
      </View>
      <View style={{ flexDirection: "column", }}>
        <Text style={{ fontSize: 40, alignSelf: "center", fontWeight: "800" }}>{formatTime}</Text>
        <Text style={{ fontSize: 15, fontWeight: "500", alignSelf: "center" }}>SÜRE</Text>
      </View>
      <View style={{ paddingHorizontal: 30, marginBottom: 5 }}>
        {!isTracking ? (
          <Button text="BAŞLA" onPress={handleStart} />
        ) : (
          <Button text="BİTİR" onPress={handleStop} />
        )}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  infoText: {
    marginTop: 8,
    fontSize: 16,
  },
});

export default WalkTrackerApp;





