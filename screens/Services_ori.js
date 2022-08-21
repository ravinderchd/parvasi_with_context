import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Image, FlatList, StyleSheet, Alert, TouchableOpacity, SafeAreaView,Dimensions, ActivityIndicator, Pressable } from 'react-native';
import {LoginCredentialsContext} from '../Components/LoginCredentialsContext';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from 'axios';
import SearchBar from '../Components/SearchBar';
const frutsList = [ 
        {frutsName: 'Apples'},
        {frutsName: 'Bananas'},
        {frutsName: 'Cherry'}, 
        {frutsName: 'Damson plum'},
        {frutsName: 'Elderberry'}, 
        {frutsName: 'Fig'},
        {frutsName: 'Grapes'},
        {frutsName: 'Honeydew'},
        {frutsName: 'Indian Plum'}, 
        {frutsName: 'Jackfruit'},
        {frutsName: 'Kiwi'},
        {frutsName: 'Lime'},
        {frutsName: 'Mango'},
        {frutsName: 'Nectarine'},
        {frutsName: 'Olive'},
        {frutsName: 'Peach'},
        {frutsName: 'Quince'},
        {frutsName: 'Rambutan'},
        {frutsName: 'Starfruit'},
        {frutsName: 'Tomato'},
        {frutsName: 'Ugli Fruit'},
        {frutsName: 'Vanilla Beans'},
        {frutsName: 'Watermelon'},
        {frutsName: 'xx :)'},
        {frutsName: 'Yellow Passion Fruit'},
        {frutsName: 'Zucchini'}
]


const frutsListCustome =[  
    {frutsName: 'Apples', ImageURl: 'https://upload.wikimedia.org/wikipedia/commons/archive/1/15/20151001144642%21Red_Apple.jpg'},
    {frutsName: 'Bananas' , ImageURl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Bananas_white_background.jpg'},
    {frutsName: 'Cherry', ImageURl: 'https://upload.wikimedia.org/wikipedia/commons/archive/b/bb/20071204110320%21Cherry_Stella444.jpg'}, 
    {frutsName: 'Damson plum', ImageURl: 'https://upload.wikimedia.org/wikipedia/commons/archive/8/8f/20170719135713%21Damson_plum_fruit.jpg'},
    {frutsName: 'Elderberry', ImageURl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Sambucus-berries.jpg'}, 
    {frutsName: 'Fig', ImageURl: 'https://upload.wikimedia.org/wikipedia/commons/archive/0/04/20100807204118%21Fig.jpg'},
    {frutsName: 'Grapes', ImageURl: 'https://halfyourplate-4kgxi1gvwldjzby.stackpathdns.com/wp-content/uploads/2015/01/grapes_small.jpg'},
    {frutsName: 'Honeydew', ImageURl: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Honeydew.jpg'},
        {frutsName: 'Fig', ImageURl: 'https://upload.wikimedia.org/wikipedia/commons/archive/0/04/20100807204118%21Fig.jpg'},
            {frutsName: 'Fig', ImageURl: 'https://upload.wikimedia.org/wikipedia/commons/archive/0/04/20100807204118%21Fig.jpg'},
                {frutsName: 'Fig', ImageURl: 'https://upload.wikimedia.org/wikipedia/commons/archive/0/04/20100807204118%21Fig.jpg'},
] 

const  Services = (props) =>{
  const [listing, setListing] = useState({});
  const [stickyList, setStickyList] = useState({})
  const [highlightedList, setHighlightedList] = useState({});
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  const {myLocation, setMyLocation} = useContext(LoginCredentialsContext);  
  const [loading, setLoading] = useState(false);
    const [defaultRating, setDefaultRating] = useState(4);
    const [isBottomAd, setBottomAd] = useState(true);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);



//   useEffect(() => {
//     console.log("MY LOCATION in sERVICE ==", myLocation)
//     console.log("Search Phrase", searchPhrase)
//     const getData = async () => {
//       const apiResponse = await fetch(
//         "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/GTA_Get_Search_Results"
//       );
//       const data = await apiResponse.json();
//       setFakeData(data);
//     };
//     getData();
//   }, []);
const SearchClicked = (txt) => {
    console.log("Searched TEXT==", txt)
    setLoading(true)
    const { city, province } = myLocation;
    let unmounted = false;
    let source = axios.CancelToken.source();  
    let two = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/GTA_Get_Search_Results";
          
          const requestTwo = axios.post(two, {Keyword:txt, City:city, Province:province}, {timeout:3000});

          axios.all([requestTwo]).then(axios.spread((...responses) => {
                const responseOne = responses[0]
               
                if (!unmounted) {
                     
                 
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
            <View >
                <View style ={{flexDirection:'row', height:50, marginLeft:10,marginTop:5, marginRight:5, backgroundColor:'#dddddd', borderRadius:17}}>
                     <SearchBar
                                    searchPhrase={searchPhrase}
                                    setSearchPhrase={setSearchPhrase}
                                    clicked={clicked}
                                    setClicked={setClicked}
                                    onSearchClick = {SearchClicked}
                    />
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
                   
                                    <Image style = {styles.imageStyle} source={{uri: stickyList[0].image_url?  stickyList[0].image_url : require('./../assets/def_listing_img.png')}} />
                                    <View style={{flexDirection:'column',}}>
                                        <Text style = {styles.item}>{stickyList[0].name}</Text>
                                        <Text style = {styles.subitem}>
                                        {stickyList[0].city}, {stickyList[0].province}
                                        </Text>
                                         <Text style = {styles.profession}> 
                                        {stickyList[0].category} , {stickyList[0].sub_category}
                                        </Text>
                                       
                                        <Text style = {styles.stars} >
                                              {maxRating.map((item_star, key) => {
                                                return (
                                                    
                                                        item_star <= stickyList[0].rating
                                                            ?  <MaterialCommunityIcons
                                                                    size={14}
                                                                    name={Platform.OS === 'android' ? 'star' : 'star'} />
                                                                                    :  <MaterialCommunityIcons
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
                    renderItem={({item, index}) =>  
                     item.GTA_display_type == 'General' ?
                    <SafeAreaView >
                            <View style ={{flex:1, flexDirection:'row', height:80, marginLeft:10,marginTop:10, marginRight:5, backgroundColor:'#dddddd', borderRadius:17}} key={index} >
                                    <Image style = {styles.imageStyle} source={{uri: item.image_url?  item.image_url : require('./../assets/def_listing_img.png')}} />
                                    <Pressable onPress={() => props.navigation.navigate('ServiceDetail', {listid: item.GTA_profiles_id})}>
                                    <View style={{flexDirection:'column',}}>
                                        <Text style = {styles.item}>
                                        {item.name}
                                        </Text>
                                        <Text style = {styles.subitem}>
                                        {item.city}, {item.province}
                                        </Text>
                                         <Text style = {styles.profession} >
                                        {item.category} , {item.sub_category}
                                        </Text>
                                       
                                        <Text style = {styles.stars} >
                                              {maxRating.map((item_star, key) => {
                                                return (
                                                    
                                                        item_star <= item.rating
                                                            ?  <MaterialCommunityIcons
                                                                    size={14}
                                                                    name={Platform.OS === 'android' ? 'star' : 'star'} />
                                                                                    :  <MaterialCommunityIcons
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
            {
                 isBottomAd ?
           
            <View style = { styles.MainContainer }>
              <View style={ styles.bottomView}>
                {
                    highlightedList.length > 0 &&
                
                        <><View style ={{flex:1, flexDirection:'row', height:80, marginLeft:10,marginTop:10, marginRight:5, backgroundColor:'#dddddd', borderRadius:17}}>
                            <Image style = {styles.imageStyle} source={{uri: highlightedList[0].image_url?  highlightedList[0].image_url : require('./../assets/def_listing_img.png')}} />
                            
                                    <View style={{flexDirection:'column',}}>
                                        <Text style = {styles.item}>{highlightedList[0].name}</Text>
                                        <Text style = {styles.subitem}>
                                        {highlightedList[0].city}, {highlightedList[0].province}
                                        </Text>
                                         <Text style = {styles.profession}> 
                                        {highlightedList[0].category} , {highlightedList[0].sub_category}
                                        </Text>
                                       
                                        <Text style = {styles.stars} >
                                              {maxRating.map((item_star, key) => {
                                                return (
                                                    
                                                        item_star <= highlightedList[0].rating
                                                            ?  <MaterialCommunityIcons
                                                                    size={14}
                                                                    name={Platform.OS === 'android' ? 'star' : 'star'} />
                                                                                    :  <MaterialCommunityIcons
                                                                    size={14}
                                                                    name={Platform.OS === 'android' ? 'star-outline' : 'star-outline'} />
                                                        
                                                   
                                                )
                                              })
                                              }
                                        </Text>
                                    </View><View><Pressable onPress={() => setBottomAd(false)}>
                                                    <MaterialCommunityIcons name="close-circle" size={18} style={{color: '#000', marginRight:19, right:0, marginTop:0}}  />
                                                    </Pressable></View></View></>
                  }
 
               </View></View>: null
                }
            {/* <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, height:60, backgroundColor:'#ff0000', alignItems: 'center', textAlign:'center'}}><Text>My fixed footer</Text></View> */}
            </>
        );
   
}

const width = Dimensions.get('window').width+30;
const styles = StyleSheet.create({  
    container: {  
        flex: 1,
      
    },  
    MainContainer:
    {
        flex: 1,
       
        justifyContent: 'flex-start',
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
    imageStyle: {
        margin:7, 
        padding:2, 
        height: 60,
        width:60,
        borderRadius: 8
    },
    headerAd: {
        fontWeight:'bold', fontSize:20, height:60, backgroundColor:'#ff0000', alignItems: 'center', textAlign:'center'
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