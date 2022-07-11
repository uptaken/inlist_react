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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';
import MemberCard from './member_card';

export default function ProfileHeader(props){
  var base = new Base()

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ backgroundColor: base.color.white }}>
        <View style={{ width: '100%', position: 'absolute', backgroundColor: base.color.primary, height: base.size.medium_image }}></View>

        <View style={{ padding: base.size.size_5, }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ }}>
              <Text style={{ color: base.color.white, fontSize: base.size.icon }}>{base.i18n.t("profile")}</Text>
            </View>
          </View>

          <View style={{ marginTop: base.size.size_5, }}>
            <MemberCard
              member={props.data.member}
              style={{ zIndex: 9, }}/>

            {/*
            <Image source={require("../../assets/register_success.png")} style={{ width: base.size.medium_image, height: base.size.medium_image, borderRadius: base.size.medium_image / 2, overflow: "hidden", }}/>

            <Text style={{ color: base.color.primary, fontSize: base.size.size_7, marginTop: base.size.size_1, }}>{props.data.Fullname}</Text>

            <Text style={{ color: base.color.black, fontSize: base.size.size_5, marginTop: base.size.size_1, }}>{base.i18n.t("member_no")}: {props.data.member != null ? props.data.member.MemberNo : '-'}</Text>
            */}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
