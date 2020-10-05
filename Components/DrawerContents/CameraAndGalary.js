import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, AsyncStorage } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import UserAuthBaseUrl from '../BaseUrl/UserAuthBaseUrl'
import RNFetchBlob from 'rn-fetch-blob'

import { ActivityIndicator, Colors, Modal } from 'react-native-paper';

const options = {
  title: 'Select Photo',
  takePhotoButtonTittle: 'Take a photo',
  chooseFromLibraryButtonTittle: 'Choose from library',
  quality: 1

}
export default class ImagesComponent extends Component {
  constructor() {
    super()
    this.state = {
      imageSource: null,
      ImageUri: '',
      data:null
    }

  }

  displayData = async () => {
    try {
      let user = await AsyncStorage.getItem('userinfo');
      // console.log( JSON.parse(user))
      this.setState({
        getUserInfo: JSON.parse(user)
      })
      console.log(this.state.getUserInfo)

    }
    catch (error) {
      alert(error)
    }
  }

  componentDidMount() {
    this.displayData()
  }
  selectPhotos() {
    ImagePicker.showImagePicker(options, (response) => {
      //  console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        console.log('--source--->        ' + JSON.stringify(response))
        console.log('--source2--->        ' + response.path)
        this.setState({
          imageSource: source,
          data: response.data,
          ImageUri: response.path,

        });
      }
    });
  }


  UploadImage = () => {
    const { ComplainRegNumber } = this.props.route.params;
    const { ComplainNoOdp } = this.props.route.params;
    //console.log(ComplainNoOdp)

    let url = 'http://115.124.113.64/JMCCallCenterMobileAPI/API/MobileUserDocUpload/SaveComplainDocUploadMobile';


    RNFetchBlob.fetch('POST', url, {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [

      { name: 'image', filename: 'avatar.png', data: this.state.data },
      // elements without property `filename` will be sent as plain text
      { name: 'ComplainNo', data: ComplainRegNumber },
      { name: 'ComplainNoOdp', data: ComplainNoOdp.toString() },
      { name: 'EntryUserCode', data: this.state.getUserInfo.usercode },
      { name: 'DocTypeCode', data: '1' },
      { name: 'DocTypeDesc', data: 'mobile' },
    ])
    .then((response) => response.json())
    .then((resp) => {
      console.log(resp.data)
      if (resp.data != null) {
        Alert.alert(
          'Image Upload Successfully',
          'Your Complain Number is : ' + JSON.stringify(ComplainRegNumber),
          [
            { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
          ]
        );
      }
       else {
        Alert.alert(
          'Something Went Wrong In Uploading Image',
          [
            { text: 'OK', onPress: () => this.props.navigation.navigate('Image') },
          ]
        );
      }
     
    }).catch((err) => {
      console.log(err)
    })
  }


  render() {
    return (
      <View style={styles.cotainer}>
        <Image style={styles.images}
          source={this.state.imageSource != null ? this.state.imageSource :
            require('../Allimages/defaultImg.png')}></Image>
        <TouchableOpacity style={styles.button} onPress={this.selectPhotos.bind(this)}>
          <Text style={styles.text}>Select</Text>
        </TouchableOpacity>
        {
          this.state.data == null ?
            null
            :
            <TouchableOpacity style={styles.button} onPress={this.UploadImage}>
              <Text style={styles.text}>UploadImage</Text>
            </TouchableOpacity>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A0A0A0'
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#bf1313',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 15

  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',

  },
  images: {
    width: 200,
    height: 200,
    marginTop: 30
  }
})