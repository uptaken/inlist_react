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
import CustomNavigation from '../layout/custom_navigation';
import SearchListItem from './search_list_item';
import SearchList from './search_list';

export default function SearchListPage({ route, navigation }){
  var base = new Base()
  const [sort, set_sort] = useState({})

  return (
    <View style={{ flex: 1 }}>
      <CustomNavigation
        style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5, backgroundColor: base.color.primary }}
        title={route.params.data.name}
        text_color={base.color.white}
        navigation={navigation}/>

      <SearchList
        navigation={navigation}
        sort={sort}
        subject={route.params.data.name}/>
    </View>
  );
}
