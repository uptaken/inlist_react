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
  Image,
  DeviceEventEmitter,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Base from '../utils/base';
import PleaseWaitModal from "../layout/modal/please_wait_modal"
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import CustomNavigation from '../layout/custom_navigation';
import MediaPickerModal from '../layout/modal/media_picker_modal';
import ProfileHeader from './header';

export default function ChangeProfile({ route, navigation }){
  var base = new Base()
  const [data, set_data] = useState({})
  const [name, set_name] = useState('')
  const [email, set_email] = useState('')
  const [username, set_username] = useState('')
  const [division, set_division] = useState('')
  const [image, set_image] = useState(require("../../assets/register_success.png"))
  const [media_picker_show, set_media_picker_show] = useState(false)
  const [is_please_wait, set_is_please_wait] = useState(false)

  useEffect(() => {
    set_name(route.params.data.Fullname)
    set_email(route.params.data.EmailAddress)
    set_username(route.params.data.username)
    set_division(route.params.data.Fullname)
  }, [])

  async function submit(){
    if(name === '')
      base.show_error(base.i18n.t("name_empty"))
    else{
      set_is_please_wait(true)
      var response = await base.request(base.url_api + '/auth/change-profile', 'put', {
        name: name,
      })

      set_is_please_wait(false)
      setTimeout(async () => {
        if(response.status === 'success'){
          DeviceEventEmitter.emit("profile.refresh_data", {});
          navigation.goBack()
        }
        else
          base.show_error(response.message)
      }, 100)

    }
  }

  function on_get_response(response){
    set_image(response)
  }

  return (
    <View style={{ flex: 1 }}>
      <PleaseWaitModal is_show={is_please_wait}/>
      <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, }}>
          <MediaPickerModal is_show={media_picker_show}
            on_change_show={(is_show) => set_media_picker_show(is_show)}
            on_get_response={response => on_get_response(response)}/>

          <CustomNavigation
            style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5, backgroundColor: base.color.primary }}
            title={base.i18n.t("change_profile")}
            text_color={base.color.white}
            navigation={navigation}/>

          <ScrollView>
            <View style={{ padding: base.size.size_5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <View>
                  <Image source={image} style={{ width: base.size.medium_image, height: base.size.medium_image, borderRadius: base.size.medium_image / 2, overflow: "hidden", }}/>
                </View>

                <CustomButton
                  style={{ alignSelf: 'center', }}
                  title={base.i18n.t("change_photo")}
                  color={base.color.primary}
                  textColor={base.color.white}
                  on_press={() => set_media_picker_show(true)} />
              </View>

              <CustomInput
                name={base.i18n.t("name")}
                on_change_text={value => set_name(value)}
                value={name}/>

              <CustomInput
                name={base.i18n.t("email")}
                enabled={false}
                on_change_text={value => set_email(value)}
                value={email}/>

              <CustomInput
                name={base.i18n.t("username")}
                enabled={false}
                on_change_text={value => set_username(value)}
                value={username}/>

              <CustomInput
                name={base.i18n.t("division")}
                enabled={false}
                on_change_text={value => set_division(value)}
                value={division}/>
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
