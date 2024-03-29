import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
// 定义路由配置
let routes = []
let concat = (router) => {
  routes = routes.concat(router)
}
// // 导入路由规则
import HomeRouter from '@/module/home/router'
import CmsRouter from '@/module/cms/router' //导入cms的路由
// 合并路由规则
concat(HomeRouter)
concat(CmsRouter)//加入cms的路由
export default routes;
