import {fetchPost,fetchJson} from '../common/fetch.js';
import {getId as $,addClass,removeClass} from '../common/utils.js';
import findTpl from './findTpl.js';

export default async(opts)=>{
    const findInfo=await fetchJson('/security-info',{});
    const $chooseMobile = $('choose-mobile');
    const $chooseEmail = $('choose-email');
    const $dialog = $('forget-dialog');

    const forget=async(type)=>{
       
        const $verifyInput = $('forget-verify-input');
        const $forgetBtn = $('forget-confirm-btn');
        const $number = $('forget-verify-number');
        const $close = $('forget-dialog-close');
        const typeAlias = (type === '邮箱') ? 'email' : 'mobile';
        const typeTool = (type === '邮箱') ? '邮件' : '短信';
        const sendVerifyCode=await fetchPost('/send-forget-verifycode',{
            type:type
        });
        if(sendVerifyCode.code==200){
            $dialog.style.display='block';
            $verifyInput.oninput = () => {
                const MSGLENGTH = 6;
                let value = $verifyInput.value;
                //过滤非数字输入
                $verifyInput.value = value.replace(/\D/g, '');
                //长度过滤
                if ($verifyInput.value.length > (MSGLENGTH - 1)) {
                    $forgetBtn.removeAttribute('disabled');
                    removeClass($forgetBtn, 'disabled');
                    addClass($forgetBtn, 'btn-primary');
                    if (value.length > MSGLENGTH) {
                        $verifyInput.value = value.substring(0, MSGLENGTH);
                    }
                }
                else {
                    removeClass($forgetBtn, 'btn-primary');
                    addClass($forgetBtn, 'disabled');
                    $forgetBtn.setAttribute('disabled', 'disabled');
                }
            }
        }
        else{
            alert("发送"+typeTool+"失败");
        }
        $close.onclick=()=>{
            $dialog.style.display='none';
            $verifyInput.value='';
            $number.innerHTML='';
        };
        $forgetBtn.onclick=async ()=>{
            let data=await fetchPost('/forget',{
                number:$number.innerText,
                verifyCode:$verifyInput.value
            });
           
            if(data.code==200){
                
                opts.success&&opts.success(type,typeTool);
            }
            else{
                alert("验证码错误");
            }
        }
    }
  
    $chooseMobile.onclick=()=>{
        $dialog.innerHTML=findTpl('手机',findInfo.data.mobile);
        forget('mobile');
    }
    $chooseEmail.onclick=()=>{
        $dialog.innerHTML=findTpl('邮箱',findInfo.data.email);
        forget('email');
    }
}