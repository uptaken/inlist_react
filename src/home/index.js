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
  Dimensions,
  Image,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useFocusEffect, useIsFocused } from '@react-navigation/native'

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import HomeHeader from './header';
import HomeList from './list';

import banner from '../../assets/banner.png';

export default function Home({ route, navigation }){
  var base = new Base()
  const { width } = Dimensions.get('window');
  const [arr_banner, set_arr_banner] = useState([
    {
      id: '1',
      url_image: banner,
    },
  ])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action and update data
      setup_backhandler()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [])

  function setup_backhandler(){
    BackHandler.addEventListener('hardwareBackPress', function () {
      BackHandler.exitApp()
      return true
    })
  }

  function on_detail_clicked(data){
    navigation.navigate('ProductDetail', {data: data, on_setup_backhandler: () => setup_backhandler()})
  }

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>

      <View style={{ flex: 1, backgroundColor: base.color.white, }}>
        <HomeHeader
          navigation={navigation}
          on_setup_backhandler={() => setup_backhandler()}/>

        <ScrollView>
          <View style={{ }}>
            <View style={{ height: base.size.custom_image1,  }}>
              <SwiperFlatList
                showPagination
                data={arr_banner}>
                {
                  arr_banner.map((data, index) => <Image source={data.url_image} key={index} style={{ width: width, height: base.size.custom_image1, }}/>)
                }
              </SwiperFlatList>
            </View>

            <View style={{ paddingHorizontal: base.size.size_5, paddingBottom: base.size.size_5, marginTop: base.size.size_5 }}>
              <View style={{  }}>
                <HomeList
                  type="most_loaned"
                  title={base.i18n.t("most_borrowed_collection")}
                  navigation={navigation}
                  on_detail_clicked={(data) => on_detail_clicked(data)}
                  on_setup_backhandler={() => setup_backhandler()}/>
              </View>

              <View style={{ marginTop: base.size.size_3 }}>
                <HomeList
                  type="newest"
                  title={base.i18n.t("new_collection")}
                  navigation={navigation}
                  on_detail_clicked={(data) => on_detail_clicked(data)}
                  on_setup_backhandler={() => setup_backhandler()}/>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
