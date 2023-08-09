import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import { useNavigation } from '@react-navigation/native';
import {ref, onValue} from 'firebase/database';
import { database } from '../components/config';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export default function Home( {navigation} ) {

  const [active, setActive] = useState(true);
  const [waterLevel, setWaterLevel] = useState(0);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // listens to changes in waterLevel data in Firebase real time database
  useEffect(() => {
      const waterRef = ref(database, 'waterLevel');
      const unSubscribe = onValue(waterRef, (snapshot) =>  {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const keys = Object.keys(data);
        
          if (keys.length > 0) {
            const lastKey = keys[keys.length - 1];
            const lastValue = data[lastKey];
            setWaterLevel(lastValue);
          } 
          else {
            setWaterLevel(0);
          }
        }
        else {
          setWaterLevel(0);
        }
      });
      return () => {
        unSubscribe();
      }
  }, []);

  // listens to changes in active data in Firebase real time database 
  useEffect(() => {
      const activeRef = ref(database, 'active');
      const unSubscribe = onValue(activeRef, (snapshot) =>  {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const keys = Object.keys(data);
        
          if (keys.length > 0) {
            const lastKey = keys[keys.length - 1];
            const lastValue = data[lastKey];
            setActive(lastValue);
          } 
          else {
            setActive(0);
          }
        }
        else {
          setActive(0);
        }

        if (!active) {
          schedulePushNotification("Your device is turned off!");
        }

      });
      return () => {
        unSubscribe();
      } 
  }, []);

    // Checks to see if we should send push notification depending on waterLevel value
    useEffect(() => {
      if (waterLevel > 250) {
        schedulePushNotification("Your basement is flooding!");
      }
    }, [waterLevel]);

    // Checks to see if we should send push notification depending on active value
    useEffect(() => {
      if (!active) {
        schedulePushNotification("Your device is turned off!");
      }
      else {
        schedulePushNotification("Your device is turned on!");
      }
    }, [active]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Askey's SmartHome</Text>
      <TouchableOpacity style={styles.box} /*onPress={navigation.navigate('FloodDescription')}*/>
        <View>
          <Image  
            source={require('../assets/FloodPic.jpg')}
            style={styles.floodPic}
          />
          <Text style={styles.Active}>Active:</Text>
        </View>
      </TouchableOpacity>
    </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    width: 200,
    height: 200,
    borderRadius: 25,
    backgroundColor: 'rgb(173, 216, 230)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  floodPic: {
    width: 150,
    height: 125,
    borderRadius: 25,
    marginTop: 15
  },
  title: {
    fontSize: 35,
    fontFamily: 'Good-feeling-sans',     //Fix font name later
    marginTop: -200,
    paddingBottom: 150,
  },
  Active: {
    flex: 1,
    marginTop: 30,
  }
});

//Function to create a push notification 
async function schedulePushNotification(body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Askey's SmartHome Alert",
      body: body
    },
    trigger: { seconds: 2 },
  });
}
