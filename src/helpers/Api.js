import axios from 'axios'

export default class Api {
  static getPoiByRadius () {
    return axios.get('//c6ac2902.ngrok.io/connect/find?lat=48.219099&lng=11.623351&radius=200')
  }
}