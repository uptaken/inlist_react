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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import Base from '../../utils/base';
import CustomButton from '../../layout/custom_button';
import CustomInput from '../../layout/custom_input';
import CustomBadge from '../../layout/custom_badge';
import CustomNavigation from '../../layout/custom_navigation';
import ProductInfo from './info';
import ProductExemplar from './exemplar';
import HomeList from '../list';

export default function ProductDetail({ route, navigation }){
  var base = new Base()
  const [data, set_data] = useState({})
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    {
      key: 'info',
      title: base.i18n.t("info"),
      component: <ProductInfo data={data}/>,
    },
    {
      key: 'exemplar',
      title: base.i18n.t("exemplar"),
      component: <ProductInfo data={data}/>,
    },
    {
      key: 'digital_content',
      title: base.i18n.t("digital_content"),
      component: <ProductInfo data={data}/>,
    },
    {
      key: 'marc',
      title: base.i18n.t("marc"),
      component: <ProductInfo data={data}/>,
    },
  ])

  useEffect(() => {
    set_data(route.params.data)
  }, [])

  async function add_to_cart(){
    var arr_cart = await AsyncStorage.getItem('arr_cart')
    arr_cart = arr_cart == null ? [] : JSON.parse(arr_cart)

    var flag = false
    for(let cart of arr_cart){
      if(cart.product.id === data.id){
        cart.amount++
        flag = true
        break
      }
    }

    if(!flag){
      arr_cart.push({
        amount: 1,
        product: data,
      })
    }
    await AsyncStorage.setItem('arr_cart', JSON.stringify(arr_cart))
    navigation.navigate('Cart')
  }



  return (
    <TouchableWithoutFeedback style={{ flex: 1, }} onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, }}>
        <CustomNavigation
          style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5, backgroundColor: base.color.primary }}
          text_color={base.color.white}
          navigation={navigation}/>

        <ScrollView>
          <View style={{ flex: 1, padding: base.size.size_3 }}>
            <Image source={data.CoverURL} style={{ width: '100%', height: base.size.large_image, resizeMode: 'contain' }}/>

            <View style={{ alignItems: 'flex-start', marginTop: base.size.size_7 }}>
              {
                data.status != null &&
                <CustomBadge
                  text={data.status}
                  on_press={() => {}}
                  style_template={data.status === 'available' ? 'primary' : 'danger'}/>
              }
              <Text style={{ fontSize: base.size.size_7, fontWeight: 'bold' }}>{data.Title}</Text>
              <Text>{data.Author}</Text>
            </View>

            <View style={{ marginTop: base.size.size_7 }}>
              <TabView
                navigationState={{ index, routes }}
                renderScene={({ route, jumpTo }) => {
                  if(route.key === 'info')
                    return <ProductInfo data={data}/>
                  else if(route.key === 'exemplar')
                    return <ProductExemplar data={data}/>
                  else if(route.key === 'digital_content')
                    return <ProductInfo data={data}/>
                  else if(route.key === 'marc')
                    return <ProductInfo data={data}/>
                }}
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

            <View style={{ marginTop: base.size.size_7 }}>
              {
                data.ID != null &&
                <HomeList
                  type="related"
                  subject={data.Subject}
                  not_id={data.ID}
                  title={base.i18n.t("related_product")}
                  navigation={navigation}/>
              }

            </View>
          </View>
        </ScrollView>

        <View style={{ padding: base.size.size_5 }}>
          <CustomButton title={base.i18n.t("add_to_cart")}
            color={base.color.primary}
            textColor={base.color.white}
            on_press={() => add_to_cart()} />

          <View style={{ marginTop: base.size.size_3, flexDirection: 'row',  }}>
            <CustomButton title={base.i18n.t("cite_this")}
              color={base.color.white}
              textColor={base.color.primary}
              borderColor={base.color.primary}
              style={{ flex: 1, marginRight: base.size.size_1 }}
              on_press={() => {}} />

            <CustomButton title={base.i18n.t("export_record")}
              color={base.color.white}
              textColor={base.color.primary}
              borderColor={base.color.primary}
              style={{ flex: 1, marginLeft: base.size.size_1 }}
              on_press={() => {}} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
