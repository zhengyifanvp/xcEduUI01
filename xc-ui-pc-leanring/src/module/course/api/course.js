import http from './../../../base/api/public'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
import querystring from 'querystring'
/*选课查询*/
export const course_list = (page,size,params,userid) => {
  return http.requestGet(apiUrl+'/learning/course/getusercourselist/'+page+'/'+size+'?userid='+userid,params);
}
/*查询选课状态*/
export const course_learnstatus = courseId => {
  return http.requestPost(apiUrl+'/learning/choosecourse/learnstatus/'+courseId);
}
/*获取播放地址*/
export const get_media = (courseId,chapter) => {
  return http.requestGet(apiUrl + '/learning/course/getmedia/' + courseId + '/' + chapter);
}
export const getjwt = () => {
    return http.requestGet('/openapi/auth/userjwt');
}
/*课程查询*/
export const course_findByIds = ids => {
  return http.requestGet('/openapi/search/course/getbase/'+ids);
}



