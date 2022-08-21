import React, {useState, useEffect} from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, StyleSheet, Image, FlatList, Dimensions, ImageBackground, Pressable, ActivityIndicator} from 'react-native';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native"; 

const fullwidth = Math.ceil(Dimensions.get("window").width);
const width = fullwidth/2-5;
const height = width-90;

const adWidth = fullwidth;
const PunjabiNewsPaper = (props) => {
        const [breakingNews, setBreakingNews] =useState({});
        const [isLoadingPunjabi, setIsLoadingPunjabi] = useState(true);
        const [otherBreakingNew , setOtherBreakingNew] = useState();
        const [adData, setAdData] = useState('');
        const [currentCount, setCount] = useState(0); 
        const [currentImg, setCurrentImg] = useState();
        const [isBottomAd, setBottomAd] = useState(true);
        const [show, setShow] = useState(false);
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
useEffect(() => {
         console.log("I am in EFFECT")     
         let unmounted = false;
          let source = axios.CancelToken.source();  
      

          
          //const newUrl = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Get_Punjabi_Breaking_News";
          const newUrl = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Get_Punjabi_News_For_Inner_Section";
          const adUrl =  "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Ad_Get_Ads_By_Position";

          const requestOne = axios.post(newUrl, {News_Count: '10', timeout: 60 , cancelToken: source.token});
          const requestTwo = axios.post(adUrl, {Ad_Position_Id: 8}); //Dashboard Ad
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
                      console.log("NEWS DATA===", data);
                      if(status==1)
                      {
                          
                          setBreakingNews(data);
                           setOtherBreakingNew(data);
                           setIsLoadingPunjabi(false);
                      }
                      else
                      {
                          setBreakingNews({});
                          setIsLoadingPunjabi(false);
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
                
                })
              )
              .catch(errors => {
                // react on errors.
                console.error(errors);
                setIsLoadingPunjabi(false);setBreakingNews({});console.log("Error Occurred While Fetching Punjabi News", errors.response); if (axios.isCancel(errors)) return; 
              });
        

        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };

    },[]);    
const setBottomAdandTimer = () => {
setBottomAd(false);
 clearTimeout(timeout);
}    
  return (
     <View style={{flex:1,flexDirection: 'column'}}>
        <View style={{alignContent:'center', alignItems: 'center'}}>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.heading1}>Newspaper</Text><Text style={styles.heading2}> | Punjabi</Text>
          </View>
        </View>
        { isLoadingPunjabi ? <ActivityIndicator size="large"  style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}></ActivityIndicator> : 
        
        (
          <>
        <View style={styles.container}>
            <Pressable onPress ={() => props.navigation.navigate('PunjabiNewsDetails', {newsid: breakingNews[0].id})}>
                <View style={styles.box1}>
                    <ImageBackground source={{uri: breakingNews[0].image_url?  breakingNews[0].image_url : def_uri } } resizeMode="cover"  style={styles.image} >
                      <Text style={styles.breakingnewshead}>{breakingNews[0].title}</Text>
                    </ImageBackground>
                </View>
            </Pressable>
             <Pressable onPress ={() => props.navigation.navigate('PunjabiNewsDetails', {newsid: breakingNews[1].id})}>
                <View style={styles.box2}>
                <ImageBackground source={{uri:breakingNews[1].image_url ?  breakingNews[1].image_url : def_uri}} resizeMode="cover"  style={styles.image} >
                   <Text style={styles.breakingnewshead}>{breakingNews[1].title}</Text>
                </ImageBackground>
                </View>
              </Pressable>
        </View>
        <View style={styles.container}>
           <Pressable onPress ={() => props.navigation.navigate('PunjabiNewsDetails', {newsid: breakingNews[2].id})}>
                <View style={styles.box1}>
                    <ImageBackground source={{uri:breakingNews[2].image_url ?  breakingNews[2].image_url : def_uri}} resizeMode="cover"  style={styles.image} >
                       <Text style={styles.breakingnewshead}>{breakingNews[2].title}</Text>
                    </ImageBackground>
                </View>
             </Pressable>
             <Pressable onPress ={() => props.navigation.navigate('PunjabiNewsDetails', {newsid: breakingNews[3].id})}>
                <View style={styles.box1}>
                    <ImageBackground source={{uri:breakingNews[3].image_url ?  breakingNews[3].image_url : def_uri}} resizeMode="cover"  style={styles.image} >
                       <Text style={styles.breakingnewshead}>{breakingNews[3].title}</Text>
                    </ImageBackground>
                </View>
             </Pressable>
        </View>
        
          <FlatList contentContainerStyle={{ paddingBottom: 80 }} 
                    data = {otherBreakingNew}
                     viewabilityConfig={{
                                      itemVisiblePercentThreshold: 50
                                    }}
                    renderItem={({item, index}) =>  
                            index >3 ?
                            <Pressable onPress ={() => props.navigation.navigate('PunjabiNewsDetails', {newsid: otherBreakingNew[index].id})}>
                            <View style ={{flex:1, flexDirection:'row', height:132, marginLeft:5,marginTop:10, marginRight:5, backgroundColor:'#dddddd', borderRadius:17}} key={Math.random().toString()} >
                                    <ImageBackground source={{uri:item.image_url ?  item.image_url : def_uri}} resizeMode="cover"  style={styles.image} >
                                    <View style={{flexDirection:'column',}}>
                                        <Text style = {styles.item}>
                                        {item.title}
                                        </Text>
                               
                                    </View>
                                    </ImageBackground>
                                    
                            </View></Pressable>
                            : null
                           
                    }
                    
                    // ItemSeparatorComponent = {itemSeperator}
                />
              
        
        </>
        
        
        
        )
        }
        
       
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
    height: height,
     backgroundColor: 'steelblue',
    borderRadius:10,
    
  },
  box2: {
    width: width,
    height: height,
    backgroundColor: 'steelblue',
     borderRadius:10,
  },
  box3: {
    width: width,
    height: height, 
    backgroundColor: 'steelblue',
     borderRadius:10,
  },
  box4: {
    width: width,
    height: height, 
   
     borderRadius:10,
  },
    box5: {
    width: width,
    height: height, 
   
     borderRadius:10,
  },
  textStyle: {
    color: 'black',
    alignSelf: 'center',
    margin: 20,
  },
   image: {
    flex: 1,
    justifyContent: "flex-start",
    padding:7,
    
  },
  breakingnewshead : {
    fontSize:14,
    fontWeight: "bold",
    color: 'white',
  },
  heading1: {
    fontSize:22,
    fontWeight:'700'
  },
  heading2: {
  fontSize:22,
    fontWeight:'700',
    color: 'red',
  },
  item: {
    color: 'white',
  },
});

export default PunjabiNewsPaper
