import Overlay from 'ol/Overlay'
import Icon from 'ol/style/Icon'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point, LineString, Polygon } from 'ol/geom'
import Feature from 'ol/Feature'
import { Style, Stroke, Circle, Fill } from 'ol/style'
import { toStringHDMS } from 'ol/coordinate'
import { transform } from 'ol/proj'
import {lessThan} from "ol/format/filter";
import {pointerMove} from "ol/events/condition";

export default function showShipTrace(map,playbackShipsList) {

  const PI = 3.1415926;

  var coordinate = [];//Polygon 多边形,Point 点,LineString 线

  for (let j = 0; j < playbackShipsList.length; j++) {
    let location = playbackShipsList[j].location;
    for (let i = 0; i < location.length; i++) {
      coordinate[i] = [location[i].longitude, location[i].latitude];
    }
    console.log(coordinate);

    var source = new VectorSource();

    function tranPoint(coordinate) {
      for (let i = 0; i < coordinate.length; i++) {
        coordinate[i] = transform(coordinate[i], 'EPSG:4326', 'EPSG:3857');
      }
      return coordinate;
    }

    var shipSites = tranPoint(coordinate);

    var LineStringFeature = new Feature(
      new LineString(shipSites)
    );//绘制多边形的数据


    source.addFeature(LineStringFeature);

    var vectorLayer = new VectorLayer({
      source: source,
      style: new Style({
        stroke: new Stroke({
          color: '#FFFF00',
          width: 4
        }),
        // image: new Circle({
        //   radius: 2,
        //   fill: new Fill({
        //     color: '#f00'
        //   })
        // })
      })
    });


    for (let i = 0; i < shipSites.length; i++) {
      var shipIcon = new Icon({
        src: 'static/images/ship_track.png',
      })
      var style = new Style({
        image: shipIcon,
      })
      var shipFeature = new Feature({
        geometry: new Point(shipSites[i])
      })

      shipIcon.setRotation(location[i].direction * PI / 180)

      shipFeature.setStyle(style);
      //shipFeature.setId(i)
      vectorLayer.getSource().addFeature(shipFeature)
    }

    map.addLayer(vectorLayer)
  }
}

