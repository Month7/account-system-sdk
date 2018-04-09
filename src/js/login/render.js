/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-02-15 00:26:57 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-25 10:50:44
 */

import {getId} from '../common/utils.js';
const template=(opts={})=>{

    const autocompleteTPL=`
        <div id="no-autocomplete">
            <input type="text">
            <input type="password">
        </div>
    `;

    const autocompleteAdapter=opts.autocomplete ?'':
        autocompleteTPL;
    const autocomplete=opts.autocomplete;
    const tpl =`
        <div id="login-wrapper">
            <form id="login-form" onsubmit="return false">
            ${autocompleteAdapter}    
            <label class="login-accout-wrapper">
                    <span class="account-label">
                        ${opts.accountLabel}
                    </span>
                    <input id="login-account" name="account"
                    type="text" placeholder="${opts.accountPlaceholder}" autocomplete="${autocomplete}
                    " valid="present">
                    <span id="clear-account" class="del">
                </label>

                <label class="login-accout-wrapper">
                <span class="password-label">
                    ${opts.passwordLabel}
                </span>
                <input id="login-password" name="password"
                type="text" placeholder="${opts.passwordPlaceholder}" autocomplete="${autocomplete}"
                valid="present">
                <span id="clear-account" class="del">
            </label>
            <input id="login-btn" class="login-btn"
                type="submit" value="${opts.loginBtnText}">
            </from>
        </div>
    `
    return tpl;
}

export default(conf={})=>{
    conf.container.innerHTML=template(conf);
    var autocomplete=getId('no-autocomplete');
    if(autocomplete){
        autocomplete.style.opacity=0;
        autocomplete.style.height=0;
    }
}