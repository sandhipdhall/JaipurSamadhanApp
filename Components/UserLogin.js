import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, StyleSheet, Image, AsyncStorage, Animated,
    Dimensions,
    Alert, BackHandler
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Reinput from 'reinput'
// import { Button } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import UserAuthBaseUrl from './BaseUrl/UserAuthBaseUrl';
import { ActivityIndicator, Colors } from 'react-native-paper';


let { width, height } = Dimensions.get('window');
export default class Login extends Component {

    constructor(props) {

        super(props);
        this.state = {
            mobile: '',
            password: '',
            loaded: false,
            isLoading: false,
            secureTextEntry: true,

        }

    }


    //this function is used to validate mobile number so that user not able to enter any extra 
    //character except number not even space and zero at the starting
    validateMobile = (mobile) => {
        //  console.log(mobile)
        // this.setState({})
        var num = mobile.toString();
        if (num != "0" && num != " ") {
            var rep = num.replace(/[^\d\s]+/, "");
            this.setState({
                mobile: rep
            })
            console.log(rep);
        }
    };

    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            //alert(jsonValue)
            await AsyncStorage.setItem('userinfo', jsonValue)
        } catch (e) {
            // saving error
        }
    }


    //on submit user data this function will be called . and login api will be called
    submit = () => {
        console.log('ok')
        var details = {
            'userName': this.state.mobile,
            'password': this.state.password,
            'grant_type': 'password'
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(UserAuthBaseUrl + 'Signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (!json.access_token) {
                    this.setState({
                        msg: 'please enter correct username and password',
                    })

                    this.props.navigation.navigate("Login")

                } else {
                    // this.setState({
                    //     isLoading:false
                    // })
                    this.storeData(json)
                    this.props.navigation.navigate("AppDrawerScreen")
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    register = () => {
        this.props.navigation.navigate("UserRegistration")
    }

    showPassword = () => {
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }



    handleBackButton = () => {
        if (this.props.navigation.isFocused()) {
            Alert.alert(
                "Exit App",
                "Do you want to exit?",
                [
                    {
                        text: "No",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Yes", onPress: () => BackHandler.exitApp() }
                ],
                { cancelable: false }
            );
            return true;
        }
        else {
            return false;
        }
    };

    render() {

        return (

            <LinearGradient colors={['#800a0a', 'red', 'orange']} style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: 'https://lh3.googleusercontent.com/BJC4uppMdeo8ue2Eh9IlVxtAVJPRsgVySNMgIeXOCRDxbDcyRznXAPzdJ_Ql36TF3w',
                        }}
                    />
                    <Animatable.Text
                        animation="zoomIn"
                        style={styles.heading}>Welcome to Jaipur Samadhan</Animatable.Text>
                    <Animatable.Text
                        animation="zoomIn"
                        style={styles.subHeading}>Before proceed please login here!!</Animatable.Text>
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}>
                    <Text style={{ color: "red", textAlign: 'center', marginBottom: 10 }}>{this.state.msg}</Text>
                    <Reinput label='Mobile'
                        icon={
                            <Feather
                                name="phone"
                                size={20}
                                color={'black'}
                            />
                        }
                        value={this.state.mobile}
                        onChangeText={this.validateMobile}
                        keyboardType='numeric'
                        maxLength={10}
                        ref={(input) => { this.Mobile = input; }}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.Password.focus(); }}
                        blurOnSubmit={false}
                    />

                    <Reinput label='Password'
                        icon={
                            <Feather
                                name="eye"
                                size={20}
                                color={'black'}
                                onPress={this.showPassword}
                            />
                        }
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry={this.state.secureTextEntry}
                        ref={(input) => { this.Password = input; }}
                    />

                    {
                        this.state.mobile && this.state.password != "" ?
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={this.submit}
                            >
                                <Text style={styles.TextStyle}> SUBMIT </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={styles.submitButtonDisable}
                                onPress={this.submit}
                                disabled={true}
                            >
                                <Text style={styles.TextStyleDisable}> SUBMIT </Text>
                            </TouchableOpacity>
                    }


                    <Text style={{ fontSize: 18, fontWeight: '900', textAlign: 'center' }}>or</Text>
                    <TouchableOpacity
                        style={styles.signupButton}
                        onPress={this.register}
                    >
                        <Text style={styles.TextStyle}>SIGN UP </Text>
                    </TouchableOpacity>
                </Animatable.View>
            </LinearGradient>

        )
        //}

    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#bf1313'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {

        backgroundColor: "ghostwhite",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 30,
    },
    tinyLogo: {
        width: 140,
        height: 140,
    },
    submitButton: {
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: 'green',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',

    },
    signupButton: {
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: 'orange',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',

    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
    submitButtonDisable: {
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: 'grey',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    TextStyleDisable: {
        color: 'black',
        textAlign: 'center',
    },
    heading: {
        fontSize: 20,
        color: '#fff',
        fontStyle: 'italic'
    },
    subHeading: {
        color: "#fff"
    }
})