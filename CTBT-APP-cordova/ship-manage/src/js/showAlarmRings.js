import Style from 'ol/style/Style'
import Feature from 'ol/Feature'
import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import Icon from 'ol/style/Icon'
import { fromLonLat, transform } from 'ol/proj'
import {Fill, Stroke} from "ol/style";
import { Point, LineString, Polygon } from 'ol/geom'


export default function showAlarmRings(map,rings) {

  console.log(rings)

  function tranPoint(coordinate) {
    var len = coordinate.length
    for (var i = 0; i < len; i++) {
      coordinate[i] = transform(coordinate[i], 'EPSG:4326', 'EPSG:3857')
    }
    return coordinate
  }

  var locationLayer = new VectorLayer({
    source: new VectorSource()
  })

  var style = new Style({
    stroke: new Stroke({
      width: 4,
      color: "#f00"
    })
  })

  for (let i = 0; i < rings.length; i++) {

    //墨卡托转经纬度
    var ringLonLat=[];
    let mercator_ring=rings[i];
    for (let j = 0; j <mercator_ring.length ; j++) {
      let mercator_x=mercator_ring[j][0];
      let mercator_y=mercator_ring[j][1];
      let x=mercator_x / 20037508.34 * 180;
      let y=mercator_y / 20037508.34 * 180;
      y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
      ringLonLat[j]=[x,y];
    }
    console.log(ringLonLat)

    var feature = new Feature({
      geometry: new LineString(tranPoint(ringLonLat))
    })
    feature.setStyle(style)
    locationLayer.getSource().addFeature(feature)
  }

  map.addLayer(locationLayer)

  return locationLayer
}
