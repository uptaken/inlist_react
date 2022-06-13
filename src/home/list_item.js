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

export default function HomeListItem(props){
  var base = new Base()

  return (
    <TouchableNativeFeedback
      useForeground
      background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
      onPress={() => props.on_press()}>
      <View style={{ paddingHorizontal: base.size.size_3, alignItems: 'center', width: base.size.large_image }}>
        <Image source={props.data.url_image} style={{ width: base.size.medium_image, height: base.size.large_image }}/>

        <View style={{ marginTop: base.size.size_1 }}>
          <Text style={{ fontSize: base.size.size_3 }}>{props.data.publisher}</Text>
          <Text style={{ fontSize: base.size.size_4, fontWeight: 'bold' }}>{props.data.title}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
