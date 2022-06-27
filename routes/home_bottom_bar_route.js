import React, {useState, useEffect} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/FontAwesome5'
import { BackHandler, } from 'react-native'

import Base from '../src/utils/base'

import Home from '../src/home/index'
import Profile from '../src/profile/profile'
import Order from '../src/order/order'
import Search from '../src/search/search'

const BottomTab = createBottomTabNavigator()
export default function HomeBottomBar(){
  var base = new Base()
  arr = []

  function reload_page(){
    arr = [
      {
        name: "HomeTab",
        component: Home,
        label: base.i18n.t("home"),
        icon: ({focused, tintColor}) => {
          return <Icon name='home' size={base.size.icon} color={!focused ? base.color.grey2 : base.color.primary}/>
        },
      },
      {
        name: "OrderTab",
        component: Order,
        label: base.i18n.t("order"),
        icon: ({focused, tintColor}) => {
          return <Icon1 name='file-alt' solid size={base.size.size_7} color={!focused ? base.color.grey2 : base.color.primary}/>
        },
      },
      {
        name: "SearchTab",
        component: Search,
        label: base.i18n.t("search"),
        icon: ({focused, tintColor}) => {
          return <Icon name='search' size={base.size.icon} color={!focused ? base.color.grey2 : base.color.primary}/>
        },
      },
      {
        name: "ProfileTab",
        component: Profile,
        label: base.i18n.t("profile"),
        icon: ({focused, tintColor}) => {
          return <Icon name='person' size={base.size.icon} color={!focused ? base.color.grey2 : base.color.primary}/>
        },
      },
    ]
  }
  reload_page()

  return (
    <BottomTab.Navigator
      screenOptions={{
        showIcon: true,
        headerShown: false,
        keyboardHidesTabBar: true,
        activeTintColor: base.color.primary,
        inactiveTintColor : base.color.grey2,
        tabBarItemStyle:{
          margin: base.size.half,
        }
      }}>
      {
        arr.map((data, index) => (
          <BottomTab.Screen
            key={index}
            name={data.name}
            component={data.component}
            listeners={{
              tabPress: e => {
                base.set_primary_status_bar()
              },
            }}
            options={{
              tabBarLabel: data.label,
              tabBarIcon: data.icon,
            }}/>
        ))
      }
    </BottomTab.Navigator>
  )
}
