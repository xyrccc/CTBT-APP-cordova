<template>
    <div>
        <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
              <span class="el-icon-ship"></span>
              船舶追踪
        </div>
        <br>
        <el-card style="margin-top:50px">
               <el-table ref="multipleTable" :data="tracedShipsList.slice((currentPage-1)*pageSize,currentPage*pageSize)" tooltip-effect="dark" style="width: 100%">
                 <el-table-column  type="selection" width="55"></el-table-column>
                 <el-table-column  type="index" label="序号" width="50"></el-table-column>
                 <el-table-column  prop="id" label="船舶ID" ></el-table-column>
                 <el-table-column  prop="mmsi" label="MMSI"  ></el-table-column>
                 <el-table-column  prop="equipmentid" label="卡号" ></el-table-column>
                 <el-table-column  prop="name" label="船名"></el-table-column>
                 <el-table-column  prop="longitude" label="经度" ></el-table-column>
                 <el-table-column  prop="latitude" label="纬度" ></el-table-column>
                 <el-table-column  prop="state" label="状态" ></el-table-column>
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
              :total="tracedShipsList.length">
            </el-pagination>
          </div>
          <br>
          <div>
            <el-button @click="removeTracedShips()" type="primary" size="mini">删除定制</el-button>
            <el-button type="primary" size="mini">开始监控</el-button>
          </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data()
    {
        return{
            tracedShipsList:[],
            // 当前页
            currentPage: 1,
            // 每页多少条
            pageSize: 10,
        }
    },
    methods:{
        // 每页多少条
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
        },
        // 当前页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        //删除定制
        removeTracedShips() {
            let jsonObj = JSON.parse(JSON.stringify(this.$refs.multipleTable.selection));
            if (jsonObj.length == 0) {
                this.$alert('请选择要删除的船舶')
            } else {
                let tracedShipsList = JSON.parse(JSON.stringify(this.tracedShipsList));
                for (let i = 0; i < jsonObj.length; i++) {
                    //逆向循环
                    for (let j = tracedShipsList.length - 1; j >= 0; j--) {
                        console.log(JSON.stringify(jsonObj[i]) == JSON.stringify(tracedShipsList[j]))
                        if (JSON.stringify(jsonObj[i]) == JSON.stringify(tracedShipsList[j])) {
                            tracedShipsList.splice(j, 1);
                        }
                    }
                }
                this.tracedShipsList = tracedShipsList;
                sessionStorage.setItem("tracedShipsList", JSON.stringify(this.tracedShipsList));
            }
        }
    },
    mounted() {
        this.tracedShipsList=JSON.parse(sessionStorage.getItem("tracedShipsList"));
        console.log(this.tracedShipsList);
    }
}
</script>
