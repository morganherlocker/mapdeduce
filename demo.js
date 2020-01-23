const fs = require('fs')
const path = require('path')
const turf = require('@turf/turf')

var html = fs.readFileSync(path.join(__dirname, 'index.html')).toString()

var token = 'pk.eyJ1IjoibW9yZ2FuaGVybG9ja2VyIiwiYSI6Ii1zLU4xOWMifQ.FubD68OEerk74AYCLduMZQ';

var actions = []

var bbox = [
    36.81544303894043,
    -1.2915351832720943,
    36.83119297027588,
    -1.2774624876039293
  ]


actions.push({
  type: 'fit',
  bbox:
    turf.destination(turf.point(bbox.slice(0,2)), 0.2, 225, {units: 'kilometers'}).geometry.coordinates
    .concat(turf.destination(turf.point(bbox.slice(2,4)), 0.2, 45, {units: 'kilometers'}).geometry.coordinates)
})

var points = turf.randomPoint(100, {bbox: bbox})
var multipoint = turf.multiPoint(points.features.map(pt => {
  return pt.geometry.coordinates
}))

actions.push({
  type: 'draw',
  geometry: multipoint.geometry,
  style: {
    'width': 4,
    'color': '#f0f',
    'opacity': 1
  },
  fade: -1
})

var tin = turf.tin(points);
for (let tri of tin.features) {
  actions.push({
    type: 'log',
    message: 'area: ' + (turf.area(tri) / 1000).toFixed(5) + ' kilometers'
  })
  actions.push({
    type: 'draw',
    geometry: tri.geometry,
    style: {
      'color': '#0ff',
      'opacity': 0.6
    },
    fade: 3000
  })
  actions.push({
    type: 'draw',
    geometry: turf.lineString(tri.geometry.coordinates[0]).geometry,
    style: {
      'color': '#99ff66',
      'opacity': 0.8,
      'width': 1
    },
    fade: 10000
  })
}

var render =
  html
  .split('{{token}}').join(token)
  .split('{{actions}}').join(JSON.stringify(actions))

fs.writeFileSync(path.join(__dirname, 'demo.html'), render)
