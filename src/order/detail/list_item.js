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
    <View style={{ paddingVertical: base.size.size_3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
      <View style={{ flexDirection: 'row', }}>
        <Image source={props.data.collection.product.CoverURL} style={{ width: base.size.toolbar, height: base.size.small_image }}/>

        <View style={{ marginLeft: base.size.size_3, flexShrink: 1, }}>
          <Text style={{ fontSize: base.size.size_4, fontWeight: 'bold' }}>{props.data.collection.product.Title}</Text>
          <Text style={{ fontSize: base.size.size_3 }}>{props.data.collection.product.Author}</Text>
        </View>
      </View>
    </View>
  );
}
