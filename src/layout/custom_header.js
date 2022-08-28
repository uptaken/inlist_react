import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TextInput,
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Base from '../utils/base';

export default function CustomHeader(props){
  var base = new Base()

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Image source={require("../../assets/logo.png")} style={{ width: base.size.title, height: base.size.title }}/>

      <Text style={{ color: base.color.white, fontSize: base.size.icon, fontWeight: 'bold', }}>{base.i18n.t("app_name")}</Text>

      <View style={{ width: base.size.title, }}>
        {
          props.side_component != null &&
          props.side_component
        }
      </View>
    </View>
  );
};
