/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-02-16 02:48:17 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-23 01:38:41
 */
const rules={
    ltFFFF:(value)=>{
        if(value.map(/\u{ffff}-\u{fffff}/)){
            return {
                type:'ltFFFF',
                message:'您输入了非法字符'
            }
        }
    },
    noOther:(value)=>{
        if(value.match(/[\p{C}]/u)){
            return {
                type:'noOther',
                message:'您输入了非法字符'
            }
        }
    },
    mobile:(value)=>{
        // console.log("!!");
       
        if(!value.match(/^1\d{10}$/)){
            return {
                type:'present',
                message:'手机号格式不对!'
            }
        }
    },
    email: (v) => {
        if (!v.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
            return {
                type: 'email',
                message: '请填入正确的邮箱'
            }
        }
    },
    present:(value)=>{
        // trim移除字符串中多余符号
        if(!value.trim()){
            
            return {
                type:'present',
                message:'必填'
            }
        }
        return
    },
}
const check=(form)=>{
    // console.log("form"+form);
    // console.log("elements"+form.elements);
    if(!(form||form.elements)){
        console.log("form不存在!");
        return;
    }
    const elements=form.elements;
    let checkResults=[];
    
    //类数组转化为数组并筛选
    Array.from(elements).filter(item=>{
        return item.getAttribute('valid');
    }).map(item=>{
        const valids=item.getAttribute('valid').split(", ");
        const value=item.value;
        let errorArr=[];
        valids.forEach(valid=>{
            if(rules[valid]){
                let result=rules[valid](value);
                if(result){
                    errorArr.push(result);
                }
            }
        });
        if(errorArr.length){
            checkResults.push({
                dom:item,
                errorArr:errorArr,
                name:item.name,
                message:errorArr[0].message,
                type:errorArr[0].type,
            });
        }
    })
    return checkResults;
}
export {check}