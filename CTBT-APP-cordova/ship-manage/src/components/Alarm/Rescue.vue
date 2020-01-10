<template>
    <div>
        <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
              <span class="el-icon-phone-outline"></span>
              船舶救援
        </div>
        <br>
        <el-card style="margin-top:50px">
             <el-row>
                 <el-col :span="3">
                        <el-date-picker
                           v-model="time"
                           type="daterange"
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期">
                       </el-date-picker>
                 </el-col>
                 <el-col :span="2" :offset="5">
                      <el-button type="primary" style="width:150px" >起止日期搜索</el-button>
                 </el-col>
                 <el-col :span="5" :offset="4">
                     <el-input placeholder="船舶名称搜索"></el-input>
                 </el-col>
                 <el-col :span="3" :offset="1"><el-button type="primary" style="width:150px">搜索</el-button></el-col>
             </el-row>
               <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
                   <el-table-column  type="index" width="50" label="序号"></el-table-column>
                   <el-table-column  prop="id" label="编号"  width="120"></el-table-column>
                   <el-table-column  prop="number" label="名称"  width="120"></el-table-column>
                   <el-table-column  prop="name" label="船舶编号"  width="120"></el-table-column>
                   <el-table-column  prop="human" label="建立时间"  width="120"></el-table-column>
                   <el-table-column  prop="mmsi" label="报警类型"  width="120"></el-table-column>
                   <el-table-column  prop="text" label="描述"  width="120"></el-table-column>
                   <el-table-column  prop="long" label="经度"  width="120"></el-table-column>
                   <el-table-column  prop="lat" label="纬度"  width="120"></el-table-column>
                   <el-table-column  prop="mmsi" label="结束时间"  width="120"></el-table-column>
                   <el-table-column  prop="status" label="结束描述"  width="120"></el-table-column> 
               </el-table>
                <div style="margin-top:20px">
                    <el-col :span="2"><el-button type="primary" size="mini">导出报警</el-button></el-col>
                    <el-col :span="2"><el-button type="primary" size="mini">制定追踪</el-button></el-col>
                    <el-col :span="2"><el-button type="primary" size="mini">查看轨迹</el-button></el-col>
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
             tableData: [],

        }
    }
}
</script>