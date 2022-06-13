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
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';

export default function HomeHeader(props){
  var base = new Base()

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ padding: base.size.size_5, backgroundColor: base.color.primary }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <View style={{ }}>
            <Text style={{ color: base.color.white, fontSize: base.size.size_7 }}>{base.i18n.t("app_name")}</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View>
              <Icon name="cart" size={base.size.icon} color={base.color.white}/>
            </View>
            <View style={{ marginLeft: base.size.size_1 }}>
              <Icon name="bell" size={base.size.icon} color={base.color.white}/>
            </View>
          </View>
        </View>

        <View style={{ marginTop: base.size.size_3 }}>
          <CustomCard
            padding={base.size.size_1}
            color={base.color.white}
            on_press={() => {}}
            borderColor={base.color.white}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="magnify" size={base.size.icon} color={base.color.black1}/>
              <Text style={{ color: base.color.black1, marginLeft: base.size.size_1 }}>{base.i18n.t("search")}</Text>
            </View>
          </CustomCard>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
