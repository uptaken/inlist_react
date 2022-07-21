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

export default function CustomBadge(props){
  var base = new Base()

  return (
    <View>
      {
        props.no_press != null && props.no_press ? 
        <View style={[
          props.style,
          props.style_template != null ? styles[props.style_template] : {},
          {
            paddingHorizontal : props.padding_horizontal != null ? props.padding_horizontal : base.size.size_3,
            paddingVertical : props.padding_vertical != null ? props.padding_vertical : base.size.size_1,
            borderRadius : props.borderRadius != null ? props.borderRadius : base.size.size_3,
            borderWidth: base.size.border,
          }
        ]}>
          <Text style={[props.style_template != null ? styles[props.style_template] : {}, {fontSize: base.size.size_3, }]}>{props.is_translate != null && props.is_translate ? base.i18n.t(props.text) : props.text}</Text>
        </View>
        :
        <TouchableNativeFeedback
          useForeground
          background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
          onPress={() => props.on_press()}
          style={{ borderRadius : props.borderRadius != null ? props.borderRadius : base.size.size_1 }}>
          <View style={[
            props.style,
            props.style_template != null ? styles[props.style_template] : {},
            {
              paddingHorizontal : props.padding_horizontal != null ? props.padding_horizontal : base.size.size_3,
              paddingVertical : props.padding_vertical != null ? props.padding_vertical : base.size.size_1,
              borderRadius : props.borderRadius != null ? props.borderRadius : base.size.size_3,
              borderWidth: base.size.border,
            }
          ]}>
            <Text style={[props.style_template != null ? styles[props.style_template] : {}, {fontSize: base.size.size_3, }]}>{props.is_translate != null && props.is_translate ? base.i18n.t(props.text) : props.text}</Text>
          </View>
        </TouchableNativeFeedback>
      }
    </View>
  );
};

var base = new Base()
const styles = StyleSheet.create({
  primary: {
    backgroundColor: base.color.primaryLight,
    borderColor: base.color.primaryLight,
    color: base.color.primary
  },
  danger: {
    backgroundColor: base.color.primaryLight,
    borderColor: base.color.primaryLight,
    color: base.color.red
  },
})
