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

export default function SearchListItem(props){
  var base = new Base()

  return (
    <TouchableNativeFeedback
      useForeground
      background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
      onPress={() => props.on_press()}>
      <View style={{ paddingHorizontal: base.size.size_5, paddingVertical: base.size.size_3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
        <View style={{ flexDirection: 'row', }}>
          <Image source={props.data.CoverURL} style={{ width: base.size.toolbar, height: base.size.medium_image }}/>

          <View style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginLeft: base.size.size_3, flexShrink: 1 }}>
            <View style={{ flexShrink: 1, }}>
              <Text style={{ fontSize: base.size.size_4, fontWeight: 'bold', flexShrink: 1 }} numberOfLines={1}>{props.data.Title}</Text>
              <Text style={{ fontSize: base.size.size_3 }}>{props.data.Author}</Text>
              <Text style={{ fontSize: base.size.size_3 }}>{props.data.Publisher} | {props.data.PublishYear}</Text>
            </View>

            {
              props.data.status != null &&
              <CustomBadge
                text={props.data.status}
                on_press={() => {}}
                is_translate={true}
                style_template={props.data.status === 'available' ? 'primary' : 'danger'}/>
            }
          </View>
        </View>


      </View>
    </TouchableNativeFeedback>
  );
}
