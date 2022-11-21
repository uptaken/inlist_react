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
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import moment from 'moment';

import Base from '../../utils/base';
import CustomButton from '../../layout/custom_button';
import CustomInput from '../../layout/custom_input';
import CustomBadge from '../../layout/custom_badge';
import CustomNavigation from '../../layout/custom_navigation';
import ArticleList from '../article_list';

export default function ArticleDetail({ route, navigation }){
  var base = new Base()
  const { width } = useWindowDimensions();
  const [data, set_data] = useState({})
  const [index, setIndex] = useState(0)
  const [rnd, set_rnd] = useState(moment().format('X'))

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', function () {
        navigation.goBack()
        return true
      })
      
    });
    set_data(route.params.data)

    return unsubscribe;
  }, [])

  function on_detail_clicked(data){
    navigation.push('ArticleDetail', {data: data})
  }

  
  return (
    <View style={{ flex: 1, }}>
      <CustomNavigation
        style={{ paddingHorizontal: base.size.size_5, paddingTop: base.size.size_5, backgroundColor: base.color.primary }}
        text_color={base.color.white}
        navigation={navigation}/>

      <ScrollView>
        <View style={{ padding: base.size.size_3 }}>
          <Image source={data.image == null || data.image === "" ? require('../../../assets/no_image_book.png') : {uri: base.url_article_image_original + '/' + data.image + "?rnd=" + moment().format('X')}} style={{ width: '100%', height: base.size.large_image, resizeMode: 'contain' }}/>

          <View style={{ alignItems: 'flex-start', paddingTop: base.size.size_7 }}>
            <Text style={{ fontSize: base.size.size_7, fontWeight: 'bold' }}>{data.title}</Text>
            <Text style={{ fontSize: base.size.size_3, color: base.color.grey7, }}>{data.category_str != "" ? data.category_str + ' | ' : ""}{data.created_at}</Text>
            
            {
              data.body != null &&
              <RenderHtml
                contentWidth={width}
                source={{ html: data.body }}/>
            }
            
          </View>

          <View style={{ marginTop: base.size.large_title }}>
            {
              data.id != null &&
              <ArticleList
                on_detail_clicked={(data) => on_detail_clicked(data)}
                not_id={data.id}
                rnd={rnd}
                title={base.i18n.t("related_article")}
                navigation={navigation}/>
            }

          </View>
        </View>
      </ScrollView>

      <View style={{ padding: base.size.size_5 }}>
        
        <View style={{ marginTop: base.size.size_3, flexDirection: 'row', display: 'none', }}>
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
  );
}
