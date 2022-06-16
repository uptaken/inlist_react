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
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Base from '../../utils/base';

export default function PleaseWaitModal(props){
  var base = new Base()

  return (
    <Modal
      transparent={true}
      visible={props.is_show}
      animationType="fade">
      <View style={{ backgroundColor : '#000000B3', flex : 1, justifyContent : 'center' }}>
        <View style={{ margin : base.size.size_5, backgroundColor : 'white', radius : 4, padding: base.size.size_5 }}>
          <Text>{base.i18n.t("please_wait_label")}</Text>
        </View>
      </View>
    </Modal>
  )
};
