import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import { DataTable } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class ComplaintStatus extends Component {

  msg =()=>{
    Alert.alert(
      "Complain Staus",
      "In Progress",
      [
        {
          text: "Ok",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
      );
}
  render() {
    return (
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Complain Number</DataTable.Title>
            <DataTable.Title numeric>Complaint By</DataTable.Title>
            <DataTable.Title numeric>Status</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>120001000054</DataTable.Cell>
            <DataTable.Cell numeric>raj verma</DataTable.Cell>
            <DataTable.Cell numeric>
              <AntDesign
                name="exclamationcircle"
                size={30}
                color={'orange'}
                onPress = {this.msg}
              />
            </DataTable.Cell>
          </DataTable.Row>


          <DataTable.Row>
            <DataTable.Cell>120001000054</DataTable.Cell>
            <DataTable.Cell numeric>raj verma</DataTable.Cell>
            <DataTable.Cell numeric>
              <AntDesign
                name="exclamationcircle"
                size={30}
                color={'orange'}
                onPress = {this.msg}
              />
            </DataTable.Cell>
          </DataTable.Row>


          <DataTable.Row>
            <DataTable.Cell>120001000054</DataTable.Cell>
            <DataTable.Cell numeric>raj verma</DataTable.Cell>
            <DataTable.Cell numeric>
              <AntDesign
                name="exclamationcircle"
                size={30}
                color={'orange'}
                onPress = {this.msg}
              />
            </DataTable.Cell>
          </DataTable.Row>

        </DataTable>
      </View>
    )
  }
}
