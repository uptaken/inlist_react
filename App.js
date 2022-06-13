/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { View } from 'react-native';

import HomeBottomBar from './routes/home_bottom_bar_route'

import Login from './src/auth/login'
import Register from './src/auth/register'
import BasicInfo from './src/auth/register/basic_info'
import AddressLiving from './src/auth/register/address_living'
import Address from './src/auth/register/address'
import DetailAddress from './src/auth/register/detail_address'
import RegisterSuccess from './src/auth/register/success'
import ForgetPassword from './src/auth/forget_password'

import ProductDetail from './src/home/product/detail'

import ChangePassword from './src/profile/change_password'

import Base from './src/utils/base';

const Stack = createStackNavigator()
export default function App() {
  var base = new Base()

  arr = [
    {
      name: "Home",
      component: HomeBottomBar,
      header_shown: false,
      header_transparent: true,
    },
    {
      name: "Login",
      component: Login,
      header_shown: false,
      header_transparent: true,
      header_right: () => (<View></View>),
    },
    {
      name: "Register",
      component: Register,
      header_shown: false,
      header_transparent: true,
      header_right: () => (<View></View>),
    },
    {
      name: "BasicInfo",
      component: BasicInfo,
      header_shown: false,
      header_transparent: true,
      header_right: () => (<View></View>),
    },
    {
      name: "AddressLiving",
      component: AddressLiving,
      header_shown: false,
      header_transparent: true,
      header_right: () => (<View></View>),
    },
    {
      name: "Address",
      component: Address,
      header_shown: false,
      header_transparent: true,
      header_right: () => (<View></View>),
    },
    {
      name: "DetailAddress",
      component: DetailAddress,
      header_shown: false,
      header_transparent: true,
      header_right: () => (<View></View>),
    },
    {
      name: "RegisterSuccess",
      component: RegisterSuccess,
      header_shown: false,
      header_transparent: true,
      header_right: () => (<View></View>),
    },
    {
      name: "ForgetPassword",
      component: ForgetPassword,
      header_shown: false,
      header_transparent: true,
      header_right: () => (<View></View>),
    },
    {
      name: "ProductDetail",
      component: ProductDetail,
      header_shown: false,
      header_transparent: true,
      header_right: () => (<View></View>),
    },
    {
      name: "ChangePassword",
      component: ChangePassword,
      header_shown: false,
      header_transparent: true,
      header_right: () => (<View></View>),
    },
  ]

  function set_header_transparent(route){
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeTab';

    return routeName === "HomeTab" || routeName === "ProfileTab" ? true : false
  }

  function set_header_style(route){
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeTab';

    return routeName === "HomeTab" || routeName === "ProfileTab" ? { alignSelf: 'center', color: base.color.white } : { alignSelf: 'center' }
  }

  function set_header_title(route){
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeTab';

    if(routeName === "HomeTab")
      return base.i18n.t("app_name")
    else if(routeName === "FavoriteTab")
      return base.i18n.t("favorite")
    else if(routeName === "ChatTab")
      return base.i18n.t("chat")
    else if(routeName === "NotificationTab")
      return base.i18n.t("notification")
    else if(routeName === "ProfileTab")
      return base.i18n.t("profile")
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: '#fff' }
        }}>
        {
          arr.map((data, index) => (
            <Stack.Screen
              key={index}
              name={data.name}
              component={data.component}
              options={({ route }) => data.name === "Home" ? ({
                headerTransparent: set_header_transparent(route),
                headerTitle: set_header_title(route),
                headerTitleStyle: set_header_style(route),
                headerShown: data.header_shown,
                headerRight: data.header_right,
              }) : ({
                headerTransparent: data.header_transparent,
                headerTitleStyle: { alignSelf: 'center' },
                headerShown: data.header_shown,
                headerRight: data.header_right,
              })}/>
          ))
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
