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
  Image,
  TouchableOpacity,
} from 'react-native';

import Base from '../../utils/base';
import CustomButton from '../../layout/custom_button';
import CustomCard from '../../layout/custom_card';
import CustomNavigation from '../../layout/custom_navigation';
import MemberCard from '../../profile/member_card';
import Step from './step';

export default function RegisterSuccess({ route, navigation }){
  var base = new Base()

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, justifyContent: "space-between", padding: base.size.size_5, }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require("../../../assets/register_success.png")} style={{ width: base.size.large_image, height: base.size.large_image }}/>

          <Text style={{ fontSize: base.size.title, textAlign: 'center', marginTop: base.size.size_1, }}>{base.i18n.t("registration_success")}</Text>

          <Text style={{ fontSize: base.size.size_5, textAlign: 'center', marginTop: base.size.size_1, }}>{base.i18n.t("registration_success_detail")}</Text>

          <MemberCard
            member={route.params.member}/>
        </View>

        <View>
          <CustomButton title={base.i18n.t("start_surf")}
            color={base.color.primary}
            textColor={base.color.white}
            on_press={() => navigation.navigate('Login')} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
