import  React, {useRef, useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, Button, Dimensions, Text, ActivityIndicator, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import { Video, AVPlaybackStatus } from 'expo-av';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';

const width = Dimensions.get('window').width;
const Archived = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [archiveList, setArchiveList] = useState();
  const [uri, setUri] = useState();
  // useEffect(() =>{
  //    let unmounted = false;
  //         let source = axios.CancelToken.source();  
  //       const newUrl = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Get_TV_Archives";
  //       //News_Count
  //               axios.post(newUrl,  { timeout: 10 }, {cancelToken: source.token}).then(
  //               (response) =>{
  //                   if (!unmounted) {
  //                     console.log("Archived REsult REceived==", response)
  //                   const result = response.data;
  //                   let ValidJson = result.replace('{"d":null}',"");
  //                   ValidJson = JSON.parse(ValidJson);
  //                   const { message, status, data} = ValidJson
  //                   console.log("Archived REsult REceived DATAAAAA\n==", typeof(data))
  //                   if(status==1)
  //                   {
  //                    console.log("Archived Data=========\t", data);   
  //                       setArchiveList(data);
  //                       setIsLoading(false);
  //                   }
  //                   else
  //                   {
  //                        setArchiveList({});
  //                        setIsLoading(false);
  //                   }
  //                   }
  //               }
  //           ).catch((error) => { setIsLoading(false);setArchiveList({});console.log("Error Occurred While Fetching Archived News", error.response); if (axios.isCancel(error)) return; })
  //       return function () {
  //           unmounted = true;
  //           source.cancel("Cancelling in cleanup");
  //       };
  // },[]);

   useEffect(() =>{
     let unmounted = false;
          let source = axios.CancelToken.source();  
        const newUrl = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Get_Company_Details";
        //News_Count
                axios.post(newUrl,  { timeout: 10 }, {cancelToken: source.token}).then(
                (response) =>{
                    if (!unmounted) {
                      console.log("Archived REsult REceived==", response)
                    const result = response.data;
                    let ValidJson = result.replace('{"d":null}',"");
                    ValidJson = JSON.parse(ValidJson);
                    const { message, status, data} = ValidJson
                    console.log("Archived REsult REceived DATAAAAA\n==", typeof(data))
                    if(status==1)
                    {
                     console.log("Archived Data=========\t", data[0].TV_Archive_Link);   
                        setUri(data[0].TV_Archive_Link);
                        setIsLoading(false);
                    }
                    else
                    {
                         setArchiveList({});
                         setIsLoading(false);
                    }
                    }
                }
            ).catch((error) => { setIsLoading(false);setUri('');console.log("Error Occurred While Fetching Archived News", error.response); if (axios.isCancel(error)) return; })
        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };
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
            
      <>
      <WebView
        style={{ marginTop: 20, width: width, height:600 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: uri}}
      />
      
      </>
      }
      </View>

  )
};

const MyArchived = ({archVideo}) => {
  console.log("REceivdeddd->>", archVideo)
  const {link} = archVideo
  const code = link.substr(link.indexOf('watch?v=')+8,link.strlen);
  return (
    <View style={{ borderColor: '#f00', borderWidth:0, height: 120}}>
    <View key={code} style={{flexDirection: 'row',}}>
   
      <View style={{width:width}}>
        
        {/* <YoutubePlayer
        height={300}
       
        videoId={code}
        
      /> */}
      <WebView
        style={{ marginTop: 20, width: 320, height: 230 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: "https://www.youtube.com/embed/-ZZPOXn6_9w" }}
      />
      </View>
      <View style={{width:width}}>
        <Text>{archVideo.title}</Text>
      </View>
    </View></View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor : '#ffffff',
    padding:4,
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

export default Archived
