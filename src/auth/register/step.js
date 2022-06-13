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

import Base from '../../utils/base';
import CustomButton from '../../layout/custom_button';
import CustomCard from '../../layout/custom_card';
import CustomNavigation from '../../layout/custom_navigation';

export default function Step(props){
  var base = new Base()

  return (
    <View style={[props.style, { flexDirection: 'row', alignItems: 'center', }]}>
      <View style={{ width: base.size.icon, height: base.size.icon, borderRadius: base.size.icon / 2, marginRight: base.size.size_5, borderColor: base.color.primary, borderWidth: base.size.border, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{props.num}</Text>
      </View>

      <View style={{ flex: 1,  }}>
        <Text>{props.title}</Text>
      </View>
    </View>
  );
}
