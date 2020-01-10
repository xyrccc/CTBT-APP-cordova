<template>
    <div>
        <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
              <span class="el-icon-s-tools"></span>
              系统设置
        </div>
        <br>
        <div class="System1">
            <el-card>
                <el-form ref="form" :model="form" >
                     <el-form-item label="轨迹数据源:">
                        <el-select v-model="system.data" placeholder="请选择">
                             <el-option
                               v-for="item in times"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                             </el-option>
                        </el-select>
                     </el-form-item>
                     <el-form-item label="显示真实船只比例:">
                        <el-select v-model="system.scale" placeholder="请选择">
                             <el-option
                               v-for="item in scales"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                             </el-option>
                        </el-select>
                     </el-form-item>
                     <el-form-item label="经纬度样式:">
                           <el-select v-model="form.type" placeholder="请选择经纬度样式">
                                 <el-option label="小数形式" value="0"></el-option>
                                 <el-option label="度分秒形式" value="1"></el-option>
                           </el-select>
                     </el-form-item>
                     <el-form-item label="默认回放轨迹时间:">
<!--                         <el-col :span="3" style="align-content: center">-->
                             <el-input v-model="system.back_time" style="width: fit-content">
                                   <template slot="append">h</template>
                             </el-input>
<!--                         </el-col>-->
                     </el-form-item>
                     <el-form-item label="船只显示时间:">
<!--                         <el-col :span="3" style="margin-left:3px">-->
                             <el-input v-model="system.show_time" style="width: fit-content">
                                   <template slot="append">h</template>
                             </el-input>
<!--                         </el-col>-->
                     </el-form-item>
                     <el-form-item label="地图刷新时间:">
<!--                         <el-col :span="3" style="margin-left:3px">-->
                             <el-input v-model="system.fresh_time" style="width: fit-content">
                                   <template slot="append">s</template>
                             </el-input>
<!--                         </el-col>-->
                     </el-form-item>
                     <el-form-item>
                       <el-button type="primary" @click="onSubmit">保存</el-button>
                       <router-link to="/MapManage/olmap">
                         <el-button >退出</el-button>
                       </router-link>
                     </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{},
            system:{
                data:'4',
                back_time:'24',
                scale:'4',
                type:'0',
                show_time:'2',
                fresh_time:'200'

            },
          times:[
              {
                 value: '0',
                 label: '使用0卫星数据源'
              },
              {
                 value: '1',
                 label: '使用410卫星数据源'
              },
              {
                 value: '2',
                 label: '使用411卫星数据源'
              },
              {
                 value: '3',
                 label: '使用413卫星数据源'
              },
               {
                 value: '4',
                 label: '使用TCBT同博卫星数据源'
              },
              {
                 value: '5',
                 label: '系统匹配最新卫星数据源'
              },
              {
                 value: '6',
                 label: '系统匹配最多卫星数据源'
              }
          ],
          scales:[
              {
                  value:'0',
                  label:'1:264800'
              },
              {
                  value:'1',
                  label:'1:420000'
              },
              {
                  value:'2',
                  label:'1:820000'
              },
              {
                  value:'3',
                  label:'1:170000'
              },
              {
                  value:'4',
                  label:'1:340000'
              },


          ]
        }
    },
    methods:{
        onSubmit(){
            console.log(this.form)
        }
    }
}
</script>
<style  scoped>
h3{
    float: left;
}
h4{
    float: left;
}
.System1{
    margin-top:50px;
}
</style>
