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
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';
import CustomHeader from '../layout/custom_header';

export default function HomeHeader(props){
  var base = new Base()

  return (
    <View style={{ padding: base.size.size_5, backgroundColor: base.color.primary }}>
      <CustomHeader
        navigation={props.navigation}
        backgroundColor={true}
        side_component={
          <View style={{ flexDirection: 'row',  }}>
            <TouchableNativeFeedback
              useForeground
              background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
              onPress={() => props.navigation.navigate('Help')}
              >
              <View style={{ marginRight: base.size.size_3 }}>
                <Icon name="help-circle" size={base.size.icon} color={base.color.white}/>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
              useForeground
              background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
              onPress={() => props.navigation.navigate('Cart', {on_setup_backhandler: () => props.on_setup_backhandler()})}
              >
              <View>
                <Icon name="cart" size={base.size.icon} color={base.color.white}/>
                {
                  (props.total_new != null && props.total_new > 0) &&
                  <View style={{ height: base.size.size_3, width: base.size.size_3, borderRadius: base.size.size_3 / 2, backgroundColor: base.color.red, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: base.color.white, }}></Text>
                  </View>
                }
              </View>
            </TouchableNativeFeedback>
          </View>
        }/>

      <View style={{ marginTop: base.size.size_3 }}>
        <CustomCard
          padding={0}
          paddingHorizontal={base.size.size_3}
          color={base.color.white}
          on_press={() => props.navigation.navigate('SearchTab')}
          borderColor={base.color.white}>
          <View style={{ flexDirection: 'row', alignItems: 'center', height: base.size.large_title, }}>
            <Icon name="magnify" size={base.size.icon} color={base.color.black1}/>
            <Text style={{ color: base.color.black1, marginLeft: base.size.size_1, }}>{base.i18n.t("search")}</Text>
          </View>
        </CustomCard>
      </View>
    </View>
  );
}
