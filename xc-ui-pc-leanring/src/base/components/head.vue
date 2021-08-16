<template>
  <!--头部导航-->
  <header>
    <div class="learingHeader">
      <nav class="navbar">
        <div class="">
          <div class="logo"><img src="/static/images/asset-logoIco.png" width="100%" alt=""></div>
          <div class="nav-list">
            <ul class="nav navbar-nav">
              <li ><a href="http://www.xuecheng.com/">首页</a></li>
              <li><a href="http://www.xuecheng.com/course/search">课程</a></li>
              <li><a href="#">职业规划</a></li>
              <li></li>
            </ul>
          </div>

          <div class="sign-in">
            <!-- 未登录 -->
            <!-- <a href="#">登录 </a> <span> | </span> <a href="#"> 注册</a>-->
            <!-- 登录 -->
           <!-- <a href="#" class="personal"><span class="personalIco"></span>消息</a>
            <a href="#" class="personal">购物车</a>-->
            <span v-if="logined == true">欢迎{{this.user.username}}</span>
            <a href="javascript:;" @click="logout" v-if="logined == true">退出</a>
<!--            <a href="http://ucenter.xuecheng.com/" class="personal" target="_blank">我的学习</a>-->
            <a @click="mystudy()" href="#">我的学习</a>
            <a href="javascript:;" @click="showlogin" v-if="logined == false">登陆&nbsp;|&nbsp;注册</a>
            <a href="http://teacher.xuecheng.com/" class="personal" v-if="this.user.username=='超级管理员'"  target="_blank">教学提供方</a>
            <a href="http://system.xuecheng.com/" class="personal" v-if="this.user.username=='超级管理员'" target="_blank">系统后台</a>
<!--            <router-link :to="{path: '/'}">我的学习</router-link>-->
<!--            <a href="javascript:;" @click="logout" v-if="logined == true">退出</a>-->
<!--            <a href="javascript:;" @click="showlogin" v-if="logined == false">登陆|注册</a>-->

          </div>
          <div class="starch">
            <div><input type="text" class="input-search" v-model="keyword" @keyup.enter="search"  placeholder="输入查询关键词"></div>
            <div class="searchword"><a @click="search">搜索</a> </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
<script type="text/javascript">

  import utilApi from '../../common/utils';
  import * as loginApi from '../../module/home/api/home'
  export default {
    components:{

    },
    data() {
      return {
        keyword:'',
        LoginFormVisible:false,
        logined:false,
        activeName: 'login',
        editLoading: false,
        name: '超级管理员',
        formLabelWidth: '120px',
        user:{
          userid:'',
          username: '',
          userpic: ''
        },
      }
    },
    methods: {
      search() {
        if (this.keyword === '') {
          window.location = "http://www.xuecheng.com/course/search"
        } else {
          let keyword = encodeURIComponent(this.keyword)
          window.location = "http://www.xuecheng.com/course/search?keyword="+keyword
        }
      },
      mystudy(){
        if (this.user.userid === ""){
          alert("请先登录再尝试此功能")
          window.location = "http://ucenter.xuecheng.com/#/login?returnUrl="+ Base64.encode(window.location)
        }else {
          window.location = "http://ucenter.xuecheng.com/"
        }

      },
      refresh_user:function(){
        //从sessionStorage中取出当前用户
        let activeUser= utilApi.getActiveUser();
        //取出cookie中的令牌
        let uid = utilApi.getCookie("uid")
        console.log(activeUser)
        if(activeUser && uid && uid == activeUser.uid){
          this.logined = true
          this.user = activeUser;
        }else{
          if(!uid){
            return ;
          }
          //请求查询jwt
          loginApi.getjwt().then((res) => {
            if(res.success){
              let jwt = res.jwt;
              let activeUser = utilApi.getUserInfoFromJwt(jwt)
              if(activeUser){
                this.logined = true
                this.user = activeUser;
                utilApi.setUserSession("activeUser",JSON.stringify(activeUser))
              }
            }
          })
        }
      },
      //退出登录
      logout: function () {
        this.$confirm('确认退出吗?', '提示', {
        }).then(() => {
          //跳转到统一登陆
          this.$router.push({ path: '/logout'})
        }).catch(() => {

        });
      },
      showlogin:function(){
        this.returnUrl = window.location;
        this.LoginFormVisible = true;
      }
    },
    mounted() {
      this.refresh_user()

    }
  }
</script>
<style >
  @import './../../../static/plugins/normalize-css/normalize.css';
  /*@import './../../../static/plugins/bootstrap/dist/css/bootstrap.css';*/
  @import './../../../static/css/page-header.css';
</style>
