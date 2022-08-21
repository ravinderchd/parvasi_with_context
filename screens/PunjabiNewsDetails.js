
import { StyleSheet, ScrollView, View, Text, Dimensions, Pressable, Image, ActivityIndicator,FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import { useEffect, useState } from 'react';

import axios from 'axios';
import HTML from 'react-native-render-html';
import { useIsFocused } from "@react-navigation/native"; 
import { MaterialCommunityIcons } from "@expo/vector-icons";

// const width = Dimensions.get('window').width;
const height = 400;
const regex = /(<([^>]+)>)/gi;
const fullwidth = Math.ceil(Dimensions.get("window").width);
const width = fullwidth+30;
const adWidth = fullwidth;
const PunjabiNewsDetails = ({ route, navigation }) => {
   
     const [newsDetails, setNewsDetails] =useState({});
     const [isLoading, setIsLoading] = useState(true);
     const [newsDescription, setNewsDescription] = useState([]);
     const [isBottomAd, setBottomAd] = useState(true);
     const [currentImg, setCurrentImg] = useState();
     const [adData, setAdData] = useState('');
     const [idx, setIdx] = useState(0);
    const newsid = route.params.newsid;
    const focus = useIsFocused();
    const delay = 55;
    const [currentCount, setCount] = useState(0); 
    const def_uri = 'https://germanculture.com.ua/wp-content/uploads/2015/12/german_online_newspapers.jpg';
    //const newUrl = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Get_Punjabi_News_Detail";
   // axios.post(newUrl, {News_Id: newsid, timeout: 60 , cancelToken: source.token}).then(
 
 useEffect(() => {
       
         let unmounted = false;
          let source = axios.CancelToken.source();  
        const newUrl = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Get_Punjabi_News_Detail";
        const adUrl =  "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Ad_Get_Ads_By_Position";
         const requestOne = axios.post(newUrl, {News_Id: newsid, timeout: 60 , cancelToken: source.token});
          const requestTwo = axios.post(adUrl, {Ad_Position_Id: 11}); //Dashboard Ad
        //News_Count
                // axios.post(newUrl, {News_Id: newsid, timeout: 60 , cancelToken: source.token}).then(
                // (response) =>{
           axios
              .all([requestOne, requestTwo])
              .then(
                axios.spread((...responses) => {
                  const responseOne = responses[0];
                  const responseTwo = responses[1];
                    if (!unmounted) {
                         if(responseOne)
                         {
                              const result = responseOne.data;
                              let ValidJson = result.replace('{"d":null}',"");
                              ValidJson = JSON.parse(ValidJson);
                            // console.log("NEws Details====12313", result)
                              const { message, status, data} = ValidJson
                              console.log("RStatus===", status)
                              if(status==1)
                              {
                                // console.log("First PAra====\n",data[0].content.split('<h4>'))
                                //   console.log("Status====1", data[0].image_url);
                                  let desc = data[0].content.replace(regex, '')
                                  let desc1 = data[0].content.split('<h4>')
                                  
                                  //desc1 = desc1.replace('</h4>', '')
                                    // desc1 = desc1.replace('&nbsp; ','')
                                    console.log("DEscription1111========", desc1)
                                  setNewsDescription(desc1)
                                  setNewsDetails(data);
                                  setIsLoading(false);
                              }
                              else
                              {
                                  setNewsDetails({});
                                  setIsLoading(false);
                              }
                          }
                           if(responseTwo)
                            {
                                  const resultAd = responseTwo.data;
                                  let ValidJson = resultAd.replace('{"d":null}',"");
                                  ValidJson = JSON.parse(ValidJson);
                                  const { message, status, data} = ValidJson
                                // console.log("Result AD Data====", data)
                                  if(status==1)
                                  {
                                    let newData =  Object.values(data);
                                    console.log("AD Data\n\n\n",newData);
                                      setAdData(newData);
                                    // console.log("AD DATA LEngth========\n\n\n",adData.length);
                                      
                                      // setNews(data);
                                      // setIsLoading(false);
                                  }
                                  else
                                  {
                                      setAdData({});
                                      // setIsLoading(false);
                                  }
                            }
                    }
                }
            )).catch((error) => { setIsLoading(false);setNewsDetails({});console.log("Error Occurred While Fetching News", error.response); if (axios.isCancel(error)) return; })
        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };

    },[]);
let timeout;
useEffect(() => {
      
       timeout = setTimeout(() => {
        if(adData.length>0)
        {
          if(currentCount>adData.length-1) 
          {
            
            setCount(0)
            setCurrentImg(adData[0].Ad_image_url);
            console.log("ADDDDDDDSSSSSSS ===== >>", adData[0].Ad_image_url)
          }
          else
          {
           
            setCurrentImg(adData[currentCount].Ad_image_url);
             setCount(currentCount + 1);
          }
        }

      }, 3000);
      
        
     if(focus==false) 
        {
          clearTimeout(timeout);
          console.log("clearing time out");
        }
        else{
          setBottomAd(true);
        }
         return () => {
            clearTimeout(timeout);
          };
  
    },[adData, currentCount, focus]);  

const setBottomAdandTimer = () => {
setBottomAd(false);
 clearTimeout(timeout);
}
  const cleanDesc = (txt) => {
    const regex = /(<([^>]+)>)/gi;
     return txt
            .replace('&nbsp;','')
            .replace(regex,'')
  }
  return (
    
    
    <View style={{flex:1,flexDirection: 'column'}}>
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
        <Text style={{fontSize:24, textAlign:'center'}}>Parvasi Exclusive News</Text>
         <Image source={{uri: newsDetails[0].image_url ? newsDetails[0].image_url : def_uri }} style={{height:165}} />
         <View  style={styles.newsHeadline}>
          <Text style={styles.newsHeadlineText}>{newsDetails[0].title} | {newsDetails[0].date}</Text>
        </View>
          <View style={{height:height, width:width, paddingBottom:75, backgroundColor:'#fff'}}>
         <WebView source={{html: `<html xmlns="http://www.w3.org/1999/xhtml" lang="pa" xml:lang="pa"><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta charset="utf-8"></head><body><p>${newsDetails[0].content}</body></html>`   }} style={{fontSize:22}} />
        </View>
    
      
        
        {/* <Text style={{fontSize:24, textAlign:'center'}}>Parvasi Exclusive News</Text>
         <Image source={{uri: newsDetails[0].image_url}} style={{height:165}} />
         <View  style={styles.newsHeadline}>
          <Text style={styles.newsHeadlineText}>{newsDetails[0].title}</Text>
        </View><View style={{flex:1, height:400, width:width, paddingBottom:80}}>
          <WebView source={{html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p>${newsDetails[0].content}</body></html>`   }} style={{fontSize:22}} />
      <ScrollView style={{paddingBottom:40}}>
        
          {
            newsDescription.map((desc,idx) => {
              return (
                <View key={idx}>
                  {
              idx ==3 ? <Image source={require('../assets/news_ad.png')} style={{width:width, height:150}}></Image>
              :
            <Text>{cleanDesc(desc)}</Text>
                  }
            </View>
            )}
            )
          }
           
        
       </ScrollView></View> */}
    
       <View  style={styles.bottomView}>
 
 
              
 
               {
                !isBottomAd ? null :
               
               <View>
                    {/* <Image source={require('./../assets/dashboard-ad.png')} style={styles.banner}></Image> */}
                
                <View style={{flexDirection:'column',}}>
                   
                 {
                      adData.length  ? <Image source={{uri: currentImg}} style={{width:adWidth, height:80, resizeMode:'contain'}}></Image>: null 
                      
                      }
                     
                    
                  </View>
                   <View style={{flexDirection:"column", alignItems:'flex-end',padding:0,margin:0, position:'absolute', right:0 }}>
                    <Pressable onPress={() => {setBottomAdandTimer() }}>
                      <MaterialCommunityIcons name="close-circle" size={18} style={{color: '#000', marginRight:5, right:0, marginTop:5}}  />
                    </Pressable>
                    
                 </View>
               </View>
               }
            </View>
        </>
      }
    </View>
   
  )
};
const styles = StyleSheet.create(
{
     MainContainer:
    {
        flex: 1,
       
        justifyContent: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
 
    bottomView:{
 
      width: '100%', 
      height: 70, 
      // backgroundColor: '#dddddd', 
      justifyContent: 'center', 
      borderColor:'#000000',
      borderWidth: 0,
      position: 'absolute',
      // borderTopLeftRadius:30,
      // borderTopRightRadius:30,
      bottom: 0,
      flex:1
    },
    banner:{
        width:width-40,padding:0,margin:0, borderRadius:10,
    }, 
   
    newsHeadline:{
 
      alignItems: 'center',
     
    },
     newsHeadlineText:{
 
      color: '#000',
      fontSize:14,
      fontWeight: '600',
      textAlign:'center',
      lineHeight: 20
   
     
    }
});

export default PunjabiNewsDetails;

/**
 *     <ScrollView style={{paddingBottom:140}}>
        <View style={{flex:1, height:400, width:width, paddingBottom:140}}>
          {
            newsDescription.map((desc,idx) => {
              return (
              idx ==3 ? <Image source={require('../assets/news_ad.png')} style={{width:width, height:150}}></Image>
              :
            <Text key={idx}>{desc.replace('</h4>','')}</Text>)}
            )
          }
           
         </View> 
       </ScrollView>
 */
