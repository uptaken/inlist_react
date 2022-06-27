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
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  DeviceEventEmitter,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Snackbar from '@prince8verma/react-native-snackbar'

import Base from '../utils/base';
import PleaseWaitModal from "../layout/modal/please_wait_modal"
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import CustomNavigation from '../layout/custom_navigation';
import ProfileHeader from './header';

export default function ChangePassword({ route, navigation }){
  var base = new Base()
  const [old_password, set_old_password] = useState('')
  const [new_password, set_new_password] = useState('')
  const [confirm_password, set_confirm_password] = useState('')
  const [is_please_wait, set_is_please_wait] = useState(false)

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', function () {
      navigation.goBack()
      return true
    })
  }, [])

  async function submit(){
    if(old_password === '')
      base.show_error(base.i18n.t("old_password_empty"))
    else if(new_password === '')
      base.show_error(base.i18n.t("new_password_empty"))
    else if(confirm_password === '')
      base.show_error(base.i18n.t("confirm_password_empty"))
    else if(confirm_password !== new_password)
      base.show_error(base.i18n.t("confirm_password_not_same_new_password"))
    else{
      set_is_please_wait(true)
      var response = await base.request(base.url_api + '/auth/change-password', 'put', {
        old_password: old_password,
        new_password: new_password,
      })

      set_is_please_wait(false)
      setTimeout(async () => {
        if(response.status === 'success'){
          navigation.goBack()
        }
        else
          base.show_error(response.message)
      }, 100)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Snackbar id="root_app"/>
      <PleaseWaitModal is_show={is_please_wait}/>
      <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>

        <View style={{ flex: 1, }}>
          <CustomNavigation
            style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5, backgroundColor: base.color.primary }}
            title={base.i18n.t("change_password")}
            text_color={base.color.white}
            navigation={navigation}/>

          <ScrollView>
            <View style={{ padding: base.size.size_5 }}>
              <CustomInput
                type="password"
                name={base.i18n.t("old_password")}
                on_change_text={value => set_old_password(value)}
                value={old_password}/>

              <CustomInput
                type="password"
                name={base.i18n.t("new_password")}
                on_change_text={value => set_new_password(value)}
                value={new_password}/>

              <CustomInput
                type="password"
                name={base.i18n.t("confirm_password")}
                on_change_text={value => set_confirm_password(value)}
                value={confirm_password}/>
            </View>
          </ScrollView>

          <View style={{ padding: base.size.size_5 }}>
            <CustomButton title={base.i18n.t("submit")}
              color={base.color.primary}
              textColor={base.color.white}
              on_press={() => submit()} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
