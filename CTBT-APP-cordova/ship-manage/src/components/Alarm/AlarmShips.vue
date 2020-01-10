<template>
  <div>
    <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
      <span class="el-icon-ship"></span>
      报警船舶
    </div>
    <br>
    <el-card style="margin-top:50px">
      <el-table ref="multipleTable" :data="handleList.slice((currentPage-1)*pageSize,currentPage*pageSize)" tooltip-effect="dark" style="width: 100%">
        <el-table-column  type="index" label="序号" width="100"></el-table-column>
        <el-table-column  prop="name" label="船名"  ></el-table-column>
        <el-table-column  prop="id" label="船舶ID"  ></el-table-column>
        <el-table-column  prop="positionDate" label="报警时间"  ></el-table-column>
        <el-table-column  prop="state" label="报警类型"  ></el-table-column>
<!--        <el-table-column  prop="productId" label="产品ID"  ></el-table-column>-->
<!--        <el-table-column  prop="equipmentid" label="卡号"></el-table-column>-->
<!--        <el-table-column  prop="mmsi" label="mmsi"></el-table-column>-->
      </el-table>
      <div style="margin-top:20px">
        <el-pagination
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
        data() {
            return {
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
            }
        },
        mounted() {
            this.userEncryptId=localStorage.getItem("userEncryptId");
            // console.log(this.userEncryptId);
            this.userType=localStorage.getItem("userType");
            // console.log(this.userType);
            let xmls = '<?xml version="1.0" encoding="utf-8"?> \
                    <soap:Envelope \
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"\
                    xmlns:UserWebServiceService="http://webservice.ctbt.com/"\
                    soap:encodingStyle="http://www.w3.org/2001/12/soap-encoding">\
                    <soap:Body>\
                    <UserWebServiceService:getAlarmShipsByOneDay><arg0>{"userId":"'+this.userEncryptId+'","user_type":"'+this.userType+'"}</arg0></UserWebServiceService:getAlarmShipsByOneDay>\
                    </soap:Body>\
                    </soap:Envelope>'
            this.$axios.post('http://115.231.112.237:8088/CTBT/services/AlarmMes', xmls, {headers: {'Content-type': 'application/json;charset=UTF-8'}})
                .then((response) => {
                    this.reslut = this.xmlToJson(response.data);
                    var temp = this.reslut[0].textContent.split(",");
                    // console.log(this.reslut[0]);
                    // console.log(temp);

                    if (temp[0] == "no_record") {
                        this.$alert('暂无数据!');
                    }
                    else {
                        //arr为得到的json数组
                        let jsonStr=temp.join(",");
                        // console.log(jsonStr);
                        var jsonObj =  JSON.parse(jsonStr);
                        let arr=[];
                        for(let i in jsonObj){
                            arr.push(jsonObj[i]);
                        }

                        let shipsList=[];
                        for (let i in arr) {
                            let ships=arr[i].ships;
                            shipsList.push(ships);

                        }
                        console.log(shipsList);
                        this.handleList=shipsList;
                    }
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        }
    }
</script>
