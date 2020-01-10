<template>
  <div>
    <el-container class="Main">
      <el-button
        icon="el-icon-s-unfold"
        style="position: fixed;left: 0;top: 0;height: 60px;width: 80px;font-size: x-large;margin-top: env(safe-area-inset-top);"
        @click="table3 = true"
      ></el-button>
      <el-drawer :visible.sync="table3" direction="ltr" size="50%">
          <h2>CTBT船舶动态管理平台</h2>
          <div style="height:60px">
            <el-row>
              <el-col :span="2" style="margin-left:20px">
                <el-avatar icon="el-icon-user-solid" size="large"></el-avatar>
              </el-col>
              <el-col :span="6" style="margin-left:30px;margin-top:10px">
                <div>ID:{{userName}}</div>
              </el-col>
            </el-row>
          </div>
          <el-menu router :default-active="$route.path">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/System/system">系统设置</el-menu-item>
                <el-menu-item index="/System/Password">修改密码</el-menu-item>
<!--                <el-menu-item index="/System/Sound">音效设置</el-menu-item>-->
                <el-menu-item @click="withdraw()">退出系统</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-view"></i>
                <span>海图管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/MapManage/olmapApp">显示地图</el-menu-item>
                <el-menu-item @click="measureSea('line')">海图测距</el-menu-item>
                <el-menu-item @click="measureSea('area')">海图测面</el-menu-item>
                <el-menu-item @click="mapScreen()">海图拍照</el-menu-item>
                <el-menu-item @click="mapPrint()">海图打印</el-menu-item>
                <el-menu-item @click="dialogFormVisible = true">海图定位</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-ship"></i>
                <span>船舶管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/ShipManage/MyShips">我的船舶</el-menu-item>
                <el-menu-item index="/ShipManage/Search">船舶查询</el-menu-item>
                <el-menu-item index="/ShipManage/NoPowerShips">无动力船舶</el-menu-item>
                <el-menu-item index="/ShipManage/NoPowerSearch">无动力船舶查询</el-menu-item>
<!--                <el-menu-item @click="areaSearch('Box')">区域回放</el-menu-item>-->
<!--                <el-menu-item index="/ShipManage/ShipTrace">船舶追踪</el-menu-item>-->
<!--                <el-menu-item index="/ShipManage/GroupManage">编组管理</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-phone-outline"></i>
                <span>报警救援</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/Alarm/AlarmShips">报警船舶</el-menu-item>
<!--                <el-menu-item index="/Alarm/AlarmSearch">报警查询</el-menu-item>-->
<!--                <el-menu-item index="1-2">视屏通话</el-menu-item>-->
<!--                <el-menu-item index="/Alarm/PortSearch">港口查询</el-menu-item>-->
<!--                <el-menu-item index="/Alarm/Rescue">船舶救援</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-place"></i>
                <span>警戒区域</span>
              </template>
              <el-menu-item-group>
<!--                <el-menu-item index="1-1">添加警戒</el-menu-item>-->
<!--                <el-menu-item index="/WarnRegion/ExactAdd">精确添加警戒</el-menu-item>-->
<!--                <el-menu-item index="/WarnRegion/Seewarn">查询警戒</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <i class="el-icon-search"></i>
                <span>查询统计</span>
              </template>
              <el-menu-item-group>
<!--                <el-menu-item index="/Searchcount/Searchdata">数据源统计</el-menu-item>-->
                <el-menu-item index="/Searchcount/Sailcount">航程统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-warning-outline"></i>
                <span>帮助</span>
              </template>
              <el-menu-item-group>
<!--                <el-menu-item index="1-1">帮助文档</el-menu-item>-->
<!--                <el-menu-item index="1-2">关于我们</el-menu-item>-->
<!--                <el-menu-item index="1-2">船舶摄像机</el-menu-item>-->
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
      </el-drawer>

      <el-container>
        <el-header style="width:100vw;margin-top: env(safe-area-inset-top);" class="icon">
          <div style="font-size: 23px;margin-left: 80px;margin-top: 10px">
            船舶动态管理平台
          </div>
<!--          <div>-->
<!--            <el-tooltip content="圆形搜索" placement="top">-->
<!--              <el-button @click="areaSearch('Circle')" icon="el-icon-search" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="距形搜索" placement="top">-->
<!--              <el-button @click="areaSearch('Box')" icon="el-icon-zoom-in" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="任意搜索" placement="top">-->
<!--              <el-button @click="areaSearch('Polygon')" icon="el-icon-aim" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="船舶查询" placement="top">-->
<!--              <router-link :to="{name:'Search'}">-->
<!--               <el-button icon="el-icon-ship" circle></el-button>-->
<!--              </router-link>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="AIS船舶" placement="top">-->
<!--              <el-button icon="el-icon-view" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="视频录制" placement="top">-->
<!--              <el-button icon="el-icon-video-camera" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="警戒区域" placement="top">-->
<!--              <el-button @click="showAlarmRings()" icon="el-icon-warning" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="人员报警" placement="top">-->
<!--              <el-button @click="dialogFormVisible_process=true" icon="el-icon-phone-outline" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="区域选择" placement="top">-->
<!--              <el-button @click="dialogZoneVisible = true" icon="el-icon-full-screen" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="清除所有轨迹" placement="top">-->
<!--              <el-button @click="removeAllTrace()" icon="el-icon-error" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="快照" placement="top">-->
<!--              <el-button @click="mapScreen()" icon="el-icon-camera" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="测距" placement="top">-->
<!--              <el-button @click="measureSea('line')" icon="el-icon-s-flag" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="测面积" placement="top">-->
<!--              <el-button @click="measureSea('area')" icon="el-icon-house" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="测方位角" placement="top">-->
<!--              <el-button @click="measureAngler" icon="el-icon-pie-chart" circle></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="编组报警" placement="top">-->
<!--              <el-button icon="el-icon-phone" circle></el-button>-->
<!--            </el-tooltip>-->
<!--          </div>-->
<!--          <el-button-->
<!--            icon="el-icon-caret-left"-->
<!--            size="mini"-->
<!--            style="width:2px;height:40px;position: fixed;bottom: 2rem;right: 2rem;z-index: 9999;bottom:35rem"-->
<!--            @click="table2 = true"-->
<!--          ></el-button>-->
        </el-header>
        <el-main style="width:100vw;padding: 0">
          <transition>
            <router-view v-on:getMap="getMapObject"></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
<!--    <el-button-->
<!--      icon="el-icon-caret-top"-->
<!--      size="mini"-->
<!--      style="position: fixed;bottom: 2rem;right: 5rem;z-index: 9999;"-->
<!--      @click="table = true"-->
<!--    ></el-button>-->
    <el-drawer
      :visible.sync="table"
      direction="btt"
      size="50%">
      <el-table :data="this.gridData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
        <el-table-column  prop="ships.name" label="船名"></el-table-column>
        <el-table-column  prop="ships.shipType" label="船舶类型"></el-table-column>
        <el-table-column  prop="ships.productId" label="产品ID"></el-table-column>
        <el-table-column  prop="deviceType" label="设备类型"></el-table-column>
        <el-table-column  prop="deviceId" label="设备ID"></el-table-column>
        <el-table-column  prop="time" label="报警时间"  ></el-table-column>
        <el-table-column  prop="alarmType.typeName" label="报警类型"  ></el-table-column>
        <el-table-column  prop="processStatus" label="处理状态"  ></el-table-column>
        <el-table-column  prop="" label="处理情况"  ></el-table-column>//
        <el-table-column  prop="myAlarmToUser.processType" label="我的处理结果"  ></el-table-column>
        <el-table-column  prop="myAlarmToUser.processTime" label="我的处理时间"  ></el-table-column>
        <el-table-column  prop="myAlarmToUser.processBy" label="我的处理操作人"  ></el-table-column>
        <el-table-column  prop="" label="备注"  ></el-table-column>//
        <el-table-column  prop="longitude" label="经度"  ></el-table-column>
        <el-table-column  prop="latitude" label="纬度"  ></el-table-column>
        <el-table-column  prop="ships.equipmentid" label="卡号"  ></el-table-column>
        <el-table-column  prop="ships.mmsi" label="MMSI"  ></el-table-column>
        <el-table-column  prop="temperature" label="温度"  ></el-table-column>
        <el-table-column  prop="batteryState" label="电池"  ></el-table-column>
        <el-table-column  prop="direction" label="航向"  ></el-table-column>
        <el-table-column  prop="speed" label="航速"  ></el-table-column>
        <el-table-column  prop="ships.province" label="省份"  ></el-table-column>
        <el-table-column  prop="ships.city" label="城市"  ></el-table-column>
        <el-table-column  prop="ships.county" label="区"  ></el-table-column>
      </el-table>
      <div align="center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="gridData.length">
        </el-pagination>
      </div>
    </el-drawer>
<!--    <el-drawer :visible.sync="table2" direction="rtl" size="30%">-->
<!--      <el-col :span="8" :offset="1">-->
<!--        <el-input></el-input>-->
<!--      </el-col>-->
<!--      <el-col :span="4" :offset="1">-->
<!--        <el-button>展开</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <el-button>收起</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <el-button>刷新</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="16">-->
<!--        <el-tree-->
<!--          :data="data4"-->
<!--          :props="defaultProps"-->
<!--          @node-click="handleNodeClick"-->
<!--          style="margin-top:20px"-->
<!--        ></el-tree>-->
<!--      </el-col>-->
<!--    </el-drawer>-->
    <el-dialog title="坐标海图定位" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form" label-width="120px">
        <el-form-item label="经度坐标" label-width="80px">
          <el-input v-model="form.longitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="纬度坐标" label-width="80px">
          <el-input v-model="form.latitude" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <router-link :to="{name:'olmap',params:{longitude:this.form.longitude,latitude:this.form.latitude}}">
         <el-button type="primary" @click="dialogFormVisible=false,mapPosition()">确 定</el-button>
        </router-link>
      </div>
    </el-dialog>
    <el-dialog title="显示区域选择" :visible.sync="dialogZoneVisible" width="450px">
      <el-checkbox-group v-model="checkList" size="medium">
        <table>
          <tr>
            <td>
              <el-checkbox label="中韩休伏水域" border ></el-checkbox>
            </td>
            <td>
              <el-checkbox label="长江口渔业管理局" border ></el-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <el-checkbox label="中越共同渔区" border ></el-checkbox>
            </td>
            <td>
              <el-checkbox label="中韩渔业协定水域" border ></el-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <el-checkbox label="韩国渔业禁区" border ></el-checkbox>
            </td>
            <td>
              <el-checkbox label="中日渔业协定水域" border ></el-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <el-checkbox label="拖网禁渔区线" border ></el-checkbox>
            </td>
            <td>
              <el-checkbox label="中越渔业分界线" border ></el-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <el-checkbox label="中日管理线" border ></el-checkbox>
            </td>
            <td>
              <el-checkbox label="中越过渡性水域" border ></el-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <el-checkbox label="韩特定水域" border ></el-checkbox>
            </td>
            <td>
              <el-checkbox label="警戒区域" border ></el-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <el-checkbox label="韩国分界线" border ></el-checkbox>
            </td>
          </tr>
        </table>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogZoneVisible = false">取 消</el-button>
        <el-button type="primary" @click="111">确 定</el-button>
      </div>
    </el-dialog>

<!--    app弹出报警信息-->
    <el-dialog title="船舶报警！" :visible.sync="dialogFormVisible_process" width="60vw">
      <div>
        <el-button @click="dialogFormVisible_process = false">取 消</el-button>
    <router-link :to="{name:'olmapApp',params:{alarmLongitude:this.form_process.longitude,alarmLatitude:this.form_process.latitude}}">
      <el-button type="primary" @click="dialogFormVisible_process=false,mapPosition_process()">前往</el-button>
    </router-link>
      </div>
    </el-dialog>

<!--    报警提示音-->
    <audio id="audio" src="../../static/sounds/alarm.wav"></audio>

<!--    <el-dialog title="报警信息处理" :visible.sync="dialogFormVisible_process" width="60vw">-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              船舶名称:{{form_process.shipName}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              联系人:{{form_process.owner}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              联系电话:{{form_process.phoneNumber}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              产品ID:{{form_process.productId}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              北斗卡号:{{form_process.equipmentid}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              MMSI:{{form_process.mmsi}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              经度:{{form_process.shipLongitude}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              纬度:{{form_process.shipLatitude}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              报位时间:{{form_process.positionDate}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              报位设备:{{form_process.locationDeviceType}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              设备ID:{{form_process.locationDeviceId}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              船舶状态:{{form_process.state}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              船舶类型:{{}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              船舶长宽:{{}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              核载人数:{{}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              省市区县:{{form_process.province}}{{form_process.city}}{{form_process.county}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              乡镇街道:{{}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              村服务站:{{}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              报警类型:{{form_process.alarmTypeName}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              报警时间:{{form_process.time}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              报警ID:{{form_process.alarmId}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              报警经度:{{form_process.longitude}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              报警纬度:{{form_process.latitude}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              报警航速:{{form_process.speed}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <el-row>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              报警设备:{{form_process.deviceType}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--              设备ID:{{form_process.deviceId}}-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <div style="font-size: small">-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--        <br>-->
<!--        <el-form :model="form_process">-->
<!--&lt;!&ndash;          <el-col :span="12">&ndash;&gt;-->
<!--           <el-form-item  label="处理结果">-->
<!--&lt;!&ndash;             <el-input v-model="form_process.processType" autocomplete="off"></el-input>&ndash;&gt;-->
<!--             <el-select v-model="value" @change="changeOption" placeholder="请选择">-->
<!--               <el-option-->
<!--                 v-for="item in options"-->
<!--                 :key="item.value"-->
<!--                 :label="item.label"-->
<!--                 :value="item.value">-->
<!--               </el-option>-->
<!--             </el-select>-->
<!--           </el-form-item>-->
<!--&lt;!&ndash;          </el-col>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-col :span="12">&ndash;&gt;-->
<!--           <el-form-item label="处理人">-->
<!--            <el-input v-model="form_process.processBy" style="width: fit-content" autocomplete="off"></el-input>-->
<!--           </el-form-item>-->
<!--&lt;!&ndash;          </el-col>&ndash;&gt;-->
<!--          <el-form-item label="补充说明">-->
<!--            <el-input v-model="form_process.processDescription" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <div slot="footer" class="dialog-footer">-->
<!--          <el-button @click="dialogFormVisible_process = false">取 消</el-button>-->
<!--          <el-button type="primary" @click="dialogFormVisible_process=false,alarmRecordProcess()">提交</el-button>-->
<!--          <router-link :to="{name:'olmap',params:{alarmLongitude:this.form_process.longitude,alarmLatitude:this.form_process.latitude}}">-->
<!--           <el-button type="primary" @click="dialogFormVisible_process=false,mapPosition_process()">定位</el-button>-->
<!--          </router-link>-->
<!--        </div>-->
<!--      </el-dialog>-->
  </div>
</template>
<script>
import axios from "axios";
import measureAreaAndDistance from "../js/measureAreaAndDistance";
import areaSearch from "../js/areaSearch";
import addLocationImg from "../js/addLocationImg";
import addAlarmShipImg from "../js/addAlarmShipImg";
import showAlarmRings from "../js/showAlarmRings";
import { transform } from "ol/proj";
import VectorSource from "ol/source/Vector";
import kscreenshot from "kscreenshot";
import measureAngle from "../js/measureAngle";
import axiosPost from "../js/utils/axiosPost";
export default {
  data() {
    return {
        controlAreasInfo:[],//警戒区域信息
        rings:[],//警戒区域
        tracedShipsList:[],//定制追踪船舶
      userName: localStorage.getItem("userName"),
      map: null,
      tempVectorLayer: [],
      clusterSource: null,
      table: false,
      table2: false,
      table3:false,
      dialog: false,
      loading: false,
      gridData: [],
      currentPage:1,
            pageSize: 1,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        longitude: "",
        latitude: ""
      },
      form_process: {
                processTime: '',
                processBy: '',
                processType: '',
                processDescription: '',
          alarmRecordId:'',
              shipName:'',
              owner:'',
              phoneNumber:'',
              productId:'',
              equipmentid:'',
              mmsi:'',
              shipLongitude:'',
              shipLatitude:'',
              positionDate:'',
              locationDeviceType:'',//报位设备
              locationDeviceId:'',
              state:'',
             //船舶类型
              //船舶长宽
             //核载人数
              province:'',//省
              city:'',//市
              county:'',//区
              //乡镇街道
              //村服务站
              alarmTypeName:'',
              time:'',
              alarmId:'',
              longitude:'',
              latitude:'',
              speed:'',
              deviceType:'',
              deviceId:'',
            },
            value:'',
            options:[
                {
                    value:'',
                    label:'请选择'
                },
                {
                    value:'误报',
                    label:'误报'
                },
                {
                    value:'异常',
                    label:'异常'
                },
                {
                    value:"设备故障",
                    label:'设备故障'
                },
                {
                    value:'遮挡',
                    label:'遮挡'
                },
                {
                    value:'其他',
                    label:'其他'
                }
            ],
      formLabelWidth: "80px",
      data4: [
        {
          label: "浙江省",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "福建省",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "北京市",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      dialogFormVisible_process:false,
      dialogFormVisible: false,
      dialogZoneVisible: false,
      checkList: []
    };
  },
    // 监听弹出框发生变化，语音播报
    watch: {
        dialogFormVisible_process: function () {
            setInterval(()=> {
             if(this.dialogFormVisible_process==true) {
                 this.aplayAudio();
             }
            },3000)
        }
    },
  methods: {
      handleNodeClick(data){
          console.log(data);
      },
      // 语音播放
      aplayAudio () {
          const audio = document.getElementById('audio');
              audio.play();
      },
    // 每页多少条
      handleSizeChange(val) {
          this.pageSize = val;
          this.currentPage = 1;
      },
      // 当前页
      handleCurrentChange(val) {
          this.currentPage = val;
      },
      //选择处理结果
      changeOption(){
          console.log(this.value);
          let obj = {};
          obj = this.options.find(
              item=>{
                  return item.value=this.value; //筛选出对应数据
              }
          )
          this.form_process.processType = this.value;
      },
    handleClose(done) {
      this.$confirm("确定要提交表单吗？")
        .then(_ => {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            done();
          }, 2000);
        })
        .catch(_ => {});
    },
    withdraw() {
      this.$confirm("即将退出船舶管理系统，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.push({ path: "/" });
          this.$message({
            type: "success",
            message: "成功退出!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    getMapObject(val) {
      this.map = val.map;
      this.clusterSource = val.clusterSource;
    },
    measureSea(measureType) {
      // console.log(this.map)

      console.log(this.map.getInteractions().getLength());
      var len = this.map.getInteractions().getLength();
      if (len > 9) {
        for (let index = 9; index < len; index++) {
          this.map.getInteractions().removeAt(index);
        }
      }
      measureAreaAndDistance(this.map, measureType);
    },
    areaSearch(searchType) {
      var extent = areaSearch(this.map, searchType, this.clusterSource);
    },
    mapScreen() {
      var kst = new kscreenshot({
        // key:65,
        needDownload: false
      });
      kst.startScreenShot();
    },
    mapPrint() {
      window.print();
    },
    mapPosition() {
      var center = transform(
        [this.form.longitude, this.form.latitude],
        "EPSG:4326",
        "EPSG:3857"
      );
      this.map.getView().setCenter(center);
      this.map.getView().setZoom(7);
      var tempLayer = addLocationImg(
        this.map,
        this.form.longitude,
        this.form.latitude
      );
      this.tempVectorLayer.push(tempLayer);
    },
     mapPosition_process(){
            var center = transform([this.form_process.longitude,this.form_process.latitude],'EPSG:4326','EPSG:3857')
            this.map.getView().setCenter(center)
            this.map.getView().setZoom(7)
            var tempLayer = addAlarmShipImg(this.map,this.form_process.longitude,this.form_process.latitude)
            this.tempVectorLayer.push(tempLayer)
      },
      //警戒区域
      showAlarmRings(){
          var args = '{"userId":"'+ localStorage.getItem("userEncryptId")  +'" }'
          axiosPost("http://115.231.112.237:8088/CTBT/services/AreaControlInfo","getControlAreasInfoByUserId",args,this).then((res) => {
              this.controlAreasInfo = JSON.parse(res);
              for (let i = 0; i < this.controlAreasInfo.length; i++) {
                  let geometry=this.controlAreasInfo[i].geometry;
                  let geometryStr=geometry.replace(/\'/g,"\"");
                  // console.log(geometryStr)
                  let geometryObj=JSON.parse(geometryStr);
                  this.rings[i]=geometryObj.rings[0];
                  // console.log(this.rings[i])
              }
              // console.log(this.rings)
              var alarmRingsLayer = showAlarmRings(this.map,this.rings);
              this.tempVectorLayer.push(alarmRingsLayer);
          })

      },
      //清除痕迹
    removeAllTrace() {
      //console.log(this.tempVectorLayer)
      this.tempVectorLayer.forEach(element => {
        this.map.removeLayer(element);
      });
      this.tempVectorLayer = [];
    },
    measureAngler() {
      var lineLayer = measureAngle(this.map);
      this.tempVectorLayer.push(lineLayer);
    },
      //处理报警信息
    alarmRecordProcess(){
      if(this.form_process.processType!=''&&this.form_process.processBy!='') {
          let args = '{"userId":"' + localStorage.getItem("userEncryptId") + '","alarmRecordId":"' + this.form_process.alarmRecordId + '","processType":"' + this.form_process.processType + '","processBy":"' + this.form_process.processBy + '","processDescription":"' + this.form_process.processDescription + '" }'
          axiosPost("http://115.231.112.237:8088/CTBT/services/AlarmMes", "saveAlarmToUserProcess", args, this).then((res) => {
              if (res == 'success') {
                  this.$alert('处理成功');
              } else {
                  this.$alert('处理失败');
              }
          })
      }
      else {
          this.$alert('请填写处理结果和处理人');
      }
    }
  },
  mounted() {
      //定制追踪船舶
      sessionStorage.setItem("tracedShipsList",JSON.stringify(this.tracedShipsList));
      //定时获取报警信息
        let alarmRecordList=[];
        let userEncryptId=localStorage.getItem("userEncryptId");
        let userType=localStorage.getItem("userType");
        let xmls = '<?xml version="1.0" encoding="utf-8"?> \
                    <soap:Envelope \
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"\
                    xmlns:UserWebServiceService="http://webservice.ctbt.com/"\
                    soap:encodingStyle="http://www.w3.org/2001/12/soap-encoding">\
                    <soap:Body>\
                    <UserWebServiceService:refreshInterval><arg0>{"userId":"'+userEncryptId+'","user_type":"'+userType+'"}</arg0></UserWebServiceService:refreshInterval>\
                    </soap:Body>\
                    </soap:Envelope>'

        setInterval(()=>{
                console.log(111111)

        this.$axios.post('http://115.231.112.237:8088/CTBT/services/Ships', xmls, {headers: {'Content-type': 'application/json;charset=UTF-8'}})
            .then((response) => {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(response.data,'text/xml');
                var contents = xmlDoc.getElementsByTagName('return');
                let result =contents;
                // let result = this.xmlToJson(response.data);
                let temp = result[0].textContent.split(",");
                let jsonStr=temp.join(",");
                let jsonObj =  JSON.parse(jsonStr);
                let arr=[];
                for(let i in jsonObj){
                    arr.push(jsonObj[i]);
                }
                // console.log(arr);
                alarmRecordList=arr[2];
                //alarmToUserList与该账号对应的拿出来添加为alarmRecordList[i]的一个对象
                for (let i = 0; i <alarmRecordList.length ; i++) {
                    let alarmToUserList=alarmRecordList[i].alarmToUserList;
                    for (let j = 0; j <alarmToUserList.length ; j++) {
                        if(alarmToUserList[j].userId==localStorage.getItem("userId")){
                            alarmRecordList[i].myAlarmToUser=alarmToUserList[j];

                        }
                    }
                }
                this.gridData=alarmRecordList;
                // console.log(this.gridData)
                //如果有报警，发出报警信息
                for (let i = 0; i <alarmRecordList.length; i++) {
                    // this.dialogFormVisible_process=false;
                    let myObj=alarmRecordList[i].myAlarmToUser;
                    // if(true){
                    if((myObj.processTime=="")&&(myObj.processType=="")){
                        this.dialogFormVisible_process=true;
                        this.form_process.alarmRecordId=alarmRecordList[i].myAlarmToUser.alarmRecordId;
                        this.form_process.shipName=alarmRecordList[i].ships.name;
                        this.form_process.owner=alarmRecordList[i].ships.owner;
                        this.form_process.phoneNumber=alarmRecordList[i].ships.phoneNumber;
                        this.form_process.productId=alarmRecordList[i].ships.productId;
                        this.form_process.equipmentid=alarmRecordList[i].ships.equipmentid;
                        this.form_process.mmsi=alarmRecordList[i].ships.mmsi;
                        this.form_process.shipLongitude=alarmRecordList[i].ships.longitude;
                        this.form_process.shipLatitude=alarmRecordList[i].ships.latitude;
                        this.form_process.positionDate=alarmRecordList[i].ships.positionDate;
                        this.form_process.locationDeviceType=alarmRecordList[i].ships.locationDeviceType;//报位设备
                        this.form_process.locationDeviceId=alarmRecordList[i].ships.locationDeviceId;
                        this.form_process.state=alarmRecordList[i].ships.state;
                        //船舶类型
                        //船舶长宽
                        //核载人数
                        this.form_process.province=alarmRecordList[i].ships.province;//省
                        this.form_process.city=alarmRecordList[i].ships.city;//市
                        this.form_process.county=alarmRecordList[i].ships.county;//区
                        //乡镇街道
                        //村服务站
                        this.form_process.alarmTypeName=alarmRecordList[i].alarmType.typeName;
                        this.form_process.time=alarmRecordList[i].time;
                        this.form_process.alarmId=alarmRecordList[i].alarmId;
                        this.form_process.longitude=alarmRecordList[i].longitude;
                        this.form_process.latitude=alarmRecordList[i].latitude;
                        this.form_process.speed=alarmRecordList[i].speed;
                        this.form_process.deviceType=alarmRecordList[i].deviceType;
                        this.form_process.deviceId=alarmRecordList[i].deviceId;
                        break;
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },100000)
    }
};
</script>
<style scoped>
.Main {
  width: 100vw;
  height: 100vh;
}
h2 {
  color: #909399;
}
.el-aside {
  background-color: #c0c4cc;
}
.el-header {
  background-color: #e4e7ed;
}
.el-main {
  background-color: #dcdfe6;
}
.el-footer {
  height: 100px;
  background-color: #c0c4cc;
}

.icon {
  font-size: 40px;
}
td {
  width: 200px;
}
.el-checkbox{
  width:160px;
  background: #dbe4f1;
}
</style>
