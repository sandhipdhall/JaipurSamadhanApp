import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import Reinput from 'reinput';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import CallCenterBaseUrl from '../BaseUrl/CallCenterBaseUrl'
import { ActivityIndicator, Colors, Modal } from 'react-native-paper';


export default class Complaint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getCurrentDate: '',
            name: '',
            ComplaintDetails: '',
            address: '',
            colony: '',
            altMobile: '',
            email: '',
            next1: false,
            next2: false,
            next3: false,
            next4: false,
            next5: false,
            next6: false,
            next7: false,
            next8: false,
            next9: false,
            next10: false,
            next11: false,
            ComplaintCategory: [],
            WardNo: [],
            isLoading: false,
            getUserInfo: [],


        }

    }





    submit = () => {
        this.setState({
            isLoading: true,
        })
        const { categoryName } = this.props.route.params;
        const { categoryCode } = this.props.route.params;
        const { subCategoryName } = this.props.route.params;
        const { subCategoryCode } = this.props.route.params;
        fetch(CallCenterBaseUrl + 'api/ComplaintRegistration/SaveComplainRegDetail', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: "sample string 1",
                data: {
                    Ind: "2",
                    CityCode: "1001002",
                    OrgCode: this.state.getUserInfo.orgid,
                    ComplainDate: this.state.ShowCurrentDate,
                    ComplainTime: "",
                    YrCode: this.state.getUserInfo.yrcode,
                    YrDesc: this.state.getUserInfo.yrcode,
                    FinYrCode: "0",
                    FinYrDesc: "0",
                    SchemeCode: "0",
                    SchemeDesc: "",
                    ComplSourceCode: "3",
                    ComplSourceDesc: "Using Mobile Application",
                    ComplaintCategoryCode: categoryCode,
                    CategoryTypeCode: 1,
                    ComplaintCategoryDesc: categoryName,
                    CategoryTypeDesc: "Citizen",
                    ComplaintDesc: this.state.complainDetails,
                    ZoneCode: this.state.ZoneCode,
                    WardCode: this.state.WardSelected,
                    MobileNo: this.state.getUserInfo.loginid,
                    EmailId: this.state.email,
                    LandlineNo: this.state.altMobile,
                    Address: this.state.address,
                    ServiceNo: "",
                    DeptOfficerCode: "0",
                    DeptOfficerName: "",
                    ContractorCode: "0",
                    ContractorName: "",
                    TeleCallCd: "0",
                    EntryUserCode: this.state.getUserInfo.usercode,
                    AccessLevelCode: "501",
                    AccessLevelDesc: "Level - I",
                    ComplaintSubCategoryCode: subCategoryCode,
                    ComplaintSubCategoryDesc: subCategoryName,
                    VidhanSabhaCode: this.state.VidhanSabhaCode,
                    VidhanSabhaDesc: this.state.VidhanSabhaDesc,
                    ParshadCode: this.state.ParshadCode,
                    ParshadName: this.state.ParshadName,
                    ComplainantName: this.state.name,
                    SectionCode: "0",
                    SectionName: ""

                }
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(JSON.stringify(json))
                if (json.successcode == "1") {
                    this.setState({
                        isLoading: false
                    })
                    this.props.navigation.navigate("Image", {
                        ComplainRegNumber: json.data.Table[0].ComplainRegNo,
                        ComplainNoOdp: json.data.Table[0].ComplainNoOdp,
                    })

                } else {
                    alert('something went wrong')
                    this.props.navigation.navigate("Complaint")
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    // submit = () => {
    //     console.log(this.state.getUserInfo.loginid)
    //  //   this.props.navigation.navigate("Image")
    // }

    next1 = () => {
        this.setState({
            next1: true
        })
    }

    next2 = () => {

        this.setState({
            next2: true
        })
    }

    next3 = () => {
        this.setState({
            next3: true
        })
    }

    next4 = () => {
        this.setState({
            next4: true
        })
    }

    next5 = () => {
        this.setState({
            next5: true
        })
        this.getParshadDetails();
    }

    next6 = () => {
        this.setState({
            next6: true
        })
    }

    next7 = () => {
        this.setState({
            next7: true
        })
    }

    next8 = () => {
        this.setState({
            next8: true
        })


    }

    next9 = () => {
        this.setState({
            next9: true
        })
    }

    next10 = () => {
        this.setState({
            next10: true
        })
    }

    next11 = () => {
        this.setState({
            next11: true
        })
    }


    ShowCurrentDate = () => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        //alert(date + '-' + month + '-' + year);
        this.setState({
            getCurrentDate: date + '-' + month + '-' + year
        })

    }


    getAllCategories = () => {

        fetch(CallCenterBaseUrl + 'api/ComplaintRegistration/GetddlComplReg?Ind=1', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                //console.log(json);
                console.log(json.data.Complainantby);
                this.setState({
                    Complainantby: json.data.Complainantby,
                    ComplaintCategory: json.data.ComplaintCategory,
                    WardNo: json.data.WardNo
                })
                console.log(this.state.WardNo);
            })
            .catch((error) => {
                console.error(error);
            });
    }



    getParshadDetails = () => {

        fetch(CallCenterBaseUrl + 'api/ComplaintRegistration/GetSchemeZoneVidhan', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: "",
                data: this.state.WardSelected
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.data.Parshad[0].ParshadName);
                console.log(json.data.Parshad[0].ParshadCode);
                console.log(json.data.Zone[0].ZoneDescE);
                console.log(json.data.Zone[0].ZoneCode);
                console.log(json.data.VidhanSabha[0].VidhanSabhaCode);
                console.log(json.data.VidhanSabha[0].VidhanSabhaName);
                if (json.successcode == "1") {
                    this.setState({
                        ParshadName: json.data.Parshad[0].ParshadName,
                        ParshadCode: json.data.Parshad[0].ParshadCode,
                        ZoneDescE: json.data.Zone[0].ZoneDescE,
                        ZoneCode: json.data.Zone[0].ZoneCode,
                        VidhanSabhaDesc: json.data.VidhanSabha[0].VidhanSabhaName,
                        VidhanSabhaCode: json.data.VidhanSabha[0].VidhanSabhaCode
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });

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

    validateMobile = (altMobile) => {
        //  console.log(mobile)
        // this.setState({})
        var num = altMobile.toString();
        if (num != "0" && num != " ") {
            var rep = num.replace(/[^\d\s]+/, "");
            this.setState({
                altMobile: rep
            })
            console.log(rep);
        }
    };


    componentDidMount() {
        // console.log(this.state.getUserInfo)
        this.displayData();
        this.ShowCurrentDate();
        this.getAllCategories();
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
            const { categoryName } = this.props.route.params;
            const { categoryCode } = this.props.route.params;
            const { subCategoryName } = this.props.route.params;
            const { subCategoryCode } = this.props.route.params;

            return (

                <ScrollView style={{ backgroundColor: '#e9f0ee' }}>

                    {/* <TouchableOpacity
                        style={style.button}
                        onPress={this.submit}
                    >
                        <Text style={style.TextStyle}> SUBMIT </Text>
                    </TouchableOpacity> */}

                    <Animatable.View
                        animation="fadeInDown"
                        style={style.balloonGetMsg}>
                        <Text style={{ color: 'white' }}>Welcome to JAIPUR SAMADHAN COMPLAINT for {categoryName}</Text>
                    </Animatable.View>
                    <Animatable.View
                        animation="fadeInDown"
                        delay={1000}
                        style={style.balloonGetMsg}>
                        <Text style={{ color: 'white' }}>Your Complaint Date</Text>
                    </Animatable.View>
                    <Animatable.View
                        animation="fadeInDown"
                        delay={2000}
                        style={style.balloonSendMsg}
                    >
                        <Text>{this.state.getCurrentDate}</Text>

                    </Animatable.View>


                    <Animatable.View
                        animation="fadeInDown"
                        delay={3000}
                        style={style.balloonGetMsg}>
                        <Text style={{ color: 'white' }}>Standerd Complaint</Text>
                    </Animatable.View>

                    <Animatable.View
                        animation="fadeInDown"
                        delay={4000}
                        style={style.balloonSendMsg}>
                        <Text>{subCategoryName}</Text>
                    </Animatable.View>

                    {
                        this.state.next1 == true ?

                            null
                            :
                            <Animatable.View
                                animation="fadeInRight"
                                delay={4000}
                                style={style.nextBtn}>
                                <FontAwesome
                                    name="arrow-circle-right"
                                    size={35}
                                    color={'purple'}
                                    onPress={this.next1}
                                />
                            </Animatable.View>
                    }

                    {/* {
                        this.state.next1 == true ?

                            <Picker
                                selectedValue={this.state.ComplaintBySelected}

                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({
                                        ComplaintBySelected: itemValue,
                                    })
                                }

                            >
                                <Picker.Item label="------Complaint By-------" />
                                {
                                    this.state.Complainantby.map((compBy) =>
                                        <Picker.Item label={compBy.CategoryTypeDescE} value={compBy.CategoryTypeCode} />
                                    )
                                }
                            </Picker> 
                            :
                            null
                    } */}




                    {this.state.next1 == true ?
                        <View>
                            <Animatable.View
                                animation="fadeInDown"
                                style={style.balloonGetMsg}>
                                <Text style={{ color: 'white' }}>Complaint Detail</Text>
                            </Animatable.View>
                            {this.state.next2 == true ?
                                null
                                :
                                <View>
                                    <Animatable.View
                                        animation="fadeInRight"

                                        style={style.inputView}>
                                        <Reinput label='Complaint Detail'
                                            onChangeText={complainDetails => this.setState({ complainDetails })} />
                                    </Animatable.View>
                                    {
                                        this.state.complainDetails ?
                                            <View style={style.nextBtn}>
                                                <FontAwesome
                                                    name="arrow-circle-right"
                                                    size={35}
                                                    color={'purple'}
                                                    onPress={this.next2}
                                                />
                                            </View>
                                            :
                                            null
                                    }

                                </View>
                            }
                        </View>
                        :
                        null
                    }




                    {this.state.next2 == true ?
                        <View>
                            <Animatable.View
                                animation="fadeInDown"
                                style={style.balloonSendMsg}>
                                <Text>{this.state.complainDetails}</Text>
                            </Animatable.View>
                            <Animatable.View
                                animation="fadeInDown"
                                delay={1000}
                                style={style.balloonGetMsg}>
                                <Text style={{ color: 'white' }}>Name of Complainant</Text>
                            </Animatable.View>

                            {this.state.next3 == true ?
                                null
                                :
                                <View>
                                    <Animatable.View
                                        animation="fadeInRight"
                                        delay={2000}
                                        style={style.inputView}>
                                        <Reinput label='Name of Complainant'
                                            onChangeText={name => this.setState({ name })} />
                                    </Animatable.View>
                                    {
                                        this.state.name ?
                                            <View style={style.nextBtn}>
                                                <FontAwesome
                                                    name="arrow-circle-right"
                                                    size={35}
                                                    color={'purple'}
                                                    onPress={this.next3}
                                                />
                                            </View>
                                            :
                                            null
                                    }

                                </View>

                            }

                        </View>
                        :
                        null
                    }


                    {this.state.next3 == true ?
                        <View>
                            <Animatable.View
                                animation="fadeInDown"
                                style={style.balloonSendMsg}>
                                <Text>{this.state.name}</Text>
                            </Animatable.View>
                            <Animatable.View
                                animation="fadeInDown"
                                delay={1000}
                                style={style.balloonGetMsg}>
                                <Text style={{ color: 'white' }}>Address</Text>
                            </Animatable.View>
                            {this.state.next4 == true ?
                                null
                                :
                                <View>
                                    <Animatable.View
                                        animation="fadeInRight"
                                        delay={2000}
                                        style={style.inputView}>
                                        <Reinput label='Address' onChangeText={address => this.setState({ address })} />
                                    </Animatable.View>
                                    {
                                        this.state.address ?
                                            <View style={style.nextBtn}>
                                                <FontAwesome
                                                    name="arrow-circle-right"
                                                    size={35}
                                                    color={'purple'}
                                                    onPress={this.next4}
                                                />
                                            </View>
                                            :
                                            null
                                    }

                                </View>
                            }
                        </View>
                        :
                        null

                    }


                    {this.state.next4 == true ?
                        <View>
                            <Animatable.View
                                animation="fadeInDown"
                                style={style.balloonSendMsg}>
                                <Text>{this.state.address}</Text>
                            </Animatable.View>
                            <Animatable.View
                                animation="fadeInDown"
                                delay={1000}
                                style={style.balloonGetMsg}>
                                <Text style={{ color: 'white' }}>Select Ward No</Text>
                            </Animatable.View>

                            <View>
                                <Animatable.View
                                    animation="fadeInRight"
                                    delay={2000}
                                    style={style.inputView}>

                                    <Picker
                                        selectedValue={this.state.WardSelected}

                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({
                                                WardSelected: itemValue,
                                            })
                                        }

                                    >
                                        <Picker.Item label="------Select Ward no.-------" />
                                        {
                                            this.state.WardNo.map((category) =>
                                                <Picker.Item label={category.WardCode.toString()} value={category.WardCode} />
                                            )
                                        }
                                    </Picker>


                                </Animatable.View>
                                {
                                    this.state.WardSelected ?
                                        <View>
                                            {this.state.next5 ?
                                                null
                                                :
                                                <View style={style.nextBtn}>
                                                    <FontAwesome
                                                        name="arrow-circle-right"
                                                        size={35}
                                                        color={'purple'}
                                                        onPress={this.next5}
                                                    />
                                                </View>
                                            }


                                        </View>
                                        :
                                        null
                                }

                            </View>

                        </View>
                        :
                        null

                    }



                    {this.state.next5 == true ?
                        <View>
                            <Animatable.View
                                animation="fadeInDown"
                                delay={1000}
                                style={style.balloonGetMsg}>
                                <Text style={{ color: 'white' }}>Parshad</Text>
                            </Animatable.View>
                            <Animatable.View
                                animation="fadeInDown"
                                delay={2000}
                                style={style.balloonSendMsg}>
                                <Text>{this.state.ParshadName}</Text>
                            </Animatable.View>
                            {this.state.next6 == true ?
                                null
                                :
                                <View>
                                    <View style={style.nextBtn}>
                                        <FontAwesome
                                            name="arrow-circle-right"
                                            size={35}
                                            color={'purple'}
                                            onPress={this.next6}
                                        />
                                    </View>
                                </View>
                            }
                        </View>
                        :
                        null

                    }



                    {this.state.next6 == true ?
                        <View>
                            <Animatable.View
                                animation="fadeInDown"
                                style={style.balloonGetMsg}>
                                <Text style={{ color: 'white' }}>Zone</Text>
                            </Animatable.View>
                            <Animatable.View
                                animation="fadeInDown"
                                delay={1000}
                                style={style.balloonSendMsg}>
                                <Text>{this.state.ZoneDescE}</Text>
                            </Animatable.View>
                            {this.state.next7 == true ?
                                null
                                :
                                <View>
                                    <View style={style.nextBtn}>
                                        <FontAwesome
                                            name="arrow-circle-right"
                                            size={35}
                                            color={'purple'}
                                            onPress={this.next7}
                                        />
                                    </View>
                                </View>
                            }
                        </View>
                        :
                        null

                    }



                    {this.state.next7 == true ?
                        <View>
                            <Animatable.View
                                animation="fadeInDown"
                                style={style.balloonGetMsg}>
                                <Text style={{ color: 'white' }}>Colony</Text>
                            </Animatable.View>
                            {this.state.next8 == true ?
                                null
                                :
                                <View>
                                    <Animatable.View
                                        animation="fadeInRight"
                                        delay={1000}
                                        style={style.inputView}>
                                        <Reinput label='Colony' onChangeText={colony => this.setState({ colony })} />
                                    </Animatable.View>
                                    {
                                        this.state.colony ?
                                            <View style={style.nextBtn}>
                                                <FontAwesome
                                                    name="arrow-circle-right"
                                                    size={35}
                                                    color={'purple'}
                                                    onPress={this.next8}
                                                />
                                            </View>
                                            :
                                            null
                                    }

                                </View>
                            }
                        </View>
                        :
                        null

                    }



                    {this.state.next8 == true ?
                        <View>
                            <Animatable.View
                                animation="fadeInDown"
                                style={style.balloonSendMsg}>
                                <Text>{this.state.colony}</Text>
                            </Animatable.View>
                            <Animatable.View
                                animation="fadeInDown"
                                delay={1000}
                                style={style.balloonGetMsg}>
                                <Text style={{ color: 'white' }}>mobile no.</Text>
                            </Animatable.View>
                            <Animatable.View
                                animation="fadeInDown"
                                delay={2000}
                                style={style.balloonSendMsg}>
                                <Text>{this.state.getUserInfo.loginid}</Text>
                            </Animatable.View>
                            {this.state.next9 == true ?
                                null
                                :
                                <View style={style.nextBtn}>
                                    <FontAwesome
                                        name="arrow-circle-right"
                                        size={35}
                                        color={'purple'}
                                        onPress={this.next9}
                                    />
                                </View>
                            }
                        </View>
                        :
                        null

                    }


                    {this.state.next9 == true ?
                        <View>
                            <Animatable.View
                                animation="fadeInDown"
                                style={style.balloonGetMsg}>
                                <Text style={{ color: 'white' }}>Alternate mobile no.</Text>
                            </Animatable.View>
                            {this.state.next10 == true ?
                                null
                                :
                                <View>
                                    <Animatable.View
                                        animation="fadeInRight"
                                        delay={1000}
                                        style={style.inputView}>
                                        <Reinput
                                            label='Alternate Mobile No'
                                            value={this.state.altMobile}
                                            onChangeText={this.validateMobile}
                                            keyboardType='numeric'
                                            maxLength={10}
                                            onChangeText={altMobile => this.setState({ altMobile })}
                                        />
                                    </Animatable.View>
                                    {
                                        this.state.altMobile.length == 10 ?
                                            <View style={style.nextBtn}>
                                                <FontAwesome
                                                    name="arrow-circle-right"
                                                    size={35}
                                                    color={'purple'}
                                                    onPress={this.next10}
                                                />
                                            </View>
                                            :
                                            null
                                    }

                                </View>
                            }
                        </View>
                        :
                        null

                    }


                    {this.state.next10 == true ?
                        <View>
                            <Animatable.View
                                animation="fadeInDown"
                                style={style.balloonSendMsg}>
                                <Text>{this.state.altMobile}</Text>
                            </Animatable.View>
                            <Animatable.View
                                animation="fadeInDown"
                                delay={1000}
                                style={style.balloonGetMsg}>
                                <Text style={{ color: 'white' }}>Email id</Text>
                            </Animatable.View>



                            {this.state.next11 == true ?
                                null
                                :
                                <View>
                                    <Animatable.View
                                        animation="fadeInDown"
                                        style={style.inputView}>
                                        <Reinput label='Email'
                                            onChangeText={email => this.setState({ email })}
                                        />
                                    </Animatable.View>
                                    {
                                        this.state.email ?
                                            <View style={style.nextBtn}>
                                                <FontAwesome
                                                    name="arrow-circle-right"
                                                    size={35}
                                                    color={'purple'}
                                                    onPress={this.next11}
                                                />
                                            </View>
                                            :
                                            null
                                    }

                                </View>
                            }
                        </View>
                        :
                        null

                    }



                    {this.state.next11 == true ?
                        <Animatable.View
                            animation="fadeInDown"
                            style={style.balloonSendMsg}>
                            <Text>{this.state.email}</Text>
                        </Animatable.View>
                        :
                        null
                    }



                    {this.state.next11 == true ?
                        <TouchableOpacity
                            style={style.button}
                            onPress={this.submit}
                        >
                            <Text style={style.TextStyle}> SUBMIT </Text>
                        </TouchableOpacity>
                        :

                        null
                    }

                </ScrollView>

            )
        }
    }
}
const style = StyleSheet.create({

    inputView: {
        width: '80%',
        marginLeft: 35,


    },
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
    },
    button: {
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#bf1313',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 20
    },
    balloonSendMsg: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 10,
        borderTopRightRadius: 5,
        right: 5,
        backgroundColor: '#dee3e2',
        alignSelf: 'flex-end'
    },
    balloonGetMsg: {
        marginTop: 20,
        maxWidth: 250,
        padding: 15,
        borderRadius: 10,
        //  borderBottomLeftRadius:10,
        borderTopLeftRadius: 5,
        left: 5,
        backgroundColor: 'purple',
        alignSelf: 'flex-start'
    },
    nextBtn: { alignSelf: 'flex-end', marginTop: 5, marginRight: 40 }
})
