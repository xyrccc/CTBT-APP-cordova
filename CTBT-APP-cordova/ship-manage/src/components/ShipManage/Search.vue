<template>
    <div>
        <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
              <span class="el-icon-ship"></span>
              船舶综合查询
        </div>
        <br>
        <el-card style="margin-top:50px">
             <el-row>
                      <el-select v-model="value" style="width: fit-content" @change="changeOption" placeholder="请选择">
                          <el-option
                           v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                           </el-option>
                     </el-select>
                     <el-input v-model="conditionValue" style="width: fit-content" placeholder="请输入内容"></el-input>
                      <el-button type="primary" @click="getShipsBySearchShipsCondition()">查询</el-button>
             </el-row>
          <br>
          <el-date-picker
            style="width: fit-content"
            v-model="startDateTime"
            type="datetime"
            placeholder="开始时间"
            format="yyyy/MM/dd HH:mm:ss"
            value-format="yyyy/MM/dd HH:mm:ss">
          </el-date-picker>
          <el-date-picker
            style="width: fit-content"
            v-model="endDateTime"
            type="datetime"
            placeholder="结束时间"
            format="yyyy/MM/dd HH:mm:ss"
            value-format="yyyy/MM/dd HH:mm:ss">
          </el-date-picker>
               <el-table ref="multipleTable" :data="handleList.slice((currentPage-1)*pageSize,currentPage*pageSize)" tooltip-effect="dark" style="width: 100%">
                 <el-table-column  type="selection" width="55"></el-table-column>
                 <el-table-column  type="index" label="序号" width="50"></el-table-column>
                 <el-table-column  prop="id" label="船舶ID" width="120"></el-table-column>
                 <el-table-column  prop="mmsi" label="MMSI"  width="120"></el-table-column>
                 <el-table-column  prop="equipmentid" label="卡号" width="120"></el-table-column>
                 <el-table-column  prop="name" label="船名" width="120"></el-table-column>
                 <el-table-column  prop="nation" label="国家" width="120"></el-table-column>
                 <el-table-column  prop="province" label="省份" width="120"></el-table-column>
                 <el-table-column  prop="city" label="市" width="120"></el-table-column>
                 <el-table-column  prop="country" label="县" width="120"></el-table-column>
                 <el-table-column  prop="name" label="船名" width="120"></el-table-column>
                 <el-table-column  prop="owner" label="船主"  width="120"></el-table-column>
                 <el-table-column  prop="telephone" label="联系电话"  width="120"></el-table-column>
                 <el-table-column  prop="longitude" label="经度"  width="120"></el-table-column>
                 <el-table-column  prop="latitude" label="纬度"  width="120"></el-table-column>
                 <el-table-column  prop="state" label="状态"  width="120"></el-table-column>
                   <el-table-column  prop="batteryState" label="电量"  width="120"></el-table-column>
                   <el-table-column  prop="temperature" label="温度"  width="120"></el-table-column>
                   <el-table-column  prop="positionDate" label="定位时间"  width="120"></el-table-column>
                   <el-table-column  prop="direction" label="方向"  width="120"></el-table-column>
                   <el-table-column  prop="shipLength" label="船长"></el-table-column>
                 <el-table-column  prop="shipWidth" label="船宽"></el-table-column>
                 <el-table-column  prop="draught" label="吃水深度"></el-table-column>
               </el-table>
                <div style="margin-top:20px">
                      <el-pagination
                        small
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 50, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="handleList.length">
                      </el-pagination>
                </div>
                <br>
                <div>
<!--                  <el-col :span="8"><el-button type="primary" size="mini">导出船只</el-button></el-col>-->
                  <el-button type="primary" size="mini" @click="getLocationByShipsIdAndStartAndEndDate">查看轨迹</el-button>
                   <el-button type="primary" size="mini" @click="saveTracedShips">制定追踪</el-button>
                </div>
        </el-card>
          <el-dialog title="船舶轨迹" :visible.sync="dialogFormVisible" width="60vw" >
            <div class="dialogDiv">
            <el-table ref="multipleTable" :data="locationList" tooltip-effect="dark" style="width: 100%">
              <el-table-column  type="index" label="序号"  ></el-table-column>
              <el-table-column  prop="oid" label="oid"  ></el-table-column>
              <el-table-column  prop="positionDate" label="定位时间"  ></el-table-column>
              <el-table-column  prop="longitude" label="经度"  ></el-table-column>
              <el-table-column  prop="latitude" label="纬度"  ></el-table-column>
              <el-table-column  prop="direction" label="方向"  ></el-table-column>
              <el-table-column  prop="speed" label="船速"  ></el-table-column>
              <el-table-column  prop="state" label="状态"  ></el-table-column>
              <el-table-column  prop="batteryState" label="电池"  ></el-table-column>
              <el-table-column  prop="temperature" label="温度"  ></el-table-column>
            </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
               <el-button @click="dialogFormVisible = false">取 消</el-button>
             <router-link :to="{name:'olmapForTrace',params:{playbackShipsList:this.playbackShipsList}}">
               <el-button type="primary" @click="dialogFormVisible=false">回放</el-button>
             </router-link>
            </span>
          </el-dialog>
    </div>
</template>

<script>
    import axiosPost from "../../js/utils/axiosPost"

    export default {
    data()
    {
        return{
            value:'',
            conditionValue:'',
            options:[
                {
                    value:'',
                    label:'请选择'
                },
                {
                    value:'shipName',
                    label:'船名'
                },
                {
                    value:'productID',
                    label:'产品ID'
                },
                {
                    value:"shipMmsi",
                    label:'MMIS'
                },
                {
                    value:'equipementId',
                    label:'卡号'
                },
                {
                     value:'shipId',
                     label:'船舶ID'
                }
            ],
            handleList: [],
            // 当前页
            currentPage: 1,
            // 每页多少条
            pageSize: 10,
            startDateTime:'',
            endDateTime:'',
            playbackShipsList:[],//轨迹回放船舶
            locationList:[],//轨迹列表
            dialogFormVisible:false
        }
    },
    methods: {
        // 每页多少条
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
        },
        // 当前页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        //选择条件
        changeOption(){
            console.log(this.value);
            let obj = {};
            obj = this.options.find(
                item=>{
                    return item.value=this.value; //筛选出对应数据
                }
            )
            this.condition = this.value;
        },
        //条件查询
        getShipsBySearchShipsCondition(){
            this.userEncryptId=localStorage.getItem("userEncryptId");
            this.userType=localStorage.getItem("userType");
            this.pagerStr='{\\"total_page_count\\":0,\\"total_record_count\\":0,\\"current_page_number\\":1,\\"page_size\\":15,\\"first_page_number\\":1,\\"pre_page_number\\":0,\\"next_page_number\\":0,\\"last_page_number\\":0,\\"is_first_page\\":false,\\"is_last_page\\":false,\\"list\\":[]}';
            let xmls = '<?xml version="1.0" encoding="utf-8"?> \
                    <soap:Envelope \
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"\
                    xmlns:UserWebServiceService="http://webservice.ctbt.com/"\
                    soap:encodingStyle="http://www.w3.org/2001/12/soap-encoding">\
                    <soap:Body>\
                    <UserWebServiceService:getShipsBySearchShipsCondition><arg0>{"userId":"'+this.userEncryptId+'","user_type":"'+this.userType+'","pagerStr":"'+this.pagerStr+'","'+this.condition+'":"'+this.conditionValue+'"}</arg0></UserWebServiceService:getShipsBySearchShipsCondition>\
                    </soap:Body>\
                    </soap:Envelope>'
            console.log(this.condition)
            console.log(this.conditionValue)
            this.$axios.post('http://115.231.112.237:8088/CTBT/services/Ships', xmls, {headers: {'Content-type': 'application/json;charset=UTF-8'}})
                .then((response) => {
                    this.reslut = this.xmlToJson(response.data);
                    var temp = this.reslut[0].textContent.split(",");
                    console.log(this.reslut[0]);
                    if (temp[0] == "no_record") {
                        this.$alert('暂无数据!');
                    }
                    else {
                        let jsonStr=temp.join(",");
                        var jsonObj =  JSON.parse(jsonStr);
                        let arr=[];
                        for(let i in jsonObj){
                            arr.push(jsonObj[i]);
                        }
                        //返回list，list里为查询到的船舶
                        this.handleList=arr[10];
                    }
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        },
        //保存选中船舶定制追踪
        saveTracedShips(){
            let selection=this.$refs.multipleTable.selection;
            let jsonStr=JSON.stringify(selection);
            let jsonObj=JSON.parse(jsonStr);
            console.log(jsonObj)
            if(jsonObj.length==0){this.$alert('请选择定制追踪船舶')}
            else {
                let tracedShipsList = JSON.parse(sessionStorage.getItem("tracedShipsList"));
                tracedShipsList = tracedShipsList.concat(jsonObj);
                sessionStorage.setItem("tracedShipsList", JSON.stringify(tracedShipsList));
                this.$alert('已定制追踪');
            }
        },
        //查看轨迹
        getLocationByShipsIdAndStartAndEndDate(){
            let selection=this.$refs.multipleTable.selection;
            let jsonStr=JSON.stringify(selection);
            let jsonObj=JSON.parse(jsonStr);
            if(jsonObj.length==0){this.$alert('请选择船舶')}
            else {
                for (let i = 0; i < jsonObj.length; i++) {
                    let shipId=jsonObj[i].id;
                    let args = '{"userId":"'+ localStorage.getItem("userEncryptId") +'","shipId":"'+shipId+'","startDateTime":"'+this.startDateTime+'","endDateTime":"'+this.endDateTime+'","locationType":"110" }';
                    axiosPost("http://115.231.112.237:8088/CTBT/services/LocationMongodb","getLocationByShipsIdAndStartAndEndDate",args,this).then((res) => {
                        let playbackShip=JSON.parse(res);
                        this.playbackShipsList = this.playbackShipsList.concat(playbackShip);
                        this.locationList=this.locationList.concat(playbackShip.location);
                        // sessionStorage.setItem("playbackShipsList", JSON.stringify(this.playbackShipsList));
                        console.log(this.playbackShipsList)
                        console.log(this.locationList)
                    })
                }
                this.dialogFormVisible=true;

            }
        }
    }
}
</script>
<!--固定dialog高度，用滚动条-->
<style lang="scss" scoped>
  .dialogDiv {
    height: 300px;
    overflow: auto;
  }
</style>
