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
  Linking,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { WebView } from 'react-native-webview';
import moment from 'moment';
import {showSnackBar} from '@prince8verma/react-native-snackbar'

import Base from '../../utils/base';
import CustomButton from '../../layout/custom_button';
import CustomInput from '../../layout/custom_input';
import CustomBadge from '../../layout/custom_badge';
import CustomNavigation from '../../layout/custom_navigation';
import OrderDetailItem from './list_item';
import PleaseWaitModal from "../../layout/modal/please_wait_modal"

export default function OrderDetail({ route, navigation }){
  var base = new Base()
  const [data, set_data] = useState({})
  const [user_data, set_user_data] = useState({})
  const [url, set_url] = useState('')
  const [is_please_wait, set_is_please_wait] = useState(false)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.goBack()
        return true
      })
      set_data(route.params.data)
      get_data()
    });

    return unsubscribe;
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
      set_user_data(response.data)
    }
    else
      base.show_error(response.message)
  }

  function download(){
    // console.log(user_data)
    // navigation.navigate('Transaction', {data: {uri: base.host + "/export/loan?id=" + data.ID + "&user_id=" + user_data.ID + "&rnd=" + moment().format("X")}})
    base.show_error(base.i18n.t("download_now"))
    set_url(base.host + "/export/loan?id=" + data.ID + "&user_id=" + user_data.ID + "&rnd=" + moment().format("X"))
  }

  async function cancel(){
    set_is_please_wait(true)
      var response = await base.request(base.url_api + '/loan/delete', 'delete', {
        id: data.ID,
      })

      set_is_please_wait(false)
      setTimeout(async () => {
        if(response.status === 'success'){
          navigation.goBack()
        }
        else
          base.show_error(response.message)
      }, 100)
  }

  return (
    <View style={{ flex: 1, }}>
      {/* <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}> */}
      <PleaseWaitModal is_show={is_please_wait}/>
        <View style={{ flex: 1, justifyContent: "space-between", }}>
          <View style={{ flex: 1, }}>
            <CustomNavigation
              style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5, backgroundColor: base.color.white }}
              title={base.i18n.t("detail_transaction")}
              text_color={base.color.black}
              navigation={navigation}/>

            <ScrollView>
              <View style={{ flex: 1, paddingHorizontal: base.size.size_3, paddingVertical: base.size.title }}>
                <View style={{ alignItems: 'flex-start', }}>
                  <Text style={{ color: base.color.grey6, fontSize: base.size.size_5, fontWeight: 'bold', }}>{base.i18n.t("borrowed_detail")}</Text>

                  <View>
                    {
                      data.collection_loan_item != null &&
                      data.collection_loan_item.map((item, index) => 
                        <OrderDetailItem data={item} key={index}/>
                      )
                    }
                  </View>
                </View>

                <View style={{ alignItems: 'flex-start', marginTop: base.size.size_5, }}>
                  <Text style={{ color: base.color.grey6, fontSize: base.size.size_5, fontWeight: 'bold', }}>{base.i18n.t("transaction_no")}</Text>

                  <View style={{ marginTop: base.size.size_4 }}>
                    <Text style={{ fontSize: base.size.size_5, fontWeight: 'bold', }}>{data.ID}</Text>
                  </View>
                </View>

                <View style={{ alignItems: 'flex-start', marginTop: base.size.size_5, }}>
                  <Text style={{ color: base.color.grey6, fontSize: base.size.size_5, fontWeight: 'bold', }}>{base.i18n.t("borrowed_location")}</Text>

                  <View style={{ marginTop: base.size.size_4 }}>
                    <Text>{data.collection_loan_item != null ? data.collection_loan_item[0].collection.location.Name : '-'}</Text>
                  </View>
                </View>

                <View style={{ alignItems: 'flex-start', marginTop: base.size.size_5, }}>
                  <View style={{ alignItems: 'flex-start', }}>
                    <Text style={{ color: base.color.grey6, fontSize: base.size.size_5, fontWeight: 'bold', }}>{base.i18n.t("return_deadline")}</Text>
                    <CustomBadge
                      on_press={() => {}}
                      text={data.collection_loan_item != null ? data.collection_loan_item[0].due_date.format('DD MMMM YYYY') : '-'}
                      style={{ marginTop: base.size.size_4 }}
                      style_template="primary"/>
                  </View>

                  <View style={{ alignItems: 'flex-start', }}>
                    

                    {/* <CustomBadge
                      no_press={true}
                      text={data.status}
                      style_template={data.status === 'Canceled' ? 'danger' : 'primary'}/> */}

                    <View style={{ marginTop: base.size.size_5 }}>
                      <Text style={{ color: base.color.grey6, fontSize: base.size.size_5, fontWeight: 'bold', }}>{base.i18n.t("return_location")}</Text>
                      <Text style={{ marginTop: base.size.size_4 }}>{data.collection_loan_item != null ? data.collection_loan_item[0].collection.location.Name : '-'}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={{ padding: base.size.size_5, }}>
            {
              url !== "" && 
              <WebView source={{ uri: url }} style={{ height: 100, width: 100, }} />
            }

            {
              data.status === "Reserved" &&
              <CustomButton title={base.i18n.t("cancel_order")}
                color={base.color.red}
                style={{  }}
                borderColor={base.color.red}
                textColor={base.color.white}
                on_press={() => cancel()} />
            }
            
            {/*
              data.status !== "Canceled" &&
              <CustomButton title={base.i18n.t("download_transaction")}
                color={base.color.white}
                style={{ marginTop: base.size.size_1 }}
                textColor={base.color.primary}
                on_press={() => download()} />
            */}
          </View>
        </View>
      {/* </TouchableWithoutFeedback> */}
    </View>
  );
}
