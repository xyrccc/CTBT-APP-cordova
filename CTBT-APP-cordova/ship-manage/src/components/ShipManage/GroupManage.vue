<template>
    <div>
        <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
              <span class="el-icon-ship"></span>
              编组管理
        </div>
        <br>
        <el-card style="margin-top:50px">
             <el-row>
                 <el-col :span="3">
                      <el-select v-model="type" placeholder="编组名称">
                          <el-option
                           v-for="item in types"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                           </el-option>
                     </el-select>
                 </el-col>
                 <el-col :span="4" :offset="1">
                     <el-input></el-input>
                 </el-col>
                 <el-col :span="2" :offset="5">
                      <el-button type="primary" style="width:150px">查询</el-button>
                 </el-col>
             </el-row>
             <el-table ref="multipleTable" @current-change="clickChange" :data="shipTeamList.slice((currentPage-1)*pageSize,currentPage*pageSize)" tooltip-effect="dark" style="width: 100%">
<!--                   <el-table-column  type="selection" width="55"></el-table-column>-->
               <el-table-column label="选择" width="55">
                 //单选框
                 <template slot-scope="scope">
                   <el-radio  v-model="tableRadio" :label="scope.row"><i></i></el-radio>
                 </template>
               </el-table-column>
                   <el-table-column  prop="TEAMID" label="组号"  ></el-table-column>
                   <el-table-column  prop="TEAMNAME" label="编组名称"  ></el-table-column>
                   <el-table-column  prop="SHIPNAME" label="组长船舶名称"  ></el-table-column>
                   <el-table-column  prop="TEAMLEADERNAME" label="组长姓名"  ></el-table-column>
                   <el-table-column  prop="TEAMLEADERPHONE" label="组长联系电话"  ></el-table-column>
                   <el-table-column  prop="SAFEDISTANCE" label="安全距离（海里）"  ></el-table-column>
                   <el-table-column  prop="SHIPCOUNT" label="船舶总数"  ></el-table-column>
                   <el-table-column  prop="WORKSHIPCOUNT" label="作业船舶数"  ></el-table-column>
             </el-table>
             <el-pagination
                small
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="shipTeamList.length">
             </el-pagination>
                <div style="margin-top:20px">
                    <el-button type="primary" size="mini" @click="queryShipTeamShipList">船舶列表</el-button>
                    <el-button type="primary" size="mini" @click="queryShipTeamAlarmList">报警列表</el-button>
                    <el-button type="primary" size="mini">编组定位</el-button>
                </div>
        </el-card>
          <el-dialog title="船舶列表" :visible.sync="dialogFormVisible">
            <div>
              <el-table ref="multipleTable" :data="shipList" tooltip-effect="dark" style="width: 100%">
                <el-table-column  type="index" label="序号"  ></el-table-column>
                <el-table-column  prop="shipId" label="船舶ID"  ></el-table-column>
                <el-table-column  prop="workStatus" label="作业状态"  ></el-table-column>
              </el-table>
            </div>
          </el-dialog>
      <el-dialog title="报警列表" :visible.sync="dialogFormVisible2">
        <div>
          <el-table ref="multipleTable" :data="alarmList" tooltip-effect="dark" style="width: 100%">
            <el-table-column  type="index" label="序号"  ></el-table-column>
            <el-table-column  prop="alarmTime" label="报警时间"  ></el-table-column>
            <el-table-column  prop="shipId" label="船舶ID"  ></el-table-column>
            <el-table-column  prop="longitude" label="报警船舶经度"  ></el-table-column>
            <el-table-column  prop="latitude" label="报警船舶纬度"  ></el-table-column>
            <el-table-column  prop="referenceShipId" label="相对船舶ID"  ></el-table-column>
            <el-table-column  prop="referenceLongitude" label="相对船舶经度"  ></el-table-column>
            <el-table-column  prop="referenceLatitude" label="相对船舶纬度"  ></el-table-column>
            <el-table-column  prop="safeDistance" label="安全距离（海里）"  ></el-table-column>
            <el-table-column  prop="realDistance" label="实际距离（海里）"  ></el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
</template>
<script>
  import axiosPost from "../../js/utils/axiosPost";
export default {
    data()
    {
        return{
            type:'',
            time:'',
            types:[
                {
                    value:'1',
                    label:'船名'
                },
                {
                    value:'2',
                    label:'产品ID'
                },
                {
                    value:"3",
                    label:'MMIS'
                },
                {
                    value:'4',
                    label:'卡号'
                },
                {
                     value:'5',
                     label:'数据ID'

                }
            ],
            // 当前页
            currentPage: 1,
            // 每页多少条
            pageSize: 10,
            shipTeamList : [],
            shipList:[],
            alarmList:[],
            teamId:'',
            //单选行
            tableRadio:'',
            dialogFormVisible:false,
            dialogFormVisible2:false
        }
    },
    methods:{
        //获取单选行数据
        clickChange (item) {
            this.tableRadio = item;
            console.log(this.tableRadio)
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
        //查询某个船舶编组的船舶列表
        queryShipTeamShipList(){
            if(this.tableRadio==''){
                this.$alert('请选择编组');
            }
            else {
                this.teamId = this.tableRadio.TEAMID;
                let args = '{"userId":"' + localStorage.getItem("userEncryptId") + '","teamId":"' + this.teamId + '" }'
                axiosPost("http://115.231.112.237:8088/CTBT/services/Ships", "queryShipTeamShipList", args, this).then((res) => {
                    let jsonObj=JSON.parse(res);
                    this.shipList = jsonObj;
                })
                this.dialogFormVisible=true;
            }
        },
        //查询某个船舶编组的报警船舶列表
        queryShipTeamAlarmList(){
            if(this.tableRadio==''){
                this.$alert('请选择编组');
            }
            else {
                this.teamId = this.tableRadio.TEAMID;
                let args = '{"userId":"' + localStorage.getItem("userEncryptId") + '","teamId":"' + this.teamId + '" }'
                axiosPost("http://115.231.112.237:8088/CTBT/services/Ships", "queryShipTeamAlarmList", args, this).then((res) => {
                    let jsonObj=JSON.parse(res);
                    this.alarmList=jsonObj;
                })
                this.dialogFormVisible2=true;
            }
        },
        //查询某个船舶编组的报警详情，报警当时每艘船舶的位置信息
        queryShipTeamAlarmDetailList(){
            if(this.tableRadio==''){
                this.$alert('请选择编组');
            }
            else {
                this.teamId = this.tableRadio.TEAMID;
                let args = '{"userId":"' + localStorage.getItem("userEncryptId") + '","teamId":"' + this.teamId + '" }'
                axiosPost("http://115.231.112.237:8088/CTBT/services/Ships", "queryShipTeamAlarmList", args, this).then((res) => {
                    let jsonObj=JSON.parse(res);
                    this.alarmList=jsonObj;
                })
                this.dialogFormVisible2=true;
            }
        }
    },
    mounted() {
        //查询船舶编组列表
        let args = '{"userId":"'+ localStorage.getItem("userEncryptId")  +'","page":"1","pageSize":"100" }'
        axiosPost("http://115.231.112.237:8088/CTBT/services/Ships","queryShipTeamList",args,this).then((res) => {
            let jsonObj=JSON.parse(res);
            let data=jsonObj.data;
            this.shipTeamList=data.list;
        })
    }
}
</script>
