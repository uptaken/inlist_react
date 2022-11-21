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
  TouchableWithoutFeedback,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Base from '../../utils/base';

export default function AppInfoModal(props){
  var base = new Base()
  const [is_show, set_is_show] = useState(false)

  useEffect(() => {
    if(props.is_show != is_show)
      set_is_show(props.is_show)
  }, [props])

  return (
    <Modal
      transparent={true}
      visible={is_show}
      animationType="fade">
      <TouchableOpacity 
        style={{ flex: 1, }} 
        activeOpacity={1} 
        onPressOut={() => {props.on_change_show(false)}}>
        <View style={{ backgroundColor : '#000000B3', flex : 1, justifyContent : 'center' }}>
          <View style={{ margin : base.size.size_5, backgroundColor : 'white', radius : 4, paddingHorizontal: base.size.size_5, alignItems : 'center', paddingVertical: base.size.large_title, }}>
            <Image source={require("../../../assets/logo.png")} style={{ width: base.size.large_title, height: base.size.large_title }}/>

            <View style={{  }}>
              <Text style={{ textAlign: 'center', fontSize: base.size.icon, fontWeight: 'bold', }}>{base.i18n.t("app_name")}</Text>
              <Text style={{ textAlign: 'center', }}>{base.i18n.t("developed_by")}</Text>
            </View>

            <View style={{ marginTop: base.size.size_5, }}>
              <Text style={{ textAlign: 'center', }}>PT. SRIWIJAYA INTERNET SERVICES</Text>
              <Text style={{ textAlign: 'center', }}>Palembang, Sumatera Selatan</Text>
              <Text style={{ textAlign: 'center', }}>085210101718</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
};
