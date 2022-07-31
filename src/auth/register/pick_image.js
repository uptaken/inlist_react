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
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from '@prince8verma/react-native-snackbar'
import moment from 'moment';

import Base from '../../utils/base';
import PleaseWaitModal from "../../layout/modal/please_wait_modal"
import CustomButton from '../../layout/custom_button';
import CustomCard from '../../layout/custom_card';
import CustomNavigation from '../../layout/custom_navigation';
import CustomInput from '../../layout/custom_input';
import Step from './step';

export default function PickImage({ route, navigation }){
  var base = new Base()
  const [image_profile, set_image_profile] = useState(require("../../../assets/no_profile_picture.png"))
  const [is_please_wait, set_is_please_wait] = useState(false)

  useEffect(() => {
    base.set_white_status_bar()
  }, [])

  async function next(){
    var data = await AsyncStorage.getItem('register_data')
    data = JSON.parse(data)
    if(image_profile.data != null)
      data.image = {
        original_rotation: image_profile.fromType === "camera" ? -90 : 0,
        image: image_profile.data,
      }
      
    set_is_please_wait(true)
    var response = await base.request(base.url_api + '/auth/register', 'post', data)

    set_is_please_wait(false)
    setTimeout(async () => {
      if(response.status === 'success'){
        response.data.RegisterDateFormat = moment(response.data.RegisterDateFormat, 'YYYY-MM-DD HH:mm:ss')
        response.data.image_profile = {
          uri: image_profile.uri
        }
        console.log(response.data)
        await AsyncStorage.removeItem('register_data')
        navigation.navigate('RegisterSuccess', {member: response.data,})
      }
      else
        base.show_error(response.message)
    }, 100)
  }

  return (
    <View style={{ flex: 1, }}>
      <Snackbar id="root_app"/>
      <PleaseWaitModal is_show={is_please_wait}/>
      {/* <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}> */}
        <View style={{ flex: 1, marginTop: base.size.large_title, }}>
          <CustomNavigation
            style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5 }}
            title={base.i18n.t("register")}
            navigation={navigation}
            padding={base.size.size_5}/>

          <ScrollView>
            <View style={{ paddingHorizontal: base.size.size_5 }}>
              <Step style={{ marginTop: base.size.size_5 }} num={route.params != null ? route.params.num_step : '5'} title={base.i18n.t("image_profile")}/>

              <CustomInput
                type="file"
                name={base.i18n.t("image_profile")}
                on_get_response={response => set_image_profile(response)}
                value={image_profile}/>
            </View>
          </ScrollView>

          <View style={{ marginTop: base.size.size_3, marginHorizontal: base.size.size_5, marginBottom: base.size.size_5 }}>
            <CustomButton title={base.i18n.t("next")}
              color={base.color.primary}
              textColor={base.color.white}
              on_press={() => next()} />
          </View>
        </View>
      {/* </TouchableWithoutFeedback> */}
    </View>
  );
}
