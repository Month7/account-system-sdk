import {fetchPost} from '../../common/fetch.js';
import {getId as $} from '../../common/utils.js';
import {check} from '../../common/from-check.js';

export default (opts)=>{
    const $form=$('register-info-form');
    let formValues={};
    Array.from($form.elements).forEach((item)=>{
        if(item.name){
            formValues[item.name]=item.value;
        }
    })
    $form.onsubmit=async(e)=>{
        e.preventDefault();
        const na={
            'nickname':'昵称',
            'email':'邮箱'
        }
        let checkResults=check($form);
       
        if(checkResults.length){
            const name=checkResults[0].name;
            const type=checkResults[0].type;
            const message=checkResults[0].message;
            if(type=='  present'){
                alert(na[name]+message);
            }
            else{
                alert(message);
            }
            
        }
        else{
            let data=await fetchPost('/register/info',formValues);
            if(data.code==200){
                if(opts.success){
                    opts.success();
                }
            }
            else{
                throw('error');
            }
        }
    }
}