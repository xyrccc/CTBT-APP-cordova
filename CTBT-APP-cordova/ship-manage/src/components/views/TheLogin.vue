<template>
    <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2"
         status-icon
         ref="ruleForm2"
         label-position="left"
         label-width="0px"
         class="demo-ruleForm login-page">
            <h3 class="title" style="text-align:center;">船舶管理系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text"
                    v-model="ruleForm2.username"
                    auto-complete="off"
                    placeholder="用户名"
                ></el-input>
            </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password"
                        v-model="ruleForm2.password"
                        auto-complete="off"
                        placeholder="密码"
                    ></el-input>
                </el-form-item>
            <el-checkbox
                v-model="checked"
            >记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            logining: false,
            ruleForm2: {
                username:localStorage.getItem("userName"),
                password:localStorage.getItem("passWord"),
            },
            rules2: {
                username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                password: [{required: true, message: 'enter your password', trigger: 'blur'}]
            },
            checked: true
        }
    },
    methods: {
        handleSubmit(event){

            this.$refs.ruleForm2.validate((valid) => {
                if(valid){
                    this.logining = true;

                    let xmls = '<?xml version="1.0" encoding="utf-8"?> \
                    <soap:Envelope \
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"\
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"\
                    xmlns:UserWebServiceService="http://webservice.ctbt.com/"\
                    soap:encodingStyle="http://www.w3.org/2001/12/soap-encoding">\
                    <soap:Body>\
                    <UserWebServiceService:CheckUsernameAndPassword><arg0>{"username":"'+this.ruleForm2.username+'","password":"'+this.ruleForm2.password

                    xmls+='"}</arg0></UserWebServiceService:CheckUsernameAndPassword>\
                    </soap:Body>\
                    </soap:Envelope>'

                    this.$axios
                    .post('http://115.231.112.237:8088/CTBT/services/User',xmls,{headers:{'Content-type':'application/json;charset=UTF-8'}})
                    .then((response) => {
                      this.reslut = this.xmlToJson(response.data);
                      var temp = this.reslut[0].textContent.split(",");
                      console.log(temp[0]);

                      if(temp[0] == "用户名或密码错误"){
                        //  this.logining = false;
                          this.$alert('用户名或密码错误!', '温馨提示', {
                              confirmButtonText: 'ok'
                          })
                      }else{
                          //密文id
                          localStorage.setItem("userEncryptId", temp[0]);
                          //用户类型
                          localStorage.setItem("userType", temp[1]);
                          //明文id
                          localStorage.setItem("userId", temp[2]);
                        //  this.logining = false;
                          if(this.checked==true) {
                              localStorage.setItem("userName", this.ruleForm2.username);
                              localStorage.setItem("passWord", this.ruleForm2.password);
                          }else {
                              localStorage.setItem("userName", '');
                              localStorage.setItem("passWord", '');
                          }
                          this.$router.push({path: '/ShipManage/MyShips'});
                      }
                    })
                    .catch(function (error) { // 请求失败处理
                      console.log(error);
                    });

                }else{
                    console.log('error submit!');
                    return false;
                }
            })
        }
    }
};
</script>

<style scoped>
.login-container {
    width: 100vw;
    height: 100vh;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
    margin: auto;
    width: 80vw;
  height: 45vh;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}
</style>
