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

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomNavigation from '../layout/custom_navigation';

export default function Register({ route, navigation }){
  var base = new Base()

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, justifyContent: "space-between", }}>
        <View style={{ marginTop: base.size.size_5, }}>
          <CustomNavigation title={base.i18n.t("register")}
            navigation={navigation}
            padding={base.size.size_5}
            with_back={false}/>

          <View style={{ padding: base.size.size_5, }}>
            <CustomCard
              color={base.color.grey1}
              on_press={() => {}}
              borderColor={base.color.grey1}
              style={{ marginTop: base.size.size_5 }}>
              <View>
                <Text style={{ color: base.color.black1, fontWeight: 'bold' }}>{base.i18n.t("condition")}</Text>
                <Text style={{ color: base.color.black1, marginTop: base.size.size_1 }}>{base.i18n.t("condition_detail")}</Text>
              </View>
            </CustomCard>

            <CustomCard
              color={base.color.grey1}
              on_press={() => {}}
              borderColor={base.color.grey1}
              style={{ marginTop: base.size.size_5 }}>
              <View>
                <Text style={{ color: base.color.black1, fontWeight: 'bold' }}>{base.i18n.t("rules")}</Text>
                <Text style={{ color: base.color.black1, marginTop: base.size.size_1 }}>{base.i18n.t("rules_detail")}</Text>
              </View>
            </CustomCard>
          </View>
        </View>

        <View style={{ padding: base.size.size_5, }}>
          <CustomButton title={base.i18n.t("register")}
            color={base.color.primary}
            textColor={base.color.white}
            on_press={() => navigation.navigate('BasicInfo')} />

          <CustomButton title={base.i18n.t("cancel_register")}
            color={base.color.white}
            textColor={base.color.primary}
            borderColor=""
            style={{ marginTop: base.size.size_3 }}
            on_press={() => navigation.goBack()} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
