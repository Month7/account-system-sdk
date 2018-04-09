import '../../common/polyfill.js';
import render from './render.js';
import bindEvent from './event.js';

const regPayment=(opts={})=>{
    const defaultOpts={
        paymentPlaceHolder:'请输入xx账号',
        paymentPasswordPlaceHolder:'请输入xx密码'
    };

    const options=Object.assign(defaultOpts,opts);
    render(options);
    bindEvent(options);
}
export{regPayment}