$(function(){

    $(".xxxx").click(function(){
        var username="test";
        var content="eat";
        var txtHtml='<section class="sec2"><div class="sec2-header"><div class="name">'+username+'</div><div class="date">10-11</div><div class="time">41分钟送达</div></div><div class="sec2-content"><div class="sell">商家</div><div class="star"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"></div><ul class="assess"><li>无懈可击</li><li>口味5星</li><li>包装5星</li><li>配送5星</li></ul></div><div class="sec2-footer"><div class="text">'+content+'</div></div></section>';
        $("#Yhpj").append(txtHtml);
  
   });
    $(".check0").click(function(){
        if(this.checked){
            $("#Yhpj").find(".sec2").each(function(){
                if($(this).find("div.sec2-footer").find(".text").html()==null||$(this).find("div.sec2-footer").find(".text").html().length==0){
                    $(this).hide();
                }
                else{
                    $(this).show();
                }
            })
    }
        else{
            $(".sec2").show();
        }
    });
    var i=1;
    var flag=1;
    $(window).scroll(function(){      
        if($(window).scrollTop() + $(window).height() >= $(document).height()-200){           //滚动到底部加载的判断条件：滚动高度 + 可视高度 >= 文档高度-200 也可能不是200，我也懒得调
            var timer=(function(){
            });
            var timer=setTimeout(function(){                     //设置定时器
                if(flag){
                    $.ajax({                                  //从后台获取数据
                        type: "GET",                          //get方法
                        url: "test.json",                  
                        dataType: "json",
                        success : function(data){                        //获取成功后
                                if(data==""){
                                    flag=0;
                                    $(".pullUpLabel").text("别刷了没了");     
                                }
                                else{
                                    var txtHtml="";
                                    var html = '';
                                    $.each( data  , function(commentIndex, comment) {
                                        txtHtml+='<section class="sec2"><div class="sec2-header"><div class="name">'+comment['username']+'</div><div class="date">10-11</div><div class="time">'+comment['time']+'</div></div><div class="sec2-content"><div class="sell">商家</div><div class="star"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"></div><ul class="assess"><li>无懈可击</li><li>口味5星</li><li>包装5星</li><li>配送5星</li></ul></div><div class="sec2-footer"><div class="text">'+comment['content']+'</div></div></section>';
                                    })
                                    $("#Yhpj").append(txtHtml);
                                    flag=0;
                                }   
                        }
                      }); 
                }
                else{
                    $(".pullUpLabel").text("别刷了没了");     
                    clearTimeout(timer);
                } 
            },1000);	
        }
    })

/*=============================================假装有一个后端.....========================================*/
//     /*从后台获取数据*/
//     /*get方法*/
//     $(".xxxx").click(function(){                                   //某个点击事件触发(?)
//         $.get("get3.jsp",{
//             time:$("#xxxx").val(),                                 //送达时间
//             username:$("#username").val(),                         //获取用户名
//             content:$("#content").val()                            //获取评论内容
//         },function(data,txtStatus){
//             var time=data.time;                                    //送达时间
//             var username=data.username;                            //用户名
//             var content=data.content;                              //评论内容
//             //将评论内容写入
//             var txtHtml='<section class="sec2"><div class="sec2-header"><div class="name">'+username+'</div><div class="date">10-11</div><div class="time">'+time+'</div></div><div class="sec2-content"><div class="sell">商家</div><div class="star"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"></div><ul class="assess"><li>无懈可击</li><li>口味5星</li><li>包装5星</li><li>配送5星</li></ul></div><div class="sec2-footer"><div class="text">'+content+'</div></div></section>';
//             $("#Yhpj").append(txtHtml);
//         },"json");
//         var txtHtml='<section class="sec2"><div class="sec2-header"><div class="name">'+username+'</div><div class="date">10-11</div><div class="time">41分钟送达</div></div><div class="sec2-content"><div class="sell">商家</div><div class="star"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"></div><ul class="assess"><li>无懈可击</li><li>口味5星</li><li>包装5星</li><li>配送5星</li></ul></div><div class="sec2-footer"><div class="text">'+content+'</div></div></section>';
//         $("#Yhpj").append(txtHtml);
//    /*筛选*/
//     $(".check0").click(function(){
//         if(this.checked){
//             $(".sec2").each(function(){
//                 if($(this).find("div.sec2-footer").find(".text").length>0){
//                 $(this).show();
//                 }
//                 else{
//                     $(this).hide();
//                 }
//             })
//     }
//         else{
//             $(".sec2").show();
//         }
//     });
//    });
//    /*上拉加载*/
   
//    var flag=1;
//    $(window).scroll(function(){                                                             //当页面滑动时执行
//        if($(window).scrollTop() + $(window).height() >= $(document).height()-200){           //滚动到底部加载的判断条件：滚动高度 + 可视高度 >= 文档高度-200 也可能不是200，我也懒得调
//            var timer=(function(){
//            });
//            var timer=setTimeout(function(){
//                if(flag){
//                 if(json){                                 //如果从后端获取到json数据...(?)             //这里也可以加个控制变量控制一次加载几条(?)
//                     var str = ""; 
//                     $.each(json,function(index,array){ //遍历 
//                         var username="...";
//                         var content="...";
//                         ; //获取的JSON数据 
//                         $("#Yhpj").append('<section class="sec2"><div class="sec2-header"><div class="name">'+username+'</div><div class="date">10-11</div><div class="time">41分钟送达</div></div><div class="sec2-content"><div class="sell">商家</div><div class="star"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"><img src="img/star2.png"></div><ul class="assess"><li>无懈可击</li><li>口味5星</li><li>包装5星</li><li>配送5星</li></ul></div><div class="sec2-footer"><div class="text">'+content+'</div></section>'); //追加 
//                     }); 
                    
//                 }
//                    else{
//                        $(".pullUpLabel").text("别刷了没了");
//                        flag=0;
//                    }
//                }
//                else{
//                    $(".pullUpLabel").text("别刷了没了");
//                    clearTimeout(timer);
//                }
//            },1500);	             //刷新用的时间
//        }
//    })
});