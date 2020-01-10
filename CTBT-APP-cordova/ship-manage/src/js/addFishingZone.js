
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point, LineString, Polygon } from 'ol/geom'
import Feature from 'ol/Feature'
import { Style, Stroke, Circle, Fill, Text } from 'ol/style'
import { transform } from 'ol/proj'
import fishZoneData from './utils/fishZoneData'

export default function addFishingZone(map,flag) {
    //大渔区
    var bigFishingZonesource = new VectorSource()
    //小渔区
    var smallFishingZonesource = new VectorSource()
    //大渔区数字
    var pointNumZonesource = new VectorSource()
    //韩国配合中国伏季休渔水域
    var HGPHZGFJXYSYSource = new VectorSource()
    //长江口渔业管理区
    var CJKYYGLQSource = new VectorSource()
    //中越共同渔区
    var ZYGTYYSource = new VectorSource()
    //韩特定水域
    var HTDSYSource = new VectorSource()
    //韩国渔业禁区
    var HGYYJQSource = new VectorSource()
    //中越过渡性水域
    var ZYGDXSYSource = new VectorSource()
    //中韩渔业协定暂定措施水域
    var ZHYYXDZDCSSYSource = new VectorSource()
    //中日渔业协定暂定措施水域
    var ZRYYXDZDCSSYSource = new VectorSource()
    //中国维持现有渔业活动水域界限
    var ZGWCXYYYHDSYJXSource = new VectorSource()
    //机轮拖网渔业禁渔区线
    var JLTWYYJYQXSource = new VectorSource()
    //中日管理线以北
    var ZRGLXYBSource = new VectorSource()
    //中越渔业分界线
    var ZYYYFJXSource = new VectorSource()
    //韩国分界线
    var HGFJXSource = new VectorSource()

    //大渔区数据
    var bigFishingZoneDatas = fishZoneData().bigFishingZoneDatas
    //小渔区数据
    var smallFishingZoneDatas = fishZoneData().smallFishingZoneDatas
    //point_num
    var pointNum = fishZoneData().pointNum
    //所有渔区文字数据
    var AllFishingZoneData = [
        fishZoneData().HGPHZGFJXYSY, fishZoneData().CJKYYGLQ, fishZoneData().ZYGTYY, fishZoneData().HTDSY,
        fishZoneData().HGYYJQ, fishZoneData().ZYGDXSY, fishZoneData().ZHYYXDZDCSSY, fishZoneData().ZRYYXDZDCSSY, fishZoneData().ZGWCXYYYHDSYJX,
        fishZoneData().JLTWYYJYQX, fishZoneData().ZRGLXYB, fishZoneData().ZYYYFJX]
    //所有渔区面积数据
    var AllFishZoneAreaData = [
        fishZoneData().HGPHZGFJXYSYPolygon, fishZoneData().CJKYYGLQPolygon, fishZoneData().ZYGTYYPolygon, fishZoneData().HTDSYPolygon1,
        fishZoneData().HTDSYPolygon2, fishZoneData().HGYYJQPolygon1, fishZoneData().HGYYJQPolygon2, fishZoneData().ZYGDXSYPolygon,
        fishZoneData().ZHYYXDZDCSSYPolygon, fishZoneData().ZRYYXDZDCSSYPolygon
    ]
    //所有渔区管理线、禁区线
    var AllFishZoneLine = [
        fishZoneData().ZGWCXYYYHDSYJXLineString, fishZoneData().JLTWYYJYQXLineString1, fishZoneData().JLTWYYJYQXLineString2,
        fishZoneData().JLTWYYJYQXLineString3, fishZoneData().ZRGLXYBLineString1, fishZoneData().ZRGLXYBLineString2,
        fishZoneData().ZYYYFJXLineString, fishZoneData().HGFJX1, fishZoneData().HGFJX2
    ]

    //坐标转换
    function tranPoint(coordinate) {
        let len = coordinate.length
        for (let i = 0; i < len; i++) {
            coordinate[i] = transform(coordinate[i], 'EPSG:4326', 'EPSG:3857')
        }
        return coordinate
    }
    //画渔区
    function drawZone(Arrays, source) {
        let len = Arrays.length
        for (let i = 0; i < len; i += 2) {
            var lineArray = []
            lineArray.push(Arrays[i])
            lineArray.push(Arrays[i + 1])

            var LineStringFeature = new Feature(
                new LineString(lineArray)
            )
            source.addFeature(LineStringFeature)
        }
    }
    //画大渔区中间的数字
    function drawNum(Arrays, source) {
        let len = Arrays.length
        for (let i = 0; i < len; i++) {

            var coordinate = [Arrays[i][1], Arrays[i][2]]
            var pointFeature = new Feature({
                geometry: new Point(coordinate),
            })
            var style = new Style({
                text: new Text({
                    font: '12px',
                    text: Arrays[i][0].toString(),
                    fill: new Fill({
                        color: "#000"
                    })
                })
            })
            pointFeature.setStyle(style)
            source.addFeature(pointFeature)
        }
    }
    //各种协定渔区的文字说明
    function drawAllFishingZoneData(AllFishingZoneData) {
        let n = AllFishingZoneData.length
        for (let j = 0; j < n; j++) {
            let len = AllFishingZoneData[j].length
            for (let i = 0; i < len; i++) {

                var coordinate = [AllFishingZoneData[j][i][1], AllFishingZoneData[j][i][2]]
                var pointFeature = new Feature({
                    geometry: new Point(coordinate),
                })
                var style = new Style({
                    text: new Text({
                        font: 'bold 16px serif',
                        text: AllFishingZoneData[j][i][0].toString(),
                        fill: new Fill({
                            color: "#ffe"
                        })
                    })
                })
                var source;
                switch (i) {
                    case 0:
                        source = HGPHZGFJXYSYSource
                        break;
                    case 1:
                        source = CJKYYGLQSource
                        break;
                    case 2:
                        source = ZYGTYYSource
                        break;
                    case 3:
                        source = HTDSYSource
                        break;
                    case 4:
                        source = HGYYJQSource
                        break;
                    case 5:
                        source = ZYGDXSYSource
                        break;
                    case 6:
                        source = ZHYYXDZDCSSYSource
                        break;
                    case 7:
                        source = ZRYYXDZDCSSYSource
                        break;
                    case 8:
                        source = ZGWCXYYYHDSYJXSource
                        break;
                    case 9:
                        source = JLTWYYJYQXSource
                        break;
                    case 10:
                        source = ZRGLXYBSource
                        break;
                    case 11:
                        source = ZYYYFJXSource
                        break;
                    default:
                        break;
                }
                pointFeature.setStyle(style)
                source.addFeature(pointFeature)
            }
        }
    }
    //各种协定的渔区面积示意
    function drawAllFishZoneAreaData(AllFishZoneAreaData) {
        let n = AllFishZoneAreaData.length
        for (let i = 0; i < n; i++) {
            let areaArray = []
            areaArray.push(AllFishZoneAreaData[i])
            var areaFeature = new Feature(
                new Polygon(areaArray)
            )
            var style;
            if (i == 5 || i == 6) {
                style = new Style({
                    stroke: new Stroke({
                        color: "#f00",
                        width: 1.5
                    }),
                    fill: new Fill({
                        color: [240, 0, 0, 0.2]
                    })
                })
            } else {
                style = new Style({
                    stroke: new Stroke({
                        width: 0.01
                    }),
                    fill: new Fill({
                        color: [255, 255, 255, 0.1]
                    })
                })
            }
            var source;
            switch (i) {
                case 0:
                    source = HGPHZGFJXYSYSource
                    break;
                case 1:
                    source = CJKYYGLQSource
                    break;
                case 2:
                    source = ZYGTYYSource
                    break;
                case 3:
                    source = HTDSYSource
                    break;
                case 4:
                    source = HTDSYSource
                    break;
                case 5:
                    source = HGYYJQSource
                    break;
                case 6:
                    source = HGYYJQSource
                    break;
                case 7:
                    source = ZYGDXSYSource
                    break;
                case 8:
                    source = ZHYYXDZDCSSYSource
                    break;
                case 9:
                    source = ZRYYXDZDCSSYSource
                    break;
                default:
                    break;
            }
            areaFeature.setStyle(style)
            source.addFeature(areaFeature)
        }
    }

    //各种渔区管理线、禁区线示意
    function drawFishZoneLineData(AllFishZoneLine) {
        let n = AllFishZoneLine.length
        for (let i = 0; i < n; i++) {
            var lineFeature = new Feature(
                new LineString(AllFishZoneLine[i])
            )
            var style = new Style({
                stroke: new Stroke({
                    width: 1,
                    color: "#f00"
                }),
            })
            lineFeature.setStyle(style)
            var source;
            switch (i) {
                case 0:
                    source = ZGWCXYYYHDSYJXSource
                    break;
                case 1:
                    source = JLTWYYJYQXSource
                    break;
                case 2:
                    source = JLTWYYJYQXSource
                    break;
                case 3:
                    source = JLTWYYJYQXSource
                    break;
                case 4:
                    source = ZRGLXYBSource
                    break;
                case 5:
                    source = ZRGLXYBSource
                    break;
                case 6:
                    source = ZYYYFJXSource
                    break;
                case 7:
                    source = HGFJXSource
                    break;
                case 8:
                    source = HGFJXSource
                    break;
                default:
                    break;
            }
            source.addFeature(lineFeature)
        }
    }

    drawNum(pointNum, pointNumZonesource)
    //画大渔区
    drawZone(bigFishingZoneDatas, bigFishingZonesource)

    var smallFishingdatas = tranPoint(smallFishingZoneDatas)
    //添加小渔区
    drawZone(smallFishingdatas, smallFishingZonesource)

    drawAllFishingZoneData(AllFishingZoneData, HGPHZGFJXYSYSource)

    drawAllFishZoneAreaData(AllFishZoneAreaData)

    drawFishZoneLineData(AllFishZoneLine)


    var bigFishingZoneLayer = new VectorLayer({
        source: bigFishingZonesource,
        style: new Style({
            stroke: new Stroke({
                color: '#0c6',
                // lineDash: [10, 10],
                width: 1.2
            })
        })
    })
    var smallFishingZoneLayer = new VectorLayer({
        source: smallFishingZonesource,
        style: new Style({
            stroke: new Stroke({
                color: '#ff6',
                lineDash: [2, 2],
                width: 0.6
            })
        })
    })

    var pointNumZoneLayer = new VectorLayer({
        source: pointNumZonesource
    })

    var HGPHZGFJXYSYLayer = new VectorLayer({
        source: HGPHZGFJXYSYSource
    })

    //长江口渔业管理区
    var CJKYYGLQLayer = new VectorLayer({
        source: CJKYYGLQSource
    })
    //中越共同渔区
    var ZYGTYYLayer = new VectorLayer({
        source: ZYGTYYSource
    })
    //韩特定水域
    var HTDSYLayer = new VectorLayer({
        source: HTDSYSource
    })
    //韩国渔业禁区
    var HGYYJQLayer = new VectorLayer({
        source: HGYYJQSource
    })
    //中越过渡性水域
    var ZYGDXSYLayer = new VectorLayer({
        source: ZYGDXSYSource
    })
    //中韩渔业协定暂定措施水域
    var ZHYYXDZDCSSYLayer = new VectorLayer({
        source: ZHYYXDZDCSSYSource
    })
    //中日渔业协定暂定措施水域
    var ZRYYXDZDCSSYLayer = new VectorLayer({
        source: ZRYYXDZDCSSYSource
    })
    //中国维持现有渔业活动水域界限
    var ZGWCXYYYHDSYJXLayer = new VectorLayer({
        source: ZGWCXYYYHDSYJXSource
    })
    //机轮拖网渔业禁渔区线
    var JLTWYYJYQXLayer = new VectorLayer({
        source: JLTWYYJYQXSource
    })
    //中日管理线以北
    var ZRGLXYBLayer = new VectorLayer({
        source: ZRGLXYBSource
    })
    //中越渔业分界线
    var ZYYYFJXLayer = new VectorLayer({
        source: ZYYYFJXSource
    })
    //韩国分界线
    var HGFJXLayer = new VectorLayer({
        source: HGFJXSource
    })

    map.addLayer(bigFishingZoneLayer)
    map.addLayer(smallFishingZoneLayer)
    map.addLayer(pointNumZoneLayer)

    //分界线
    map.addLayer(ZGWCXYYYHDSYJXLayer)
    map.addLayer(JLTWYYJYQXLayer)
    map.addLayer(ZRGLXYBLayer)
    map.addLayer(ZYYYFJXLayer)
    map.addLayer(HGFJXLayer)
    //区域面积
    map.addLayer(HGPHZGFJXYSYLayer)
    map.addLayer(CJKYYGLQLayer)
    map.addLayer(ZYGTYYLayer)
    map.addLayer(HTDSYLayer)
    map.addLayer(HGYYJQLayer)
    map.addLayer(ZYGDXSYLayer)
    map.addLayer(ZHYYXDZDCSSYLayer)
    map.addLayer(ZRYYXDZDCSSYLayer)

    map.on('moveend', function () {
        var zoom = map.getView().getZoom()
        if (zoom > 8 && zoom <= 19) {
            bigFishingZoneLayer.setVisible(true)
            smallFishingZoneLayer.setVisible(true)
            pointNumZoneLayer.setVisible(true)
        } else {
            bigFishingZoneLayer.setVisible(false)
            smallFishingZoneLayer.setVisible(false)
            pointNumZoneLayer.setVisible(false)
        }
    })
}

