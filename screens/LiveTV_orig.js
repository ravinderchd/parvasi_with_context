import  React, {useRef, useState, useEffect} from 'react';
import { View, StyleSheet, Button, Dimensions, Text, ActivityIndicator } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';


function setOrientation() {
  console.log("Setting orientation")
    if (Dimensions.get('window').height > Dimensions.get('window').width) {

      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    }
    else {
      
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    }

    console.log("Orientation changed....")
  }
  useEffect(() => {
    Dimensions.addEventListener('change', ({window:{width,height}})=>{
      if (width<height) {
        setOrientation()
      } else {
        setOrientation()
    
      }
    })

  }, []);
const {width} = Dimensions.get('window');

const LiveTV = ({ route, navigation, tabSelected}) => {
  // const { tabType } = route.params;
  // const tabType = navigation.getParam('tabType')
   const mounted = useRef(false);
   //const videoShown = route.params.tabSelected

  // This is the Video No Seleced.
 
  const video = useRef(null);
  const [liveVideoURL, setLiveVideoURL] = useState('http://main.clickstreamcdn.com/fnikmedia-pm/parvasi-media/playlist.m3u8');
  const [anhadTV, setAnhadTV] = useState();
  
  const [status, setStatus] = useState({});
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [isLoading, setLoading] = useState(true);
  //const [videoShown, setvideoShown] = useState(); 
 
// const getVideoURl = () => {
//    const url = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Get_Company_Details"
//          //axios.post(url, {Email: email, Password: password},  {headers: {Host: "demo.treblle.com"}}).then(
//         axios.get(url).then(
//                 (response) =>{
//                    // const result = response.data;
//                      let ValidJson = response
//                     console.log("REsoinse==", response.status)
//                     const { message, status, data} = response
//                     if(status == 1 || status ==200) {
//                         // handleMessage(message, status);
//                         console.log("Data===122", data[0]);
//                         const {Parvasi_Tv_Live_Link} = data;
//                        console.log("MESSAGE from Server--->",Parvasi_Tv_Live_Link,"VIDEO SHOWN==",);
//                         console.log("inside..........")
//                          setLiveVideoURL(Parvasi_Tv_Live_Link)
                        
//                          setLoading(false)

//                     }
//                 }
//             ).catch((error) => { setLoading(false);console.log("Error Occurred-->", error); setLoading(false) })
//  }

//  useEffect(() => {
//   //if (route.params?.tabSelected)
//   //  const {tabSelected} = route.params
//    console.log('Focus');
//     const unsubscribe = navigation.addListener('focus', () => {
//       //getVideoURl();
//       setLiveVideoURL('http://main.clickstreamcdn.com/fnikmedia-pm/parvasi-media/playlist.m3u8')  
//       //Every time the screen is focused the Video starts playing
//       if (video.current) {
         
//         video.current.playAsync();
//       }
//     });
   
//     return unsubscribe;
//   },[navigation]);

//   //Blur Event: to be fired when the HomeScreen loses focus.
useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('Blur');
      //Every time the screen loses focus the Video is paused
      if (video.current) {
        video.current.pauseAsync();
      }
       //console.log("EFFECT on VIDEo ID ssssssssc2222h222ange\n\n\==",videoShown);
    });

    return unsubscribe;
  }, [navigation]);

 useEffect(() =>{
     //getVideoURl()
     setLiveVideoURL('http://main.clickstreamcdn.com/fnikmedia-pm/parvasi-media/playlist.m3u8')   
     console.log("Live video url==", liveVideoURL);
     setLoading(false)

    },[]);


  return (
  
    <View style={styles.container}>
      {
        isLoading ? <ActivityIndicator size="large"  style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}></ActivityIndicator>:
            
      // <Video
       
      //   ref={video}
      //   style={styles.video}
      //   source={{
      //     uri: 'http://main.clickstreamcdn.com/fnikmedia-pm/parvasi-media/playlist.m3u8',
      //   }}
      //   key = {'http://main.clickstreamcdn.com/fnikmedia-pm/parvasi-media/playlist.m3u8'} 
      //   useNativeControls
      //   onFullscreenUpdate={setOrientation}
      //   shouldPlay ={true}
      //   resizeMode="contain"
      //   isLooping
      //   onError = {()=> {(error)=>{console.log("Playback ERROR")}}}
      //   paused = {false}
      //   volume = {1}
      //   onBuffer = {console.log("Bufferting123")}

      //   onPlaybackStatusUpdate={status => setStatus(() => status)}
      // />
      <>
      <WebView
        style={{ marginTop: 2,  }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: `https://main.clickstreamcdn.com/fnikmedia-pm/parvasi-media/playlist.m3u8`}}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            {
              console.log("Pause pplay changed");
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
          }
        />
      </View></>
      }
      <View><Text>AD here</Text></View>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
  
    justifyContent: 'flex-start',
    height: 280,width:width,
    backgroundColor : '#ffffff',
  },
  video: {
    alignSelf: 'center',
    
    width: width,
    height: 230,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LiveTV;
