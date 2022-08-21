import React, {useRef, useState, useContext, useEffect} from 'react';
import { NavigationContainer, CommonActions, useNavigation  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {Alert, TouchableOpacity, Image, View, Text, Pressable, ActivityIndicator} from 'react-native';
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
import ResendOTP from '../screens/ResendOTP';
import ForgetPassword from '../screens/ForgetPassword';
import ForgetPasswordOTP from '../screens/ForgetPasswordOTP';
import Archived from '../screens/Archived';
import {LoginCredentialsContext, IsLoginVerified} from '../Components/LoginCredentialsContext';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const RootStackCombined = () => {
  const [initialised, setInitialised] = useState(false)
  const [initialRoute, setInitialRoute] = useState('AuthChoice')
    const {storedCredentials, setStoredCredentials} = useContext(LoginCredentialsContext);
   useEffect(() => {
    async function getStorageValue() {
      let value;
      try {
        value = await AsyncStorage.getItem('loginCredentials');
        if(val.isLogged) {
              console.log("I am here")
              setInitialRoute("DrawerRoutes");
        }
      } catch (e) {
        // handle here
      } finally {
        console.log(value === 'true');
        // if (value === 'true') {
          setInitialRoute('Login');
        // } else {
        //   setInitialRoute('AuthChoice');
        // }
        setInitialised(true)
      }
    }
    getStorageValue();
  }, []);


const checkAuthentication_afterLoginLogout = () => {
 setInitialised(false)
  console.log("AFTER Login", storedCredentials)
     if(storedCredentials) {
        if(storedCredentials.isGuest || storedCredentials.isLogged)
        setInitialRoute("DrawerRoutes");
         setInitialised(true)
     }
     else{
        setInitialRoute("Login");
       setInitialised(true)
     }
    //  setLoading(false);
  };


  useEffect(checkAuthentication_afterLoginLogout, [storedCredentials]);

  return initialised
    ? <Router initialRoute={initialRoute} />
    :  <ActivityIndicator  color={'#ddd'} />

}

const Router = (props) => {
  return (
    <>
<LoginCredentialsContext.Consumer>
                   {({storedCredentials }) => {
                     if(storedCredentials) {
                        const {otpVerified} = storedCredentials
                        console.log("STORED CREDENTIALS==", storedCredentials)
                     }
                  return(
                    <NavigationContainer>
                      {console.log("Initial ROUTE ===", props.initialRoute)}
                        <Stack.Navigator initialRouteName={props.initialRoute} screenOptions={{headerTitleAlign: 'center'}}>
                       
                            <Stack.Screen name="ResendOTP" component={ResendOTP} />
                            <Stack.Screen name={"Login"} component={Login} options={{ title: 'Login Into your account'}} 
                              // initialParams={{ authChanged: checkAuthentication }}
                             />
                            <Stack.Screen name="DrawerRoutes" key={2}  initialParams={{storedCredentials}} component={DrawerRoutes} options={{headerShown: false}}  />
                             <Stack.Screen name={"ForgetPassword"} component={ForgetPassword} />
                        
                            <Stack.Screen name="ForgetPasswordOTP" component={ForgetPasswordOTP} />
                            
                          
                        
                        
                             
                              <Stack.Screen name="LiveTVTabsAnhad" component={LiveTVTabsAnhad}  options={{ 
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
                                                      <MaterialCommunityIcons name="home" size={24}  />
                                                      ),}} />
                              <Stack.Screen name="Services" component={Services} />
                              <Stack.Screen name="ConfirmOTP" component={ConfirmOTP} />
                              <Stack.Screen name="Signup" component={Signup} 
                              // authChanged={checkAuthentication} 
                              />
                              <Stack.Screen name="ParvasiNewsPaper" component={ParvasiNewsPaper} />
                              
                              <Stack.Screen name="LiveTVTabs" component={TabNavigator} options={{ 
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
                                                      <MaterialCommunityIcons name="home" size={24}  />
                                                      ),}}/>

                              
                          

                    </Stack.Navigator>
                    </NavigationContainer>
                 )}
            }
          </LoginCredentialsContext.Consumer>
    </>
  )
}
 
function DrawerRoutes(props){

const {storedCredentials, setStoredCredentials} = useContext(LoginCredentialsContext);
console.log("RECEVEEin DRAWER1111 STACK122212321321321321====",storedCredentials)
const {isLogged = false, first_name = '' , last_name= '', isGuest = false} = storedCredentials || {};
//  const isLogged = false;
//  const isGuest = true;
 const toggleDrawer = () => {
   
  console.log(props);
  props.navigation.dispatch(DrawerActions.toggleDrawer()); 

}
   return (
    <Drawer.Navigator useLegacyImplementation  initialRouteName='Dashboard' closeByDefault  screenOptions={{ activeTintColor: '#ff0000',itemStyle: { marginVertical: 1 },}}  
    
       drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              
                <View style={{flex:1, margin:10, flexDirection: 'row'}}>
                <Image source={user}></Image><Text style={{paddingTop:10, paddingLeft:10}}>Welcome { isLogged ? first_name +", "+ last_name : 'Guest'}</Text>
                </View>
                    <DrawerItemList {...props} />
                    {
                        isLogged ?
                    <DrawerItem 
                            key={4}
                                icon={({color, size}) => (<MaterialCommunityIcons name="arrow-left-bold-box" size={24} />)} 
                                label="Logout" onPress={() =>{
                                Alert.alert(
                                'Log out',
                                'Do you want to logout?',
                                [
                                {text: 'Cancel', onPress: () => {return null}},
                                {text: 'Confirm', onPress: () => {
                                    AsyncStorage.clear().then(() => console.log('Cleared'))
                                    console.log("LOGGING OUT");
                                    setStoredCredentials(null);
                                    props.navigation.navigate('Login');
                                    console.log('After Logout=='. storedCredentials);
                                    }},
                                ],
                                { cancelable: false }
                            )                  
                            } }/>
                            : null

                        }
                          {
                        isGuest || !storedCredentials ?
                         <><DrawerItem 
                            key={4}
                                icon={({color, size}) => (<MaterialCommunityIcons name="badge-account-horizontal" size={24} />)} 
                                label="signup" onPress={() => { props.navigation.dispatch(DrawerActions.closeDrawer());props.navigation.navigate('Signup')}}/>
                            <DrawerItem 
                             key={5}
                                icon={({color, size}) => (<MaterialCommunityIcons name="arrow-right-bold-box" size={24} />)} 
                                label="Login" onPress={() => {props.navigation.dispatch(DrawerActions.closeDrawer());props.navigation.navigate('Login' )}}/>
                        </>
                            : null

                        }
                    </DrawerContentScrollView>)}}
                    >
                 {
                    isLogged ?
                       
                <><Drawer.Screen name="Profile" component={ProfileWithModal} 
                
                options={{
                                       
                                       unmountOnBlur:true,
                                    //    drawerItemStyle: { display: 'none' },
                                        drawerLabel: () => <Text>My Profile</Text>,
                                        title: 'Profile',
                                          drawerIcon: config => <MaterialCommunityIcons
                                            size={23}
                                            name={Platform.OS === 'android' ? 'account' : 'account'}></MaterialCommunityIcons>,
                                         headerShown: true,
                                                headerTitle: (props) => ( // App Logo
                                    <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', marginLeft:50}}>
                                     </View>
                                    ),
                                   
                                     headerRight: () => (
                                                <Image
                                        style={{height:40}}
                                        source={require('../assets/parvasi-logo.png')}
                                        resizeMode='contain'
                                    />
                                                ),
                                     headerLeft: () => (
                                               <Pressable onPress={()=> {props.navigation.navigate('Dashboard')}} style={{paddingLeft:10,}}><MaterialCommunityIcons name="home" size={44} /></Pressable>
                                                ),
                                                headerBackVisible:false,
                                                headerTintColor: '#ff0000',
                                            }}/>
                {/* <Drawer.Screen name="ChangePassword" component={ChangePassword} options={{ drawerLabel: 'Change Password',  drawerIcon: config => <MaterialCommunityIcons
                                            size={23}
                                            name={Platform.OS === 'android' ? 'account-edit-outline' : 'account-edit-outline'}></MaterialCommunityIcons>, }} /> */}</>
                    : null

                   }                          
                <Drawer.Screen name="Dashboard" component={Dashboard} options={{
                                       
                                       unmountOnBlur:true,
                                    //    drawerItemStyle: { display: 'none' },
                                        drawerLabel: () => <Text>Dashboard</Text>,
                                        title: 'Dashboard',
                                        drawerIcon: config => <MaterialCommunityIcons
                                            size={23}
                                            name={Platform.OS === 'android' ? 'apps' : 'apps'}></MaterialCommunityIcons>,
                                        
                                         headerShown: true,
                                        headerTitle: (props) => ( // App Logo
                                    <View style={{ flexdirection: 'row', justifyContent: 'center',alignItems: 'center', marginLeft:50}}><Image
                                        style={{height:40}}
                                        source={require('../assets/parvasi-logo.png')}
                                        resizeMode='contain'
                                    /></View>
                                    ),
                                   
                                     headerRight: () => (
                                                <Image
                                                    source={require("../assets/Group-222.png")}
                                                />
                                                ),
                                     headerLeft: () => (
                                               <Pressable onPress={()=> {toggleDrawer()}}><Image
                                                    source={require("../assets/Group-222.png")}
                                                /></Pressable>
                                                ),
                                                headerBackVisible:false,
                                                headerTintColor: '#ff0000',
                                            }}/>
                    
      {/* <Drawer.Screen name="Profile" component={Profile} /> */}
      {/* <Drawer.Screen name="Logout" component={Logout} /> */}
    </Drawer.Navigator>
  );
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
export default RootStackCombined
