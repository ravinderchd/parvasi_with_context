import React, {useEffect, useState, useContext, useRef} from 'react'
import {ScrollView, Text, View, Dimensions, TouchableOpacity, Image, Pressable, StyleSheet, ActivityIndicator,Modal } from 'react-native'
import Card from './../Components/Card';
import styled from 'styled-components';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from '../Components/Slider';
import { useIsFocused } from "@react-navigation/native"; 

import axios from 'axios';
// import Carousel from 'react-native-banner-carousel';
import {LoginCredentialsContext, IsLoginVerified} from '../Components/LoginCredentialsContext';
import { add } from 'react-native-reanimated';
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 60;
// import Banner from './../Components/Banner';

// import {  MsgBox } from '../Components/styles'
// import KeyboardAvoidingWrapper from '../Components/KeyboardAvoidingWrapper';

const height = Dimensions.get('window').height/2.2;
const Dashboard = (props) => {
        const [news, setNews] =useState({});
        const [isLoading, setIsLoading] = useState(true);
        const {IsModal, setIsModal} = useContext(LoginCredentialsContext);  
        const [isBottomAd, setBottomAd] = useState(true);
        const focus = useIsFocused();
        const [isFocused, setIsFoused] = useState(true);
        const [adData, setAdData] = useState('');
        const childCompRef = useRef()
        const [currentImg, setCurrentImg] = useState();
    useEffect(() => {
         console.log("I am in EFFECT")     
         let unmounted = false;
          let source = axios.CancelToken.source();  
      

          
          const newUrl = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Get_English_Breaking_News";
          const adUrl =  "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Ad_Get_Ads_By_Position";

          const requestOne = axios.post(newUrl, {News_Count: '10', timeout: 60 , cancelToken: source.token});
          const requestTwo = axios.post(adUrl, {Ad_Position_Id: 2}); //Dashboard Ad
          axios
              .all([requestOne, requestTwo])
              .then(
                axios.spread((...responses) => {
                  const responseOne = responses[0];
                  const responseTwo = responses[1];
                  if(responseOne)
                    {
                      const result = responseOne.data;
                      let ValidJson = result.replace('{"d":null}',"");
                      ValidJson = JSON.parse(ValidJson);
                      const { message, status, data} = ValidJson
                      //console.log("Result 123132131222==", result)
                      if(status==1)
                      {
                          //console.log("Status====1", data);
                          setNews(data);
                          setIsLoading(false);
                      }
                      else
                      {
                          setNews({});
                          setIsLoading(false);
                      }
                    }
                    //console.log("RESPONSE 2===", responseTwo);
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
                  // use/access the results
                 // console.log( responseTwo.data);
                })
              )
              .catch(errors => {
                // react on errors.
                console.error(errors);
                setIsLoading(false);setNews({});console.log("Error Occurred While Fetching News", errors.response); if (axios.isCancel(errors)) return; 
              });
        //News_Count
            //     axios.post(newUrl, {News_Count: '10', timeout: 60 , cancelToken: source.token}).then(
            //     (response) =>{
            //         if (!unmounted) {
            //         console.log("AAAAAA");
            //         const result = response.data;
            //         let ValidJson = result.replace('{"d":null}',"");
            //         ValidJson = JSON.parse(ValidJson);
            //         const { message, status, data} = ValidJson
            //         //console.log("Result 123132131222==", result)
            //         if(status==1)
            //         {
            //             console.log("Status====1", data);
            //             setNews(data);
            //             setIsLoading(false);
            //         }
            //         else
            //         {
            //             setNews({});
            //              setIsLoading(false);
            //         }
            //         }
            //     }
            // ).catch((error) => { setIsLoading(false);setNews({});console.log("Error Occurred While Fetching News", error.response); if (axios.isCancel(error)) return; })

        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };

    },[]);
const delay = 55;
const [currentCount, setCount] = useState(0); 
const showAds = () => {
  console.log("In show Ad==>>\n");
}

// useEffect(() => {  // whenever you are in the current screen, it will be true vice versa

//    if (currentCount <= 0) {
//    return;
//  }

//   id = setInterval(timer, 1000);


// }, [currentCount]);


// useEffect(() => {
//   console.log("lenth====", adData.length)
//   if(adData.length> 0) 
//   {
//     setCurrentImg(adData[0].Ad_image_url);
    
  
//   }
//   return () => {
//     console.log("Clearing first time data");
        
//       };
// },[])
const [show, setShow] = useState(false);
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

// const timer = () => { 
 
//  if(currentCount<adData.length)
//   {
//      console.log("In time out start timer\n");
//     setCount(currentCount + 1);
//     setCurrentImg(adData[currentCount].Ad_image_url);
     
//   }
//   else
//   {
//      setCount(0);
//   }
// }
const setBottomAdandTimer = () => {
setBottomAd(false);
 clearTimeout(timeout);
}
 const renderPage = (image, index) => {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
            </View>
        );
    }
    const service = () =>{
        console.log("Clicked");
    }
    const images = [
        {
            text: 'This is Sample Text!!! This is Sample Text!!! This is Sample Text!!! This is Sample Text!!! This is Sample Text!!! ',
            img : 'https://media.istockphoto.com/vectors/abstract-globe-background-vector-id1311148884?k=20&m=1311148884&s=612x612&w=0&h=2zFGLiw0VmQbh_CFQgbTzaaamRygqILdq1T8QuglBSQ='
        },
         {
            text: 'This is Sample Text!!! This is Sample Text!!! This is Sample Text!!! This is Sample Text!!! This is Sample Text!!! ',
            img : 'https://play-lh.googleusercontent.com/aCyq5_tBBCKcD5f4yuiE3kaNc1HDbPLA7Tq7PoEqBk1RVODSqJQUYpB_ekCrW23qnhw'
        }

    ]
    const slides = {
            
            icon1: require('../assets/home_icons/breaking-news.jpg'),
            icon2: require('../assets/home_icons/Anhad-TV-Live.jpg'),
            icon3: require('../assets/home_icons/Parvasi-Punjabi.jpg'),
            icon4: require('../assets/home_icons/Parvasi-Radio.jpg'),
            }
  return (
    
    <>
    
      <Modal
        animationType="none"
        transparent={true}
        visible={IsModal}
        onRequestClose={() => {
         
          setIsModal(!IsModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Please Login To Edit Your Profile</Text>
            <Pressable style={styles.button} onPress={() => {setIsModal(!IsModal);props.navigation.navigate('Login')}}><Text style={styles.buttontext}>Login Now</Text></Pressable>
            <Pressable style={styles.button} onPress={() => {setIsModal(!IsModal);props.navigation.navigate('Signup')}}><Text style={styles.buttontext}>Signup</Text></Pressable>
            <Pressable  style={styles.button} onPress={() => setIsModal(!IsModal)}><Text style={styles.buttontext}>Continue as Guest</Text></Pressable>
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
             >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>
      
    
    <View style={{flex:1, flexdirection: 'column', justifyContent:'space-evenly'}}>
       
    <ScrollView style={{height:height,marginBottom:20}}>
         
		
         <View style={{flex:1, flexDirection:"row", backgroundColor:"#fff", height:160}}> 
          
            <View style={{flex : 1, backgroundColor:"#fff",  padding:2, borderRadius:20, borderColor:'fff'}}>
                <Pressable onPress={() => {props.navigation.navigate('LiveTVTabs',  { tabType: 1 }) }} style={({ pressed }) => [
                          { opacity: pressed ? 0.5 : 1.0 }]}>
                <View style={{flexDirection: 'column', maxHeight:140, height:120}}>
                <Image source={slides.icon1} style={{resizeMode: 'stretch', height:'100%',width:'100%', borderRadius:20}}></Image>
                <View style={{backgroundColor:'#FFEDED', height:30, borderRadius:13, marginTop:2, justifyContent:'center', color:'#000' ,alignItems:'center', borderColor:'#F00', borderWidth:2,}}>
                    <Text>Parvasi TV Live</Text>
                </View>
                </View></Pressable>
            </View>
           <View style={{flex : 1, backgroundColor:"#fff",  padding:2, borderRadius:20, borderColor:'fff'}} >
                <Pressable onPress={() => props.navigation.navigate('LiveTVTabsAnhad',  { tabType: 2 }) } style={({ pressed }) => [
                          { opacity: pressed ? 0.5 : 1.0 }]}>
                <View style={{flexDirection: 'column', maxHeight:140, height:120}}>
                <Image source={slides.icon2} style={{resizeMode: 'stretch', height:'100%',width:'100%', borderRadius:20}}></Image>
                <View style={{backgroundColor:'#FFEDED', height:30, borderRadius:13, marginTop:2, justifyContent:'center', color:'#000' ,alignItems:'center', borderColor:'#F00', borderWidth:2,}}>
                    <Text>Anhad TV Live</Text>
                </View>
                </View>
                </Pressable>
            </View>
       </View>
        <View style={{flex:1, flexDirection:"row", backgroundColor:"#fff", height:160}}> 
            <View style={{flex : 1, backgroundColor:"#fff",  padding:2, borderRadius:20, borderColor:'fff'}} >
                 <Pressable onPress={() => props.navigation.navigate('PunjabiNewsPaper') } style={({ pressed }) => [
                          { opacity: pressed ? 0.5 : 1.0 }]}>
                <View style={{flexDirection: 'column', maxHeight:140, height:120}}>
                <Image source={slides.icon3} style={{resizeMode: 'stretch', height:'100%',width:'100%', borderRadius:20}}></Image>
                <View style={{backgroundColor:'#FFEDED', height:30, borderRadius:13, marginTop:2, justifyContent:'center', color:'#000' ,alignItems:'center', borderColor:'#F00', borderWidth:2,}}>
                    <Text>Parvasi Punjabi</Text>
                </View>
                </View>
                </Pressable>
            </View>
           <View style={{flex : 1, backgroundColor:"#fff",  padding:2, borderRadius:20, borderColor:'fff'}} >
                <View style={{flexDirection: 'column', maxHeight:140, height:120}}>
                <Image source={slides.icon4} style={{resizeMode: 'stretch', height:'100%',width:'100%', borderRadius:20}}></Image>
                <View style={{backgroundColor:'#FFEDED', height:30, borderRadius:13, marginTop:2, justifyContent:'center', color:'#000' ,alignItems:'center', borderColor:'#F00', borderWidth:2,}}>
                    <Text>Parvasi Radio</Text>
                </View>
                </View>
            </View>
       </View>
       </ScrollView>
            {/* <Pressable onPress={() => navigation.navigate('LiveTVTabs')} style={({ pressed }) => [
    { opacity: pressed ? 0.5 : 1.0 }
  ]}>
            <View>
	         
               
                <Image source = {slides.icon1} />
               
            
            </View></Pressable> */}
           {/* <ScrollView>
			<ItemsLayout>
               <Pressable onPress={() => navigation.navigate('LiveTVTabs',  { tabType: '2' }) } style={({ pressed }) => [
                          { opacity: pressed ? 0.5 : 1.0 }]}>
				<ColumnOne>
               
					<Card imgSrc={slides.icon1} label= 'Parvasi TV Live'  />
                    
				</ColumnOne>
                </Pressable>
               <Pressable onPress={() => navigation.navigate('LiveTVTabs', { tabType: '2' })} style={({ pressed }) => [
                          { opacity: pressed ? 0.5 : 1.0 }]}>
				<ColumnTwo>
					<Card imgSrc={slides.icon2} label= 'Anhad TV Live' />
				</ColumnTwo>
                </Pressable>
			</ItemsLayout>
            <ItemsLayout>
				<ColumnOne>
					<Card imgSrc={slides.icon3} label= 'Parvasi Punjabi' />
				</ColumnOne>
				<ColumnTwo>
					<Card imgSrc={slides.icon4} label= 'Parvasi Radio' />
				</ColumnTwo>
			</ItemsLayout>
            </ScrollView> */}
        
            <ScrollView>    
                <Pressable onPress={() => {props.navigation.navigate('Services') }} style={({ pressed }) => [
                          { opacity: pressed ? 0.5 : 1.0 }]}>
            <View
            
            style={{flex:1, backgroundColor:'#f00', height:40, marginLeft:10, marginRight:10, borderRadius:37, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', }}>
              <MaterialCommunityIcons name="magnify" size={24} style={{color: 'white', marginLeft:30, right:0, }}  />
                <Text style={{color: 'white', fontSize:15, textAlign:'center', marginLeft:50,}}>Find a Service/Product{"\n"}Powered By GTA Business Pages</Text>
               </View>
            </Pressable>
            <View style={{flexDirection: 'row',flex:1, justifyContent: 'center', alignItems: 'center', alignContent:'center'}}>
                <Text style={{color:'#f00', fontWeight:'800', fontSize:20}}>BREAKING NEWS</Text></View>
            {
                isLoading ? <ActivityIndicator size="large" color="#00ff00" /> 
                :
            
            <View>
                {
                    news.length > 0 ? <Slider news={news} navigation={props.navigation}></Slider> : null
                }
                
            </View>
            }    
           
            
		</ScrollView>
        
         <View style = { styles.MainContainer }>
 
 
              
 
               {
                !isBottomAd ? null :
               
               <View style={ styles.bottomView} >
                    {/* <Image source={require('./../assets/dashboard-ad.png')} style={styles.banner}></Image> */}
                 <View style={{flexDirection:"column", alignItems:'flex-end',paading:0,margin:0 }}>
                    <Pressable onPress={() => {setBottomAdandTimer() }}>
                      <MaterialCommunityIcons name="close-circle" size={18} style={{color: '#000', marginRight:19, right:0, marginTop:5}}  />
                    </Pressable>
                    
                 </View>
                <View style={{flex:1, flexDirection:'column',alignContent: 'center', alignItems: 'center'}}>
                   
                 {
                      adData.length  ? <Image source={{uri: currentImg}} style={{width:'90%', height:60}}></Image>: null 
                      
                      }
                     
                    
                  </View>
               </View>
               }
            </View>

          </View>  
       </>
     
    
	)   
  
};
const width = Dimensions.get('window').width+30;


const ItemsLayout = styled.View`
	flex-direction: row;
	flex: 1;
    margin-bottom:10px ;
`;

const ColumnOne = styled.View``;

const ColumnTwo = styled.View``;

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
      backgroundColor: '#dddddd', 
      justifyContent: 'center', 
      borderColor:'#000000',
      borderWidth: 0,
      position: 'absolute',
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
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
 centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#757575",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    height:250,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginBottom:5,
    width:190,
    borderRadius: 10,
  },

   buttontext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontSize:16,
  },
   overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default Dashboard
