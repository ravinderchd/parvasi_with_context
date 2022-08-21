import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import AppLoading  from 'expo-app-loading'

import { useFonts } from 'expo-font';

import * as Location from 'expo-location';
// import { AsyncStorage } from 'react-native';
import RootStack from  './navigators/RootStack';
import { RootSiblingParent } from 'react-native-root-siblings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentialsContext,  IsLoginVerified, IsModalView, locationAddress  } from './Components/LoginCredentialsContext';
import DrawerStack from './Components/DrawerStack';
import RootStackCombined from './navigators/RootStackCombined';
// import { NavigationRouteContext } from '@react-navigation/native';
// import DrawerStack from './Components/DrawerStack';

const fetchFonts = () => {
  console.log("Loading Fonts")
    return Font.loadAsync({
        "Roboto-Regular" : require("./assets/fonts/Roboto-Regular.ttf"),
        "Montserrat-ExtraBold" : require("./assets/fonts/Montserrat-ExtraBold.ttf"),
        "Molle" : require("./assets/fonts/Molle-Italic.ttf"),
    })
};

// const {
//   width: SCREEN_WIDTH,
//   height: SCREEN_HEIGHT
// } = Dimensions.get('window');

// const scale = SCREEN_WIDTH / 215;
// function normalizeScale(size) {
//   return size;
//   const newSize = size*scale;
//   if(Platform.OS === 'ios') {
//     return Maths.round(PixelRatio.roundToNearestPixel(newSize));
//   }
//   else{
//     return Math.round(PixelRatio.roundToNearestPixel(newSize));
//   }
// }
export default function App(props) {
  
  // const [isFontsLoading, setisFontsLoading] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");
  const [IsModal, setIsModal] = useState(false);
  const [IsVerified, setIsVerified] = useState(false);

  const [location, setLocation] = useState(null);
 
  const [myLocation, setMyLocation] = useState();

//   const handleFontLoading = (err) => {
//     console.log("font loading==", isFontsLoading, err);
//     setisFontsLoading(false);
//   }

const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },  
      } = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
      
      let address =  await Location.reverseGeocodeAsync({latitude, longitude});
      const { city, region:province } = address[0]
      setMyLocation({city,province}); /// PASS location data to all the Screens

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //clearAppData();
    getLocation();
    
  }, []);
  // useEffect(() => {
  
  //   getLocation();
    
  // }, [storedCredentials]);
const clearAppData = function() {
  console.log("CLEANIJNG ALL DATA");
    AsyncStorage.clear().then(() => console.log('Cleared'));
    setStoredCredentials(null)
}
  const checkLoginCredentials = () =>{
   //fetchFonts()
    
     AsyncStorage
      .getItem('loginCredentials')
      .then((result) => {
       
        if(result!==null)
        {
          console.log("FROM APP===",result);
          setStoredCredentials(JSON.parse(result));  //convert key value pair to OBJECT from storage - Storage only allow strings to eb stored.
          setAppReady(true);
          //Get user details using AXIOS if the Email is verified.
        }
        else
         {
           console.log("FROM APP CREDENTIAL", storedCredentials);
            setStoredCredentials(null);
            setAppReady(true)
         }
      })
      .catch(err => {
        console.log("ERROR Occurred===", err)
        setAppReady(true)}
        )
  }


 if(!appReady)
  {
    return <AppLoading 
                  startAsync={checkLoginCredentials} 
                  onFinish={() => setAppReady(true)}  
                  onError={ () => setAppReady(true)}
                  />;
  }
  return (
      
       <LoginCredentialsContext.Provider value={{storedCredentials, setStoredCredentials, IsModal, setIsModal, myLocation, setMyLocation }}>
         {/* <IsLoginVerified.Provider value={{IsVerified, setIsVerified}} > */}
            {/* <IsModalView.Provider value={{IsModal, setIsModal}}> */}
            <RootStackCombined />
            {/* </IsModalView.Provider> */}
        
         {/* </IsLoginVerified.Provider> */}
      </LoginCredentialsContext.Provider>
      
  );

}





