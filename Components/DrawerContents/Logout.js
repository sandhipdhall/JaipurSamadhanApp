import React, { Component } from "react";
import { View,	AsyncStorage,	StyleSheet,ActivityIndicator	} from "react-native";

class UserLogout extends Component {
    componentDidMount(){
        AsyncStorage.clear() 
        AsyncStorage.removeItem('userinfo')
        this.props.navigation.navigate('Login')
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
        
    }
}
export default UserLogout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});