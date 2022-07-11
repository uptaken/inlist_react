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
  BackHandler,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Snackbar from '@prince8verma/react-native-snackbar'

import Base from '../utils/base';
import PleaseWaitModal from "../layout/modal/please_wait_modal"
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import CustomNavigation from '../layout/custom_navigation';

export default function ForgetPassword({ route, navigation }){
  var base = new Base()
  const [email, set_email] = useState("")
  const [is_please_wait, set_is_please_wait] = useState(false)

  useEffect(() => {
    base.set_white_status_bar()
    const unsubscribe = navigation.addListener('focus', () => {
      const back_handler = BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.goBack()
        return true
      })
    });

    return unsubscribe;
  }, [])

  async function submit(){
    if(email === '')
      base.show_error(base.i18n.t("email_empty"))
    else{
      set_is_please_wait(true)
      var response = await base.request(base.url_api + '/auth/forget-password', 'post', {
        email: email,
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
        <View style={{ flex: 1, justifyContent: "space-between", }}>
          <View style={{ marginTop: base.size.large_title, }}>
            <CustomNavigation title={base.i18n.t("forget_password")}
              navigation={navigation}
              padding={base.size.size_5}/>

            <View style={{ padding: base.size.size_5, }}>
              <CustomInput
                name={base.i18n.t("email")}
                on_change_text={value => set_email(value)}
                value={email}/>
            </View>
          </View>

          <View style={{ padding: base.size.size_5, }}>
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
