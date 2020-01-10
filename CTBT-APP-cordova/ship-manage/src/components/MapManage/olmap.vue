<template>

 <div >
   <!--startprint-->
  <div id="allmap" ref="allmap"></div>
   <!--endprint-->
    <!-- <p>{{this.data}}</p> -->
  <!-- 船信息显示 start-->
  <div id="popup" class="ol-popup" v-show="show">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
 </div>
 <!-- 船信息显示 end-->
  <router-view></router-view>
 </div>

</template>
<script>
import "ol/ol.css"
import { Map, View } from "ol"
import Tile from "ol/layer/Tile"
import OSM from "ol/source/OSM"
import XYZ from "ol/source/XYZ"
import {transform} from 'ol/proj'
import {toLonLat} from 'ol/proj'
import addShip from "../../js/addShipLayer"
import showShipTrace from '../../js/showShipTrace'
import addShipCluster from "../../js/addShipCluster"
import addFishingZone from "../../js/addFishingZone"
import axiosPost from "../../js/utils/axiosPost"
import addLocationImg from "../../js/addLocationImg"
import addAlarmShipImg from "../../js/addAlarmShipImg"
import showAlarmRings from "../../js/showAlarmRings";

export default {
 name: 'App',
 data(){
     return{
         show:false,
         map: null,
         tempVectorLayer: [],
         longitude: this.$route.params.longitude,
         latitude: this.$route.params.latitude,
         alarmLongitude: this.$route.params.alarmLongitude,
         alarmLatitude: this.$route.params.alarmLatitude,

         // playbackShipsList:this.$route.params.playbackShipsList,
       LoginInitData:{
         "shipsList":"",
         "alarmMesList":"",
         "alarmRecordList":"",
         "allShipsCount":"",
         "areaAlarmList":"",
         "ctbtMapMarkList":"",
         "ctbtUserShipColorList":"",
         "cultureAreaList":"",
         "shipTeamAlarmList":""
       },
       flag: null,
         val:{
            map: null,
            clusterSource:null
         },
     }
 },
 watch:{
   LoginInitData: function(){
       // console.log(this.LoginInitData)
     this.val.clusterSource = addShipCluster(this.val.map,this.LoginInitData.shipsList);
     this.$emit('getMap',this.val);
     this.show=true;
   }
 },
 methods:{
  drawMap(){
        var _this = this;
        _this.val.map = new Map({
          target:"allmap",
          layers:[
              new Tile({
                  source: new XYZ({
                      crossOrigin:'anonymous',
                      url:'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
                  })
              }),
               new Tile({
                  source: new XYZ({
                      crossOrigin:'anonymous',
                      url:'http://www.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}'
                  }),
              })
          ],
          view: new View({
             // projection: "EPSG:4326",
              center:transform([117,30],'EPSG:4326','EPSG:3857'),
              zoom:4,
              maxZoom:19,
              minZoom:0
          })
      })
    },
    //鼠标经纬度
    mouseSite(){
      var _this = this;
      _this.val.map.on('click',function(){
          console.log(transform(_this.val.map.getEventCoordinate(event),'EPSG:3857','EPSG:4326'));
      })
    },
    //添加大鱼区
    getLoginInitData(){
      var args = '{"userId":"'+ localStorage.getItem("userEncryptId")  +'" }'
      axiosPost("/api/CTBT/services/Ships","loginInit",args,this).then((res) => {
        this.LoginInitData = JSON.parse(res)
      })
    }
},
    mounted(){

        this.drawMap();

        //报警定位方法start
        if(typeof (this.alarmLongitude)!="undefined"&&typeof (this.alarmLatitude)!="undefined"){
            var center = transform(
                [this.alarmLongitude, this.alarmLatitude],
                "EPSG:4326",
                "EPSG:3857"
            );
            this.val.map.getView().setCenter(center);
            this.val.map.getView().setZoom(7);
            var tempLayer = addAlarmShipImg(
                this.val.map,
                this.longitude,
                this.latitude
            );
            this.tempVectorLayer.push(tempLayer);
        }
        //报警定位方法end

        //定位方法start
        if(typeof (this.longitude)!="undefined"&&typeof (this.latitude)!="undefined"){
            var center = transform(
                [this.longitude, this.latitude],
                "EPSG:4326",
                "EPSG:3857"
            );
            this.val.map.getView().setCenter(center);
            this.val.map.getView().setZoom(7);
            var tempLayer = addLocationImg(
                this.val.map,
                this.longitude,
                this.latitude
            );
            this.tempVectorLayer.push(tempLayer);
        }
        //定位方法end

       //  //轨迹回放start
       //  if (typeof(this.playbackShipsList)!="undefined") {
       //      console.log(this.playbackShipsList)
       //      showShipTrace(this.val.map, this.playbackShipsList);
       //  }
       // //轨迹回放end

       this.$emit('getMap',this.val);
       addFishingZone(this.val.map,this.flag);
        setTimeout(()=>{
            this.getLoginInitData();
        }, 10000);
      }
 }
</script>
<style>
/*设置地图的宽高*/
#allmap{
 /*margin-bottom:5vh;*/
  /*margin-right: 5vw;*/
 height: 100vh;
 width:100vw;
  margin: 0;
 /*overflow: hidden;*/
 /*padding-top: 0px;*/
}
    /**船信息图框样式 start*/
      .ol-popup {
        position: absolute;
        background-color: white;
        -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #cccccc;
        bottom: 12px;
        left: -50px;
        min-width: 200px;
      }
      .ol-popup:after, .ol-popup:before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }
      .ol-popup:after {
        border-top-color: white;
        border-width: 10px;
        left: 48px;
        margin-left: -10px;
      }
      .ol-popup:before {
        border-top-color: #cccccc;
        border-width: 11px;
        left: 48px;
        margin-left: -11px;
      }
      .ol-popup-closer {
        text-decoration: none;
        position: absolute;
        top: 2px;
        right: 8px;
      }
      .ol-popup-closer:after {
        content: "✖";
      }
      #popup-content {
        line-height: 1px;
        font-size: 14px
      }
     /**船信息图框样式 end*/


    .ol-tooltip {
      position: relative;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      color: white;
      padding: 4px 8px;
      opacity: 0.7;
      white-space: nowrap;
      font-size: 12px;
    }
    .ol-tooltip-measure {
      opacity: 1;
      font-weight: bold;
    }
    .ol-tooltip-static {
      background-color: #ffcc33;
      color: black;
      border: 1px solid white;
    }
    .ol-tooltip-measure:before,
    .ol-tooltip-static:before {
      border-top: 6px solid rgba(0, 0, 0, 0.5);
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
      content: "";
      position: absolute;
      bottom: -6px;
      margin-left: -7px;
      left: 50%;
    }
    .ol-tooltip-static:before {
      border-top-color: #ffcc33;
    }
</style>
