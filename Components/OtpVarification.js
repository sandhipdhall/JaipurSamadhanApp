import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
//import * as Animatable from 'react-native-animatable';
import UserAuthBaseUrl from './BaseUrl/UserAuthBaseUrl';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Reinput from 'reinput'

export default class OtpVarification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newOtp: '',
      isLoading: false,
    }
  }


  onVarify = () => {

    if (this.state.userOtp) {
      this.setState({
        isLoading: true
      })
      const { userMobileNo } = this.props.route.params;
      fetch(UserAuthBaseUrl + 'API/OTPVerification/GetOtpVerification', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          MobileNo: userMobileNo,
          GeneratedOTP: this.state.userOtp
        })
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.successcode == "0") {
            this.setState({
              isLoading: false
            })
            this.props.navigation.navigate("Login")
          } else {
            alert('OTP mismatch')
            this.props.navigation.navigate("OtpVarification")
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }


    if (this.state.newOtp) {
      this.setState({
        isLoading: true
      })
      const { userMobileNo } = this.props.route.params;
      const { userOtp } = this.props.route.params;
      fetch(UserAuthBaseUrl + 'API/OTPVerification/GetOtpVerification', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          MobileNo: userMobileNo,
          GeneratedOTP: this.state.resendOtp
        })
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.successcode == "0") {
            this.setState({
              isLoading: false
            })
            this.props.navigation.navigate("Login")
          } else {
            alert('OTP mismatch')
            this.props.navigation.navigate("OtpVarification")
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

  }


  onResendOtp = () => {
    this.setState({
      isLoading: true
    })
    const { userMobileNo } = this.props.route.params;
    fetch(UserAuthBaseUrl + 'API/OTPVerification/ResentOTP?MobileNo=' + userMobileNo, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.successcode == "1") {
          this.setState({
            isLoading: false,
            newOtp: json.data[0].GeneratedOTP
          })
          alert('OTP Sent Successfully')
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
      const { userOtp } = this.props.route.params;
      // const { pin1, pin2, pin3, pin4 } = this.state
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={{ fontSize: 18, marginTop: 30, textAlign: 'center' }}>One Time Password (OTP) has been sent to your mobile number...</Text>
          </View>

          {/* <View style={styles.otpContainer}>
            {this.state.newOtp ?
              <Text
                style={styles.showOtp}>
                {this.state.newOtp}
              </Text>
              :
              <Text
                style={styles.showOtp}>
                {userOtp}
              </Text>
            }

          </View> */}
          {
            this.state.newOtp ?
            <View style={{width:'60%',marginLeft:'auto',marginRight:'auto'}}>
              <Reinput
                label='Enter OTP'
                //value={this.state.name}
                onChangeText={resendOtp => this.setState({ resendOtp })}
              />
              </View>
              :
              <View style={{width:'60%',marginLeft:'auto',marginRight:'auto'}}>
              <Reinput
                label='Enter OTP'
                //value={this.state.name}
                onChangeText={userOtp => this.setState({ userOtp })}
              />
              </View>
          }




          <TouchableOpacity
            style={styles.button}
            onPress={this.onVarify}
          >
            <Text style={styles.TextStyle}> Verify </Text>
          </TouchableOpacity>
          <Text
            onPress={this.onResendOtp}
            style={{ textAlign: 'center', fontSize: 20, color: 'green', marginTop: 10 }}>Resend OTP</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  otpContainer: {
    marginTop: 50, marginBottom: 30, borderColor: '#d7d7d7',
    borderWidth: 1,
    borderRadius: 30,
    borderBottomWidth: 5,
    width: '50%',
  },
  //   header: {
  //     flex: ,
  //     backgroundColor: "red",
  //     borderBottomLeftRadius: 40,
  //     borderBottomRightRadius: 40,
  //     // paddingVertical: 20,
  //     // paddingHorizontal: 20
  // },
  showOtp: {
    height: 30,
    textAlign: 'center',
    fontSize: 22
  },

  button: {
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#bf1313',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 20,
    width: '80%'
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15
  },

})