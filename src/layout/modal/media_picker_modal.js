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

export default function MediaPickerModal(props){
  const [is_show, set_is_show] = useState(false)
  var base = new Base()

  useEffect(() => {
    if(props.is_show != is_show)
      set_is_show(props.is_show)
  }, [props])

  useEffect(() => {
    props.on_change_show(is_show)
  }, [is_show])

  function camera(){
    launchCamera({
      includeBase64: true
    }, response => {
      props.on_get_response(response)
    })
    set_is_show(false)
  }

  function gallery(){
    launchImageLibrary({
      includeBase64: true
    }, response => {
      props.on_get_response(response)
    })
    set_is_show(false)
  }

  return (
    <Modal
      transparent={true}
      visible={is_show}
      animationType="fade">
      <TouchableOpacity style={{ flex: 1 }} onPressOut={() => set_is_show(false)}>
        <View style={{ backgroundColor : '#000000B3', flex : 1, justifyContent : 'center' }}>
          <TouchableWithoutFeedback>
            <View style={{ margin : base.size["size-5"], backgroundColor : 'white', radius : 4, padding: base.size["size-5"] }}>
              <View style={{ paddingVertical: base.size['size-5'] }}>
                <Text>{base.i18n.t("choose_media_title")}</Text>
              </View>
              <View style={{ paddingVertical: base.size['size-5'] }}>
                <TouchableOpacity onPress={() => camera()}>
                  <Text>{base.i18n.t("choose_camera_label")}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ paddingVertical: base.size['size-5'] }}>
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
