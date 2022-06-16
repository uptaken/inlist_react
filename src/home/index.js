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
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomInput from '../layout/custom_input';
import HomeHeader from './header';
import HomeList from './list';

import book_1 from '../../assets/book_1.png';
import book_2 from '../../assets/book_2.png';

export default function Home({ route, navigation }){
  var base = new Base()
  const { width } = Dimensions.get('window');
  const [arr_banner, set_arr_banner] = useState([
    {
      id: '1',
      url_image: book_1,
    },
    {
      id: '2',
      url_image: book_2,
    },
    {
      id: '3',
      url_image: book_1,
    },
    {
      id: '4',
      url_image: book_2,
    },
  ])

  useEffect(() => {
    async function get_token(){
      var token = await AsyncStorage.getItem('token')
      if(token == null)
        navigation.navigate('Login')
    }
    get_token()
  }, [])

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>

      <View style={{ flex: 1, }}>
        <HomeHeader
          navigation={navigation}/>

        <ScrollView>
          <View style={{ padding: base.size.size_5 }}>
            <View style={{ height: base.size.large_image }}>
              <SwiperFlatList
                showPagination
                data={arr_banner}>
                {
                  arr_banner.map((data, index) => <Image source={data.url_image} key={index} style={{ width: width, height: base.size.large_image, resizeMode: 'contain' }}/>)
                }
              </SwiperFlatList>
            </View>

            <View>
              <HomeList
                title={base.i18n.t("most_borrowed_collection")}
                navigation={navigation}/>
            </View>

            <View style={{ marginTop: base.size.size_3 }}>
              <HomeList
                type="newest"
                title={base.i18n.t("new_collection")}
                navigation={navigation}/>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
