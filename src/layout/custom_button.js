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

export default function CustomButton(props){
  var base = new Base()

  return (
    <TouchableNativeFeedback
      useForeground
      background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
      onPress={() => props.on_press()}
      disabled={props.is_disabled != null ? props.is_disabled : false}
      style={{ borderRadius : (props.borderRadius != null ? props.borderRadius : base.size.size_1) }}>
      <View style={[
        props.style,
        {
          backgroundColor : props.color,
          padding : (props.icon != null ? base.size.size_1 : base.size.size_3),
          borderRadius : (props.borderRadius != null ? props.borderRadius : base.size.size_1),
          alignItems : 'center',
          borderWidth: props.no_border == null || (props.no_border != null && !props.no_border) ? base.size.border : 0, 
          borderColor : (props.borderColor != null ? props.borderColor : base.color.primary), }]}>
        <View style={{flexDirection : 'row'}}>
          {
            props.icon != null &&
            <View style={{justifyContent : 'center'}}>
              <Icon name={props.icon} size={base.size.icon} color={'black'} />
            </View>
          }
          <View style={{justifyContent : 'center'}}>
            <Text style={{color : props.textColor != null ? props.textColor : 'black', textTransform: 'uppercase', fontSize: base.size.size_5}}>{props.title}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
