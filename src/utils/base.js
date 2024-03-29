import Snackbar from "react-native-snackbar";
import {showSnackBar} from '@prince8verma/react-native-snackbar'
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { StatusBar, BackHandler, } from 'react-native';

import I18n from "./i18n"
import Size from "./size"
import Color from "./color"

export default class Base{
  // host = "https://inlist.quantumtri.com"
  host = "http://117.74.112.5/~apiinlis/public"
  url_api = this.host + "/api"
  url_image = 'https://inlislite.dispustaka.sumselprov.go.id/uploaded_files/sampul_koleksi/original/'
  url_article_image = 'https://inlislite.dispustaka.sumselprov.go.id/inlismobile/assets/img/article/thumb/'
  url_article_image_original = 'https://inlislite.dispustaka.sumselprov.go.id/inlismobile/assets/img/article/original/'
  no_book_image = require('../../assets/no_image_book.png')
  version = ""
  i18n = I18n
  size = Size
  color = Color
  locale_string = "id-ID"
  wait_time = 50
  webview_wait_time = 1000
  search_wait_time = 1500

  constructor(){
    this.version = DeviceInfo.getVersion()
  }

  async request(url, method = 'get', data = {}, with_modal = true, onUploadProgress = response => {}){
    try{
      axios.defaults.headers.common['Accept'] = 'application/json'

      var header = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
      var token = await AsyncStorage.getItem('token')
      if(token != null && token != '')
        header['Authorization'] = token


      var response
      if(method === 'get'){
        for(let x in data)
          url += (url.includes('?') ? '&' : '?') + x + "=" + (Array.isArray(data[x]) ? JSON.stringify(data[x]) : data[x])

        response = await axios.get(url, {
          headers: header,
        })
      }
      else if(method === 'post')
        response = await axios.post(url, data, {
          headers: header,
          onUploadProgress
        })
      else if(method === 'put')
        response = await axios.post(url, data, {
          headers: header,
          onUploadProgress
        })
      else if(method === 'delete')
        response = await axios.post(url, data, {
          headers: header,
        })

      if(with_modal){
        setTimeout(() => {
        }, 500)
      }

      // console.log(response)
      return response.data
    } catch(error){
      console.log(error.response.data)
    }
  }

  set_white_status_bar(){
    StatusBar.setBarStyle('dark-content', true)
    StatusBar.setBackgroundColor(this.color.white)
  }

  set_primary_status_bar(){
    StatusBar.setBarStyle('light-content', true)
    StatusBar.setBackgroundColor(this.color.primary)
  }

  exit_app(){
    BackHandler.exitApp()
  }

  add_array(arr, set_state, data = {}){
    var temp = [...arr]
    temp.push(data)
    set_state(temp)
  }

  update_array(arr, set_state, data = {}, index = 0){
    var temp = [...arr]
    temp[index] = data
    set_state(temp)
  }

  remove_array(arr, set_state, index = 0){
    var temp = [...arr]
    temp.splice(index, 1)
    set_state(temp)
  }

  validate_email(email){
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }

  show_error(message = ""){
    // showSnackBar({
    //   message: message,
    //   textColor: '#FFF',      // message text color
    //   position: 'top',  // enum(top/bottom).
    //   confirmText: '', // button text.
    //   duration: 2000,   // (in ms), duartion for which snackbar is visible.
    // })
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    })
  }
}
