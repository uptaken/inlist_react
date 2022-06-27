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
import CustomTable from '../../layout/custom_table';
import HomeList from '../list';

export default function ProductExemplar(props){
  var base = new Base()
  const [head, set_head] = useState([
    base.i18n.t("barcode"),
    base.i18n.t("call_name"),
    base.i18n.t("location"),
    base.i18n.t("availability"),
  ])
  const [data, set_data] = useState([])

  useEffect(() => {
    var arr = []
    for(let collection of props.data.collection){
      var data = [
        collection.NomorBarcode,
        collection.CallNumber,
        collection.location.Name,
        collection.status.Name,
      ]
      arr.push(data)
    }
    set_data(arr)
  }, [])

  return (
    <View style={{ flex: 1, padding: base.size.size_3, backgroundColor: base.color.grey9, }}>
      <CustomTable
        data_head={head}
        data_row={data}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
