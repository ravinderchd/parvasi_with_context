import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, FlatList, StyleSheet, Alert, TouchableOpacity, SafeAreaView,Dimensions, ActivityIndicator, Pressable } from 'react-native';
import {LoginCredentialsContext} from '../Components/LoginCredentialsContext';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native"; 
import axios from 'axios';



// import { RemoteKeywords } from '../Components/RemoteKeywords';
const width = Dimensions.get('window').width+30;
const fullwidth = Math.ceil(Dimensions.get("window").width);
const adWidth = fullwidth;
const  Services = (props) =>{
  const [listing, setListing] = useState({});
  const [stickyList, setStickyList] = useState({})
  const [highlightedList, setHighlightedList] = useState({});
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  const {myLocation, setMyLocation} = useContext(LoginCredentialsContext);  
  const [loading, setLoading] = useState(false);
  const focus = useIsFocused();
    const [defaultRating, setDefaultRating] = useState(4);
    const [isBottomAd, setBottomAd] = useState(true);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [isFocused, setIsFoused] = useState(true);
  const [adData, setAdData] = useState('');
  const [currentImg, setCurrentImg] = useState();
  
let timeout;
const delay = 55;
const [currentCount, setCount] = useState(0); 

  useEffect(() => {
    console.log("USE EFFECT Running")
    SearchClicked('');
  }, []);
// const getList = (keyword) => {
//     console.log("Keyword=====", keyword);
//     SearchClicked(keyword)
// }
const setBottomAdandTimer = () => {
setBottomAd(false);
 clearTimeout(timeout);
}
useEffect(() => {
      console.log("AGAIN in The EFFECT resload");
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
const SearchClicked = (txt) => {
    console.log("Searched TEXT==", txt)
    setLoading(true)
    const { city, province } = myLocation;
    let unmounted = false;
    let source = axios.CancelToken.source();  

    let two = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/GTA_Get_Search_Results";
     const adUrl =  "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Ad_Get_Ads_By_Position";

          const requestOne = axios.post(two, {Keyword:txt, City:city, Province:province, cancelToken: source.token});
          const requestTwo = axios.post(adUrl, {Ad_Position_Id: 3,  cancelToken: source.token});
          axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
                const responseOne = responses[0]
                const responseTwo = responses[1]
                if (!unmounted) {
                     
                  if(responseOne) {
                 
                    const result = responseOne.data;
                    let ValidJson = result.replace('{"d":null}',"");
                    ValidJson = JSON.parse(ValidJson);
                   // console.log("NEws Details====12313", result)
                    const { message, status, data} = ValidJson
                    console.log("RStatus===", data)
                    if(status==1)
                    {
                     
                      setListing(data);
                      
                      
                         let stickyData = data.filter(function(item){
                                return item.GTA_display_type == 'Sticky';
                                });
                         let highlighetd = data.filter(function(item){
                                return item.GTA_display_type == 'Highlighted';
                                });
                        setStickyList(stickyData)
                        setHighlightedList(highlighetd)
                        console.log("Highlighted dd----dd  DATA ====>>>", highlighetd)
                        setBottomAd(true)
                        setLoading(false) 

                    }
                    else {
                         
                         setLoading(false) 
                    }
                  }

                   if(responseTwo)
                    {
                      const resultAd = responseTwo.data;
                      let ValidJson = resultAd.replace('{"d":null}',"");
                      ValidJson = JSON.parse(ValidJson);
                      const { message, status, data} = ValidJson
                     console.log("Result AD Data====", data)
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
                }
               
              })).catch(error => {
                console.log(error);
                //setIsLoading(false);setNews({});
                if (axios.isCancel(error)) return;
              })
}
    //Handdle rowItemClick Event
    didClickOnRowItems = (item) => {  
        Alert.alert( 'Oh!!, I am just hungry ',  item.frutsName);  
    } 


        return(
            <>
            <View style={{flex:1,flexDirection: 'column'}}>
                
                      <View style={[styles.section,  ]}>
                           
                            {/* <RemoteKeywords onkeywordClick={getList} /> */}
                            </View>

               
                
                
                 {
                    loading ? <ActivityIndicator size="large"  style={{
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        }}></ActivityIndicator> : 
               
                <>
                {
                    stickyList.length >0 && <View key={stickyList[0].GTA_profiles_id} style ={{flexDirection:'row', height:80, marginLeft:10,marginTop:10, marginRight:5, backgroundColor:'#dddddd', borderRadius:17, shadowOffset: { width: 1, height: 1 }, shadowOpacity:  0.4,
                                                                                            shadowRadius: 3, elevation: 5,}}>
                                      {
                                  !stickyList[0].image_url && stickyList[0].image_url==' ' ?  <Image style = {styles.imageStyle} source={require('./../assets/def_listing_img.png')} />
                                  : <Image style = {styles.imageStyle} source={{uri: stickyList[0].image_url }} />
                               }
                                    {/* <Image style = {styles.imageStyle} source={{uri: (stickyList[0].image_url && stickyList[0].image_url!='')?  stickyList[0].image_url : require('./../assets/def_listing_img.png')}} /> */}
                                    <View style={{flexDirection:'column',}}>
                                        <Text style = {styles.item}>{stickyList[0].name} aasdsa</Text>
                                        <Text style = {styles.subitem}>
                                        {stickyList[0].city}, {stickyList[0].province}
                                        </Text>
                                         <Text style = {styles.profession}> 
                                        {stickyList[0].category} | {stickyList[0].sub_category}
                                        </Text>
                                       
                                        <Text style = {styles.stars} >
                                              {maxRating.map((item_star, key) => {
                                                return (
                                                    
                                                        item_star <= stickyList[0].rating
                                                            ?  <MaterialCommunityIcons  key={key}
                                                                    size={14}
                                                                    name={Platform.OS === 'android' ? 'star' : 'star'} />
                                                                                    :  <MaterialCommunityIcons  key={key}
                                                                    size={14}
                                                                    name={Platform.OS === 'android' ? 'star-outline' : 'star-outline'} />
                                                        
                                                   
                                                )
                                              })
                                              }
                                        </Text>
                                    </View>
                </View>
                }
                {
                    listing.length > 0 ?
                      <FlatList    contentContainerStyle={{ paddingBottom: 120 }} 
                        data = {listing}
                        keyExtractor={(item, index) => item.GTA_profiles_id}
                        renderItem={({item, index}) =>  
                        item.GTA_display_type == 'General' ?
                     
                    <SafeAreaView >
                            <View style ={{flex:1, flexDirection:'row', height:80, marginLeft:10,marginTop:10, marginRight:5, backgroundColor:'#dddddd', borderRadius:17}} >
                               {
                                  !item.image_url && item.image_url=='' ?  <Image style = {styles.imageStyle} source={require('./../assets/def_listing_img.png')} />
                                  : <Image style = {styles.imageStyle} source={{uri: item.image_url }} />
                               }
                                     
                                    <Pressable onPress={() => props.navigation.navigate('ServiceDetail', {listid: item.GTA_profiles_id})}>
                                    <View style={{flexDirection:'column',}}>
                                        <Text style = {styles.item}>
                                        {item.name} 123
                                        </Text>
                                        <Text style = {styles.subitem}>
                                        {item.city}, {item.province}
                                        </Text>
                                         <Text style = {styles.profession} >
                                        {item.category} | {item.sub_category}
                                        </Text>
                                       
                                        <Text style = {styles.stars} >
                                              {maxRating.map((item_star, key) => {
                                                return (
                                                    
                                                        item_star <= item.rating
                                                            ?  <MaterialCommunityIcons key={key}
                                                                    size={14}
                                                                    name={Platform.OS === 'android' ? 'star' : 'star'} />
                                                                                    :  <MaterialCommunityIcons  key={key}
                                                                    size={14}
                                                                    name={Platform.OS === 'android' ? 'star-outline' : 'star-outline'} />
                                                        
                                                   
                                                )
                                              })
                                              }
                                        </Text>
                                    </View></Pressable>
                                    
                            </View>
                            </SafeAreaView>
                            : null
                            
                            
                    }
                    
                    // ItemSeparatorComponent = {itemSeperator}
                />:null
                }
                </>
                }
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

           
            {/* <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, height:60, backgroundColor:'#ff0000', alignItems: 'center', textAlign:'center'}}><Text>My fixed footer</Text></View> */}
            </>
        );
   
}


const styles = StyleSheet.create({  
    container: {  
        flex: 1,
      
    },  
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
    item: {  
      
        marginLeft:10,
        fontWeight: 'bold',
        fontSize: 14,
        paddingTop:4,
        margin:1,
    

       
    },
    banner:{
        width:width,
    },  
     subitem: {  

        marginLeft:10,
        fontWeight: 'bold',
        fontSize: 12,
        paddingTop:1,
        margin:1,
      

       
    },
    profession:{
        fontSize:10,
        marginLeft:10,
        color: '#222222',
    },
    stars:{
         marginLeft:10,
    },
    section: {
    marginBottom: 2,

  },
    imageStyle: {
        margin:7, 
        padding:2, 
        height: 60,
        width:60,
        borderRadius: 8
    },
    headerAd: {
        fontWeight:'bold', fontSize:20, height:60, backgroundColor:'#ff0000', alignItems: 'center'
    },
      starImageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
});


const itemSeperator = () => {
    return(
        <View 
            style = {{
                height: 0.5,
                width: '100%',
                backgroundColor : '#000000'
            }}>
        </View>
    );
};

export default Services;