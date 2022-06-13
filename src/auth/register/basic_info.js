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


import Base from '../../utils/base';
import CustomButton from '../../layout/custom_button';
import CustomCard from '../../layout/custom_card';
import CustomNavigation from '../../layout/custom_navigation';
import CustomInput from '../../layout/custom_input';
import Step from './step';

export default function BasicInfo({ route, navigation }){
  var base = new Base()
  const [full_name, set_full_name] = useState("")
  const [email, set_email] = useState("")
  const [password, set_password] = useState("")
  const [id_no, set_id_no] = useState("")
  const [selected_id_type, set_selected_id_type] = useState({})
  const [arr_id_type, set_arr_id_type] = useState([
    {
      id: 'ktp',
      name: base.i18n.t("ktp"),
    },
    {
      id: 'sim',
      name: base.i18n.t("sim"),
    },
  ])

  function next(){
    if(selected_id_type.id == null)
      base.show_error(base.i18n.t("id_type_not_choosen"))
    else if(full_name === '')
      base.show_error(base.i18n.t("full_name_empty"))
    else if(password === '')
      base.show_error(base.i18n.t("password_empty"))
    else if(id_no === '')
      base.show_error(base.i18n.t("id_no_empty"))
    else{
      navigation.navigate('AddressLiving')
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
            <Step style={{ marginTop: base.size.size_5 }} num="1" title={base.i18n.t("basic_info")}/>

            <CustomInput
              name={base.i18n.t("full_name")}
              on_change_text={value => set_full_name(value)}
              value={full_name}/>

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

            <CustomInput
              type="select"
              arr={arr_id_type}
              name={base.i18n.t("id_type")}
              on_selected={index => set_selected_id_type(arr_id_type[index])}
              value={selected_id_type}/>

            <CustomInput
              type="number"
              name={base.i18n.t("id_no")}
              on_change_text={value => set_id_no(value)}
              value={id_no}/>
          </View>
        </ScrollView>

        <View style={{ marginTop: base.size.size_3, marginHorizontal: base.size.size_5, marginBottom: base.size.size_5 }}>
          <CustomButton title={base.i18n.t("next")}
            color={base.color.primary}
            textColor={base.color.white}
            on_press={() => next()} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}