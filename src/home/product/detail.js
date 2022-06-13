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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import Base from '../../utils/base';
import CustomButton from '../../layout/custom_button';
import CustomInput from '../../layout/custom_input';
import CustomNavigation from '../../layout/custom_navigation';
import ProductInfo from './info';
import HomeList from '../list';

export default function ProductDetail({ route, navigation }){
  var base = new Base()
  const [data, set_data] = useState({})
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    {
      key: 'info',
      title: base.i18n.t("info"),
    },
    {
      key: 'exemplar',
      title: base.i18n.t("exemplar"),
    },
    {
      key: 'digital_content',
      title: base.i18n.t("digital_content"),
    },
    {
      key: 'marc',
      title: base.i18n.t("marc"),
    },
  ])
  // const [_renderScene] = useState(
  //   SceneMap({
  //     info: ProductInfo,
  //     exemplar: ProductInfo,
  //     digital_content: ProductInfo,
  //     marc: ProductInfo,
  //   })
  // )

  useEffect(() => {
    set_data(route.params.data)
  }, [])

  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, }}>
        <CustomNavigation
          style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5, backgroundColor: base.color.primary }}
          text_color={base.color.white}
          navigation={navigation}/>

        <View style={{ flex: 1, padding: base.size.size_3 }}>
          <View>
            <Text>{data.status}</Text>
            <Text>{data.title}</Text>
            <Text>{data.publisher}</Text>
          </View>

          <View style={{ marginTop: base.size.size_3 }}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={({ route, jumpTo }) => <ProductInfo data={data}/>}
              onIndexChange={setIndex}
              renderTabBar={props =>
                <TabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: base.color.primary }}
                  style={{ backgroundColor: base.color.white, }}
                  activeColor={base.color.primary}
                  inactiveColor={base.color.grey3}/>
              }
              style={{  }}/>
          </View>

          <View style={{ marginTop: base.size.size_3 }}>
            <HomeList
              title={base.i18n.t("related_product")}
              navigation={navigation}/>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}