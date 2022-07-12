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
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from '@prince8verma/react-native-snackbar'

import Base from '../utils/base';
import PleaseWaitModal from "../layout/modal/please_wait_modal"
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';

export default function Login({ route, navigation }){
  const [email, set_email] = useState("")
  const [password, set_password] = useState("")
  const [is_please_wait, set_is_please_wait] = useState(false)
  var base = new Base()

  useEffect(() => {
    base.set_white_status_bar()

    const unsubscribe = navigation.addListener('focus', () => {
      const back_handler = BackHandler.addEventListener('hardwareBackPress', function () {
        BackHandler.exitApp()
      })
    });

    return unsubscribe;
  }, [])

  async function submit(){
    if(email === '')
      base.show_error(base.i18n.t("email_empty"))
    else if(password === '')
      base.show_error(base.i18n.t("password_empty"))
    else if(!base.validate_email(email))
      base.show_error(base.i18n.t("not_email_format"))
    else{
      set_is_please_wait(true)
      var response = await base.request(base.url_api + '/auth/login', 'post', {
        email: email,
        password: password,
      })

      set_is_please_wait(false)
      setTimeout(async () => {
        if(response.status === 'success'){
          set_email('')
          set_password('')

          base.set_primary_status_bar()
          await AsyncStorage.setItem('token', response.token)
          navigation.navigate('Home')
        }
        else
          base.show_error(response.message)
      }, 100)
    }
  }

  function on_register(){
    set_email('')
    set_password('')
    navigation.navigate('Register')
  }

  return (
    <View style={{ flex: 1 }}>
      <Snackbar id="root_app"/>
      <PleaseWaitModal is_show={is_please_wait}/>
      <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, justifyContent: "space-between", padding: base.size.size_5, marginTop: base.size.large_title }}>
          <View>
            <Text style={{ fontSize: base.size.icon, fontWeight: "bold" }}>{base.i18n.t("login")}</Text>

            <CustomInput
              type="email"
              name={base.i18n.t("email")}
              on_change_text={value => set_email(value)}
              value={email}/>

            <CustomInput
              type="password"
              name={base.i18n.t("password")}
              on_change_text={value => set_password(value)}
              value={password}/>

            <TouchableOpacity style={{ marginTop: base.size.size_5 }} onPress={() => navigation.navigate("ForgetPassword")}>
              <Text style={{ fontSize: base.size.size_5, color: base.color.primary }}>{base.i18n.t("forget_password")}</Text>
            </TouchableOpacity>
          </View>

          <View>
            <CustomButton title={base.i18n.t("login")}
              color={base.color.primary}
              textColor={base.color.white}
              on_press={() => submit()} />

            <CustomButton title={base.i18n.t("register")}
              color={base.color.white}
              textColor={base.color.primary}
              borderColor={base.color.primary}
              style={{ marginTop: base.size.size_3 }}
              on_press={() => on_register()} />
          </View>
        </View>
      </TouchableWithoutFeedback>

    </View>
  );
}
