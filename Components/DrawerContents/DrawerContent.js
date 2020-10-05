import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { List, Checkbox } from 'react-native-paper';


export default class CustomDrawerContent extends Component {

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#d7d7d7' }}>
                <DrawerContentScrollView >
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 28 }}>
                                <Image source={{ uri: 'https://lh3.googleusercontent.com/BJC4uppMdeo8ue2Eh9IlVxtAVJPRsgVySNMgIeXOCRDxbDcyRznXAPzdJ_Ql36TF3w' }}
                                    style={{ width: 180, height: 180 }}
                                />
                            </View>
                        </View>

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Feather
                                        name="home"
                                        size={20}
                                        color={'Home'}
                                        style={{marginLeft:8}}
                                    />
                                )}
                                label="Home"
                                labelStyle={{ color: 'black', fontSize: 16 }}
                                onPress={() => { this.props.navigation.navigate('Home') }}
                            />

                            <List.Section>
                                <List.Accordion
                                    title="Complain"
                                    left={props => <List.Icon {...props} icon="clipboard-text-outline" color={"black"} />}
                                    titleStyle={{ color: "black" }}
                                >
                                    <List.Item
                                        title="New Complain"
                                        titleStyle={{ color: "black" }}
                                        left={props => <List.Icon {...props} icon="folder" color={"black"} style={{marginLeft:30}}/>}
                                        onPress={() => { this.props.navigation.navigate('NewComplain') }}
                                    />
                                    <List.Item
                                        title="Complain Status"
                                        titleStyle={{ color: "black" }}
                                        left={props => <List.Icon {...props} icon="alert-circle-outline" color={"black"} style={{marginLeft:30}}/>}
                                        onPress={() => { this.props.navigation.navigate('Complain Status') }}
                                    />
                                    <List.Item
                                        title="Complain History"
                                        titleStyle={{ color: "black" }}
                                        left={props => <List.Icon {...props} icon="comment-remove-outline" color={"black"} style={{marginLeft:30}}/>}
                                        onPress={() => { this.props.navigation.navigate('History') }}
                                    />
                                </List.Accordion>
                            </List.Section>

                        </Drawer.Section>
                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Feather
                                name="user"
                                size={20}
                                color={"black"}
                            />
                        )}
                        label="Logout"
                        labelStyle={{ color: "black", fontSize: 16 }}
                        onPress={() => { this.props.navigation.navigate('UserLogout') }}
                    />
                </Drawer.Section>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 10,
        borderTopColor: 'black',
        borderTopWidth: 1
    },
    subCategory: {
        fontSize: 16,
        color: "black",
        paddingVertical: 10
    }
});