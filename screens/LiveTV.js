import  React, {useRef, useState, useEffect} from 'react';
import { View, StyleSheet, Button, Dimensions, Text, Image, ScrollView } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';


const {width} = Dimensions.get('window');
   async function changeScreenOrientation(){

    if(orientationIsLandscape==true){
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }
    else if(orientationIsLandscape==false){
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    }
  }
  const toggleOrientation=()=>{
    setOrientation(!orientationIsLandscape)
    changeScreenOrientation()
  }

 
const LiveTV = ({ route, navigation}) => {
  // const { tabType } = route.params;
  // const tabType = navigation.getParam('tabType')
   
  

  // This is the Video No Seleced.
 
  const video = useRef(null);
  const [liveVideoURL, setLiveVideoURL] = useState();
  const [anhadTV, setAnhadTV] = useState();
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState({});
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [adData, setAdData] = useState('');

useEffect(() => {
         console.log("I am in EFFECT")     
         let unmounted = false;
          let source = axios.CancelToken.source();  
      

          
      
          const adUrl =  "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Ad_Get_Ads_By_Position";

     
          const requestOne = axios.post(adUrl, {Ad_Position_Id: 5}); //Dashboard Ad
          axios
              .all([ requestOne])
              .then(
                axios.spread((...responses) => {
                  const responseOne = responses[0];
              
                
                     if(responseOne)
                    {
                      const resultAd = responseOne.data;
                      let ValidJson = resultAd.replace('{"d":null}',"");
                      ValidJson = JSON.parse(ValidJson);
                      const { message, status, data} = ValidJson
                     // console.log("Result AD Data====", data)
                      if(status==1)
                      {
                        let newData =  Object.values(data);
                       
                          setAdData(newData);
                        
                      }
                      else
                      {
                           setAdData({});
                        
                      }
                    }
                
                })
              )
              .catch(errors => {
                // react on errors.
                console.error(errors);
                setIsLoadingEnglish(false);setBreakingNews({});console.log("Error Occurred While Fetching News", errors.response); if (axios.isCancel(errors)) return; 
              });
        

        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };

    },[]);
  return (
     <View style={{flex:1,backgroundColor:'white'}}>
      <ScrollView style={{flex:1, flexDirection:'column'}}>
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
            
    
      <>
      
      <View style={styles.container}>
      <WebView
        style={{ marginTop: 2,  }}
       javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
       
        mediaPlaybackRequiresUserAction={true}
      injectedJavaScript={`
             document.getElementsByTagName("video")[0].removeAttribute("autoplay"); // this one was the key for me!
         `}
        source={{ html: `<iframe src="https://main.clickstreamcdn.com/fnikmedia-pm/parvasi-media/playlist.m3u8"  height=100% width=100% preload="none">`}}
      />
     {/* 
     
         source={{ html: `<video width="100%" controls="controls" preload="metadata">
  <source src="https://main.clickstreamcdn.com/fnikmedia-pm/parvasi-media/playlist.m3u8" type="video/mp4">
</video>`}}
     <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://main.clickstreamcdn.com/fnikmedia-pm/parvasi-media/playlist.m3u8',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      /> */}
      </View>
      <View style={{flex:1,alignItems:'center',justifyContent:'center',alignSelf:'stretch',margin:5}}>
      {
        adData? adData.map((v,index)=> <View key={index} style={{marginBottom:4,flex:1}}><Image source={{uri:v.Ad_image_url}} style={{height:127, width:width}}></Image></View>): null
      }
          {/* <View>
          <Image source={require('./../assets/Rectangle-280.jpg')} style={{height:127, width:width}}></Image>
        </View>
        <View>
          <Image source={require('./../assets/Rectangle-299.jpg')} style={{height:127, width:width,}}></Image>
        </View>
          <View>
          <Image source={require('./../assets/Rectangle-300.jpg')} style={{height:127, width:width,}}></Image>
        </View> */}
        </View>
     </>
     
      }
      
    </ScrollView>
    </View>
    
  )
};
const styles = StyleSheet.create({
    container: {
  alignSelf:'stretch',
    justifyContent: 'flex-start',
    height: 250,width:'100%',
    backgroundColor : '#ffffff',
  },
  video: {
    alignSelf: 'center',
    
    width: '100%',
    height: 250,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LiveTV;
