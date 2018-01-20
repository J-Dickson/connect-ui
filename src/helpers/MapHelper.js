import mapboxgl from 'mapbox-gl'
import geojson from '../data/BigHaq'
mapboxgl.accessToken = 'pk.eyJ1IjoiamQ5MTIiLCJhIjoiY2pjbWYzbzdxMDN4YTJ5bzBrc2VvdDl6ciJ9.0Cutw6rZNaP2pY58wj1V1w'

export default class MapHelper {
  static instantiateMap (mapContainer) {
    return new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [11.576124, 48.137154],
      zoom: 14
    })
  }

  static getLatLng (latLng) {
    return [latLng.lng, latLng.lat]
  }

  static createHeatMapSource (map) {
    map.addSource('mapped-users', {
      'type': 'geojson',
      'data': geojson.mapped_users
    })
  }

  static getUserMarkers (map) {
    geojson.users.forEach(marker => {
      // create a HTML element for each feature
      let el = document.createElement('div')
      el.className = 'fa fa-user marker'

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
      .setLngLat(this.getLatLng(marker.latlng))
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(`<h3>${marker.firstName}<h3>`))
      .addTo(map)
    })
  }

  static getPlaceMarkers (map) {
    geojson.places.forEach(marker => {
      // create a HTML element for each feature
      let el = document.createElement('div')
      el.className = 'fa fa-television marker'

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
      .setLngLat(this.getLatLng(marker.latlng))
      .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(`<h3>${marker.name}<h3>`))
      .addTo(map)
    })
  }

  static getHeatMapLayer (map) {
    map.addLayer({
      'id': 'mapped-users-heat',
      'type': 'heatmap',
      'source': 'mapped-users',
      'paint': {
        // Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'mag'],
          0, 0,
          6, 1
        ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          1, 1,
          9, 3
        ],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(33,102,172,0)',
          0.2, 'rgb(103,169,207)',
          0.4, 'rgb(209,229,240)',
          0.6, 'rgb(253,219,199)',
          0.8, 'rgb(239,138,98)',
          1, 'rgb(178,24,43)'
        ],
        // Adjust the heatmap radius by zoom level
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 2,
          9, 20
        ],
        // Transition from heatmap to circle layer by zoom level
        'heatmap-opacity': [
          'interpolate',
            ['linear'],
            ['zoom'],
          7, 1,
          10, 0.3
        ]
      }
    }, 'waterway-label')
  }
}
