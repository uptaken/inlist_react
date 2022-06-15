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
  TouchableNativeFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Swipeable from 'react-native-gesture-handler/Swipeable';

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';
import CustomBadge from '../layout/custom_badge';

export default function CartRightAction(props){
  var base = new Base()

  return (
    <View style={{ flexDirection: 'row',  }}>
      <TouchableNativeFeedback
        useForeground
        background={TouchableNativeFeedback.Ripple(base.color.colorPrimaryDark, false)}
        onPress={() => props.on_remove()}>
        <View style={{ flexDirection: 'row', width: base.size.small_image, backgroundColor: base.color.red, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="trash-can-outline" size={base.size.icon} color={base.color.white}/>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
