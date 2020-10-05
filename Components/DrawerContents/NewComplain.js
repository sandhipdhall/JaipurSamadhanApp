import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

//import PostComplaitListData from '../JSON/PostComplaintList'
import CallCenterBaseUrl from '../BaseUrl/CallCenterBaseUrl'
import { List, Checkbox } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Colors } from 'react-native-paper';


export default class NewComplain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      ComplaintCategory: [],
      ComplaintSubCategory: [],
      getCategoryCode: "", 
      isLoading:false
    }
  }

  // _handlePress = () =>
  //   this.setState({
  //     expanded: !this.state.expanded
  //   });

  getComplainCategory = () => {

    this.setState({
      isLoading:true
    })
    fetch(CallCenterBaseUrl + 'api/ComplaintRegistration/GetddlComplReg?Ind=1', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        
        //console.log(json.data.ComplaintSubCategory);
        this.setState({
          isLoading:false,
          ComplaintSubCategory: json.data.ComplaintSubCategory,
          ComplaintCategory: json.data.ComplaintCategory,
        })
           console.log("category",this.state.ComplaintCategory);
        console.log("sub category",this.state.ComplaintSubCategory);
     
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getComplainCategory();
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
      return(
        <ScrollView style={styles.container}>
          <List.Section title="Select your Complain Category">
            {
              this.state.ComplaintCategory.map((category) =>
                <List.Accordion
                  onPress={this._handlePress}
                  title={category.ComplaintCategoryDescE}
                >
                  {
                    this.state.ComplaintSubCategory.map((subCategory) =>
                      subCategory.ComplaintSubCategoryDesc == category.ComplaintCategoryCode ?
                        <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('Complain Form',
                        {
                          categoryName:category.ComplaintCategoryDescE,
                          categoryCode:category.ComplaintCategoryCode,
                          subCategoryName:subCategory.ComplaintSubCategoryDescE,
                          subCategoryCode:subCategory.ComplaintSubCategoryCode
                        }
                        )}}
                        >
                          <List.Item title={subCategory.ComplaintSubCategoryDescE} />
                        </TouchableOpacity>
                        :
                        null
  
  
                    )
                  }
  
                </List.Accordion>
              )
            }
  
          </List.Section>
        </ScrollView>
      )
    }
   
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 5
  },
  flatList: {
    flex: 1,
    marginTop: 10
  },
  item: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: 'ghostwhite'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  },


  itemGrid: {
    backgroundColor: '#fff',
    flex: 1,
    // flexDirection: 'row',
    borderRadius: 20,
    width: '90%',
    margin: 8,
    borderWidth: 1,
    borderColor: '#d7d7d7',
    alignItems: 'center',
    borderBottomWidth: 8,
    borderRightWidth: 5,
    alignSelf: 'center'
  },
});

