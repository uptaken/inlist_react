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
import CheckBox from '@react-native-community/checkbox';
import Snackbar from '@prince8verma/react-native-snackbar'

import Base from '../../utils/base';
import CustomButton from '../../layout/custom_button';
import CustomCard from '../../layout/custom_card';
import CustomNavigation from '../../layout/custom_navigation';
import CustomInput from '../../layout/custom_input';
import Step from './step';

export default function Address({ route, navigation }){
  var base = new Base()
  const [address, set_address] = useState("")
  const [selected_province, set_selected_province] = useState({})
  const [selected_city, set_selected_city] = useState({})
  const [sub_district, set_sub_district] = useState("")
  const [village, set_village] = useState("")
  const [arr_province, set_arr_province] = useState([])
  const [arr_city, set_arr_city] = useState([])
  const [rt, set_rt] = useState("")
  const [rw, set_rw] = useState("")

  useEffect(() => {
    base.set_white_status_bar()
    get_province_data()
  }, [])

  useEffect(() => {
    get_city_data()
  }, [selected_province])

  async function get_province_data(){
    var response = await base.request(base.url_api + '/province')

    if(response.status === 'success'){
      for(let data of response.data.data){
        data.name = data.NamaPropinsi
      }
      set_arr_province(response.data.data)
    }
    else
      base.show_error(response.message)
  }

  async function get_city_data(){
    var response = await base.request(base.url_api + '/city?province_id=' + selected_province.ID)

    if(response.status === 'success'){
      for(let data of response.data.data){
        data.name = data.NamaKab
      }
      set_arr_city(response.data.data)
    }
    else
      base.show_error(response.message)
  }

  async function next(){
    if(address === '')
      base.show_error(base.i18n.t("address_empty"))
    else if(selected_city.ID == null)
      base.show_error(base.i18n.t("city_not_choosen"))
    else if(rt === '')
      base.show_error(base.i18n.t("rt_empty"))
    else if(rw === '')
      base.show_error(base.i18n.t("rw_empty"))
    else{
      var data = await AsyncStorage.getItem('register_data')
      data = JSON.parse(data)

      data.address = {
        address: address,
        city: selected_city,
        sub_district: sub_district,
        village: village,
        rt: rt,
        rw: rw,
      }
      await AsyncStorage.setItem('register_data', JSON.stringify(data))
      navigation.navigate('DetailAddress')
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
              <Step style={{ marginTop: base.size.size_5 }} num="3" title={base.i18n.t("address")}/>

              <CustomInput
                name={base.i18n.t("address")}
                on_change_text={value => set_address(value)}
                value={address}/>

              <CustomInput
                type="select"
                arr={arr_province}
                name={base.i18n.t("province")}
                on_selected={index => set_selected_province(arr_province[index])}
                value={selected_province}/>

              <CustomInput
                type="select"
                arr={arr_city}
                name={base.i18n.t("city")}
                on_selected={index => set_selected_city(arr_city[index])}
                value={selected_city}/>

              <CustomInput
                name={base.i18n.t("sub_district")}
                on_change_text={value => set_sub_district(value)}
                value={sub_district}/>

              <CustomInput
                name={base.i18n.t("village")}
                on_change_text={value => set_village(value)}
                value={village}/>

              <View style={{ flexDirection: 'row', }}>
                <CustomInput
                  type="number"
                  style={{ flex: 1, marginRight: base.size.size_1 }}
                  name={base.i18n.t("rt")}
                  on_change_text={value => set_rt(value)}
                  value={rt}/>

                <CustomInput
                  type="number"
                  style={{ flex: 1, marginLeft: base.size.size_1 }}
                  name={base.i18n.t("rw")}
                  on_change_text={value => set_rw(value)}
                  value={rw}/>
              </View>
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
