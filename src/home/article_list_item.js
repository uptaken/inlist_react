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
import moment from 'moment';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';

export default function ArticleListItem(props){
  var base = new Base()

  useEffect(() => {
    // console.log(props.data.CoverURL)
  }, [props.data])

  return (
    <TouchableNativeFeedback
      useForeground
      background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
      onPress={() => props.on_press()}>
      <View style={{ alignItems: 'flex-start', padding: base.size.size_1, width: base.size.custom_image1 }}>
        <Image source={props.data.image == null || props.data.image === "" ? require('../../assets/no_image_book.png') : {uri: base.url_article_image + '/' + props.data.image + "?rnd=" + moment().format('X')}} style={{ width: '100%', height: base.size.medium_image, borderRadius: base.size.size_3, }}/>

        <View style={{ marginTop: base.size.size_1, width: '100%', flexShrink: 1, }}>
          <Text numberOfLines={2} style={{ fontSize: base.size.size_5, fontWeight: 'bold', flexShrink: 1 }} >{props.data.title}</Text>

          <Text style={{ fontSize: base.size.size_3, color: base.color.grey7, }}>{props.data.category_str != "" ? props.data.category_str + ' | ' : ""}{props.data.created_at}</Text>
          
          
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
