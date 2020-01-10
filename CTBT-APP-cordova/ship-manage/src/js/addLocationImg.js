import Style from 'ol/style/Style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import Icon from 'ol/style/Icon'
import { fromLonLat, transform } from 'ol/proj'

export default function addLocationImg(map, longitude, latitude) {

  var locationLayer = new VectorLayer({
    source: new VectorSource()
  })

  var style = new Style({
    image: new Icon({
      src: 'static/images/location.png',
    })
  })

  var feature = new Feature({
    geometry: new Point(fromLonLat([longitude, latitude]))
  })

  feature.setStyle(style)

  locationLayer.getSource().addFeature(feature)
  map.addLayer(locationLayer)

  return locationLayer
}
