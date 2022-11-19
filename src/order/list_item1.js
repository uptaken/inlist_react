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
import OrderDetailListItem from './list_order_detail';

export default function OrderListItem(props){
  var base = new Base()
  const [is_expanded, set_is_expanded] = useState(false)

  return (
    <TouchableNativeFeedback
      useForeground
      onPress={() => set_is_expanded(!is_expanded)}>
      <View style={{ alignItems: 'flex-end', }}>
        <View style={{ padding: base.size.size_3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <View style={{ flexDirection: 'row', flex: 1, }}>
            {/* <Image source={props.data.CoverURL} style={{ width: base.size.toolbar, height: base.size.toolbar }}/> */}

            <View style={{  }}>
              <Text style={{ fontSize: base.size.size_3 }}>{props.data.ID}</Text>
              <Text style={{ fontSize: base.size.size_4, fontWeight: 'bold' }}>{props.data.create_date.format('DD/MM/YYYY')}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CustomBadge
              no_press={true}
              text={props.data.status != null ? props.data.status : '-'}
              is_translate={true}
              style_template={props.data.status === 'Canceled' ? 'danger' : 'primary'}/>

            <View style={{ marginLeft: base.size.size_1 }}>
              <Icon name={is_expanded ? 'chevron-up' : 'chevron-down'} size={base.size.icon} color={base.color.black}/>
            </View>
          </View>
        </View>

        <View style={{ width: '83%', height: base.size.border, backgroundColor: base.color.grey8, }}></View>

        {
          is_expanded &&
          props.data.collection_loan_item.map((value, index) => (<OrderDetailListItem data={value} on_detail_click={() => props.on_detail_click(index)} is_last={index == props.data.collection_loan_item.length - 1} />))
        }
      </View>
    </TouchableNativeFeedback>
  );
}
