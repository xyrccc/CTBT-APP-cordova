<template>
  <div>
    <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
      <span class="el-icon-ship"></span>
      无动力船舶查询
    </div>
    <br>
    <el-card style="margin-top:50px">
      <el-row>
<!--        <el-col :span="4">-->
          <el-select v-model="value" style="width: fit-content" @change="changeOption" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
<!--        </el-col>-->
<!--        <el-col :span="5" :offset="1">-->
          <el-input v-model="conditionValue" style="width: fit-content" placeholder="请输入内容"></el-input>
<!--        </el-col>-->
<!--        <el-col :span="2" :offset="5">-->
          <el-button type="primary" @click="getShipsBySearchShipsCondition()">查询</el-button>
<!--        </el-col>-->
      </el-row>
      <el-table ref="multipleTable" :data="handleList.slice((currentPage-1)*pageSize,currentPage*pageSize)" tooltip-effect="dark" style="width: 100%">
        <!--                   <el-table-column  type="selection" width="55"></el-table-column>-->
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
      <!--                <div>-->
      <!--                  <el-col :span="8"><el-button type="primary" size="mini">导出船只</el-button></el-col>-->
      <!--                  <el-col :span="8"><el-button type="primary" size="mini">查看轨迹</el-button></el-col>-->
      <!--                  <el-col :span="8"><el-button type="primary" size="mini">制定追踪</el-button></el-col>-->
      <!--                </div>-->
    </el-card>
  </div>
</template>
<script>
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
                pageSize: 10

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
                    <UserWebServiceService:getUnpowerShipsBySearchShipsCondition><arg0>{"userId":"'+this.userEncryptId+'","user_type":"'+this.userType+'","pagerStr":"'+this.pagerStr+'","'+this.condition+'":"'+this.conditionValue+'"}</arg0></UserWebServiceService:getUnpowerShipsBySearchShipsCondition>\
                    </soap:Body>\
                    </soap:Envelope>'
                console.log(this.condition)
                console.log(this.conditionValue)
                this.$axios.post('http://115.231.112.237:8088/CTBT/services/Ships', xmls, {headers: {'Content-type': 'application/json;charset=UTF-8'}})
                    .then((response) => {
                        this.reslut = this.xmlToJson(response.data);
                        var temp = this.reslut[0].textContent.split(",");
                        // console.log(xmls);
                        console.log(this.reslut[0]);
                        if (temp[0] == "no_record") {
                            this.$alert('暂无数据!');
                        }
                        else {
                            let jsonStr=temp.join(",");
                            // console.log(jsonStr);
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
            }
        }
    }
</script>
