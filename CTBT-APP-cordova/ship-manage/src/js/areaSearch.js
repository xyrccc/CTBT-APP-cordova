import 'ol/ol.css';
import Polygon from 'ol/geom/Polygon';
import Draw, {createRegularPolygon, createBox} from 'ol/interaction/Draw';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import Collection from 'ol/Collection'

export default function areaSearch(map,searchType,shipFeatureSource){
    var source = new VectorSource({wrapX: false})


    var vector = new VectorLayer({
        source: source
    })
    map.addLayer(vector)

    var draw; // global so we can remove it later
    function addInteraction() {
        var value = searchType
        var geometryFunction
        if (value === 'Box') {
            value = 'Circle'
            geometryFunction = createBox()
        } 
        if (value === 'Polygon') {
            value = 'Polygon'
            geometryFunction = null
        } 
        draw = new Draw({
            source: source,
            type: value,
            freehand: true,
            geometryFunction: geometryFunction,
            features: new Collection()
        })          
        map.addInteraction(draw)
    }
    addInteraction() 

    draw.on('drawend',function(e){
       // var features = draw.features_.getArray()     
       var extent = e.feature.getGeometry().getExtent()
       map.removeInteraction(draw)
       //console.log(clusterSource.getSource().getFeaturesInExtent(extent))
       alert("船只数量:"+shipFeatureSource.getFeaturesInExtent(extent).length)
      
       map.removeLayer(vector)
    })
}