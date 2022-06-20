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
  TouchableNativeFeedback,
  Keyboard,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import ProfileHeader from './header';

export default function Profile({ route, navigation }){
  var base = new Base()
  const [data, set_data] = useState({
    name: 'asdsad'
  })
  const [version, set_version] = useState('1.0')

  useEffect(() => {
    get_data()
    DeviceEventEmitter.addListener("profile.refresh_data", () => get_data())
  }, [])

  async function get_data(){
    var response = await base.request(base.url_api + '/auth/profile')

    if(response.status === 'success'){
      set_data(response.data)
    }
    else
      base.show_error(response.message)
  }

  async function logout(){
    await AsyncStorage.removeItem('token')
    navigation.navigate('Login')
  }

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>

      <View style={{ flex: 1, }}>
        <ProfileHeader data={data}/>

        <ScrollView>
          <View style={{ backgroundColor: base.color.grey4 }}>
            <View style={{ marginTop: base.size.size_3, backgroundColor: base.color.white }}>
              <TouchableNativeFeedback
                useForeground
                background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
                onPress={() => {
                  BackHandler.addEventListener('hardwareBackPress', function () {
                    navigation.goBack()
                  })
                  navigation.navigate('ChangeProfile', {data: data,})
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: base.size.size_5, paddingVertical: base.size.size_3, }}>
                  <Text>{base.i18n.t("change_profile")}</Text>
                  <Icon name="chevron-right" size={base.size.icon} color={base.color.black}/>
                </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback
                useForeground
                background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
                onPress={() => {
                  BackHandler.addEventListener('hardwareBackPress', function () {
                    navigation.goBack()
                  })
                  navigation.navigate('ChangePassword')
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: base.size.size_5, paddingVertical: base.size.size_3, }}>
                  <Text>{base.i18n.t("change_password")}</Text>
                  <Icon name="chevron-right" size={base.size.icon} color={base.color.black}/>
                </View>
              </TouchableNativeFeedback>
            </View>

            <View style={{ marginTop: base.size.size_3, backgroundColor: base.color.white }}>
              <TouchableNativeFeedback
                useForeground
                background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
                onPress={() => logout()}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: base.size.size_5, paddingVertical: base.size.size_3, }}>
                  <Text style={{ color: base.color.red }}>{base.i18n.t("logout")}</Text>
                </View>
              </TouchableNativeFeedback>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: base.size.size_5, paddingVertical: base.size.size_3, }}>
                <Text>{base.i18n.t("app_version")}</Text>
                <Text>{version}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
