import Regtion from '../../common/region.js';
import {getId as $} from '../../common/utils.js';
import {fetchJson} from '../../common/fetch.js';
import Region from '../../common/region.js';

const tpl=(data={},opts={})=>{
    return `<div id="register-info-wrapper" class="register-info-wrapper">
    <form id="register-info-form" onsubmit="return false">
        <label>
            <span>昵称：</span>
            <input id="register-info-nickname" name="nickname" type="text" placeholder="昵称" valid="present, noOther" value="
            ${data.nickname||''}">
        </label>
        <label>
            <span>电子邮箱：</span>
            <input id="register-info-email" name="email" type="text" placeholder="电子邮箱" valid="present, email" value="${data.email||''}">
        </label>
        <label>
            <span>真实姓名：</span>
            <input id="register-info-realname" name="realname" type="text" placeholder="真实姓名" value="
            ${data.realname||''}">
        </label>
        <label>
            <span>性别：</span>
            <select id="register-info-sex" name="sex" value="${data.sex||''}">
                <option value="1">男</option>
                <option value="2">女</option>
            </select>
        </label>
        <label>
            <span>生日：</span>
            <input id="register-info-birthday" name="birthday" type="date" placeholder="生日" value="${data.birthday||''}">
        </label>
        <label>
            <span>居住地：</span>
            <div id="register-info-address"></div>
        </label>
        <label>
            <span>&nbsp;</span>
            <input id="register-info-btn" type="submit" value="${opts.btnText||'下一步'}">
        </label>
    </form>
    </div>`
}


export default async(opts)=>{
    if(!opts.update){
        opts.container.innerHTML=tpl;
        const region=new Regtion({
            container:$('register-info-address'),
            name:'region'
        })
    }
    else{
        const result=await fetchJson('/profile',{});
        if(result.code==200){
            opts.container.innerHTML=tpl(result.data);
            const regionData=result.data.regionCode.split(',')||'';
            console.log(regionData);
            const region=new Region({
                container:$('register-info-address'),
                name:'region',
                initData:regionData
            })
        }
    }
}