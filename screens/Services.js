import React ,{useState, useEffect, useContext} from 'react';
import {View, Text, Image, FlatList, StyleSheet, Alert, TouchableOpacity, SafeAreaView,Dimensions, ActivityIndicator, Pressable } from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {LoginCredentialsContext} from '../Components/LoginCredentialsContext';


const width = Dimensions.get('window').width+30;
const fullwidth = Math.ceil(Dimensions.get("window").width);
const adWidth = fullwidth;

const Services = () => {
  let serviceUrl = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/GTA_Get_Search_Results";
  const {myLocation, setMyLocation} = useContext(LoginCredentialsContext);  
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState({});
  const [stickyList, setStickyList] = useState({})
  const [highlightedList, setHighlightedList] = useState({});
  const txt = '';
  const { city, province } = myLocation;
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  useEffect(() => {
    let source = axios.CancelToken.source();  
    
    requestOne = axios.post(serviceUrl, {Keyword:txt, City:city, Province:province, cancelToken: source.token});
     axios.all([requestOne]).then(axios.spread((...responses) => {
         const responseOne = responses[0];
         console.log(responseOne);
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
                       
                       // setBottomAd(true)
                        setLoading(false) 

                    }
                    else {
                         
                         setLoading(false) 
                    }
           }


     })).catch((error) => {console.log("Error Occurred", error.response.data)})

  },[]);


  return (
    
    <View style={{flex:1, flexdirection: 'column'}}>
        <View>
            <Text>Search</Text>
        </View>
        <View>
            <Text>Sticky</Text>
        </View>
         <View style={{flex:1}}>
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
                         <Text>Sticky List</Text>
                        
                                </>
                    }
        </View>

    </View>
   
  )
};

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


export default Services;
