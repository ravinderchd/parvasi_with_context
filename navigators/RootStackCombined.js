
import React, {useRef, useState, useContext, useEffect} from 'react';
import { NavigationContainer, CommonActions, useNavigation  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Alert, TouchableOpacity, Image, View, Text, Pressable, SafeAreaView, StyleSheet, Modal} from 'react-native';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native"; 
import {DrawerActions} from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
useDrawerStatus 

} from '@react-navigation/drawer';
// import Splash from '../Components/Splash';
// import ProfileModal from '../Components/ProfileModal';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import LiveTV from '../screens/LiveTV';
import LiveTVTabs from '../screens/LiveTVTabs';
import LiveTVTabsAnhad from '../screens/LiveTVTabsAnhad';
import Services from '../screens/Services';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import user from './../assets/user.png';
import ParvasiNewsPaper from './../screens/ParvasiNewsPaper';
import Profile from '../screens/Profile';
import ChangePassword from '../screens/ChangePassword';
import ProfileWithModal from '../screens/ProfileWithModal';
import Signup from '../screens/Signup';
import ConfirmOTP from '../screens/ConfirmOTP';
import ReConfirmOTP from '../screens/ReConfirmOTP';

import ResendOTP from '../screens/ResendOTP';
import ForgetPassword from '../screens/ForgetPassword';
import ForgetPasswordOTP from '../screens/ForgetPasswordOTP';
import Archived from '../screens/Archived';
import EnglishNewsDetails from '../screens/EnglishNewsDetails';
import PunjabiNewsDetails from '../screens/PunjabiNewsDetails';

import Piffa from '../screens/Piffa';
import EnglishNewsPaper from '../screens/EnglishNewsPaper';
import PunjabiNewsPaper from '../screens/PunjabiNewsPaper';
import ExternalNewsPaper from '../screens/ExternalNewsPaper';
import ServiceDetail from '../screens/ServiceDetail';
import AwardGallery from '../screens/AwardGallery';

import {LoginCredentialsContext, IsLoginVerified} from '../Components/LoginCredentialsContext';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

export const screens = {
  HomeTab: 'HomeTab',
  HomeStack: 'HomeStack',
  Home: 'Home',
  BookStack: 'BookStack',
  Book: 'Book',
  ContactStack: 'ContactStack',
  Contact: 'Contact',
  MyRewardsStack: 'MyRewardsStack',
  MyRewards: 'MyRewards',
  LocationsStack: 'LocationsStack',
  Locations: 'Locations',
}

// useEffect(() => {

// })
const RootStackCombined = () => {


 
  const [isLoading, setLoading] = useState(true);

  const[modalVisible, setModalVisible] = useState(false);
  const {storedCredentials, setStoredCredentials} = useContext(LoginCredentialsContext);
  const {IsModal, setIsModal} = useContext(LoginCredentialsContext); 
  const [isLoggedin, setIsLoggedin] = useState(false);
  

const checkAuthentication = () => {
    
     setLoading(true);
 
     AsyncStorage.getItem('loginCredentials')
        .then((val) => {
        
            setStoredLogin(JSON.parse(val));
            val = JSON.parse(val)
           
           
          //  if(val.isGuest == true || val.isLogged) {
           if(val.isLogged) {
              console.log("I am here")
              setIsLoggedin(true);
            }
            
            
         
             setLoading(false);
      
        })
        .catch(err => {
     
          
           setLoading(false);
            
        });
  };


  useEffect(checkAuthentication, []); // runs the first time

  return (
             isLoading ? null
             : 

            <LoginCredentialsContext.Consumer>
                   {({storedCredentials }) => {
                     if(storedCredentials) {
                        const {otpVerified} = storedCredentials
                        console.log("STORED CREDENTIALS111111==", storedCredentials.isLogged)
                     }
                  return(
                    <>
                    <NavigationContainer>
                   
                          <Stack.Navigator initialRouteName={Splash} screenOptions={{headerTitleAlign: 'center'}}>
                             <Stack.Screen name={"Splash"} component={Splash} options={{ title: 'Welcome To Parvasi APP'}} ></Stack.Screen>
                             <Stack.Screen name={"Login"} component={Login} options={{ title: 'Login Into your account'}} 
                              // initialParams={{ authChanged: checkAuthentication }}
                             />
                             
                            <Stack.Screen name="ResendOTP" component={ResendOTP}  options={{ title: 'Resend OTP'}}/>
                            
                            {/* <Stack.Screen name="DrawerRoutes" key={2}  initialParams={{storedCredentials}} component={DrawerRoutes} options={{headerShown: false}}  /> */}
                            <Stack.Screen name="Dashboard"  component={Dashboard} 
                            options={({navigation}) => ({
                                       
                                       unmountOnBlur:true,
                                    //    drawerItemStyle: { display: 'none' },
                                        drawerLabel: () => <Text>Dashboard</Text>,
                                        title: 'Dashboard',
                                        drawerIcon: config => <MaterialCommunityIcons
                                            size={23}
                                            name={Platform.OS === 'android' ? 'apps' : 'apps'}></MaterialCommunityIcons>,
                                        
                                         headerShown: true,
                                        headerTitle: (props) => ( // App Logo
                                    <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', marginLeft:10}}><Image
                                        style={{height:40}}
                                        source={require('../assets/parvasi-logo.png')}
                                        resizeMode='contain'
                                    /></View>
                                    ),
                                   
                                     headerLeft: () => (
                                                <Pressable onPress={()=>  storedCredentials.isLogged? navigation.navigate('Profile') :  setIsModal(true)}><Image
                                                    source={require("../assets/Group-221.png")}
                                                /></Pressable>
                                                
                                                ),
                                     headerRight: () => (
                                      <Pressable onPress={()=>  navigation.navigate('ParvasiNewsPaper') }>
                                               <Image
                                                    source={require("../assets/Group-231.png")}
                                                /></Pressable>
                                                ),
                                                headerBackVisible:false,
                                                headerTintColor: '#ff0000',
                                            })}
                                            />
                             <Stack.Screen name={"ForgetPassword"} component={ForgetPassword} />
                            
                        
                            <Stack.Screen name="ForgetPasswordOTP" component={ForgetPasswordOTP}  options={{ title: 'Forget Password'}}/>
                             <Stack.Screen name="Profile" component={Profile}  
                                          options={({navigation}) => ({
                                          drawerItemStyle: { display: 'none' },
                                          drawerLabel: () => null,
                                          title: null,
                                          drawerIcon: () => null,
                
                                          headerTitle: (props) => ( // App Logo
                                          <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', }}><Image
                                              style={{height:40}}
                                              source={require('../assets/parvasi-logo.png')}
                                              resizeMode='contain'
                                          /></View>
                                          ),
                                        
                                          headerRight: () => (
                                                      <Pressable onPress={()=> navigation.navigate('Dashboard')}>
                                                      <MaterialCommunityIcons name="home" size={24}  /></Pressable>
                                                      ),})}
                             
                             
                             />
                            <Stack.Screen name="LiveTVTabsAnhad" component={LiveTVTabsAnhad}  
                                       options={({navigation}) => ({
                                          drawerItemStyle: { display: 'none' },
                                          drawerLabel: () => null,
                                          title: null,
                                          drawerIcon: () => null,
                
                                          headerTitle: (props) => ( // App Logo
                                          <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', }}><Image
                                              style={{height:40}}
                                              source={require('../assets/parvasi-logo.png')}
                                              resizeMode='contain'
                                          /></View>
                                          ),
                                        
                                          headerRight: () => (
                                                      <Pressable onPress={()=> navigation.navigate('Dashboard')}>
                                                      <MaterialCommunityIcons name="home" size={24}  /></Pressable>
                                                      ),})} />
                                          
                              <Stack.Screen name="Services" component={Services} 
                                        options={({navigation}) => ({
                                          drawerItemStyle: { display: 'none' },
                                          drawerLabel: () => null,
                                          title: null,
                                          drawerIcon: () => null,
                
                                          headerTitle: (props) => ( // App Logo
                                          <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', }}><Image
                                              style={{height:40}}
                                              source={require('../assets/parvasi-logo.png')}
                                              resizeMode='contain'
                                          /></View>
                                          ),
                                        
                                          headerRight: () => (
                                                      <Pressable onPress={()=> navigation.navigate('Dashboard')}>
                                                      <MaterialCommunityIcons name="home" size={24}  /></Pressable>
                                                      ),})} 
                              />
                              <Stack.Screen name="ConfirmOTP" component={ConfirmOTP}  options={{ title: 'Enter OTP to verify'}}/>
                              <Stack.Screen name="ReConfirmOTP" component={ReConfirmOTP}  options={{ title: 'Enter OTP to verify'}}/>
                              <Stack.Screen name="Signup" component={Signup} options={{ title: 'Register Now'}}
                              // authChanged={checkAuthentication} 
                              />
                              {/* navigation object injected BELOW after options */}
                              <Stack.Screen name="ParvasiNewsPaper" component={ParvasiNewsPaper} 
                                 options={({ navigation}) =>({

                                          drawerItemStyle: { display: 'none' },
                                          drawerLabel: () => null,
                                          title: null,
                                          drawerIcon: () => null,
                
                                          headerTitle: (props) => ( // App Logo
                                      
                                          <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', }}><Image
                                              style={{height:40}}
                                              source={require('../assets/parvasi-logo.png')}
                                              resizeMode='contain'
                                          /></View>
                                          ),
                                        
                                          headerRight: (props) => (
                                                      <Pressable onPress={() =>  {navigation.navigate('Dashboard')}}><MaterialCommunityIcons name="home" size={24}  /></Pressable>
                                                      ),})}
                              />
                              <Stack.Screen name="ServiceDetail" component={ServiceDetail} 
                                 options={({ navigation}) =>({

                                          drawerItemStyle: { display: 'none' },
                                          drawerLabel: () => null,
                                          title: null,
                                          drawerIcon: () => null,
                
                                          headerTitle: (props) => ( // App Logo
                                      
                                          <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', }}><Image
                                              style={{height:40}}
                                              source={require('../assets/parvasi-logo.png')}
                                              resizeMode='contain'
                                          /></View>
                                          ),
                                        
                                          headerRight: (props) => (
                                                      <Pressable onPress={() =>  {navigation.navigate('Dashboard')}}><MaterialCommunityIcons name="home" size={24}  /></Pressable>
                                                      ),})}
                              />
                              <Stack.Screen name="ExternalNewsPaper" component={ExternalNewsPaper} 
                                 options={({ navigation}) =>({

                                          drawerItemStyle: { display: 'none' },
                                          drawerLabel: () => null,
                                          title: null,
                                          drawerIcon: () => null,
                
                                          headerTitle: (props) => ( // App Logo
                                      
                                          <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', }}><Image
                                              style={{height:40}}
                                              source={require('../assets/parvasi-logo.png')}
                                              resizeMode='contain'
                                          /></View>
                                          ),
                                        
                                          headerRight: (props) => (
                                                      <Pressable onPress={() =>  {navigation.navigate('Dashboard')}}><MaterialCommunityIcons name="home" size={24}  /></Pressable>
                                                      ),})}
                              />
                              <Stack.Screen name="EnglishNewsDetails" component={EnglishNewsDetails} 
                                                             options={({navigation}) => ({
                                                                        drawerItemStyle: { display: 'none' },
                                                                        drawerLabel: () => null,
                                                                        title: null,
                                                                        drawerIcon: () => null,
                                              
                                                                        headerTitle: (props) => ( // App Logo
                                                                        <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', }}><Image
                                                                            style={{height:40}}
                                                                            source={require('../assets/parvasi-logo.png')}
                                                                            resizeMode='contain'
                                                                        /></View>
                                                                        ),
                                                                      
                                            headerRight: () => (
                                                                <Pressable onPress={() =>  {navigation.navigate('Dashboard')}}><MaterialCommunityIcons name="home" size={24}  /></Pressable>
                                                                                    ),})}
                                                            />
                                 <Stack.Screen name="PunjabiNewsDetails" component={PunjabiNewsDetails} 
                                                             options={({navigation}) => ({
                                                                        drawerItemStyle: { display: 'none' },
                                                                        drawerLabel: () => null,
                                                                        title: null,
                                                                        drawerIcon: () => null,
                                              
                                                                        headerTitle: (props) => ( // App Logo
                                                                        <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', }}><Image
                                                                            style={{height:40}}
                                                                            source={require('../assets/parvasi-logo.png')}
                                                                            resizeMode='contain'
                                                                        /></View>
                                                                        ),
                                                                      
                                            headerRight: () => (
                                                                   <Pressable onPress={() =>  {navigation.navigate('Dashboard')}}><MaterialCommunityIcons name="home" size={24}  /></Pressable>
                                                                                    ),})}
                                                            />
                              <Stack.Screen name="EnglishNewsPaper" component={EnglishNewsPaper} 
                                options={({navigation}) => ({ 
                                          drawerItemStyle: { display: 'none' },
                                          drawerLabel: () => null,
                                          title: null,
                                          drawerIcon: () => null,
                
                                          headerTitle: (props) => ( // App Logo
                                          <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', }}><Image
                                              style={{height:40}}
                                              source={require('../assets/parvasi-logo.png')}
                                              resizeMode='contain'
                                          /></View>
                                          ),
                                        
                                          headerRight: () => (
                                                       <Pressable onPress={() =>  {navigation.navigate('Dashboard')}}><MaterialCommunityIcons name="home" size={24}  /></Pressable>
                                                       ),})}
                              />
                              <Stack.Screen name="PunjabiNewsPaper" component={PunjabiNewsPaper} 
                                 options={({navigation}) => ({
                                          drawerItemStyle: { display: 'none' },
                                          drawerLabel: () => null,
                                          title: null,
                                          drawerIcon: () => null,
                
                                          headerTitle: (props) => ( // App Logo
                                          <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', }}><Image
                                              style={{height:40}}
                                              source={require('../assets/parvasi-logo.png')}
                                              resizeMode='contain'
                                          /></View>
                                          ),
                                        
                                          headerRight: () => (
                                                      <Pressable onPress={() => navigation.navigate('Dashboard')}>
                                                      <MaterialCommunityIcons name="home" size={24}  /></Pressable>
                                                      ),})}
                              />
                              <Stack.Screen name="LiveTVTabs" component={TabNavigator} 
                                  options={({navigation}) => ({
                                        drawerItemStyle: { display: 'none' },
                                          drawerLabel: () => null,
                                          title: null,
                                          drawerIcon: () => null,
                
                                          headerTitle: (props) => ( // App Logo
                                          <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', }}><Image
                                              style={{height:40}}
                                              source={require('../assets/parvasi-logo.png')}
                                              resizeMode='contain'
                                          /></View>
                                          ),
                                        
                                          headerRight: () => (
                                                      <Pressable onPress={() => navigation.navigate('Dashboard')}>
                                                      <MaterialCommunityIcons name="home" size={24}  /></Pressable>
                                                      ),})}/>

                                  <Stack.Screen name="Gallery" component={TabNavigatorGallery} 
                                    options={({navigation}) => ({
                                        drawerItemStyle: { display: 'none' },
                                          drawerLabel: () => null,
                                          title: null,
                                          drawerIcon: () => null,
                
                                          headerTitle: (props) => ( // App Logo
                                          <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', }}><Image
                                              style={{height:40}}
                                              source={require('../assets/parvasi-logo.png')}
                                              resizeMode='contain'
                                          /></View>
                                          ),
                                        
                                          headerRight: () => (
                                            <Pressable onPress={() => navigation.navigate('Dashboard')}>
                                                      <MaterialCommunityIcons name="home" size={24}  /></Pressable>
                                                      ),})}/>           
                          

                    </Stack.Navigator>
                    </NavigationContainer></>
                 )}
            }
          </LoginCredentialsContext.Consumer>
  )
}
function TabNavigator() {

    return (
         <Tab.Navigator
                screenOptions={{
                activeBackgroundColor:'#fff',
                tabBarActiveTintColor: '#221111',
                activeTintColor: '#fff',
                tabBarLabelStyle: { fontSize: 17 },
                tabBarStyle: { backgroundColor: '#ddd' },
                activeBackgroundColor:"green",}}>
        <Tab.Screen name="Live TV" component={LiveTV} 
        //   initialParams={{tabSelected:tabSelected1, name: 'ravi'}}
         
          options={{
                title: 'Live TV',
                labelPosition: 'beside-icon',
               
              
              }}
        />
        <Tab.Screen name="Archived" component={Archived} />
      </Tab.Navigator>
    )
}
function TabNavigatorAnhad() {
    return (
          <Tab.Navigator
        screenOptions={{
        activeBackgroundColor:'#fff',
        tabBarActiveTintColor: '#221111',
        activeTintColor: '#fff',
        tabBarLabelStyle: { fontSize: 17 },
        tabBarStyle: { backgroundColor: '#ddd' },
         activeBackgroundColor:"green",
        
      }}
      
      
      >
        <Tab.Screen name="Live TV" component={LiveTVTabsAnhad} 
          // initialParams={{tabSelected}}
          // tabSelected={{tabSelected}}
          options={{
                title: 'Live TV',
                labelPosition: 'beside-icon',
                // tabBarIcon: ({ tintColor }) => (
                // <Ionicons name="ios-home" color={tintColor} size={25} style={{padding:0, margin:0}} />)
                
                //  tabBarIcon: ({ tintColor }) => (<MaterialCommunityIcons name="video" size={24} />)
              
              }}
        />
        <Tab.Screen name="Archived" component={Archived} />
      </Tab.Navigator>
    )
}
function TabNavigatorGallery() {

    return (
        <><View style={{alignContent:'center', alignItems:'center', marginVertical:5,backgroundColor:'#fff'}}><Text style={{ fontSize:17, color:'#999' }}>Events</Text></View>
         <Tab.Navigator
                screenOptions={{
                activeBackgroundColor:'#fff',
                tabBarActiveTintColor: '#221111',
                activeTintColor: '#fff',
                tabBarLabelStyle: { fontSize: 17 },
                tabBarStyle: { backgroundColor: '#ddd' },
                activeBackgroundColor:"green",}}>
        <Tab.Screen name="PIFFA" component={Piffa} 
        //   initialParams={{tabSelected:tabSelected1, name: 'ravi'}}
         
          options={{
                title: 'PIFFA',
                labelPosition: 'beside-icon',
               
              
              }}
        />
        <Tab.Screen name="AwardGallery" component={AwardGallery}    options={{
                title: 'Award Gallery',
                labelPosition: 'beside-icon',
                unmountOnBlur: true
              
              }}
             
              
              />
      </Tab.Navigator></>
    )
}
function CustomDrawerContent(props) {
    console.log("PROSP is custom drawer==", props.route.params.storedCredentials)
  return (
    <DrawerContentScrollView {...props}>
          <View style={{flex:1, margin:10, flexDirection: 'row'}}>
                <Image source={user}></Image><Text style={{paddingTop:10, paddingLeft:10}}>Welcome </Text>
                </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert('Link to help')} />
    </DrawerContentScrollView>
  );
}


const Splash = (props) => {
    var timer1 ;
    const [initialRoute, setInitialRoute] = useState();
      const [storedLogin, setStoredLogin] = useState();
      const [adData, setAdData] = useState('');
      const focus = useIsFocused();
      let img = '';
useEffect(() => {
        console.log("In splash......")
        timer1 = setTimeout(() => {
            //setIsAdLoaded(true)
            console.log("TIMER ENDING now...")
            getStorage(props)
        }, 10000);


       // setLoading(true);
        /* LOAD AD from URL*/
        let unmounted = false;
    let source = axios.CancelToken.source();  

 
       const adUrl =  "http://parvasi.newunlimitedhosting.21gtech.com/services.asmx/Ad_Get_Ads_By_Position";

          
          const requestOne = axios.post(adUrl, {Ad_Position_Id: 1, timeout: 60 , cancelToken: source.token});
          axios.all([requestOne]).then(axios.spread((...responses) => {
                const responseOne = responses[0]
              
                if (!unmounted) {
                     
                  // console.log("AAAAA ==== >>>>>>>> ", responseOne);

                   if(responseOne)
                    {
                      const resultAd = responseOne.data;
                      let ValidJson = resultAd.replace('{"d":null}',"");
                      ValidJson = JSON.parse(ValidJson);
                      const { message, status, data} = ValidJson
                     console.log("Result AD Data====", data)
                      if(status==1)
                      {
                        let newData =  Object.values(data);
                         //console.log("AD Data\n\n\n",newData);
                          setAdData(newData[0].Ad_image_url);
                         console.log("AD DATA LEngth========\n\n\n",newData[0].Ad_image_url);
                          
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
        /* Load Ad Stops */
    

        return () => {
          console.log("Clearning time out");
        clearTimeout(timer1);
      };
    },[]);
useEffect(() => {
  console.log("AD DATA Setup==", adData);
  img = {uri: adData};
   if(focus==false) 
        {
          clearTimeout(timer1);
          console.log("clearing time out");
        }
       
         return () => {
            clearTimeout(timer1);
          };
},[adData, focus]);

const gotoMainScreeen = () =>{
    clearTimeout(timer1);
    console.log("Initial route==", initialRoute);
    getStorage(props)
}

const getStorage =(props) =>{
   AsyncStorage.getItem('loginCredentials')
        .then((val) => {
        
            setStoredLogin(JSON.parse(val));
            val = JSON.parse(val)
            console.log("Stored Login=====", val);
           
          //  if(val.isGuest == true || val.isLogged) {
           if(val && val.isLogged) {
              props.navigation.navigate('Dashboard')
              
            }
            else
            {
             
             props.navigation.navigate('Login')
              //setLoading(false);
            }
            
            console.log("Use EFFECt Running....");
           //  setLoading(false);
            //navigation.navigate(initialRoute);
            //handleMessage(message, status);
            //setStoredCredentials(credentials);
        })
        .catch(err => {
          console.log("Error Occuredd at PERSIST Login", err)
           setInitialRoute("Login");
           //setLoading(false);
            clearTimeout(timer1);
        });
}
 return (
                
                <SafeAreaView  style={styles.container}>
                    <View style={{flex:1, flexDirection: 'column',justifyContent: 'center'}}>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                        {/* <Image source={require('../assets/splash_ad.jpg')} style={{resizeMode: "contain",}}></Image> */}
                        
                        {adData? <Image source={{uri:adData}} style={{resizeMode: "contain", width: '100%', height:350}}></Image>: <Text>Loading.....</Text>}
                         
                        </View> 
                        <Pressable onPress={gotoMainScreeen}><View  style={{backgroundColor:'#f00', height:50, margin:10, padding:5, flexDirection:'column',borderRadius:10, alignItems: 'center',justifyContent: 'center'}}>
                        <Text style={styles.text}>Skip To Main Screen</Text></View></Pressable>
                    </View>
                </SafeAreaView >
            )

  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
  
});


export default RootStackCombined
