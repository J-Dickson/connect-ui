import axios from 'axios'

export default class Api {
  static getPoiByRadius (radius = 200) {
    return axios.get(`//5a608ceb.ngrok.io/connect/find?lat=48.219099&lng=11.623351&radius=${radius}`)
  }
}
