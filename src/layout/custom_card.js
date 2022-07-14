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

export default function CustomCard(props){
  var base = new Base()

  return (
    <View>
      {
        props.on_press != null ?
        <TouchableNativeFeedback
          useForeground
          background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
          onPress={() => props.on_press()}
          disabled={props.is_disabled != null ? props.is_disabled : false}
          style={{ borderRadius : props.borderRadius != null ? props.borderRadius : base.size.size_1 }}>
          <View style={[
            props.style,
            {
              backgroundColor : props.color,
              padding : props.padding != null ? props.padding : base.size.size_5,
              paddingHorizontal : props.paddingHorizontal != null ? props.paddingHorizontal : base.size.size_5,
              borderRadius : props.borderRadius != null ? props.borderRadius : base.size.size_1,
              borderWidth: props.no_border == null || (props.no_border != null && !props.no_border) ? base.size.border : 0,
              borderColor : props.borderColor != null ? props.borderColor : base.color.primary,
            },
          ]}>
            {props.children}
          </View>
        </TouchableNativeFeedback>
        :
        <View style={[
          props.style,
          {
            backgroundColor : props.color,
            padding : props.padding != null ? props.padding : base.size.size_5,
            paddingHorizontal : props.paddingHorizontal != null ? props.paddingHorizontal : base.size.size_5,
            borderRadius : props.borderRadius != null ? props.borderRadius : base.size.size_1,
            borderWidth: props.no_border == null || (props.no_border != null && !props.no_border) ? base.size.border : 0,
            borderColor : props.borderColor != null ? props.borderColor : base.color.primary,
          }
        ]}>
          {props.children}
        </View>
      }

    </View>
  );
};
