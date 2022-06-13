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
  TouchableNativeFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/FontAwesome5'
import SelectDropdown from 'react-native-select-dropdown'

import Base from '../utils/base';

export default function CustomInput(props){
  var base = new Base()
  const [arr_label, set_arr_label] = useState([])
  const [selected_index, set_selected_index] = useState(0)
  const [keyboard_type, set_keyboard_type] = useState('default')

  useEffect(() => {
    if(props.arr != null){
      var arr_label1 = []
      for(let data of props.arr)
        arr_label1.push(data.name)
      set_arr_label(arr_label1)
    }
  }, [props.arr])

  useEffect(() => {
    if(props.type === 'email')
      set_keyboard_type('email-address')
    else if(props.type === 'phone')
      set_keyboard_type('phone-pad')
    else if(props.type === 'number')
      set_keyboard_type('numeric')
  }, [props.type])

  useEffect(() => {
    if(props.type === 'select' && props.value.id != null){
      for(let x in props.arr){
        if(props.value.id === props.arr[x].id)
          set_selected_index(x)
      }
    }
  }, [props.value])

  return (
    <View style={[props.style, { marginTop: base.size.size_7 }]}>
      <Text style={{ fontSize: base.size.size_5 }}>{props.name}</Text>
      {
        props.type === 'select' ?
          <SelectDropdown
            data={arr_label}
            onSelect={(selectedItem, index) => props.on_selected(index)}
            buttonStyle={{
              flex: 1,
              height: 50,
              width: '100%',
              backgroundColor: '#FFF',
              borderWidth: base.size.border,
              borderColor: base.color.grey1,
              borderRadius: base.size.size_1,
            }}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <Icon name={isOpened ? 'arrow-drop-up' : 'arrow-drop-down'} color={base.color.black} size={18} />;
            }}
            defaultValueByIndex={selected_index}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}/>
        :
          <TextInput
            style={{ borderWidth: base.size.border, borderColor: base.color.grey1, borderRadius: base.size.size_1, padding: base.size.size_1, marginTop: base.size.size_1, }}
            onChangeText={value => props.on_change_text(value)}
            secureTextEntry={props.type != null && props.type === 'password'}
            keyboardType={keyboard_type}
            value={props.value}/>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
  },
  dropdownsRow: {flexDirection: 'row', width: '100%', paddingHorizontal: '5%'},

  dropdown1BtnStyle: {
    flex: 1,
    height: 50,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  divider: {width: 12},
  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},
});