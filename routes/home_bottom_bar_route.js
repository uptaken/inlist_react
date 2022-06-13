import React, {useState, useEffect} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Base from '../src/utils/base'

import Home from '../src/home/index'
import Profile from '../src/profile/profile'

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
        component: Home,
        label: base.i18n.t("order"),
        icon: ({focused, tintColor}) => {
          return <Icon name='home' size={base.size.icon} color={!focused ? base.color.grey2 : base.color.primary}/>
        },
      },
      {
        name: "SearchTab",
        component: Home,
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
        // style: {
        //   backgroundColor: theme.colors.black70p_hex,
        // },
        activeTintColor: base.color.primary,
        inactiveTintColor : base.color.grey2,
      }}>
      {
        arr.map((data, index) => (
          <BottomTab.Screen
            key={index}
            name={data.name}
            component={data.component}
            options={{
              tabBarLabel: data.label,
              tabBarIcon: data.icon,
            }}/>
        ))
      }
    </BottomTab.Navigator>
  )
}
