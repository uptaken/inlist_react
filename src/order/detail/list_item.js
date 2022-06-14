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

import Base from '../../utils/base';
import CustomButton from '../../layout/custom_button';
import CustomCard from '../../layout/custom_card';
import CustomInput from '../../layout/custom_input';
import CustomBadge from '../../layout/custom_badge';

export default function OrderDetailItem(props){
  var base = new Base()

  return (
    <View style={{ paddingHorizontal: base.size.size_5, paddingVertical: base.size.size_3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
      <View style={{ flexDirection: 'row', }}>
        <Image source={props.data.url_image} style={{ width: base.size.title, height: base.size.toolbar }}/>

        <View style={{ marginLeft: base.size.size_1 }}>
          <Text style={{ fontSize: base.size.size_4, fontWeight: 'bold' }}>{props.data.title}</Text>
          <Text style={{ fontSize: base.size.size_3 }}>{props.data.publisher}</Text>
        </View>
      </View>
    </View>
  );
}
