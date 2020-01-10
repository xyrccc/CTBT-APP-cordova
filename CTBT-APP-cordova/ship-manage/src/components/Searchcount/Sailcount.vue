<template>
  <div>
    <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
      <span class="el-icon-ship"></span>
      航程统计
    </div>
    <br>
    <el-card style="margin-top:50px">
      <el-form>
        <el-form-item>
              <el-date-picker
                style="width: fit-content"
                v-model="startDate"
                type="date"
                placeholder="开始日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
              <el-date-picker
                style="width: fit-content"
                v-model="endDate"
                type="date"
                placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
        </el-form-item>
        <el-form-item>
              <el-select v-model="value" style="width: fit-content" @change="changeOption" placeholder="请选择航迹类型">
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
        </el-form-item>
        <el-form-item>
              <el-input v-model="shipId" style="width:fit-content" placeholder="请输入船舶ID" ></el-input>
              <el-button type="primary" @click="getShipsBySearchShipsCondition()">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table ref="multipleTable" :data="handleList.slice((currentPage-1)*pageSize,currentPage*pageSize)" tooltip-effect="dark" style="width: 100%">
        <!--                   <el-table-column  type="selection" width="55"></el-table-column>-->
        <el-table-column  type="index" label="序号"></el-table-column>
        <el-table-column  prop="month" label="日期"></el-table-column>
        <el-table-column  prop="voyage" label="航程(单位/m)"></el-table-column>
        <el-table-column  prop="count" label="总计(单位/m)"></el-table-column>
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
    </el-card>
  </div>
</template>
<script>
    export default {
        data()
        {
            return{
                shipId:'',
                value:'',
                startDate:'',
                endDate:'',
                options:[
                    {
                        value:'',
                        label:'请选择航迹类型'
                    },
                    {
                        value:'TRACK_TYPE_AUTO',
                        label:'系统匹配最新航迹数据源'
                    },
                    {
                        value:'TRACK_TYPE_MAX',
                        label:'系统匹配最多航迹数据源'
                    },
                    {
                        value:'TRACK_TYPE_410',
                        label:'使用410卫星数据源'
                    },
                    {
                        value:'TRACK_TYPE_411',
                        label:'使用411卫星数据源'
                    },
                    {
                        value:'TRACK_TYPE_413',
                        label:'使用413卫星数据源'
                    },
                    {
                        value:'TRACK_TYPE_CTBT',
                        label:'使用CTBT卫星数据源'
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
                console.log(this.value)
                let obj = {};
                obj = this.options.find(
                    item=>{
                        return item.value=this.value; //筛选出对应数据
                    }
                )
            },
            //查询
            getShipsBySearchShipsCondition(){
                this.userEncryptId=localStorage.getItem("userEncryptId");
                this.userType=localStorage.getItem("userType");
                let xmls = '<?xml version="1.0" encoding="utf-8"?> \
                    <soap:Envelope \
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"\
                    xmlns:UserWebServiceService="http://webservice.ctbt.com/"\
                    soap:encodingStyle="http://www.w3.org/2001/12/soap-encoding">\
                    <soap:Body>\
                    <UserWebServiceService:getMonthVOyageByStartAndEndDate><arg0>{"userId":"'+this.userEncryptId+'","user_type":"'+this.userType+'","locationType":"'+this.value+'","startDate":"'+this.startDate+'","endDate":"'+this.endDate+'","shipId":"'+this.shipId+'"}</arg0></UserWebServiceService:getMonthVOyageByStartAndEndDate>\
                    </soap:Body>\
                    </soap:Envelope>'
                this.$axios.post('http://115.231.112.237:8088/CTBT/services/Location', xmls, {headers: {'Content-type': 'application/json;charset=UTF-8'}})
                    .then((response) => {
                        this.reslut = this.xmlToJson(response.data);
                        var temp = this.reslut[0].textContent.split(",");
                        console.log(xmls);
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
                            this.handleList=arr;
                            console.log(this.handleList);
                        }
                    })
                    .catch(function (error) { // 请求失败处理
                        console.log(error);
                    });
            }
        }
    }
</script>
