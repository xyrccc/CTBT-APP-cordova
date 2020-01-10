<template>
    <div>
        <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
              <span class="el-icon-place"></span>
              查询警戒
        </div>
        <br>
        <el-card style="margin-top:50px">
             <el-row>
                 <el-col :span="3">
                      <el-select v-model="type" placeholder="请选择">
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
                 <el-col :span="6" :offset="1">
                    <el-date-picker
                       v-model="time"
                       type="datetimerange"
                       start-placeholder="开始日期"
                       end-placeholder="结束日期"
                       :default-time="['12:00:00']">
                     </el-date-picker>
                 </el-col>
                 <el-col :span="2" :offset="4">
                      <el-button type="primary" style="width:100px" @click="fun">查询</el-button>
                 </el-col>
                 <el-col :span="2" :offset="1">
                      <el-button  style="width:100px"  @click="fun">删除</el-button>
                 </el-col>
             </el-row>
               <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
                   <el-table-column  type="selection" width="55"></el-table-column>
                   <el-table-column  type="index" width="50" label="序号"></el-table-column>
                   <el-table-column  prop="id" label="ID"  width="120"></el-table-column>
                   <el-table-column  prop="number" label="警戒名称"  width="120"></el-table-column>
                   <el-table-column  prop="name" label="设定人员"  width="120"></el-table-column>
                   <el-table-column  prop="human" label="设定时间"  width="120"></el-table-column>
                   <el-table-column  prop="mmsi" label="警戒类型"  width="120"></el-table-column>
                   <el-table-column  prop="long" label="警戒功能类型"  width="120"></el-table-column>
                   <el-table-column  prop="lat" label="警戒报警方式"  width="120"></el-table-column>
                   <el-table-column  prop="text" label="区域详情"  width="120"></el-table-column>
                   <el-table-column  prop="mmsi" label="船舶数量"  width="120"></el-table-column>
               </el-table>
                <div style="margin-top:20px">
                    <el-col :span="10">
                        <el-pagination
                            background
                            layout="prev, pager, next, jumper"
                            :total="1000">
                        </el-pagination>
                    </el-col>
                </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data()
    {
        return{
            type:'1',
            time:'',
            types:[
                {
                    value:'1',
                    label:'监控区域名称'
                },
                {
                    value:'2',
                    label:'区域设置用途'
                },
            ],
             tableData: [],

        }
    },
    methods:{
        fun(){
            console.log(this.time)
        }
    }
}
</script>