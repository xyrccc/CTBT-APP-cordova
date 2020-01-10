import {getDistance} from 'ol/sphere'
import  vectorLayer from 'ol/layer/Vector'
import vectorSource from 'ol/source/Vector'
import Draw from 'ol/interaction/Draw'
import LineString from 'ol/geom/LineString'
import {transform} from 'ol/proj'

export default function measureAngle(map){
    const PI = 3.141592654

    var source = new vectorSource()

    var lineLayer = new vectorLayer({
        source: source
    })

    var draw;//画笔
    var lineString;

    function addInteraction(){
        draw = new Draw({
            source:source,
            type: 'LineString',
            maxPoints:2
        })
        map.addInteraction(draw)

        draw.on("drawend",function(evt){
            map.removeInteraction(draw)
            lineString = evt.feature.getGeometry()
            var startPoint = transform(lineString.getFirstCoordinate(),'EPSG:3857','EPSG:4326')
            var endPoint =  transform(lineString.getLastCoordinate(),'EPSG:3857','EPSG:4326')

            var angle = getAngle(startPoint,endPoint)
            switch (angle) {
                case 0:
                    alert('A点在B点的正东方')
                    break;
                case 90:
                    alert('A点在B点的正北方')
                    break;
                case 180:
                    alert('A点在B点的正西方')
                    break;
                case 270:
                    alert('A点在B点的正南方')
                    break;          
                default:
                    break;
            }
            if (angle < 90 && angle > 0) {
                alert("A点在B点的东偏北"+angle+"度方向")
            }else if (angle > 90 && angle < 180) {
                alert("A点在B点的北偏西"+(angle-90)+"度方向")
            }else if (angle < 270 && angle > 180) {
                alert("A点在B点的西偏南"+(angle-180)+"度方向")
            }else if (angle > 270){
                alert("A点在B点的南偏东"+(angle-270)+"度方向")
            }

           
        })
    }
          
    function getAngle(startPoint,endPoint){
        var x = startPoint[0] - endPoint[0]
        var y = startPoint[1] - endPoint[1]
        var angle = -1
        if (y == 0 && x > 0) angle = 0
        if (y == 0 && x < 0) angle = 180
        if(x ==0 && y > 0) angle = 90
        if(x == 0 && y < 0) angle = 270
        if (angle == -1)
        {
            var dislat = getDistance([startPoint[0], endPoint[1]], [endPoint[0], endPoint[1]])//返回的数据是距离，没有负数
            var dislng = getDistance([endPoint[0], startPoint[1]], [endPoint[0], endPoint[1]])
            if (x > 0 && y > 0) angle = Math.atan2(dislng, dislat) / PI * 180;
            if (x < 0 && y > 0) angle = Math.atan2(dislat, dislng) / PI * 180+90;
            if (x < 0 && y < 0) angle = Math.atan2(dislng, dislat) / PI * 180+180;
            if (x > 0 && y < 0) angle = Math.atan2(dislat, dislng) / PI * 180+270;
        }
        return angle
    }
    addInteraction()
    map.addLayer(lineLayer)
    return lineLayer
}