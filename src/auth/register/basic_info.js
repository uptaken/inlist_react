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
  const [selected_gender, set_selected_gender] = useState({})
  const [selected_occupation, set_selected_occupation] = useState({})
  const [selected_id_type, set_selected_id_type] = useState({})
  const [selected_member_type, set_selected_member_type] = useState({})
  const [image_profile, set_image_profile] = useState(require("../../../assets/no_profile_picture.png"))
  const [arr_id_type, set_arr_id_type] = useState([
    {
      id: 'ktp',
      name: base.i18n.t("ktp"),
    },
  ])
  const [arr_gender, set_arr_gender] = useState([
    {
      id: '1',
      name: base.i18n.t("male"),
    },
    {
      id: '2',
      name: base.i18n.t("female"),
    },
  ])
  const [arr_occupation, set_arr_occupation] = useState([])
  const [arr_member_type, set_arr_member_type] = useState([])

  useEffect(() => {
    base.set_white_status_bar()
    get_occupation_data()
    get_member_type_data()
  }, [])

  async function get_occupation_data(){
    var response = await base.request(base.url_api + '/occupation')

    if(response.status === 'success'){
      for(let data of response.data.data){
        data.name = data.Pekerjaan
      }
      set_arr_occupation(response.data.data)
    }
    else
      base.show_error(response.message)
  }

  async function get_member_type_data(){
    var response = await base.request(base.url_api + '/member-type')

    if(response.status === 'success'){
      for(let data of response.data.data){
        data.name = data.jenisanggota
      }
      set_arr_member_type(response.data.data)
    }
    else
      base.show_error(response.message)
  }

  async function next(){
    if(selected_id_type.id == null)
      base.show_error(base.i18n.t("id_type_not_choosen"))
    else if(selected_member_type.id == null)
      base.show_error(base.i18n.t("member_type_not_choosen"))
    else if(full_name === '')
      base.show_error(base.i18n.t("full_name_empty"))
    else if(email === '')
      base.show_error(base.i18n.t("email_empty"))
    else if(password === '')
      base.show_error(base.i18n.t("password_empty"))
    else if(id_no === '')
      base.show_error(base.i18n.t("id_no_empty"))
    else if(!base.validate_email(email))
      base.show_error(base.i18n.t("not_email_format"))
    else{
      var data = {
        id_type: selected_id_type,
        full_name: full_name,
        password: password,
        email: email,
        id_no: id_no,
        gender: selected_gender,
        // occupation: selected_occupation,
        member_type: selected_member_type,
        image: {},
      }
      // if(image_profile.data != null)
      //   data.image = {
      //     original_rotation: image_profile.fromType === "camera" ? -90 : 0,
      //     image: image_profile.data,
      //   }
      await AsyncStorage.setItem('register_data', JSON.stringify(data))
      navigation.navigate('AddressLiving')
    }
  }

  return (
    <View style={{ flex: 1, }}>
      <Snackbar id="root_app"/>
      {/* <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}> */}
        <View style={{ flex: 1, marginTop: base.size.large_title, }}>
          <CustomNavigation
            style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5 }}
            title={base.i18n.t("register")}
            navigation={navigation}
            padding={base.size.size_5}/>

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

              <CustomInput
                type="select"
                arr={arr_gender}
                name={base.i18n.t("gender")}
                on_selected={index => set_selected_gender(arr_gender[index])}
                value={selected_gender}/>

              {/* <CustomInput
                type="select"
                arr={arr_occupation}
                name={base.i18n.t("occupation")}
                on_selected={index => set_selected_occupation(arr_occupation[index])}
                value={selected_occupation}/> */}

              <CustomInput
                type="select"
                arr={arr_member_type}
                name={base.i18n.t("member_type")}
                on_selected={index => set_selected_member_type(arr_member_type[index])}
                value={selected_member_type}/>

              {/* <CustomInput
                type="file"
                name={base.i18n.t("image_profile")}
                on_get_response={response => set_image_profile(response)}
                value={image_profile}/> */}
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
