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

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>

      <View style={{ flex: 1, }}>
        <ProfileHeader data={data}/>

        <ScrollView>
          <View style={{ backgroundColor: base.color.grey4 }}>
            <View style={{ marginTop: base.size.size_3, backgroundColor: base.color.white }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: base.size.size_5, paddingVertical: base.size.size_3, }}>
                <Text>{base.i18n.t("change_profile")}</Text>
                <Icon name="chevron-right" size={base.size.icon} color={base.color.black}/>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: base.size.size_5, paddingVertical: base.size.size_3, }}>
                <Text>{base.i18n.t("change_password")}</Text>
                <Icon name="chevron-right" size={base.size.icon} color={base.color.black}/>
              </View>
            </View>

            <View style={{ marginTop: base.size.size_3, backgroundColor: base.color.white }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: base.size.size_5, paddingVertical: base.size.size_3, }}>
                <Text>{base.i18n.t("logout")}</Text>
              </View>

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
