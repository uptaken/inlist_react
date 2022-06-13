import Snackbar from "react-native-snackbar";
import DeviceInfo from 'react-native-device-info'
import axios from 'axios'

import I18n from "./i18n"
import Size from "./size"
import Color from "./color"

export default class Base{
  host = ""
  url_api = this.host + ""
  version = ""
  i18n = I18n
  size = Size
  color = Color
  locale_string = "id-ID"
  wait_time = 50

  constructor(){
    this.version = DeviceInfo.getVersion()
  }

  async request(url, method = 'get', data = {}, with_modal = true, onUploadProgress = response => {}){
    axios.defaults.headers.common['Accept'] = 'application/json'

    var response
    if(method == 'get'){
      for(let x in data)
        url += (url.includes('?') ? '&' : '?') + x + "=" + (Array.isArray(data[x]) ? JSON.stringify(data[x]) : data[x])
      response = await axios.get(url)
    }
    else if(method == 'post')
      response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
        onUploadProgress
      })
    else if(method == 'put')
      response = await axios.put(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
        onUploadProgress
      })
    else if(method == 'delete')
      response = await axios.delete(url)

    if(with_modal){
      setTimeout(() => {
      }, 500)
    }

    return response.data
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

  show_error(message = ""){
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    })
  }
}
