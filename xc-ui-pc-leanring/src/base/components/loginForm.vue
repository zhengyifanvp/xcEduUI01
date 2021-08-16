<template>
  <div>

        <el-row class="container" style="width: 470px">

          <div id="body">
            <div class="g-center login-page" @keyup.enter="login">
              <el-tabs v-model="activeName" >
                <el-tab-pane label="用户登陆" name="login">
              <el-form :model="loginForm" label-width="80px" :rules="loginRules" ref="loginForm" class="login-form">
                <el-form-item label="账号" prop="username">
                  <el-input v-model="loginForm.username" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input  type="password" v-model="loginForm.password" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item >
                  <el-button type="primary"  @click.native="login" :loading="editLoading">登陆</el-button>
                  <el-button type="primary"  @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
              </el-form>
                </el-tab-pane>
                <el-tab-pane label="用户注册" name="register">
                  <el-form :model="registerForm" status-icon :rules="rules2" ref="registerForm" label-width="100px" class="registerForm">
                    <el-form-item label="姓名" prop="name">
                      <el-input type="text" v-model="registerForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="acc">
                      <el-input type="text" v-model="registerForm.acc" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                      <el-input type="password" v-model="registerForm.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                      <el-input type="password" v-model="registerForm.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click.native=register :loading="editLoading">提交</el-button>
                      <el-button type="primary" @click="resetForm('registerForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </div>

        </div>

        </el-row>


  </div>
</template>
<script>

import utilApi from '../../common/utils';
import * as loginApi from '../api/login';

import Vue from 'vue'
export default {
	components:{

	},
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let reg = /^[0-9a-zA-Z]{6,12}$/
    let validateAcc = (rule, value, callback) => {
      if (value === ''){
        callback(new Error('请输入账号'));
      }else if (reg.test(value)){
        callback();
      } else {
        callback(new Error('请输入6-12个字符的用户'));
      }
    };
    return {
      registerForm: {
        pass: '',
        checkPass: '',
        acc: '',
        name:''
      },
      userForm:{
        username: '',
        password: '',
        name: ''
      },

      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        acc: [
          { validator: validateAcc, trigger: 'blur' }
        ]
      },
      LoginFormVisible:false,
      activeName: 'login',
      editLoading: false,
      loginForm: {
        username:'',
        password: ''
      },
      loginRules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      user:{
        userid:'',
        username: '',
        userimg: ''
      },
      logined:false,
      returnUrl:''
    }
  },
  methods: {
    login: function () {

        this.$refs.loginForm.validate((valid) => {
          if (valid) {
              this.editLoading = true;

              let para = Object.assign({}, this.loginForm);

              loginApi.login(para).then((res) => {
                this.editLoading = false;
                if(res.success){
                  this.$message('登陆成功');
                  //刷新 当前页面
                 // alert(this.returnUrl)
                  console.log(this.returnUrl)
                  if(this.returnUrl!='undefined' && this.returnUrl!=''
                                                   && !this.returnUrl.includes("/userlogout")
                                                   && !this.returnUrl.includes("/userlogin")){

                    window.location.href = this.returnUrl;
                  }else{
                    //跳转到首页
                    window.location.href = 'http://www.xuecheng.com/'
                  }

                }else{
                    if(res.message){
                      this.$message.error(res.message);
                    }else{
                      this.$message.error('登陆失败');
                    }
                }
              },
                (res) => {
                  this.editLoading = false;
                });


          }
        });

    },

    resetForm:function(formName){
      this.$refs[formName].resetFields();
    },
    refresh_user:function(){
      let activeUser= utilApi.getActiveUser();

      if(activeUser){
        this.logined = true
        this.user = activeUser;
        //console.log(this.user.username)
      }else{
        this.showlogin()
      }
    },
    showlogin:function(){
       this.LoginFormVisible = true;
    },
    register:function() {

      this.$refs.registerForm.validate((valid) => {
        if (valid){
          this.userForm.username = this.registerForm.acc;
          this.userForm.password = this.registerForm.pass;
          this.userForm.name = this.registerForm.name;
          this.editLoading = true;
          //let paraa = Object.assign({}, this.userForm);
          loginApi.register(this.userForm).then((res) =>{
            this.editLoading = false;
            if (res.success){
              this.$message('注册成功');
            }else{
              if (res.message){
                this.$message.error(res.message);
              }else{
                this.$message.error('注册失败');
              }
            }
          });
        }
      });
    }
  },
  created() {
    // var this_ = this;
    //bus.$on('childa-message', this.showlogin(this_));


  },
  mounted() {

    this.refresh_user()
//    Vue.prototype.loginwin = this;
    if( this.$route.query &&  this.$route.query.returnUrl){

      let returnUrl =  Base64.decode(this.$route.query.returnUrl)
      //alert(returnUrl)
      this.returnUrl = returnUrl;
      //alert(this.returnUrl)
    }
    /*bus.$on('childa-message', function(data) {
      console.log("aaaaaaaaaaaaa"+data)
      alert(this.LoginFormVisible)
      this.LoginFormVisible = true
      alert(this.LoginFormVisible)
    });*/



  }
}
</script>
<style scoped>
  .login-form{width: 400px;margin:5% auto 0;}
</style>
