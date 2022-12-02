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

import AppInfoModal from './modal/app_info_modal';
import Base from '../utils/base';

export default function CustomHeader(props){
  var base = new Base()
  const [app_info_show, set_app_info_show] = useState(false)

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <AppInfoModal 
        is_show={app_info_show}
        on_change_show={(is_show) => set_app_info_show(is_show)}/>
        
      <TouchableNativeFeedback
        useForeground
        onPress={() => set_app_info_show(true)}>
        <Image source={require("../../assets/logo.png")} style={{ width: base.size.title, height: base.size.title }}/>
      </TouchableNativeFeedback>

      <View style={{ position: 'absolute', width: '100%', alignItems: 'center', }}>
        <Text style={{ color: props.backgroundColor ? base.color.white : base.color.black, fontSize: base.size.icon, fontWeight: 'bold', }}>{base.i18n.t("app_name")}</Text>
      </View>

      <View style={{  }}>
        {
          props.side_component != null &&
          props.side_component
        }
      </View>
    </View>
  );
};
