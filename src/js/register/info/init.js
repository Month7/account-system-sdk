import '../../common/polyfill.js';
import '../../common/fetch.js';
import render from'./render.js';
import bindEvent from './event.js';

const regInfo=(opts={})=>{
    const defaultOpts={
        btnText:'保存'
    };

    const options=Object.assign(defaultOpts,opts);
    render(options).then(()=>{
        bindEvent(options);
    })
}
export{regInfo}