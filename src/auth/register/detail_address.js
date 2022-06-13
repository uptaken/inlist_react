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
import CheckBox from '@react-native-community/checkbox';

import Base from '../../utils/base';
import CustomButton from '../../layout/custom_button';
import CustomCard from '../../layout/custom_card';
import CustomNavigation from '../../layout/custom_navigation';
import CustomInput from '../../layout/custom_input';
import Step from './step';

export default function DetailAddress({ route, navigation }){
  var base = new Base()
  const [home_phone, set_home_phone] = useState("")
  const [phone, set_phone] = useState("")
  const [name_inst, set_name_inst] = useState("")
  const [address_inst, set_address_inst] = useState("")
  const [phone_inst, set_phone_inst] = useState("")
  const [toggle_condition, set_toggle_condition] = useState(false)

  function submit(){
    if(!toggle_condition)
      base.show_error(base.i18n.t("please_check_condition"))
    else if(home_phone === '')
      base.show_error(base.i18n.t("home_phone_empty"))
    else if(phone === '')
      base.show_error(base.i18n.t("phone_empty"))
    else if(name_inst === '')
      base.show_error(base.i18n.t("name_institute_empty"))
    else if(address_inst === '')
      base.show_error(base.i18n.t("address_institute_empty"))
    else if(phone_inst === '')
      base.show_error(base.i18n.t("phone_institute_empty"))
    else{
      navigation.navigate('RegisterSuccess')
    }
  }

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, marginTop: base.size.size_5, }}>
        <CustomNavigation
          style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5 }}
          title={base.i18n.t("register")}
          navigation={navigation}/>

        <ScrollView>
          <View style={{ paddingHorizontal: base.size.size_5 }}>
            <Step style={{ marginTop: base.size.size_5 }} num={route.params != null ? route.params.num_step : '4'} title={base.i18n.t("detail_address")}/>

            <CustomInput
              type="phone"
              name={base.i18n.t("home_phone")}
              on_change_text={value => set_home_phone(value)}
              value={home_phone}/>

            <CustomInput
              type="phone"
              name={base.i18n.t("phone")}
              on_change_text={value => set_phone(value)}
              value={phone}/>

            <CustomInput
              name={base.i18n.t("name_institute")}
              on_change_text={value => set_name_inst(value)}
              value={name_inst}/>

            <CustomInput
              name={base.i18n.t("address_institute")}
              on_change_text={value => set_address_inst(value)}
              value={address_inst}/>

            <CustomInput
              type="phone"
              name={base.i18n.t("phone_institute")}
              on_change_text={value => set_phone_inst(value)}
              value={phone_inst}/>

            <View style={{ marginVertical: base.size.size_5, flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                disabled={false}
                value={toggle_condition}
                onValueChange={(newValue) => set_toggle_condition(newValue)}/>

              <Text style={{ fontSize: base.size.size_5 }}>{base.i18n.t("data_correct")}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={{ marginTop: base.size.size_3, marginHorizontal: base.size.size_5, marginBottom: base.size.size_5 }}>
          <CustomButton title={base.i18n.t("next")}
            color={base.color.primary}
            textColor={base.color.white}
            on_press={() => submit()} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
