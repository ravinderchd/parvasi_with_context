import * as React from 'react';
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LiveTVAnhad from '../screens/LiveTVAnhad';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Archived from './Archived';
// onPress={() => Linking.openURL('https://mywebsite.com/help')}
const Tab = createMaterialTopTabNavigator();
const LiveTVTabsAnhad = ({route, navigation}) => {

  // console.log("PARAMS REEIVED==", route.params.tabType);
  // const tabSelected = route.params.tabType;
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
        <Tab.Screen name="LiveTVAnhad" component={LiveTVAnhad} 
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
   
 
  );
};

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default LiveTVTabsAnhad;
