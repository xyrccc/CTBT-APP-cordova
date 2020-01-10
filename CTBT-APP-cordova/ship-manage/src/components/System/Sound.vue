<template>
    <div>
        <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
              <span class="el-icon-s-tools"></span>
              系统设置
        </div>
        <br>
        <div style="margin-top:50px">
<!--            <el-card>-->
<!--                  <el-row>-->
<!--                      <h5>系统音效:</h5>-->
<!--                      <el-col :span="12">-->
<!--                          <el-radio-group v-model="sound">-->
<!--                              <el-radio :label="1">音效一</el-radio>-->
<!--                              <el-radio :label="2">音效二</el-radio>-->
<!--                              <el-radio :label="3">音效三</el-radio>-->
<!--                              <el-radio :label="4">音效四</el-radio>-->
<!--                              <el-radio :label="5">音效五</el-radio>-->
<!--                              <el-radio :label="6">音效六</el-radio>-->
<!--                          </el-radio-group>-->
<!--                      </el-col>-->
<!--                  </el-row>-->
<!--            </el-card>-->
            <el-card style="margin-top:20px">
                <h5>自定义音效:</h5>
                <el-upload
                style="margin-right:400px"
                   class="upload-demo"
                   drag
                   action="https://jsonplaceholder.typicode.com/posts/"
                   multiple>
                   <i class="el-icon-upload"></i>
                   <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                   <div class="el-upload__tip" slot="tip">只能上传pm3文件，且不超过3M</div>
                   </el-upload>
            </el-card>
        </div>
       <div style="margin-top:30px;margin-right:800px">
          <el-button type="primary" @click="onSubmit">保存</el-button>
               <router-link to="/">
                  <el-button style="margin-left:20px">退出</el-button>
               </router-link>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            sound:''
        }
    },
    methods:{
    }
}
</script>
<style  scoped>
h5{
    margin-right: 145vh
}
</style>
