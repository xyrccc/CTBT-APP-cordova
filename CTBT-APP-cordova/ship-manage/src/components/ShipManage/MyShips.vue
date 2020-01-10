<template>
  <div>
    <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
      <span class="el-icon-ship"></span>
      我的船舶(共{{this.arr[1]}}艘)
    </div>
    <br>
    <el-card style="margin-top:50px">
      <el-table ref="multipleTable" :data="this.List" tooltip-effect="dark" style="width: 100%">
        <el-table-column  type="index" label="序号" width="100"></el-table-column>
        <el-table-column  prop="id" label="船舶ID"></el-table-column>
        <el-table-column  prop="mmsi" label="MMSI"></el-table-column>
        <el-table-column  prop="equipmentid" label="卡号"></el-table-column>
        <el-table-column  prop="name" label="船名"></el-table-column>
      </el-table>
      <el-button @click="getNext()" style="margin-left:20px">下一页</el-button>
    </el-card>
  </div>
</template>
<script>
    export default {
        data()
        {
            return{
                currentPage:1,
                totalPage:1,
                List:[],
                arr:[]
            }
        },
        methods:{
            getNext(){
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
                if(this.currentPage < this.totalPage){//当前页数小于总页数就请求
                    console.log(this.totalPage)
                    this.currentPage++;//当前页数自增
                    //请求接口的代码
                    this.$axios.post('http://115.231.112.237:8088/CTBT/services/Ships', xmls, {headers: {'Content-type': 'application/json;charset=UTF-8'}})
                        .then(res=>{
                            var reslut = this.xmlToJson(res.data);
                            var temp = reslut[0].textContent.split(",");
                            if (temp[0] == "no_record") {
                                this.$alert('暂无数据!');
                            } else {
                                this.arr=[];
                                let jsonStr = temp.join(",");
                                var jsonObj = JSON.parse(jsonStr);
                                for (let i in jsonObj) {
                                    this.arr.push(jsonObj[i]);
                                }
                                this.List = this.List.concat(this.arr[10])//将请求回来的数据和当前展示的数据合并在一起
                            }
                        })
                }else {
                    this.$alert('数据已加载完!');
                }
            }
        },
        mounted(){
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
            this.$axios.post('http://115.231.112.237:8088/CTBT/services/Ships', xmls, {headers: {'Content-type': 'application/json;charset=UTF-8'}})
                .then(res=>{
                    var reslut = this.xmlToJson(res.data);
                    var temp = reslut[0].textContent.split(",");
                    if (temp[0] == "no_record") {
                        this.$alert('暂无数据!');
                    } else {
                        this.arr=[];
                        let jsonStr = temp.join(",");
                        var jsonObj = JSON.parse(jsonStr);
                        for (let i in jsonObj) {
                            this.arr.push(jsonObj[i]);
                        }
                        //返回list，list里为查询到的船舶
                        this.List = this.arr[10];
                        this.totalPage = this.arr[0];
                    }
                })
        }

    }
</script>
