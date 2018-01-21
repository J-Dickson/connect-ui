import mapboxgl from 'mapbox-gl'

import '../components/LogIn.css'
import MapboxCircle from 'mapbox-gl-circle/dist/mapbox-gl-circle.min.js'
mapboxgl.accessToken = 'pk.eyJ1IjoiamQ5MTIiLCJhIjoiY2pjbWYzbzdxMDN4YTJ5bzBrc2VvdDl6ciJ9.0Cutw6rZNaP2pY58wj1V1w'
const markersOnMap = []
const poiMarkersOnMap = []
let mapRadius = null

export default class MapHelper {
  static renderUserCard (name, userImage) {
    return (`
      <img src="${userImage}" class='modal-image' alt="" height="65" width="65">
      <div class='modal-name'><a class='modal-username' href='/account'>${name}</a></div>
      <div class='buttons modal-buttons'>
        <button class='button btn_left'><a class='button' href="/">Connect</a></button>
        <button class='button'><a class='button' href="/account">Message</a></button>
      </div>
      `)
  }
  static renderPlaceCard (name, ratings) {
    return (`
      <div class='modal-name place-name'><a class='modal-username modal-placename' href='#'>${name}</a></div>
      <div className='star-ratings'>
        <i class="fa fa-star star--full" aria-hidden="true"></i>
        <i class="fa fa-star star--full" aria-hidden="true"></i>
        <i class="fa fa-star star--full" aria-hidden="true"></i>
        <i class="fa fa-star-half-o star--half" aria-hidden="true"></i>
        <i class="fa fa-star-o star--empty" aria-hidden="true"></i>
      </div>
      <div class='attributes'>
      <div class='beer'>
        <i class="fa fa-beer" aria-hidden="true"></i>
        <div class='beer-description'>Serves Beer</div>
      </div>
      <div class='food'>
        <i class="fa fa-cutlery" aria-hidden="true"></i>
        <div class='food-description'>Serves Food</div>
      </div>
      <div class='child'>
        <i class="fa fa-child" aria-hidden="true"></i>
        <div class='child-description'> Child Friendly </div>
      </div>
      <div class='wifi'>
        <i class="fa fa-wifi" aria-hidden="true"></i>
        <div class='wifi-description'>Free Wifi </div>
      </div>
      <div class='bed'>
        <i class="fa fa-bed" aria-hidden="true"></i>
        <div class='bed-description'>Rooms Available </div>
      </div>
      </div>
      <div> Opening Times: 10:00am-03:00am
      <div class='buttons modal-buttons'>
        <button class='button btn_left'><a class='button' href="#">Website</a></button>
      </div>
      `)
  }
  static instantiateMap (mapContainer, lon, lat) {
    return new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lon, lat],
      zoom: 11
    })
  }

  static drawCircle (map, lon, lat, radius) {
    mapRadius = new MapboxCircle({lat: lat, lng: lon}, radius, {
      editable: false,
      minRadius: radius,
      fillColor: '#29AB87'
    })
    mapRadius.addTo(map)
  }

  static removeMapRadius () {
    mapRadius.remove()
  }

  static getLatLng (latLng) {
    if (isNaN(latLng.lon) || isNaN(latLng.lat)) return null
    return [parseFloat(latLng.lon), parseFloat(latLng.lat)]
  }

  static createHeatMapSource (map, mappedUsers) {
    map.addSource('mapped-users', {
      'type': 'geojson',
      'data': mappedUsers
    })
  }

  static drawMarker (map, marker, isCurrentUser = false) {
    // create a HTML element for each feature
    let el = document.createElement('div')
    el.className = isCurrentUser ? 'fa fa-map-marker marker' : 'fa fa-user marker'
    let lngLat = this.getLatLng(marker.location.geoPoint)
    if (lngLat) {
      // make a marker for each feature and add to the map
      let markerForMap = new mapboxgl.Marker(el)
      markerForMap.setLngLat(lngLat)
      markerForMap.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(this.renderUserCard(marker.firstName, marker.image)))
      markerForMap.addTo(map)
      markersOnMap.push(markerForMap)
    }
  }

  static removeAllMarkers () {
    markersOnMap.forEach(marker => {
      marker.remove()
    })
    markersOnMap.length = 0
  }

  static removeAllPoiMarkers () {
    poiMarkersOnMap.forEach(marker => {
      marker.remove()
    })
    poiMarkersOnMap.length = 0
  }

  static getUserMarkers (map, userList, currentUser) {
    this.drawMarker(map, currentUser, true)
    userList.forEach(marker => this.drawMarker(map, marker))
  }

  static getPlaceMarkers (map, poi) {
    poi.forEach(marker => {
      // create a HTML element for each feature
      let el = document.createElement('div')
      el.className = 'fa fa-television marker'
      let lngLat = this.getLatLng(marker.location.geoPoint)
      if (lngLat) {
        // make a marker for each feature and add to the map
        let mapMarker = new mapboxgl.Marker(el)
        mapMarker.setLngLat(lngLat)
        mapMarker.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(this.renderPlaceCard(marker.name, marker.rating)))
        mapMarker.addTo(map)
        poiMarkersOnMap.push(mapMarker)
      }
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
