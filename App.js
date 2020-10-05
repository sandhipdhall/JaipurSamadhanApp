import React, { Component } from 'react';  
import { View, Text, StyleSheet, Button } from 'react-native';  
import  RootStack from './Components/Navigations/StackNavigation'


export default class App extends Component {  
    render() {  
        return (  
            <RootStack /> 
        );  
    }  
}  