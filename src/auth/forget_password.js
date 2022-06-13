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

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import CustomNavigation from '../layout/custom_navigation';

export default function ForgetPassword({ route, navigation }){
  const [email, set_email] = useState("")
  var base = new Base()

  function submit(){
    if(email === '')
      base.show_error(base.i18n.t("email_empty"))
    else{
      navigation.goBack()
    }
  }

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, justifyContent: "space-between", padding: base.size.size_5,  }}>
        <View style={{ marginTop: base.size.size_5, }}>
          <CustomNavigation title={base.i18n.t("forget_password")}
            navigation={navigation}/>

          <CustomInput
            name={base.i18n.t("email")}
            on_change_text={value => set_email(value)}
            value={email}/>
        </View>

        <View>
          <CustomButton title={base.i18n.t("submit")}
            color={base.color.primary}
            textColor={base.color.white}
            on_press={() => submit()} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
