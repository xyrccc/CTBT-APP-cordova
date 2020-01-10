import {unByKey} from 'ol/Observable';
import {easeOut} from 'ol/easing';
import {Circle as CircleStyle, Stroke, Style} from 'ol/style';
import {getVectorContext} from 'ol/render';
export default function shipWarningAnimate(map, feature) {
    var start = new Date().getTime();
    var tileLayer = map.getLayers().item(0)
    var listenerKey = tileLayer.on('postrender', animate);

    function animate(event) {
        var vectorContext = getVectorContext(event);
        var frameState = event.frameState;
        var flashGeom = feature.getGeometry().clone();
        var elapsed = frameState.time - start;
        var elapsedRatio = elapsed / 3000;
        // radius will be 5 at start and 30 at end.
        var radius = easeOut(elapsedRatio) * 25 + 5;
        var opacity = easeOut(1 - elapsedRatio);

        var style = new Style({
            image: new CircleStyle({
                radius: radius,
                stroke: new Stroke({
                    color: 'rgba(255, 0, 0, ' + opacity + ')',
                    width: 0.25 + opacity
                })
            })
        });

        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);
        if (elapsed > 3000) {
            unByKey(listenerKey);
            return;
        }
        // tell OpenLayers to continue postrender animation
        map.render();
    }
}