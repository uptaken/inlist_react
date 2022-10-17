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
import CustomHeader from '../layout/custom_header';

export default function SearchHeader(props){
  var base = new Base()

  return (
    <View style={{ padding: base.size.size_5, backgroundColor: base.color.primary }}>
      <CustomHeader
        backgroundColor={true}/>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: base.size.size_3, }}>
        <View style={{ }}>
          <Text style={{ color: base.color.white, fontSize: base.size.icon }}>{base.i18n.t("search")}</Text>
        </View>
      </View>

      <View style={{ marginTop: base.size.size_3 }}>
        <CustomCard
          padding={0}
          paddingHorizontal={base.size.size_3}
          color={base.color.white}
          borderColor={base.color.white}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="magnify" size={base.size.icon} color={base.color.black1}/>

            <TextInput style={{ color: base.color.black1, marginLeft: base.size.size_1, flex: 1, height: base.size.large_title, }}
              onChangeText={value => props.on_search(value)}
              value={props.search}
              placeholder={base.i18n.t("search")}/>
          </View>
        </CustomCard>
      </View>
    </View>
  );
}
