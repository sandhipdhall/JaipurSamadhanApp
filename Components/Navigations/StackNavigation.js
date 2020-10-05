// In App.js in a new project
import React, { Component } from 'react';
import { View, Text, Button, Image, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createSwitchNavigator } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import Login from '../UserLogin';
import UserRegistration from '../UserRegistration';
import OtpVarification from '../OtpVarification';
//import NavDrawer from './DrawerNavigation';
import Home from '../DrawerContents/HomePageDesign'
import NewComplain from '../DrawerContents/NewComplain';
import ComplaintStatus from '../DrawerContents/ComplaintStatus';
import History from '../DrawerContents/History';
import CustomDrawerContent from '../DrawerContents/DrawerContent';
import Complaint from '../DrawerContents/ComplaintForm';
import ComplainCategory from '../DrawerContents/ComplainCategory';
import ImagesComponent from '../DrawerContents/CameraAndGalary';
import UserLogout from '../DrawerContents/Logout'
import SplashScreen from '../Splash'





const HomeStack = createStackNavigator();
const NewComplainStack = createStackNavigator();
const ComplaintStatusStack = createStackNavigator();
const HistoryStack = createStackNavigator();

function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#bd1c1c'
        }
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          // headerTitle: props => <LogoTitle {...props} />,
          headerLeft: () => (
            <Feather
              name="menu"
              size={30}
              color={'white'}
              onPress={() => navigation.openDrawer()}
              style={{ left: 10 }}
            />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
}
function NewComplainStackScreen({ navigation }) {
  return (
    <NewComplainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#bd1c1c'
        }
      }}
    >
      <NewComplainStack.Screen
        name="New Complain"
        component={NewComplain}
        options={{
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          // headerTitle: props => <LogoTitle {...props} />,
          headerLeft: () => (
            <Feather
              name="menu"
              size={30}
              color={'white'}
              onPress={() => navigation.openDrawer()}
              style={{ left: 10 }}
            />
          ),
        }}
      />
    </NewComplainStack.Navigator>
  );
}

function ComplaintStatusScreen({ navigation }) {
  return (
    <ComplaintStatusStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#bd1c1c'
        }
      }}
    >
      <ComplaintStatusStack.Screen
        name="ComplaintStatus"
        component={ComplaintStatus}
        options={{
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          // headerTitle: props => <LogoTitle {...props} />,
          headerLeft: () => (
            <Feather
              name="menu"
              size={30}
              color={'white'}
              onPress={() => navigation.openDrawer()}
              style={{ left: 10 }}
            />
          ),
        }}
      />
    </ComplaintStatusStack.Navigator>
  );
}
function HistoryStackScreen({ navigation }) {
  return (
    <HistoryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#bd1c1c'
        }
      }}
    >
      <HistoryStack.Screen
        name="History"
        component={History}
        options={{
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          // headerTitle: props => <LogoTitle {...props} />,
          headerLeft: () => (
            <Feather
              name="menu"
              size={30}
              color={'white'}
              onPress={() => navigation.openDrawer()}
              style={{ left: 10 }}
            />
          ),
        }}
      />
    </HistoryStack.Navigator>
  );
}



const AppDrawer = createDrawerNavigator();
const AppDrawerScreen = () => (
  <AppDrawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerType='front'
      overlayColor='transparent'
      drawerStyle={{ backgroundColor: 'transparent' }}
      drawerContentOptions={{
        activeBackgroundColor: 'transparent',
        activeTintColor: 'green',
        inactiveTintColor: 'green'
      }}
      sceneContainerStyle={{
        backgroundColor: 'transparent'
      }}
    >
      <AppDrawer.Screen name="Home" component={HomeStackScreen} />
      <AppDrawer.Screen name="NewComplain" component={NewComplainStackScreen} />
      <AppDrawer.Screen name="Complain Status" component={ComplaintStatusScreen} />
      <AppDrawer.Screen name="History" component={HistoryStackScreen} />
      <AppDrawer.Screen name="Complain Form" component={Complaint} />
      <AppDrawer.Screen name="Complain Category" component={ComplainCategory} />
      <AppDrawer.Screen name="UserLogout" component={UserLogout} />
    </AppDrawer.Navigator>
);



const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
  initialRouteName="SplashScreen">
      <AuthStack.Screen name="Login" component={Login}
        options={{
          headerShown: false
        }} />
      <AuthStack.Screen name="UserRegistration" component={UserRegistration}
        options={{
          headerShown: false
        }} />
      <AuthStack.Screen name="OtpVarification" component={OtpVarification}
        options={{
          headerShown: false
        }}
      />
      <AuthStack.Screen name="SplashScreen" component={SplashScreen}
        options={{
          headerShown: false
        }}
      />
      <AuthStack.Screen name="AppDrawerScreen" component={AppDrawerScreen}
        options={{
          headerShown: false
        }}
      />
      <AuthStack.Screen name="Image" component={ImagesComponent} />
    </AuthStack.Navigator>
);




  const RootStack =() =>{
    return (
      <NavigationContainer>
       
              <AuthStackScreen />
          
      </NavigationContainer>
    );
    }

    export default RootStack


