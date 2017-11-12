$(function(){
    /*从后台获取数据*/
    /*get方法*/
//     $(".xxxx").click(function(){
//         // $.get("get3.jsp",{
//         //     time:$("#xxxx").val(),                                 //送达时间
//         //     username:$("#username").val(),                         //获取用户名
//         //     content:$("#content").val()                            //获取评论内容
//         // },function(data,txtStatus){
//         //     var time=data.time;                                    //送达时间
//         //     var username=data.username;                            //用户名
//         //     var content=data.content;                              //评论内容
//         //     //将评论内容写入
//         //     var txtHtml='<section class="sec2"><div class="sec2-header"><div class="name">'+username+'</div><div class="date">10-11</div><div class="time">'+time+'</div></div><div class="sec2-content"><div class="sell">商家</div><div class="star"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"></div><ul class="assess"><li>无懈可击</li><li>口味5星</li><li>包装5星</li><li>配送5星</li></ul></div><div class="sec2-footer"><div class="text">'+content+'</div></div></section>';
//         //     $("#Yhpj").append(txtHtml);
//         // },"json");
//         var username="test";
//         var content="eat";
//         var txtHtml='<section class="sec2"><div class="sec2-header"><div class="name">'+username+'</div><div class="date">10-11</div><div class="time">41分钟送达</div></div><div class="sec2-content"><div class="sell">商家</div><div class="star"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"></div><ul class="assess"><li>无懈可击</li><li>口味5星</li><li>包装5星</li><li>配送5星</li></ul></div><div class="sec2-footer"><div class="text">'+content+'</div></div></section>';
//         $("#Yhpj").append(txtHtml);
  
//    });
    // $(".check0").click(function(){
    //     if(this.checked){
    //         $(".sec2").each(function(){
    //             if($(this).find("div.sec2-footer").find(".text").length>0){
    //             $(this).show();
    //             }
    //             else{
    //                 $(this).hide();
    //             }
    //         })
    // }
    //     else{
    //         $(".sec2").show();
    //     }
    // });
    $(".check0").click(function(){
        if(this.checked){
            $(".sec2").each(function(){
                if($(this).find("div.sec2-footer").find(".text").length>0){
                $(this).show();
                }
                else{
                    $(this).hide();
                }
            })
    }
        else{
            $(".sec2").show();
        }
    });
});
var myScroll,pullDownEl, pullDownOffset,pullUpEl, pullUpOffset,generatedCount = 0;

function loaded() {
   
	//动画部分
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
			}
		},
		onScrollMove: function () {
		
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放刷新';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放刷新';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
	loadAction();
}
// document.addEventListener('touchstart', function (e) { e.preventDefault(); }, false);//阻止冒泡
// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);//阻止冒泡
document.addEventListener('touchmove', function (e) { if (e.cancelable) {
    // 判断默认行为是否已经被禁用
    if (!e.defaultPrevented) {
        e.preventDefault();
    }
} }, false);//阻止冒泡
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 0); }, false);

//初始状态，加载数据
function loadAction(){
	// var el, li;
	// el = document.getElementById('thelist');
	// for (i=0; i<10; i++) {
	// 	li = document.createElement('li');
	// 	li.innerText = '初始数据--' + (++generatedCount);
	// 	el.appendChild(li, el.childNodes[0]);
	// }
	myScroll.refresh();
}

//下拉刷新当前数据
function pullDownAction () {
	setTimeout(function () {
		//这里执行刷新操作
		
		myScroll.refresh();	
	}, 400);
}

//上拉加载更多数据
function pullUpAction () {
	setTimeout(function () {
		var el, li;
		// el = document.getElementById('thelist');
		
		// for (i=0; i<10; i++) {
		// 	li = document.createElement('li');
		// 	li.innerText = '上拉加载--' + (++generatedCount);
		// 	el.appendChild(li, el.childNodes[0]);
		// }
		// li = document.createElement('<section class="sec2"><div class="sec2-header"><div class="name">'+username+'</div><div class="date">10-11</div><div class="time">41分钟送达</div></div><div class="sec2-content"><div class="sell">商家</div><div class="star"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"></div><ul class="assess"><li>无懈可击</li><li>口味5星</li><li>包装5星</li><li>配送5星</li></ul></div><div class="sec2-footer"><div class="text">'+content+'</div></div></section>)');
		// li=document.createElement('div');                       //创建元素节点
		var username="下拉加载内容";
        var content="下拉加载内容";
		$("#Yhpj").append('	<section class="sec2"><div class="sec2-header"><div class="name">'+username+'</div><div class="date">10-11</div><div class="time">41分钟送达</div></div><div class="sec2-content"><div class="sell">商家</div><div class="star"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"></div><ul class="assess"><li>无懈可击</li><li>口味5星</li><li>包装5星</li><li>配送5星</li></ul></div><div class="sec2-footer"><div class="text">'+content+'</div></section>');
		myScroll.refresh();                                             //刷新
	}, 400);
}