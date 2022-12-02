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
  BackHandler,
  TouchableOpacity,
} from 'react-native';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomNavigation from '../layout/custom_navigation';

export default function Register({ route, navigation }){
  var base = new Base()

  useEffect(() => {
    base.set_white_status_bar()
    const unsubscribe = navigation.addListener('focus', () => {
      const back_handler = BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.goBack()
        return true
      })
    });

    return unsubscribe;
  }, [])

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, justifyContent: "space-between", }}>
        <View style={{ padding: base.size.size_5, marginTop: base.size.large_title, }}>
          <CustomNavigation title={base.i18n.t("register")}
            navigation={navigation}
            padding={base.size.size_5}
            with_back={false}/>

          <View style={{  }}>
            <CustomCard
              color={base.color.grey1}
              on_press={() => {}}
              borderColor={base.color.grey1}
              style={{ marginTop: base.size.size_5 }}>
              <View>
                <Text style={{ color: base.color.black1, fontWeight: 'bold', fontSize: base.size.size_5, }}>{base.i18n.t("condition")}</Text>
                <Text style={{ color: base.color.black1, marginTop: base.size.size_1 }}>{base.i18n.t("condition_detail")}</Text>
              </View>
            </CustomCard>

            <CustomCard
              color={base.color.grey1}
              on_press={() => {}}
              borderColor={base.color.grey1}
              style={{ marginTop: base.size.size_5 }}>
              <View>
                <Text style={{ color: base.color.black1, fontWeight: 'bold', fontSize: base.size.size_5, }}>{base.i18n.t("rules")}</Text>
                <Text style={{ color: base.color.black1, marginTop: base.size.size_1 }}>{base.i18n.t("rules_detail")}</Text>
              </View>
            </CustomCard>

            <TouchableNativeFeedback
              useForeground
              background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
              onPress={() => navigation.navigate('Tutorial')}
              >
              <Text style={{ marginTop: base.size.size_5, textDecorationLine: 'underline', color: base.color.blue, }}>{base.i18n.t('register_tutorial')}</Text>
            </TouchableNativeFeedback>
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
            no_border={true}
            style={{ marginTop: base.size.size_3 }}
            on_press={() => navigation.goBack()} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
