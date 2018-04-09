import {getId as $} from '../common/utils.js';

const render=Symbol('render');
const event=Symbol('event');
const style =
`<style>
    .vs-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .vs-moved-bg {
        background: green;
        width: 0;
        position: absolute;
        z-index: 999;
        height: 100%;
    }

    .vs-unmoved-bg {
        background: gray;
        width: 100%;
        position:absolute
        z-index: 998;
        height: 100%;
    }

    .vs-text {
        position: absolute;
        width: 100%;
        top: 0;
        z-index: 1000;
        backgound: rgba(0,0,0,0);
        text-align: center;
    }

    .vs-move-btn {
        height: 100%;
        width: 30px;
        background: #333333;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1001;
    }
</style>`
class Slider{
    constructor(opts){
        this.opts=opts;
        if(!opts.container){
            console.log("opts.container错误");
        }
        else{
            this[render](opts);
            this[event](opts);
        }
    }
    [render](opts){
        const unsuccessTip=opts.unsuccessTip||"请拖动滑块到最右边";
        const tpl=style+`
            <div id="vs-wrapper" class="vs-wrapper">
                <div id="vs-moved-bg" class="vs-moved-bg"></div>
                <span id="vs-move-btn" class="vs-move-btn"></span>
                <div id="vs-unmoved-bg" class="vs-unmoved-bg"></div>
                <span id="vs-text" class="vs-text" ondrag="return false;">
                    ${unsuccessTip}
                </span>
            </div>
        `
 
        opts.container.innerHTML=tpl;
    }
    [event](opts){
        const $btn=$('vs-move-btn');
        const $moved=$('vs-moved-bg');
        const $wrapper=$('vs-wrapper');
        const $text=$('vs-text');
        const reset=()=>{
            this.startX=0;
            this.startY=0;
            this.start=false;
            this.end=false;
            $btn.style.left='0px';
            $moved.style.width='0px';
            this.offsetArr=[];
        }
        $btn.onmousedown=(e)=>{
            this.start=true;
            this.startX=e.pageX;
            this.startY=e.pageY;
            this.offsetArr=[];
        };
        window.onmousemove=(e)=>{
            if(this.start&&!this.end){
                let offsetX=e.pageX-this.startX;
                let offsetY=e.pageY-this.startY;
                this.offsetArr.push(offsetX+","+offsetY);
                $btn.style.left=offsetX+'px';
                $moved.style.width=offsetX+'px';
                let r2=parseInt(window.getComputedStyle($wrapper).width)-parseInt(window.getComputedStyle($btn).width);
                let r1=$moved.offsetLeft+parseInt(window.getComputedStyle($moved).width);
                if(r1>=r2){
                    this.end=true;
                    this.start=false;
                    $btn.style.left=r2+'px';
                    $moved.style.width=r2+'px';
                    if(opts.success){
                        opts.success($wrapper,$text,this.offsetArr);
                    }
                }
            }
        };
        window.onmouseup=()=>{
            if(!this.end){ 
                reset();
            }
        }
    }
    reset(){
        this[render](this.opts);
        this[event](this.opts);
    }
}
export default Slider;