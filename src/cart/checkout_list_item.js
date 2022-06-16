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
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';
import CustomBadge from '../layout/custom_badge';
import CartRightAction from './cart_right_action';

export default function CheckoutListItem(props){
  var base = new Base()

  return (
    <View style={{ paddingVertical: base.size.size_3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: base.color.white, }}>
      <View style={{ flexDirection: 'row', }}>
        <Image source={props.data.product.url_image} style={{ width: base.size.small_image, height: base.size.medium_image }}/>

        <View style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginLeft: base.size.size_3 }}>
          <View style={{  }}>
            <Text style={{ fontSize: base.size.size_4, fontWeight: 'bold' }}>{props.data.product.Title}</Text>
            <Text style={{ fontSize: base.size.size_3 }}>{props.data.product.Author}</Text>
            <Text style={{ fontSize: base.size.size_3 }}>{props.data.product.Publisher} | {props.data.product.PublishYear}</Text>
          </View>

          <View>
            <Text style={{ fontSize: base.size.size_3 }}>{props.data.amount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
