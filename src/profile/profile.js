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
  BackHandler,
  RefreshControl,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Snackbar from '@prince8verma/react-native-snackbar'
import moment from 'moment'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import ProfileHeader from './header';

export default function Profile({ route, navigation }){
  var base = new Base()
  const [data, set_data] = useState({
    name: 'asdsad',
  })
  const [version, set_version] = useState('1.0')
  const [is_loading, set_is_loading] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action and update data
      setup_backhandler()
      get_data()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [])

  function setup_backhandler(){
    BackHandler.addEventListener('hardwareBackPress', function () {
      navigation.navigate('HomeTab')
      return true
    })
  }

  async function get_data(){
    var response = await base.request(base.url_api + '/auth/profile')

    set_is_loading(false)
    if(response.status === 'success'){
      response.data.member.RegisterDateFormat = moment(response.data.member.RegisterDate, 'YYYY-MM-DD HH:mm:ss')
      if(response.data.member.PhotoUrl != null)
        response.data.member.image_profile = {
          uri: base.host + '/image/user?file_name=' + response.data.member.PhotoUrl + '&rnd=' + moment().format('X'),
        }
      set_data(response.data)
    }
    else
      base.show_error(response.message)
  }

  async function logout(){
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('arr_cart')
    navigation.navigate('Login')
  }

  function onRefresh(){
    set_is_loading(true)
    get_data()
  }

  return (
    <View style={{ flex: 1 }}>
      <Snackbar id="root_app"/>

      <View style={{ flex: 1, backgroundColor: base.color.white, }}>
        <ScrollView>
          <ProfileHeader data={data}/>

        
          <View style={{ backgroundColor: base.color.grey4 }}>
            <View style={{ marginTop: base.size.size_3, backgroundColor: base.color.white }}>
              <TouchableNativeFeedback
                useForeground
                background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
                onPress={() => {
                  navigation.navigate('ChangeProfile', {data: data})
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
    </View>
  );
}
