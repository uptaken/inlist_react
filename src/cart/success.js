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
  Linking,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import moment from 'moment';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomNavigation from '../layout/custom_navigation';

export default function CartSuccess({ route, navigation }){
  var base = new Base()
  const [url, set_url] = useState('')
  const [data, set_data] = useState({})

  useEffect(() => {
    get_data()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if(url !== "")
        set_url("")
    }, base.webview_wait_time)
  }, [url])

  async function get_data(){
    var response = await base.request(base.url_api + '/auth/profile')

    if(response.status === 'success'){
      set_data(response.data)
    }
    else
      base.show_error(response.message)
  }

  function download(){
    // navigation.navigate('Transaction', {data: {uri: base.host + "/export/loan?id=" + route.params.data.ID + "&user_id=" + data.ID + "&rnd=" + moment().format("X")}})
    base.show_error(base.i18n.t("download_now"))
    set_url(base.host + "/export/loan?id=" + route.params.data.ID + "&user_id=" + data.ID + "&rnd=" + moment().format("X"))
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: base.size.size_5, }}>
      <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
          <Image source={require("../../assets/cart_success.png")} style={{ width: base.size.large_image, height: base.size.large_image }}/>

          <Text style={{ fontSize: base.size.title, textAlign: 'center', marginTop: base.size.size_1, }}>{base.i18n.t("transaction_success")}</Text>
        </View>

        <View style={{ marginTop: base.size.toolbar, paddingLeft: base.size.size_7, }}>
          <Text style={{ fontSize: base.size.size_5, fontWeight: 'bold', }}>{route.params.data.ID}</Text>

          <View style={{ marginTop: base.size.size_5 }}>
            <Text style={{ fontSize: base.size.size_3, }}>{base.i18n.t("borrower_name")}</Text>
            <Text style={{ fontSize: base.size.size_4, fontWeight: 'bold', }}>{route.params.data.member.Fullname}</Text>
          </View>

          <View style={{ marginTop: base.size.size_3, display: 'none', }}>
            <Text style={{ fontSize: base.size.size_3, }}>{base.i18n.t("return_date")}</Text>
            <Text style={{ fontSize: base.size.size_4, fontWeight: 'bold', }}>{route.params.data.due_date.format('DD MMMM YYYY')}</Text>
          </View>
        </View>
      </View>

      <View>
        {
          url !== "" && 
          <WebView source={{ uri: url }} style={{ height: 0, width: 0, }} />
        }

        <CustomButton title={base.i18n.t("download_transaction")}
          color={base.color.white}
          style={{  }}
          textColor={base.color.primary}
          on_press={() => download()} />

        <CustomButton title={base.i18n.t("back_to_home")}
          color={base.color.primary}
          textColor={base.color.white}
          style={{ marginTop: base.size.size_1 }}
          on_press={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}
