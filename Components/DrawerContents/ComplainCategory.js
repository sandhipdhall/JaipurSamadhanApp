

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';



export default class ComplainCategory extends React.Component {

    render() {
        return (
            <View style={{flex:1 ,justifyContent:'center',alignContent:'center'}}>
                <TouchableOpacity
                style={styles.button}
                onPress={() => { this.props.navigation.navigate('NewComplain') }}
            >
                <View style={styles.content}>
                    <Text style={styles.name}>New Complain</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.button}
                onPress={() => { this.props.navigation.navigate('Complain Status') }}
            >
                <View style={styles.content}>
                    <Text style={styles.name}>Complain Status</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.button}
               onPress={() => { this.props.navigation.navigate('History') }}
            >
                <View style={styles.content}>
                    <Text style={styles.name}>Complain History</Text>
                </View>
            </TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create({
  
    name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign:'center'
    },
    button: {
        backgroundColor: '#bd1c1c',
        borderRadius: 20,
        width: '90%',
        margin: 8,
        borderColor: 'lightgrey',
        padding:10,
        alignSelf:'center'
       
    },

});

