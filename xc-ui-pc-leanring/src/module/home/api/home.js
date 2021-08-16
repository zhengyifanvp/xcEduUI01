import http from './../../../base/api/public'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;
import querystring from 'querystring'
import qs from 'qs'
/*解析jwt令牌*/
export const getjwt = () => {
  return http.requestGet('/openapi/auth/userjwt');
}


