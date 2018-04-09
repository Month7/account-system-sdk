const getId=(id)=>{
    const dom=document.getElementById(id);
    dom&&dom.setAttribute('id',dom.id+'-'+Math.floor(Math.random()*100000));
    return dom;
}
const hasClass=(obj,cls)=>{
    return obj.className.match(new RegExp('\s|^'+obj+'$|\s'));
}
const addClass=(obj,cls)=>{
    obj.className+=' '+cls;
}
const removeClass=(obj,cls)=>{
    if(hasClass(obj,cls)){
        const reg=new RegExp('\s|^'+obj+'$|\s');
        obj.className=obj.className.replace(reg,' ');
    }
}
//判断是否是对象
const checkOptions =(obj)=>{
    if(Object.prototype.toString.call(obj)!=='[object Object]'){
        return false;
    }
}
const isDom=(obj)=>{
    try{
        return obj instanceof HTMLElement; 
    }
    catch(e){
        return (typeof obj==='object')&&(obj.nodeType ===1)&&(typeof obj.style==='object');
    }
}
const getUrlParams=(key)=>{
    const query=location.search.replace(/^\?/,'');
    let obj={};
    query.split('&').map((item)=>{
        let tmp=item.split("=");
        obj[tmp[0]]=tmp[1];
    })
    if(!key){
        return obj;
    }
    else{
        return obj[key];
    }
}
/**
 * 事件委托 or 事件绑定
 * bindEvent(el,evevtType,fn) //事件绑定
 * bindEvent(el,evevtType,classSelector fn)
 */
const bindEvent=(el,evevtType,...args)=>{
    let selector,
        fn,
        target;
    // const findNode=(element,selector,endel)=>{
    //     if(element==endel){
    //         return;
    //     }
    //     if(document.querySelector(selector).className==element.className){
    //         target=el;
    //         return;
    //     }
    //     else{
    //         findNode(element.parentNode,selector,endel);
    //     }
    // }
    const findNode = (el, selector, endel) =>  {
        if (el === endel) {
            return;
        }
        // console.log(el, tagName);
        if (document.querySelector(selector).className === el.className) {
            target = el;
        }
        else {
            findNode(el.parentNode, selector, endel);
        }
    };
    if(typeof args[0]=='string'){
        selector=args[0];
        if(typeof args[1]=='function'){
            fn=args[1];
        }
    }
    if(typeof args[1]=='function'){
        fn=args[1];
    }
    el.addEventListener(evevtType,function(e){
        if(!selector){
            fn.call(el,e);
        }
        else{
            findNode(e.target,selector,el);
            target && fn.call(target, {target: target});
        }
    });
} 
export{getId,addClass,removeClass,getUrlParams,bindEvent}