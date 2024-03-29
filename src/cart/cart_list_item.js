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
import moment from 'moment';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';
import CustomBadge from '../layout/custom_badge';
import CartRightAction from './cart_right_action';

export default function CartListItem(props){
  var base = new Base()

  return (
    <Swipeable
      renderRightActions={(progress, dragX) => <CartRightAction on_remove={() => props.on_remove()}/>}
      rightOpenValue={base.size.toolbar * -1}
      onSwipeableOpen={() => props.on_swiped()}
      ref={(ref) => props.on_set_ref(ref)}>
      <View style={{ paddingHorizontal: base.size.size_5, paddingVertical: base.size.size_3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: base.color.white, }}>
        <View style={{ flexDirection: 'row', }}>
          <Image source={props.data.product.CoverURL == null ? base.no_book_image : props.data.product.CoverURL} 
            style={{ width: base.size.small_image, height: base.size.medium_image }}/>

          <View style={{ justifyContent: 'space-between', alignItems: 'flex-start', marginLeft: base.size.size_3, flexShrink: 1 }}>
            <View style={{  }}>
              <Text style={{ fontSize: base.size.size_4, fontWeight: 'bold',  }} numberOfLines={2}>{props.data.product.Title}</Text>
              <Text style={{ fontSize: base.size.size_3 }}>{props.data.product.Author}</Text>
              <Text style={{ fontSize: base.size.size_3 }}>{props.data.product.Publisher} | {props.data.product.PublishYear}</Text>
            </View>

            <View>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
}
