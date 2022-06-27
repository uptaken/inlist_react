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
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import Base from '../../utils/base';
import CustomButton from '../../layout/custom_button';
import CustomInput from '../../layout/custom_input';
import CustomBadge from '../../layout/custom_badge';
import CustomNavigation from '../../layout/custom_navigation';
import OrderDetailItem from './list_item';

export default function OrderDetail({ route, navigation }){
  var base = new Base()
  const [data, set_data] = useState({})

  useEffect(() => {
    set_data(route.params.data)
    const unsubscribe = navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.goBack()
        return true
      })
      set_data(route.params.data)
    });

    return unsubscribe;
  }, [])

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, }}>
        <CustomNavigation
          style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5, backgroundColor: base.color.white }}
          title={base.i18n.t("detail_transaction")}
          text_color={base.color.black}
          navigation={navigation}/>

        <View style={{ flex: 1, paddingHorizontal: base.size.size_3, paddingVertical: base.size.title }}>
          <View style={{ alignItems: 'flex-start', }}>
            <Text style={{ color: base.color.grey6, fontSize: base.size.size_5, fontWeight: 'bold', }}>{base.i18n.t("borrowed_detail")}</Text>

            <FlatList
              style={{ marginTop: base.size.size_1 }}
              data={data.collection_loan_item}
              renderItem={({ item, index }) => <OrderDetailItem data={item}/>}
              keyExtractor={item => item.ID.toString()}/>
          </View>

          <View style={{ alignItems: 'flex-start', marginTop: base.size.size_5, }}>
            <Text style={{ color: base.color.grey6, fontSize: base.size.size_5, fontWeight: 'bold', }}>{base.i18n.t("borrowed_location")}</Text>

            <View style={{ marginTop: base.size.size_4 }}>
              <Text>{data.collection_loan_item != null ? data.collection_loan_item[0].collection.location.Name : '-'}</Text>
            </View>
          </View>

          <View style={{ alignItems: 'flex-start', marginTop: base.size.icon, }}>
            <Text style={{ color: base.color.grey6, fontSize: base.size.size_5, fontWeight: 'bold', }}>{base.i18n.t("return")}</Text>

            <View style={{ alignItems: 'flex-start', marginTop: base.size.size_4, }}>
              <CustomBadge
                on_press={() => {}}
                text={data.collection_loan_item != null ? data.collection_loan_item[0].due_date.format('DD MMMM YYYY') : '-'}
                style_template="primary"/>

              <View style={{ marginTop: base.size.size_5 }}>
                <Text style={{ color: base.color.grey6 }}>{base.i18n.t("return_location")}</Text>
                <Text>{data.collection_loan_item != null ? data.collection_loan_item[0].collection.location.Name : '-'}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
