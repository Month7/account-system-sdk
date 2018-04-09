/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-02-15 00:27:03 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-16 03:32:24
 */
import {getId as $} from '../common/utils.js';
import { fetchPost } from '../common/fetch.js';
import {check} from'../common/from-check.js';
export default(opts={})=>{
    const $loginForm=$('login-form');
    const $loginBtn = $('login-btn');
    const $remember = $('login-remember');
    const $clearAccount = $('clear-account');
    const $clearPassword = $('clear-password');
    const $account = $('login-account');
    const $password = $('login-password');
    const $error = $('login-error');
    //表单验证
    $loginForm.onsubmit=async (e)=>{
        e.preventDefault(e);
        /**
         * 点击登录
         */
        // const v=await fetch(url,{}).then((res)=>{

        // })
        // handle(v);
        
        // let remember='0';
        // if($remember.getAttribute('checked')){
        //     remember='1';
        // }
        const checkResults=check($loginForm);
        console.log(checkResults);
        // console.log(checkResults.length);
        if(!checkResults.length){
            const data=await fetchPost('/login',{
                account:$account.value,
                password:$password.value,
                // remember:remember
            });
            console.log(data);
        }
        
    };
    $account.oninput=()=>{

    };
    $clearAccount.onclick=()=>{
        
    }
    $password.oninput=()=>{
        
    };
    
}