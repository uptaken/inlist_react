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
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import Base from '../../utils/base';
import CustomButton from '../../layout/custom_button';
import CustomInput from '../../layout/custom_input';
import CustomNavigation from '../../layout/custom_navigation';
import HomeList from '../list';

export default function ProductInfo(props){
  var base = new Base()

  return (
    <View style={{  }}>
      <Text>{base.i18n.t("title") + ': ' + props.data.Title}</Text>
      <Text>{base.i18n.t("author") + ': ' + props.data.Author}</Text>
      <Text>{base.i18n.t("edition") + ': ' + props.data.Edition}</Text>
      <Text>{base.i18n.t("publisher") + ': ' + props.data.Publisher}</Text>
      <Text>{base.i18n.t("description") + ': ' + props.data.PhysicalDescription}</Text>
      <Text>{base.i18n.t("isbn") + ': ' + props.data.ISBN}</Text>
      <Text>{base.i18n.t("subject") + ': ' + props.data.Subject}</Text>
      <Text>{base.i18n.t("notes") + ': ' + props.data.Note}</Text>
      <Text>{base.i18n.t("language") + ': ' + props.data.Languages}</Text>
    </View>
  );
}
