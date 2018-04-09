/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-02-15 00:26:43 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2018-02-15 00:26:43 
 */

import '../common/polyfill.js';
import render from './render.js';
import bindEvent from './event.js';

const login=(opts={})=>{
    const defaultOpts={
        loginBtnText:'登 录',
        accountPlaceholder:'用户名/邮箱/账号',
        passwordPlaceholder:'请输入密码',
        accountLabel:'',
        passwordLabel:'',
    };
    const options=Object.assign(defaultOpts,opts);
    render(options);
    bindEvent(options);
}

export{login}