import VectorLayer from 'ol/layer/Vector'
import {Vector} from 'ol/source';
import Icon from 'ol/style/Icon'
import Style from 'ol/style/Style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import {fromLonLat,transform} from 'ol/proj'
import Overlay from 'ol/Overlay'
import {toStringHDMS} from 'ol/coordinate'



export default function addShip(map){
    var coordinate = null
    var shipLayer = new VectorLayer({
        source: new Vector()
    })

    var shipX = [123.1,123.2,123.3,123.4]
    var shipY = [30,30,30,30]
    var data_value = 'JSXX 085 365787 2019-09-26|02:19:37 2 0124-07-23-09 0030-37-50-04 019 118 025 1 N51'
   // var data_key = 'JSXX 船长 终端卡号 报警时间 报警类型 经度 纬度 速度 方向 温度 电池状态 未知'
    var values = data_value.split(' ')
    var index = 0
    var shipInfo = {'JSXX':values[index++],'船长':values[index++],'终端卡号':values[index++],'报警时间':values[index++],
    '报警类型':values[index++] ,'经度':values[index++], '纬度':values[index++],
    '速度':values[index++],'方向':values[index++],'温度':values[index++],'电池状态':values[index++],
    '未知':values[index] }

    var style = new Style({
        image: new Icon({
           src:'../../static/images/ship_normal.png',
           rotation: 1
        })
    })
    //为map添加点击事件获取点击处的坐标
    map.on('click',function(event){
        coordinate = event.coordinate
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

    //实现小船的移动
    var i = 0
    setInterval(() => {
        map.removeLayer(shipLayer)
        ship(1,0)
        ship(2,1)
        ship(3,2)
        // addShip()
        i++
        map.addLayer(shipLayer)
        // var extent = [0,0,1200000,7000000]
        // console.log(shipLayer.getSource().getFeaturesInExtent(extent))
    },6000)

    function ship(shipId,offSize){
        if (i != 0){
            var feature = shipLayer.getSource().getFeatureById(shipId)      
            shipLayer.getSource().removeFeature(feature)
        }
        var shipFeature= new Feature({
			geometry: new Point(fromLonLat([shipX[(i)%4],shipY[(i)%4]+offSize]))
        })
        shipFeature.setProperties(shipInfo)  
        shipFeature.setId(shipId)    
		shipFeature.setStyle(style);
        shipLayer.getSource().addFeature(shipFeature)
    }

    // function ship(shipId,shipSite){
    //     if (i != 0){
    //         var feature = shipLayer.getSource().getFeatureById(shipId)      
    //         shipLayer.getSource().removeFeature(feature)
    //     }
    //     var shipFeature= new Feature({
	// 		geometry: new Point(fromLonLat(shipSite))
    //     })
    //     shipFeature.setProperties(shipInfo)  
    //     shipFeature.setId(shipId)    
	// 	shipFeature.setStyle(style);
    //     shipLayer.getSource().addFeature(shipFeature)
    // }

    function addShip(){
        var count = 10000;
        var e = 4500000
        for (var i = 0; i < count; ++i) {
            var shipSite = [2 * e * Math.random() - e+1000000,  2 * e * Math.random() - e]
            var s = transform(shipSite,'EPSG:3857','EPSG:4326')
            ship(i+1,s)
        }
    }

    function showShipInfo(event){
        var hdms = toStringHDMS(transform(coordinate, 'EPSG:3857', 'EPSG:4326'))
        var features = map.getFeaturesAtPixel(event.pixel)
        if (features.length != 0) {
            if (features[0].getId()){
                var properties = features[0].getProperties()
                content.innerHTML = '<p>You clicked here:</p>' + hdms 
                +'<p>'+'JSXX:'+properties.JSXX+ '</p>'
                +'<p>'+'船长:'+properties.船长+ '</p>'
                +'<p>'+'终端卡号:'+properties.终端卡号+ '</p>'
                +'<p>'+'报警时间:'+properties.报警时间+ '</p>'
                +'<p>'+'报警类型:'+properties.报警类型+ '</p>'
                +'<p>'+'经度:'+properties.经度+ '</p>'         
                +'<p>'+'纬度:'+properties.纬度+ '</p>'
                +'<p>'+'速度:'+properties.速度+ '</p>'
                +'<p>'+'方向:'+properties.方向+ '</p>'
                +'<p>'+'温度:'+properties.温度+ '</p>'
                +'<p>'+'电池状态:'+properties.电池状态+ '</p>'
                +'<p>'+'未知:'+properties.未知+'</p>'
                overlay.setPosition(coordinate)
                map.addOverlay(overlay)
            }
        }
    }
    map.on('click',showShipInfo) 

  
}



