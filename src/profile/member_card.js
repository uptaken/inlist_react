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
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Barcode from "react-native-barcode-builder"

import Base from '../utils/base';
import CustomButton from '../layout/custom_button';
import CustomCard from '../layout/custom_card';
import CustomInput from '../layout/custom_input';

export default function MemberCard(props){
  var base = new Base()
  const [is_please_wait, set_is_please_wait] = useState(false)
  const [arr_layout, set_arr_layout] = useState([
    {
      height: base.size.small_image1, 
      width: base.size.small_image
    }
  ])

  return (
    <View style={[props.style, {  }]}>
      <CustomCard
        padding={0}
        no_border={true}
        paddingHorizontal={0}>
        <ImageBackground source={require("../../assets/member_card_bg.png")} resizeMode="cover" style={{ width: '100%' }}>
          <View style={{ padding: base.size.size_7 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View >
                <Text style={{ fontSize: base.size.icon, color: base.color.white, fontWeight: 'bold', }}>{props.member != null ? props.member.Fullname : '-'}</Text>
                <Text style={{ fontSize: base.size.size_5, color: base.color.white2 }}>{props.member != null ? props.member.MemberNo : '-'}</Text>

                <View style={{ marginTop: base.size.title }}>
                  {
                    props.member != null && 
                    <Barcode value={props.member.MemberNo} format="CODE128" height={base.size.icon} background="#ffffff" width={1.6}/>
                  }
                </View>
              </View>

              <View>
                <Text style={{ fontSize: base.size.size_3, color: base.color.white2, textAlign: 'center' }}>{props.member != null ? props.member.IdentityNo : '-'}</Text>

                <Text style={{ fontSize: base.size.size_3, color: base.color.white2, textAlign: 'center', marginTop: base.size.size_3, }}>{base.i18n.t("unlimited_active_card")}</Text>
              
                <Image source={props.member != null && props.member.image_profile != null ? props.member.image_profile : require("../../assets/no_profile_picture.png")} 
                  style={{ height: base.size.small_image1, width: base.size.small_image }}
                  onLoadStart={() => set_is_please_wait(true)}
                  onLoadEnd={() => set_is_please_wait(false)}/>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              
              
              {/* <Text style={{ fontSize: base.size.size_3, color: base.color.white2 }}>{base.i18n.t("joined_since")} {props.member != null ? props.member.RegisterDateFormat.format('DD/MM/YYYY') : '-'}</Text> */}
            </View>
          </View>
        </ImageBackground>
      </CustomCard>
    </View>
  );
}
