

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    BackHandler,
    Image,
    TouchableOpacity,
    Animated,
    Dimensions,
    ToastAndroid,
    Alert
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
//import PostComplaitListData from '../JSON/PostComplaintList'
import Swiper from 'react-native-swiper'


let { width, height } = Dimensions.get('window');

export default class PostComplaint extends React.Component {

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillMount(){
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
            <View>
                <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold',margin:10}}>Jaipur Samadhan</Text>
                <View style={{ height: "50%" }}>
                    <Swiper
                        autoplay={true}
                        showsButtons={false}
                        showsPagination={false}
                    >
                        <View style={styles.slide1}>
                            <Image
                                source={require('../Allimages/img1.jpg')}
                                style={{ width: '100%', height: 250 }}
                            />
                        </View>
                        <View style={styles.slide2}>
                            <Image
                                source={require('../Allimages/img2.jpg')}
                                style={{ width: '100%', height: 250 }}
                            />
                        </View>
                        <View style={styles.slide3}>
                            <Image
                                source={require('../Allimages/img3.jpg')}
                                style={{ width: '100%', height: 250 }}
                            />
                        </View>
                        <View style={styles.slide4}>
                            <Image
                                source={require('../Allimages/img4.jpg')}
                                style={{ width: '100%', height: 250 }}
                            />
                        </View>
                    </Swiper>
                </View>
                <TouchableOpacity
                style={styles.itemGrid}
                onPress={()=>this.props.navigation.navigate('Complain Category')}
            >
                <View style={styles.content}>
                    <Text style={styles.name}>Complain</Text>
                </View>
            </TouchableOpacity>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    wrapper: {

    },
    slide1: {
        flex: 1,
    },
    slide2: {
        flex: 1
    },
    slide3: {
        flex: 1,
    },
    slide4: {
        flex: 1,
    },

    item: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderRadius: 10
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    name: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign:'center'
    },
    itemGrid: {
        marginTop:80,
        backgroundColor: '#bd1c1c',
        flex: 0.5,
        borderRadius: 20,
        width: '90%',
        margin: 8,
        borderWidth: 1,
        borderColor: 'lightgrey',
        alignSelf: 'center',
    },

});

