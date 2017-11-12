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
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);//阻止冒泡
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 0); }, false);

//初始状态，加载数据
function loadAction(){
	var el, li;
	el = document.getElementById('thelist');
	for (i=0; i<10; i++) {
		li = document.createElement('li');
		li.innerText = '初始数据--' + (++generatedCount);
		el.appendChild(li, el.childNodes[0]);
	}
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
		var username="test";
        var content="eat";
		$("#thelist").append('<div class="sec2-header"><div class="name">'+username+'</div><div class="date">10-11</div><div class="time">41分钟送达</div></div><div class="sec2-content"><div class="sell">商家</div><div class="star"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"></div><ul class="assess"><li>无懈可击</li><li>口味5星</li><li>包装5星</li><li>配送5星</li></ul></div><div class="sec2-footer"><div class="text">'+content+'</div></div>');
		
		// var txtHtml=;
		// el.appendChild(li,el);                                          //将创建的元素节点追加到el
		myScroll.refresh();                                             //刷新
	}, 400);
}