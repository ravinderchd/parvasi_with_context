import React, {useState, useEffect} from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet, Image, Dimensions, ImageBackground, Pressable} from 'react-native';
import axios from 'axios';

import { useIsFocused } from "@react-navigation/native"; 

const fullwidth = Math.ceil(Dimensions.get("window").width);
const width = fullwidth/3-10;
const adWidth = fullwidth;
const ParvasiNewsPaper = ({navigation}) => {
        const [vancouverNewsPaper, setVancouverNewsPaper] = useState()
        const [torontoNewsPaper, setTorontoNewsPaper] = useState()
        const [radioLink, setRadioLink] = useState()
        const [show, setShow] = useState(false);
        const [adData, setAdData] = useState('');
        const [currentCount, setCount] = useState(0); 
        const [currentImg, setCurrentImg] = useState();
        const [isBottomAd, setBottomAd] = useState(true);
        const delay = 55;
        const focus = useIsFocused();
        const def_uri = 'https://germanculture.com.ua/wp-content/uploads/2015/12/german_online_newspapers.jpg';
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

// useEffect(() => {
//          console.log("I am in EFFECT")     
//          let unmounted = false;
//           let source = axios.CancelToken.source();  
      

          
//           const newUrl = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Get_Company_Details";
//           const adUrl =  "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Ad_Get_Ads_By_Position";

//           const requestOne = axios.post(newUrl, {News_Count: '10', timeout: 60 , cancelToken: source.token});
//           const requestTwo = axios.post(adUrl, {Ad_Position_Id: 9,timeout: 90 , cancelToken: source.token}); //Dashboard Ad
//           axios
//               .all([requestOne, requestTwo])
//               .then(
//                 axios.spread((...responses) => {
//                   const responseOne = responses[0];
//                   const responseTwo = responses[1];
//                   if(responseOne)
//                     {
//                       const result = responseOne.data;
//                       let ValidJson = result.replace('{"d":null}',"");
//                       ValidJson = JSON.parse(ValidJson);
//                       const { message, status, data} = ValidJson
//                       console.log("NEWS DATA===", data);
//                       if(status==1)
//                       {
                          
//                           setBreakingNews(data);
//                            setOtherBreakingNew(data);
//                            setIsLoadingEnglish(false);
//                       }
//                       else
//                       {
//                           setBreakingNews({});
//                           setIsLoadingEnglish(false);
//                       }
//                     }
                
//                      if(responseTwo)
//                     {
//                       const resultAd = responseTwo.data;
//                       let ValidJson = resultAd.replace('{"d":null}',"");
//                       ValidJson = JSON.parse(ValidJson);
//                       const { message, status, data} = ValidJson
//                      // console.log("Result AD Data====", data)
//                       if(status==1)
//                       {
//                         let newData =  Object.values(data);
                       
//                           setAdData(newData);
                        
//                       }
//                       else
//                       {
//                            setAdData({});
                        
//                       }
//                     }
                
//                 })
//               )
//               .catch(errors => {
//                 // react on errors.
//                 console.error(errors);
//                 setIsLoadingEnglish(false);setBreakingNews({});console.log("Error Occurred While Fetching News", errors.response); if (axios.isCancel(errors)) return; 
//               });
        

//         return function () {
//             unmounted = true;
//             source.cancel("Cancelling in cleanup");
//         };

//     },[]);
    useEffect(() => {
         console.log("I am in EFFECT")     
         let unmounted = false;
          let source = axios.CancelToken.source();  
         
          let two = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Get_Company_Details";
           const adUrl =  "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Ad_Get_Ads_By_Position";

          //const requestOne = axios.post(newUrl, {News_Count: '10', timeout: 60 , cancelToken: source.token});
          const requestTwo  = axios.post(adUrl, {Ad_Position_Id: 7,timeout: 90 , cancelToken: source.token}); //Dashboard Ad
          const requestOne = axios.get(two);

   

          axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
                
               
                if (!unmounted) {
                  const responseOne = responses[0]  
                  const responseTwo = responses[1];
                  if(responseOne)
                    {
                     const result1 = responseOne.data;
                    //  let ValidJson1 = result1.replace('{"d":null}',"");
                     //ValidJson1 = JSON.parse(ValidJson1);
                      const { message:msg, status:sts, data:data1} = result1;
                     console.log("SECOND RESPONSE=========\n\n\n\n\n", data1)
                     if(sts==1)
                     {
                      const {Vancouver_epaper_link, Toronto_epaper_link, Radio_Archive_Link} = data1[0];
                      console.log("Toroto Link=", Toronto_epaper_link)
                      setVancouverNewsPaper(Vancouver_epaper_link);
                      setTorontoNewsPaper(Toronto_epaper_link);
                      //setRadioLink(Radio_Archive_Link);
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
                       
                          setAdData(newData);
                        
                      }
                      else
                      {
                           setAdData({});
                        
                      }
                    }
                }
               
              })).catch(error => {
                console.log(error);
                setIsLoading(false);setNews({});
                if (axios.isCancel(error)) return;
              })
       

        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };

    },[])
  return (
    <View style={{flex:1,flexDirection: 'column'}}>
        <View style={styles.container}>
            <Pressable onPress={()=>{ navigation.navigate('PunjabiNewsPaper') ;console.log("Pressed.....")}}>
                <View style={styles.box1}>
                    <ImageBackground source={require('../assets/newspaper_dashboards/Group-232.png')} resizeMode="cover"  style={styles.image} ></ImageBackground>
                </View>
            </Pressable>
            <Pressable onPress={()=>{ navigation.navigate('EnglishNewsPaper') ;console.log("Pressed.....")}}>
                <View style={styles.box2}>
                <ImageBackground source={require('../assets/newspaper_dashboards/Group-233.png')} resizeMode="cover"  style={styles.image} ></ImageBackground>
                </View>
                </Pressable>
               <Pressable onPress={()=>{ navigation.navigate('ExternalNewsPaper', {newspaperlink: torontoNewsPaper}) ;console.log("Pressed.....")}}>
                <View style={styles.box3}>
                <ImageBackground source={require('../assets/newspaper_dashboards/Group-234.png')} resizeMode="cover"  style={styles.image} ></ImageBackground>
                </View>
                </Pressable>
        </View>
          <View style={styles.container}>
                <Pressable onPress={()=>{ navigation.navigate('Gallery', { screen: 'PIFFA' }) ;console.log("Pressed.....")}}>
                <View style={styles.box1}>
                    <ImageBackground source={require('../assets/newspaper_dashboards/piffa.png')} resizeMode="cover"  style={styles.image} ></ImageBackground>
                </View>
                </Pressable>
                <Pressable onPress={()=>{ navigation.navigate('Gallery',  { screen: 'AwardGallery' }) }}>
                <View style={styles.box4}><ImageBackground source={require('../assets/newspaper_dashboards/awards.png')} resizeMode="cover"  style={styles.image} ></ImageBackground></View>
                </Pressable>
                 
                  <View style={styles.box5}></View>
                
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
    </View>
    
  )
};

const styles = StyleSheet.create({
    //     MainContainer:
    // {
    //     flex: 1,
       
    //     justifyContent: 'center',
    //     paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    // },
 
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
  container: {
    paddingTop: 10,
     
    flexDirection: 'row',  
    // Try different values for justifyContent ('flex-start', 'flex-end', 'center',         'space-between', 'space-around', 'space-evenly') 
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
   

  },
  box1: {
    width: width,
    height: width,
     backgroundColor: 'steelblue',
    borderRadius:10,
    
  },
  box2: {
    width: width,
    height: width,
    backgroundColor: 'steelblue',
     borderRadius:10,
  },
  box3: {
    width: width,
    height: width, 
    backgroundColor: 'steelblue',
     borderRadius:10,
  },
  box4: {
    width: width,
    height: width, 
   
     borderRadius:10,
  },
    box5: {
    width: width,
    height: width, 
   
     borderRadius:10,
  },
  textStyle: {
    color: 'black',
    alignSelf: 'center',
    margin: 20,
  },
   image: {
    flex: 1,
    justifyContent: "center"
  },
});


export default ParvasiNewsPaper
