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
import CustomHeader from './custom_header';

export default function CustomNavigation(props){
  var base = new Base()

  return (
    <View style={[props.style]}>
      <CustomHeader
        navigation={props.navigation}
        backgroundColor={props.style ? props.style.backgroundColor : null}/>
        
      <View style={[{ flexDirection: 'row', alignItems: 'center', paddingVertical: base.size.size_3 }]}>
        {
          (props.with_back == null || (props.with_back != null && props.with_back)) &&
          <TouchableNativeFeedback
            useForeground
            style={{ flex: 1,  }}
            background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
            onPress={() => props.navigation.goBack()}>
            <View style={{ marginRight: base.size.size_7 }}>
              <Icon name="arrow-back" size={base.size.icon} color={props.text_color != null ? props.text_color : base.color.black} />
            </View>
          </TouchableNativeFeedback>
        }

        {
          props.title !== '' &&
          <Text style={{ fontSize: base.size.icon, fontWeight: "bold", flex: 1, color: props.text_color != null ? props.text_color : base.color.black }}>{props.title}</Text>
        }

      </View>
    </View>
  );
};
