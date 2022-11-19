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
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';
import CustomBadge from '../layout/custom_badge';

export default function OrderDetailListItem(props){
  var base = new Base()

  return (
    <TouchableNativeFeedback
      useForeground
      onPress={() => props.on_detail_click()}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: base.size.size_3, borderBottomColor: base.color.grey8, borderBottomWidth: !props.is_last ? base.size.border : 0, }}>
        <View style={{ flexDirection: 'row', flexShrink: 1, }}>
          <Image source={props.data.collection.product.CoverURL} style={{ width: base.size.toolbar, height: base.size.small_image }}/>

          <View style={{ marginLeft: base.size.size_3, flexShrink: 1, }}>
            <Text style={{ fontSize: base.size.size_4, fontWeight: 'bold' }}>{props.data.collection.product.Title}</Text>
          </View>
        </View>

        <CustomBadge
          no_press={true}
          text={props.data.LoanStatus}
          is_translate={true}
          style_template={props.data.LoanStatus === 'Canceled' ? 'danger' : 'primary'}/>
      </View>
    </TouchableNativeFeedback>
  );
}
