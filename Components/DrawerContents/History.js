 

import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import { DataTable } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class History extends Component {

    msg =()=>{
        Alert.alert(
            "Your Complain is Pending",
            [
              {
                text: "ok",
               // onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              }
            ],
            { cancelable: false }
            )
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
            <DataTable.Cell numeric>akash sharma</DataTable.Cell>
            <DataTable.Cell numeric>
              <Feather
                name="check"
                size={30}
                color={'green'}
              />
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>120001000054</DataTable.Cell>
            <DataTable.Cell numeric>naman verma</DataTable.Cell>
            <DataTable.Cell numeric>
              <Feather
                name="x-circle"
                size={30}
                color={'red'}
              />
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>120001000054</DataTable.Cell>
            <DataTable.Cell numeric>akash sharma</DataTable.Cell>
            <DataTable.Cell numeric>
              <Feather
                name="check"
                size={30}
                color={'green'}
              />
            </DataTable.Cell>
          </DataTable.Row>


          <DataTable.Row>
            <DataTable.Cell>120001000054</DataTable.Cell>
            <DataTable.Cell numeric>suresh singh</DataTable.Cell>
            <DataTable.Cell numeric>
              <Feather
                name="check"
                size={30}
                color={'green'}
              />
            </DataTable.Cell>
          </DataTable.Row>


          <DataTable.Row>
            <DataTable.Cell>120001000054</DataTable.Cell>
            <DataTable.Cell numeric>Mukesh singh</DataTable.Cell>
            <DataTable.Cell numeric>
              <Feather
                name="check"
                size={30}
                color={'green'}
              />
            </DataTable.Cell>
          </DataTable.Row>


          <DataTable.Row>
            <DataTable.Cell>120001000054</DataTable.Cell>
            <DataTable.Cell numeric>naman verma</DataTable.Cell>
            <DataTable.Cell numeric>
              <Feather
                name="x-circle"
                size={30}
                color={'red'}
              />
            </DataTable.Cell>
          </DataTable.Row>


        </DataTable>
      </View>
    )
  }
}
