import Slider from'../../common/slider.js';
import {getId as $,addClass, removeClass} from '../../common/utils.js';
import { fetchPost } from '../../common/fetch.js';
import {check} from '../../common/from-check.js';

export default(opts)=>{
    let mobileVerifyToken;

    const $mobileInput = $('register-mobile-input');
    const $verifyInput = $('register-verify-input');
    const $verifyBtn = $('register-verify-btn');
    const $mobileBtn = $('register-mobile-btn');
    const $verifyMobile = $('register-verify-mobile');
    const $dialog = $('register-verify-dialog');
    const $dialogClose = $('register-verify-dialog-close');
    const $verifyForm=$('register-verify-form');
    const $mobileForm = $('register-mobile-form');

    const slider =new Slider({
        container:$('register-verify-wrapper'),
        success:async ($wrapper,$text,offsetArr)=>{
            const offsetMsg=offsetArr.join(":");
            let data = await fetchPost('/getMobileVerifyToken', {});
            if(data.code==200){
                mobileVerifyToken=data.mobileVerifyToken;
                addClass($wrapper,'success');
                $text.innerHTML="验证成功";
                $verifyBtn.removeAttribute('disabled');
                removeClass($verifyBtn,'disabled');
            }
            else{
                addClass($wrapper,'failed');
                $text.innerHTML="验证失败";
            }
        }
    })
    $verifyBtn.onclick=async()=>{
        
        let checkResult=check($mobileForm);
        console.log(checkResult);
        if(checkResult.length){
            const type=checkResult[0].type;
            
            if(type=='present'){
                alert("请填写您的手机号!");
            }
            else if(type=='mobile'){
                alert("请填写正确的手机号");
            }
        }
        else{
            let data=await fetchPost('/register/getVerifyCode',{
                mobile:$mobileInput.value,
                mobileVerifyToken:mobileVerifyToken
            })
            if(data.code==200){
                $dialog.style.display='block';
                $verifyMobile.innerHTML=data.mobile;
                mobileVerifyToken='';
                slider.reset();
            }
            else{
                alert("失败");
            }
        }
    }
    $dialogClose.onclick=()=>{
        $dialog.style.display='none';
        mobileVerifyToken='';
        slider.reset();
    }
    $verifyInput.oninput=()=>{
        const MSGLENGTH=6;
        let value=$verifyInput.value;
        $verifyInput.value=value.replace(/\D/g,'');
        if($verifyInput.value.length>MSGLENGTH-1){
            $mobileBtn.removeAttribute('disabled');
            removeClass($mobileBtn,'disabled');
            addClass($mobileBtn,'btn-primary');
            if($verifyInput.value.length>MSGLENGTH){
                $verifyInput.value=$verifyInput.value.substring(0,MSGLENGTH);
            }
        }
        else{
            $mobileBtn.setAttribute('disabled','disabled');
            removeClass($mobileBtn,'btn-primary');
            addClass($mobileBtn,'disabled');
        }
    }
    $mobileBtn.onclick=async()=>{
        let data=await fetchPost('/register/mobile',{
            mobile:$verifyMobile.innerText,
            verifyCode:$verifyInput.value,
            mobileVerifyToken:mobileVerifyToken
        })
        if(data.code==200){
            if(opts.success){
                opts.success();
            }
        }
        else{
            alert("验证码错误");
        }
    }
}