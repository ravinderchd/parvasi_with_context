import React, {useEffect, useState} from 'react';
// import GridImageView from 'react-native-grid-image-viewer';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import GridImageViewerCaption from 'react-native-grid-image-viewer-with-caption';
import { useIsFocused } from "@react-navigation/native"; 
import { Text, View, StyleSheet, Image, FlatList, Dimensions, ImageBackground, Pressable, ActivityIndicator} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { useNavigationState } from "@react-navigation/core";
import AwardGalleryDetails from './AwardGalleryDetails';
const fullwidth = Math.ceil(Dimensions.get("window").width);
const width = fullwidth+30;
const adWidth = fullwidth;
const AwardGallery = ({navigation}) => {
      const [awardImages, setAwardImages] = useState();
      const [isLoading, setIsLoading] = useState(true);
      const [images, setImages] = useState();
      const [adData, setAdData] = useState('');
      const [currentImg, setCurrentImg] = useState();
      const [isBottomAd, setBottomAd] = useState(true);
      const [currentCount, setCount] = useState(0);
      const [awardGalleries, setAwardGalleries] = useState()
      const [showGalleryDetails, setShowGalleryDetails] = useState(false)
      const [galleryId, setGalleryId] = useState();
      const delay = 55;
      const navigationState = useNavigationState((state) => state);
      const focus = useIsFocused();
     useEffect(() => {
        console.log("FOCUSEED... ");
        setShowGalleryDetails(false)
    } , [focus]);


useEffect(() => {
         console.log("I am in EFFECT")     
         let unmounted = false;
          let source = axios.CancelToken.source();  
        const results = [];

          
      
          //const adUrl =  "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Gallery_Get_Gallery_Images";
          const galleryUrl =   "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Gallery_Get_Category_Wise_Gallery";
          const adUrl1 =  "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Ad_Get_Ads_By_Position";
     
          const requestOne = axios.post(galleryUrl); //Dashboard Ad
          const requestTwo = axios.post(adUrl1, {Ad_Position_Id: 14});
          axios
              .all([ requestOne, requestTwo])
              .then(
                axios.spread((...responses) => {
                  const responseOne = responses[0];
                  const responseTwo = responses[1];
                    
                     if(responseOne)
                    {
                      const resultGallery = responseOne.data;
                      //let ValidJson = resultGallery.replace('{"d":null}',"");
                      //ValidJson = JSON.parse(ValidJson);
                      const { message, status, data} = resultGallery
                      const { Gallery_List } = data;
                      console.log("Result GALLERY Data====", data.Gallery_List)
                      if(status==1)
                      {
                        let newData =  Object.values(data);
                         console.log("Object Gallery====>>>", data[0].Gallery_List)
                         data[0].Gallery_List.forEach(Gallery_List =>{
                                    
                                    console.log("Gallery Title====\t",Gallery_List.gallery_title);
                                    //results.push({image: gallery_image, text:title})
                                })
                            setAwardGalleries(data[0].Gallery_List);
                            //setAwardImages(newData);
                            setIsLoading(false);
                      }
                      else
                      {
                        setImages({});
                          // setAwardImages({});
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
                         //console.log("AD Data\n\n\n",newData);
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
                
                })
              )
              .catch(errors => {
                // react on errors.
                console.error(errors);
                setIsLoading(false);setAwardImages({});console.log("Error Occurred While Fetching News", errors.response); if (axios.isCancel(errors)) return; 
              });
        

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

const showAwardDetails = (gal_id) =>{
    setGalleryId(gal_id);setShowGalleryDetails(true);
}
useEffect(() => {
    //const results = [];
    // console.log("Array Object===\n\n",awardImages)
    // const listItems = awardImages.map((img) =>{
    //     img.
    // })
    
},[awardImages])

  return (
        showGalleryDetails?<AwardGalleryDetails galleryId={galleryId} />:
        // <GridImageView data={images} />
        isLoading? <ActivityIndicator size="large"  style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}></ActivityIndicator> :
        <>
        {/* <GridImageViewerCaption data={images} captionColor="#fff" /> */}
         <View style={styles.container}>
                <FlatList
                    data={awardGalleries}
                    numColumns={2}
                    keyExtractor={(item)=> item}
                    renderItem={({ item }) => (
                        <>
                        <Pressable style={{flex:1}} onPress={() => {showAwardDetails(item.gallery_id) }}>
                        <View >
                    <View style={styles.card}>
                        
                        <Image source={{uri:item.gallery_thumbnail }} resizeMode="cover"  style={{height:'99%', width:'100%'}} ></Image>
                        
                        </View>
                        <View style={{backgroundColor:'#ff0000', width:'100%', }}><Text style={styles.text}>{item.gallery_title}</Text></View>
                    </View></Pressable>
                    </>
                    )}
                />
                </View>
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
    textStyle:{
 
      color: '#fff',
      fontSize:22
    },
  container: {
    flex: 1,
    justifyContent: 'center',
   
    backgroundColor: '#fff',
    padding: 1,
  },
  card: {
    height: 170,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    boxShadow: "10px 10px 0px -5px rgba(209,25,209,1)",
    margin: 1,
    paddng:1,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    alignSelf:'center',padding:5, margin:1, 
  },
     image: {
    flex: 1,
    justifyContent: "center"
  },
});



export default AwardGallery;
