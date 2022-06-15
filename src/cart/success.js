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
  Image,
  TouchableOpacity,
} from 'react-native';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomNavigation from '../layout/custom_navigation';

export default function CartSuccess({ route, navigation }){
  var base = new Base()

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, justifyContent: "space-between", padding: base.size.size_5, }}>
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', alignSelf: 'center' }}>
            <Image source={require("../../assets/cart_success.png")} style={{ width: base.size.large_image, height: base.size.large_image }}/>

            <Text style={{ fontSize: base.size.title, textAlign: 'center', marginTop: base.size.size_1, }}>{base.i18n.t("transaction_success")}</Text>
          </View>

          <View style={{ marginTop: base.size.toolbar, paddingLeft: base.size.size_7, }}>
            <Text style={{ fontSize: base.size.size_5, fontWeight: 'bold', }}>{route.params.data.id}</Text>

            <View style={{ marginTop: base.size.size_5 }}>
              <Text style={{ fontSize: base.size.size_3, }}>{base.i18n.t("borrower_name")}</Text>
              <Text style={{ fontSize: base.size.size_4, fontWeight: 'bold', }}>{route.params.data.user.name}</Text>
            </View>

            <View style={{ marginTop: base.size.size_3 }}>
              <Text style={{ fontSize: base.size.size_3, }}>{base.i18n.t("return_date")}</Text>
              <Text style={{ fontSize: base.size.size_4, fontWeight: 'bold', }}>{route.params.data.return_date.format('DD MMMM YYYY')}</Text>
            </View>
          </View>
        </View>

        <View>
          <CustomButton title={base.i18n.t("download_transaction")}
            color={base.color.white}
            textColor={base.color.primary}
            on_press={() => {}} />

          <CustomButton title={base.i18n.t("back_to_home")}
            color={base.color.primary}
            textColor={base.color.white}
            style={{ marginTop: base.size.size_1 }}
            on_press={() => navigation.navigate('Home')} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
