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
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';

export default function MemberCard(props){
  var base = new Base()

  return (
    <View style={[props.style, {  }]}>
      <CustomCard
        padding={0}
        paddingHorizontal={0}>
        <ImageBackground source={require("../../assets/member_card_bg.png")} resizeMode="cover" style={{ width: '100%' }}>
          <View style={{ padding: base.size.size_7 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View >
                <Text style={{ fontSize: base.size.icon, color: base.color.white, fontWeight: 'bold', }}>{props.member != null ? props.member.Fullname : '-'}</Text>
                <Text style={{ fontSize: base.size.size_5, color: base.color.white2 }}>{props.member != null ? props.member.MemberNo : '-'}</Text>
              </View>

              <Image source={props.member != null && props.member.image_profile != null ? props.member.image_profile : require("../../assets/no_profile_picture.png")} style={{ height: base.size.small_image1, width: base.size.small_image }}/>
            </View>

            <View style={{ marginTop: base.size.size_7, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: base.size.size_3, color: base.color.white2 }}>{base.i18n.t("joined_since")} {props.member != null ? props.member.RegisterDateFormat.format('DD/MM/YYYY') : '-'}</Text>
            </View>
          </View>
        </ImageBackground>
      </CustomCard>
    </View>
  );
}
