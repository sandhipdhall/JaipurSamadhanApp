import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Reinput from 'reinput'
import Feather from 'react-native-vector-icons/Feather';
import UserAuthBaseUrl from './BaseUrl/UserAuthBaseUrl';
import { ActivityIndicator, Colors } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

export default class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mobile: '',
            email: '',
            password: '',
            isLoading: false,
            secureTextEntry:true
        }

    }

   

    submit = () => {

        this.setState({
            isLoading:true
          })
        fetch(UserAuthBaseUrl+'API/MobileUserReg/SaveMobileUserData', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: this.state.name,
                MobileNo: this.state.mobile,
                LoginId: this.state.mobile,
                Password: this.state.password
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                if (json.successcode == "1") {
                    this.setState({
                        isLoading:false
                    })
                    this.props.navigation.navigate("OtpVarification", {
                        userMobileNo: this.state.mobile
                    })
                } else {
                    alert('Number already exist')
                    this.props.navigation.navigate("UserRegistration")
                }
            })
            .catch((error) => {
                console.error(error);
            });
        // this.props.navigation.navigate("Login")
    }

    showPassword = () =>{
        this.setState({
            secureTextEntry : !this.state.secureTextEntry
        })
    }

    validateMobile = (mobile) => {
        //  console.log(mobile)
       // this.setState({})
        var num = mobile.toString();
        if(num != "0" && num !=" "){
        var rep =num.replace(/[^\d\s]+/,"");
        this.setState({
            mobile:rep
        })
   console.log(rep);
         }
       };

       validateName = (name) => {
        //  console.log(mobile)
       // this.setState({})
        var fullName = name.toString();
        if(fullName !=" "){
        var rep =fullName.replace(/[^a-zA-Z ]/g,"");
        this.setState({
            name:rep
        })
   console.log(rep);
         }
       };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator animating={true} color={Colors.red800} />
                </View>
            )
        } else {
            return(

                <LinearGradient colors={['#800a0a', 'red', 'orange']} style={styles.container}>
                <View style={styles.header}>
                    <Animatable.Text
                        animation="fadeInDown"
                        style={styles.heading}> Jaipur Samadhan Registration</Animatable.Text>
                </View>
                <Animatable.View
                    animation="fadeInUp"
                    style={styles.footer}>
                <Reinput
                        label='Fullname'
                        icon={
                            <Feather
                                name="user"
                                size={20}
                                color={'black'}
                            />
                        }
                        value={this.state.name}
                        onChangeText={this.validateName}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.Mobile.focus(); }}
                        blurOnSubmit={false}
                    />
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
    
                    {/* <Reinput label='Email'
                        icon={
                            <Feather
                                name="mail"
                                size={20}
                                color={'black'}
                            />
                        }
                        onChangeText={email => this.setState({ email })}
                        ref={(input) => { this.Email = input; }}
                        returnKeyType="next"
                        onSubmitEditing={() => { this.Password.focus(); }}
                        blurOnSubmit={false}
                    /> */}
    
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
                        this.state.name && this.state.mobile && this.state.password != "" ?
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={this.submit}
                            >
                                <Text style={styles.TextStyle}> SUBMIT </Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={styles.submitButtonDisable}
                                disabled={true}
                                onPress={this.submit}
                            >
                                <Text style={styles.TextStyleDisable}> SUBMIT </Text>
                            </TouchableOpacity>
                    }
                </Animatable.View>
            </LinearGradient>
            )
        }
        
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
    heading: {
        fontSize: 30,
        color: '#fff',
fontWeight:'bold'
    },
    submitButton: {
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 70,
        marginRight: 50,
        backgroundColor: 'green',
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
        marginLeft: 70,
        marginRight: 50,
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