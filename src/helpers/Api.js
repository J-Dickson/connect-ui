import axios from 'axios'

export default class Api {
  static getPoiByRadius (radius = 200, lonLat) {
    return axios.get(`//5a608ceb.ngrok.io/connect/find?lat=${lonLat.lat}&lng=${lonLat.lon}&radius=${radius}`)
  }
}
