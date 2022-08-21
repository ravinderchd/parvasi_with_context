import React, { useEffect, useState } from 'react';
import {ScrollView, Text, View, Dimensions, TouchableOpacity, Image, Pressable, StyleSheet, ActivityIndicator, Platform, Linking, ImageBackground } from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const width = Dimensions.get('window').width;
const ServiceDetail = ({route, navigarion }) => {
  //console.log("List id====", route.params.listid);
const listingId = route.params.listid;
const [isLoading, setIsLoading] = useState(true);
const [listingDetail, setListingDetail] = useState({});
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
useEffect(() =>{
   const newUrl = "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/GTA_Get_Profile_Details";
    let unmounted = false;
    let source = axios.CancelToken.source();  
    axios.post(newUrl, {GTA_Profile_Id: listingId, timeout: 60 , cancelToken: source.token}).then(
                (response) =>{
                    if (!unmounted) {
                   
                          const result = response.data;
                          let ValidJson = result.replace('{"d":null}',"");
                          ValidJson = JSON.parse(ValidJson);
      
                          const { message, status, data} = ValidJson
                          console.log("RStatus===", data)
                          if(status==1)
                          {
                              setListingDetail(data);
                              setIsLoading(false);
                          }
                          else
                          {
                              setListingDetail({});
                              setIsLoading(false);
                          }
                    }
                }
            ).catch((error) => { setIsLoading(false);setListingDetail({});console.log("Error Occurred While Fetching News", error.response); if (axios.isCancel(error)) return; })
        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };

},[]);

const openDialScreen = (ph) => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:'+`${ph}`;
    } else {
      number = 'tel:'+`${ph}`;
    }
    Linking.openURL(number);
  };
const openURL = (url) => {
    let website = '';
    if (Platform.OS === 'ios') {
      website = `${url}`;
    } else {
      website = `${url}`;
    }
    if(website!='')
    Linking.openURL(website);
  };
  return (
    

   <>
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
    
   <ScrollView>
      <View style={styles.container}>
          <View style={styles.topimgContainer}>
             <ImageBackground source={{uri: listingDetail[0].image_url } } resizeMode="contain"  style={styles.image} />
          </View>
          <View style={styles.secondRow}>
            <View style={styles.design}>
              <Text>{listingDetail[0].name}</Text>
              <Text>{listingDetail[0].city}, {listingDetail[0].province}</Text>
               <View style={styles.stars}>
              <Text style={styles.starText}>
                  {maxRating.map((item_star, key) => {
                                                return (
                                                    
                                                        item_star <= listingDetail[0].rating
                                                            ?  <MaterialCommunityIcons
                                                                    size={14}
                                                                    name={Platform.OS === 'android' ? 'star' : 'star'} color={'gold'} />
                                                                                    :  <MaterialCommunityIcons
                                                                    size={14}
                                                                    name={Platform.OS === 'android' ? 'star-outline' : 'star-outline'} color={'gold'}/>
                                                        
                                                   
                                                )
                                              })
                                              }
              </Text>
              
            </View>
            </View>
            <View style={{flex:1,marginRight:0, right:0, borderWidth:0, textAlign:'right', flexDirection:'column'}}>
              <View>
              <Text style={{textAlign:'right'}}>{listingDetail[0].category}</Text>
              </View>
              <View style={{flex:1, borderWidth:0}}>
              <Text style={{textAlign:'right'}}> {listingDetail[0].sub_category}</Text></View>
            </View>
          </View>
          <View style={styles.icons}>
              <View style={{justifyContent: "space-between", flexDirection:'row', width:'100%'}}>
                <Pressable onPress={() => {openURL(listingDetail[0].website)}}>
                  <View style={{flexDirection:'column',  alignItems: 'center'}}>
                   <Image source={require('../assets/grp1.png')} style={{ height:50, width:50}}></Image>
                    <View><Text style={{textAlign: 'center',}}>Website</Text></View>
                  </View>
                  </Pressable>
                  <View style={{flexDirection:'column',  alignItems: 'center'}}>
                    <Image source={require('../assets/loc.png')} style={{ height:50, width:50}}></Image>
                    <View><Text style={{textAlign: 'center',}}>Location</Text></View>
                  </View>
                  <Pressable onPress={() => {openDialScreen(listingDetail[0].phone)}}>
                  <View style={{flexDirection:'column',  alignItems: 'center'}}>
                    <Image source={require('../assets/contact.png')} style={{ height:50, width:50}}></Image>
                     <View><Text style={{textAlign: 'center',}}>Contact</Text></View>
                  </View>
                  </Pressable>
                  <View style={{flexDirection:'column',  alignItems: 'center'}}>
                    <Image source={require('../assets/download.png')} style={{ height:50, width:50, textAlign: 'center'}}></Image>
                     <View><Text style={{textAlign: 'center',}}>Download{'\n'}</Text></View>
                  </View>
               
              </View>
          </View>
          <View>
            <Text>Personal Information</Text>
            <View style={styles.elevatedContact}>
                <View style={{flexDirection:'column'}}>
                    <View style={{flexDirection:'row'}}><Text style={{paddingRight:10, width:70}}>Name:</Text><Text>{listingDetail[0].name}</Text></View>
                    <View style={{flexDirection:'row'}}><Text style={{paddingRight:10, width:70}}>Phone:</Text><Pressable onPress={() => openDialScreen(listingDetail[0].phone)}><Text>{listingDetail[0].phone}</Text></Pressable></View>
                    <View style={{flexDirection:'row'}}><Text style={{paddingRight:10, width:70}}>Mobile:</Text><Pressable onPress={() => openDialScreen(listingDetail[0].mobile)}><Text>{listingDetail[0].mobile}</Text></Pressable></View>
                    <View style={{flexDirection:'row'}}><Text style={{paddingRight:10, width:70}}>Fax:</Text><Text>{listingDetail[0].fax}</Text></View>
                    <View style={{flexDirection:'row'}}><Text style={{paddingRight:10, width:70}}>Toll Free:</Text><Text >{listingDetail[0].toll_free}</Text></View>
                    <View style={{flexDirection:'row'}}><Text style={{paddingRight:10, width:70}}>Email:</Text><Text>{listingDetail[0].email}</Text></View>
                </View>
            </View>
          </View>
          <Text>Details</Text>
          <View>
             <View style={styles.detail}>
              <Text>{listingDetail[0].details}</Text>
             </View>
          </View>
          <Text>Tags</Text>
          <View style={styles.tags}>
              <Text>{listingDetail[0].tags}</Text>
          </View>
      </View></ScrollView>
      }
   </>
  )
};

const styles = StyleSheet.create(
{
  container:{
    flex:1,flexDirection: 'column',margin:10
  },
  topimgContainer : {
    alignContent: 'center',
    alignItems: 'center',
    width: width-23,
    height: 132,
    backgroundColor: '#dddddd',
    borderRadius:20,
    marginVertical:10,
    padding:5,
  },
  secondRow: {
    borderWidth:0,
    flexDirection: 'row',alignItems:'stretch'
  }, 
  design:{
    width:'60%', flexDirection:'column'
  },
  stars:{
    borderWidth:0,width:'40%',
    flexDirection:'column', 

  },
  starText : {
    flex:1,
    
  },
  icons: {
    marginTop:20,marginHorizontal:30,
    flexDirection:'row', borderWidth:0
  },
  elevatedContact: {
    height:145, width:width-20, backgroundColor:'#fff', borderRadius:9,padding:8,    borderWidth: 0,
    marginVertical:10,
    shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 15,
   
   
  },
  detail: {
    height:95, width:width-20, backgroundColor:'#fff', borderRadius:9,padding:8,    borderWidth: 0,
    marginVertical:10,
    shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 15,
   
   
  },
  tags :{
     height:45, width:width-20, backgroundColor:'#fff', borderRadius:9,padding:8,    borderWidth: 0,
    marginVertical:10,
    shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 15,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: '100%',
  },
});
export default ServiceDetail;
