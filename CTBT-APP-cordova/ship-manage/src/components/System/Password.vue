<template>
    <div>
        <div class="title" style="font-size: 23px;padding-left: 20px; margin-bottom: 20px;float:left">
              <span class="el-icon-s-tools"></span>
              修改密码
        </div>
        <br>
        <div style="margin-top:50px">
            <el-card>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                    <el-form-item label="用户名:" prop="name">
<!--                        <el-col :span="6">-->
                            <el-input v-model="ruleForm.name" style="width: fit-content"></el-input>
<!--                        </el-col>-->
                    </el-form-item>
                    <el-form-item label="旧密码:" prop="old_pass" >
<!--                        <el-col :span="6">-->
                            <el-input type="password" v-model="ruleForm.old_pass" style="width: fit-content" autocomplete="off" show-password></el-input>
<!--                        </el-col>-->
                    </el-form-item>
                   <el-form-item label="新密码:" prop="pass">
<!--                      <el-col :span="6">-->
                           <el-input type="password" v-model="ruleForm.pass" style="width: fit-content" autocomplete="off" show-password></el-input>
<!--                      </el-col>-->
                   </el-form-item>
                   <el-form-item label="确认密码:" prop="checkPass">
<!--                       <el-col :span="6">-->
                           <el-input type="password" v-model="ruleForm.checkPass" style="width: fit-content" autocomplete="off" show-password></el-input>
<!--                       </el-col>-->
                   </el-form-item>
                  <el-form-item>
<!--                     <el-col :span="6">-->
                           <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
<!--                     </el-col>-->
<!--                     <el-col :span="6">-->
                          <el-button @click="resetForm('ruleForm')">重置</el-button>
<!--                     </el-col>-->
                  </el-form-item>
               </el-form>
            </el-card>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name:'',
          pass: '',
          old_pass:'',
          checkPass: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          old_pass: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
          ],
          pass: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
                    <UserWebServiceService:changeUserPassword><arg0>{"userId":"'+this.userEncryptId+'","user_type":"'+this.userType+'","username":"'+this.ruleForm.name+'","password":"'+this.ruleForm.pass+'"}</arg0></UserWebServiceService:changeUserPassword>\
                    </soap:Body>\
                    </soap:Envelope>'
              console.log(xmls)
              this.$axios.post('http://115.231.112.237:8088/CTBT/services/User', xmls, {headers: {'Content-type': 'application/json;charset=UTF-8'}})
                  .then((response) => {
                      this.reslut = this.xmlToJson(response.data);
                      var temp = this.reslut[0].textContent.split(",");
                      console.log(temp[0])
                      if (temp[0] == "SUCESS") {
                          this.$alert('修改成功!');
                      }
                      else {
                          this.$alert('修改失败!');
                      }
                  })
                  .catch(function (error) { // 请求失败处理
                      console.log(error);
                  });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
