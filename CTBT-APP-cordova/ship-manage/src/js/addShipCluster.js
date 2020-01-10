import 'ol/ol.css';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source'
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style';
import {fromLonLat,transform} from 'ol/proj'
import Icon from 'ol/style/Icon'
import Overlay from 'ol/Overlay'
import shipWarningAnimate from './shipWarningAnimate'

export default function addShipCluster(map,shipsList){

    const PI = 3.1415926

    console.log(shipsList)
    var coordTransform = require("coordtransform")
    var count = shipsList.length
    var features = new Array(count)

    for (var i = 0; i < count; ++i) {
      var coordinates = coordTransform.wgs84togcj02(shipsList[i].longitude,shipsList[i].latitude)
      features[i] = new Feature(new Point(transform(coordinates,"EPSG:4326","EPSG:3857")))

      var shipInfo = shipsList[i]

      var style = new Style({
        image: new Icon({
          src: 'static/images/ship_normal.png'
        })
      })
      style.getImage().setRotation((shipsList[i].direction*PI/180))
      features[i].setStyle(style)


      features[i].setId(shipsList[i].id)
      features[i].setProperties(shipInfo)
    }

    var source = new VectorSource({
      features: features,
    });

    var shipsLayer = new VectorLayer({
      source: source,
    });

    shipsLayer.setVisible(false)
    map.addLayer(shipsLayer)

    map.on('moveend',function(){
        var zoom = map.getView().getZoom()
        if (zoom > 8 && zoom <= 19){
          shipsLayer.setVisible(true)
        }else{
          shipsLayer.setVisible(false)
        }
    })

    var contaioner = document.getElementById('popup')
    var content = document.getElementById('popup-content')
    var closer = document.getElementById('popup-closer')
    // 创建一个overlay, 绑定html元素container
    var overlay = new Overlay({
        element: contaioner,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
    })
    //鼠标点击x 消除船信息图框
    closer.onclick = function() {
        overlay.setPosition(undefined)
        closer.blur()
        return false
    }
    var coordinate;
    //为map添加点击事件获取点击处的坐标
    map.on('click',function(event){
      coordinate = event.coordinate
    })
    function showShipInfo(event){
      var features = map.getFeaturesAtPixel(event.pixel)
      if (features.length != 0) {
          if (features[0].getId()){
              shipWarningAnimate(map,features[0])
              var properties = features[0].getProperties()
              content.innerHTML = '<p>You clicked here:</p>'
              +'<p>'+'船名:'+properties.name+ '</p>'
              +'<p>'+'船长:'+properties.owner+ '</p>'
              +'<p>'+'MMSI:'+properties.mmsi+ '</p>'
              +'<p>'+'报警时间:'+properties.receiveDate+ '</p>'
              +'<p>'+'报警类型:'+properties.state+ '</p>'
              +'<p>'+'经度:'+properties.longitude+ '</p>'
              +'<p>'+'纬度:'+properties.latitude+ '</p>'
              +'<p>'+'速度:'+properties.speed+ '</p>'
              +'<p>'+'方向:'+properties.direction+ '</p>'
              +'<p>'+'温度:'+properties.temperature+ '</p>'
              +'<p>'+'电池状态:'+properties.batteryState+ '</p>'
              overlay.setPosition(coordinate)
              map.addOverlay(overlay)
          }
      }
    }
    map.on('click',showShipInfo)
    return source
}
