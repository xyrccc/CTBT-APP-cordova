<template>
    <div>
        <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
              <span class="el-icon-place"></span>
              精确添加警戒
        </div>
        <br>
        <el-card style="margin-top:50px;font-size:15px">
              <el-form ref="form" v-model="form" label-width="140px" style="padding-left:0px">
                  <el-form-item label="区域名称:" >
                      <el-col :span="5"><el-input></el-input></el-col>
                      <el-form-item label="区域设定用途:">
                          <el-col :span="8"><el-input type="textarea"></el-input></el-col>
                      </el-form-item>
                  </el-form-item>
              </el-form>
        </el-card>
        <el-card style="margin-top:30px">
              <el-form>
                  <el-form-item label="坐标1:">
                       <el-col :span="3"><el-input size="mini"></el-input></el-col>
                       <el-col :span="3" offset="2"><el-input size="mini"></el-input></el-col>
                   </el-form-item>
                  <el-form-item label="坐标2:">
                       <el-col :span="3"><el-input size="mini"></el-input></el-col>
                       <el-col :span="3" offset="2"><el-input size="mini"></el-input></el-col>
                   </el-form-item>
                  <el-form-item label="坐标3:">
                       <el-col :span="3"><el-input size="mini"></el-input></el-col>
                       <el-col :span="3" offset="2"><el-input size="mini"></el-input></el-col>
                   </el-form-item>
                  <el-form-item label="坐标4:">
                       <el-col :span="3"><el-input size="mini"></el-input></el-col>
                       <el-col :span="3" offset="2"><el-input size="mini"></el-input></el-col>
                   </el-form-item>
                  <el-form-item label="坐标5:">
                       <el-col :span="3"><el-input size="mini"></el-input></el-col>
                       <el-col :span="3" offset="2"><el-input size="mini"></el-input></el-col>
                   </el-form-item>
                  <el-form-item label="坐标6:">
                       <el-col :span="3"><el-input size="mini"></el-input></el-col>
                       <el-col :span="3" offset="2"><el-input size="mini"></el-input></el-col>
                   </el-form-item>
                  <el-form-item label="坐标7:">
                       <el-col :span="3"><el-input size="mini"></el-input></el-col>
                       <el-col :span="3" offset="2"><el-input size="mini"></el-input></el-col>
                   </el-form-item>
                  <el-form-item label="坐标8:">
                       <el-col :span="3"><el-input size="mini"></el-input></el-col>
                       <el-col :span="3" offset="2"><el-input size="mini"></el-input></el-col>
                   </el-form-item>
                  <el-form-item label="坐标9:">
                       <el-col :span="3"><el-input size="mini"></el-input></el-col>
                       <el-col :span="3" offset="2"><el-input size="mini"></el-input></el-col>
                   </el-form-item>
                  <el-form-item label="坐标10:">
                       <el-col :span="3"><el-input size="mini"></el-input></el-col>
                       <el-col :span="3" offset="2"><el-input size="mini"></el-input></el-col>
                   </el-form-item>
              </el-form>
        </el-card>
        <el-col :span="5"><el-button class="button" type="primary">保存</el-button></el-col>
        <el-col :span="5" :offset="1"><el-button class="button2">取消</el-button></el-col>
    </div>
</template>
<style  scoped>
.button{
    margin-top: 20px;
}
.button2{
    margin-right: 600px;
    margin-top: 20px;
}
</style>