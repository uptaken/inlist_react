import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Base from '../utils/base';

export default function CustomTable(props){
  var base = new Base()

  return (
    <View style={{ flex: 1, }}>
      <View style={{ flexDirection: 'row' }}>
        {
          props.data_head.map((head, index) => (
            <View key={index} style={{ flex: 1, alignSelf: 'stretch' }} >
              <Text style={{ fontWeight: 'bold' }}>{head}</Text>
            </View>
          ))
        }
      </View>

      <View style={{  }}>
        {
          props.data_row.map((row, index) => (
            <View key={index} style={{ flexDirection: 'row' }}>
              {
                row.map((datum, index1) => (
                  <View key={index1} style={{ flex: 1, alignSelf: 'stretch' }} >
                    <Text>{datum}</Text>
                  </View>
                ))
              }
            </View>
          ))
        }
      </View>
    </View>
  );
};
