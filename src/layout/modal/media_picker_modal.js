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
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker'

import Base from '../../utils/base';

export default function MediaPickerModal(props){
  const [is_show, set_is_show] = useState(false)
  const [granted1, set_granted1] = useState(false)
  const [granted2, set_granted2] = useState(false)
  const [granted3, set_granted3] = useState(false)
  var base = new Base()

  // useEffect(() => {
  //   set_granted1(PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA))
  // }, [])

  // useEffect(() => {
  //   set_granted2(PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE))
  // }, [granted1])

  // useEffect(() => {
  //   set_granted3(PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE))
  // }, [granted2])

  useEffect(() => {
    if(props.is_show != is_show)
      set_is_show(props.is_show)
  }, [props])

  useEffect(() => {
    props.on_change_show(is_show)
  }, [is_show])

  function camera(){
    ImagePicker.openCamera({
      includeBase64: true
    }).then(response => {
      response.fromType = "camera"
      response.uri = response.path
      props.on_get_response(response)
    })
    set_is_show(false)
  }

  function gallery(){
    ImagePicker.openPicker({
      includeBase64: true
    }).then(response => {
      response.fromType = "gallery"
      response.uri = response.path
      props.on_get_response(response)
    })
    set_is_show(false)
  }

  return (
    <Modal
      transparent={true}
      visible={is_show}
      animationType="fade">
      <TouchableOpacity style={{ flex: 1, }} onPressOut={() => set_is_show(false)}>
        <View style={{ backgroundColor : '#000000B3', flex : 1, justifyContent : 'center',  }}>
          <TouchableWithoutFeedback>
            <View style={{ margin : base.size.size_5, backgroundColor : 'white', radius : 4, padding: base.size.size_7 }}>
              <View style={{ paddingVertical: base.size.size_5 }}>
                <Text style={{ fontSize: base.size.size_7 }}>{base.i18n.t("choose_media_title")}</Text>
              </View>
              <View style={{ paddingVertical: base.size.size_5 }}>
                <TouchableOpacity onPress={() => camera()}>
                  <Text>{base.i18n.t("choose_camera_label")}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ paddingVertical: base.size.size_5 }}>
                <TouchableOpacity onPress={() => gallery()}>
                  <Text>{base.i18n.t("choose_gallery_label")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  )
};
