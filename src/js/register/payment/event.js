import {fetchPost} from '../../common/fetch.js';
import {getId as $} from '../../common/utils.js';

export default (opts)=>{
    const $form=$('register-payment-form');
    $form.onsubmit= async(e)=>{
        e.preventDefault();
        let formVaule={};
        Array.from($form.elements).forEach((item)=>{
            if(item.name){
                formVaule[item.value]=item.value;
            }
        })
        let data=await fetchPost('/register/payment',formVaule);
        if(data.code==200){
            if(opts.success){
                opts.success();
            }
        }
    }
}