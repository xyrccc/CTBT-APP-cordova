<template> 
 <div > 
  <div id="allmap" ref="allmap"></div> 
  <router-view></router-view> 
 </div> 
</template> 
<script> 
export default { 
 name: 'App', 
 methods:{ 
  map(){ 
   let map =new BMap.Map(this.$refs.allmap); // 创建Map实例 
   map.centerAndZoom(new BMap.Point(120.15, 30.28), 7);// 初始化地图,设置中心点坐标（经纬度/城市的名称）和地图级别 
   map.addControl(new BMap.MapTypeControl({//添加地图类型控件 
    mapTypes:[ 
     BMAP_NORMAL_MAP, 
     BMAP_HYBRID_MAP 
    ]})); 
   map.setCurrentCity("杭州");// 设置地图显示的城市 此项是必须设置的 
   map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放 
   //map.setMapStyle({style:'midnight'});//地图风格
  } 
 }, 
 mounted(){ 
  //调用上面个的函数
  this.map() 
 } 
} 
</script> 
<style>
/*设置地图的宽高*/
#allmap{
 margin-bottom:10px; 
 height: 622px;
 width:165vh; 
 overflow: hidden;
 padding-top: 0px; 
} 
</style>