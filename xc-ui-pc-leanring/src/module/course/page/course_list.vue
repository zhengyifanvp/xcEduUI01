<template>
  <div class="personal-cont">
    <!--<div class="top">
      <div class="tit"><span>最近学习课程</span></div>

      <div class="top-cont">
        <div class="col-lg-8">
          <div class="imgIco">&lt;!&ndash;<img src="/static/images/asset-timg.png" width="60" height="28" alt="">&ndash;&gt;</div>
          <div class="title"><span class="lab">继续学习</span> 程序语言设计 <span class="status">学习中</span></div>
          <div class="about"><span class="lab">正在学习</span> 使用对象 <span class="data">有效日期: 2017.06.05 - 2018.06.05</span></div>
          <div class="rate">
            <li class="active"></li>
            <li></li>
            <li></li>
            <li></li><span>1/4 已完成部分</span> <span>进度25%</span></div>
        </div>
        <div class="division"></div>
        <div class="col-lg-4 text-right">
          <a href="#" class="goLear"> 继续学习</a>
          <a href="#" class="evalu"> 课程评价</a>
          <div class="aft" style="top:0px;right:0px;">● ● ●
            <ul></ul>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>-->
    <div class="my-course">
      <div class="title">
        <div class="lab-title">全部课表</div>
        <div class="tit-Item"><span><em class="active">按学习时间进行排序</em> <em>按加入时间进行排序</em></span><span><em class="active">全部</em><em>付费</em><em>即将过期</em><em>失效</em></span></div>
      </div>
      <div class="cont" >
        <div v-for="course in courseList" class="col-lg-6">
          <div class="item">
            <div class="imgIco"><!--<img src="/static/images/asset-timg.png" width="60" height="28" alt="">--></div>
            <div class="title"><span class="lab" v-if="courseMap[course.courseId]">{{courseMap[course.courseId].name}} </span><span class="status">学习中</span>
              <div class="aft">● ● ●
                <ul></ul>
              </div>
            </div>
            <!--<div class="about"><span class="lab">正在学习</span> 使用对象 </div>-->
            <div class="time">有效日期: {{course.startTime | formatDate}} - {{course.endTime | formatDate}}?</div>
            <div class="rate">
              <li class="active"></li>
              <li></li>
              <li></li>
              <li></li><span>1/4 已完成部分 <em>进度 25%</em></span></div>
            <div class="parting"></div>
            <div class="butItem text-center">
<!--              <router-link :to="'www.xuecheng.com/course/detail/'+course.courseId+'.html/0'" class="golearing"  target="_blank">继续学习</router-link>-->
              <a :href="'http://www.xuecheng.com/course/detail/'+course.courseId+'.html'" class="golearing" target="_blank">继续学习</a>
              <a href="#" class="classcom">课程评价</a></div>
          </div>
        </div>

        <!--<div class="col-lg-6">
          <div class="item">
            <div class="imgIco">&lt;!&ndash;<img src="/static/images/asset-timg.png" width="60" height="28" alt="">&ndash;&gt;</div>
            <div class="title"><span class="lab">继续学习</span> 程序语言设计 <span class="status">学习中</span>
              <div class="aft">● ● ●
                <ul></ul>
              </div>
            </div>
            <div class="about"><span class="lab">正在学习</span> 使用对象 </div>
            <div class="time">有效日期: 2017.06.05 - 2018.06.05</div>
            <div class="rate">
              <li class="active"></li>
              <li></li>
              <li></li>
              <li></li><span>1/4 已完成部分 <em>进度 25%</em></span></div>
            <div class="parting"></div>
            <div class="butItem text-center"><a href="#" class="golearing">继续学习</a> <a href="#" class="classcom">课程评价</a></div>
          </div>
        </div>-->

        <div class="clearfix"></div>

      </div>
    </div>
    <div id="listcont">
      <li><a href="#">课程成绩</a></li>
      <li><a href="#">联系老师</a></li>
      <li><a href="#">课程延期</a></li>
      <li><a href="#">退出课程</a></li>
    </div>
  </div>
</template>

<script>
  import * as courseApi from '../api/course'
  import * as systemApi from '@/base/api/system'
  import utilApi from '../../../common/utils';
  import * as homeApi from '../../home/api/home'
  export default {
    components: {},
    data() {
      return {
        page:1,
        size: 20,
        courseList:[],
        courseMap:{},
        testMap:{

        },
        user:{
          userid:'',
          username: '',
          userpic: ''
        },
      }
    },

    methods: {
      findCourseByIds(course_ids){
        //根据课程id取课程信息
        console.log(course_ids)
        courseApi.course_findByIds(course_ids).then((res)=>{
          console.log("----------------")
          console.log(res)
          this.courseMap = res;
        })
      },

      refresh_user:function(){
        let activeUser= utilApi.getActiveUser();
        //取出cookie中的令牌
        let uid = utilApi.getCookie("uid")
        if(activeUser && uid && uid == activeUser.uid){
          this.logined = true
          this.user = activeUser;
        }else{
          if(!uid){
            return ;
          }
          //请求查询jwt
          homeApi.getjwt().then((res) => {
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
    },
    created(){
      this.refresh_user()


    },
    mounted() {
      let params = {}

        courseApi.course_list(this.page,this.size,params,this.user.userid).then((res)=>{
        console.log(res)
        console.log(this.user.userid)
        if(res.success){
          this.courseList = res.queryResult.list;
          console.log(this.courseList)
          //查询 课程 信息
          let courseIds=[]
          this.courseList.forEach((item,index)=>{
              courseIds.push(item.courseId)
            }
          )
          this.findCourseByIds(courseIds.toString())

        }
      })

    }
  }

</script>

<style>
  @import './../../../../static/plugins/normalize-css/normalize.css';
  /*@import './../../../../static/plugins/bootstrap/dist/css/bootstrap.css';*/
  @import './../../../../static/css/page-learing-personal.css';

</style>
