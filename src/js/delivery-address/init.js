import '../common/polyfill.js';
import render from './render.js';
import bindEvent from './event.js';

const delivery =(opts={})=>{
    const defaultOpts={
    };
    const options=Object.assign(defaultOpts,opts);
    render(options).then(()=>{
        bindEvent(options);
    });
    // render(options);
}

export{delivery}