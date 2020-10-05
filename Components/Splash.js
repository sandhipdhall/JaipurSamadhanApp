import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Platform, StyleSheet, View, Text,
    Image, TouchableOpacity, Alert, AsyncStorage
} from 'react-native';
import * as Animatable from 'react-native-animatable';
export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }
    Hide_Splash_Screen = async () => {
        const value = await AsyncStorage.getItem('userinfo');
        if (value !== null) {
            //console.log("some data")
            this.props.navigation.navigate("AppDrawerScreen");
        }
        else {
            this.props.navigation.navigate("Login");
        }
        this.setState({
            isLoading: false
        });
    }


    componentDidMount() {
        var that = this;
        setTimeout(function () {
            that.Hide_Splash_Screen();
        }, 2000);

    }

    render() {

        return (
            <View style={styles.MainContainer}>

                {
                    (this.state.isLoading === true) ?
                        <Animatable.View
                            animation="zoomIn"
                            iterationCount={5}
                            direction="alternate"
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={{ uri: 'https://lh3.googleusercontent.com/BJC4uppMdeo8ue2Eh9IlVxtAVJPRsgVySNMgIeXOCRDxbDcyRznXAPzdJ_Ql36TF3w' }}
                                style={{ width: 160, height: 160 }}
                            />
                        </Animatable.View>
                        : null
                }
            </View>
        );
    }
}
const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: (Platform.OS === 'ios') ? 20 : 0
        },

        SplashScreen_RootView:
        {
            justifyContent: 'center',
            flex: 1,
            margin: 10,
            position: 'absolute',
            width: '100%',
            height: '100%',
        },

        SplashScreen_ChildView:
        {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00BCD4',
            flex: 1,
        },
    });  