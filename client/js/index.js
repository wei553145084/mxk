var un = localStorage.getItem('username')
if (un == null) {
} else {
	$('.login').html("")
	$('.login').append(
		`
		<a>欢迎您：${un}</a><a href="#" class="logout">注销</a>
		`
	)
}
$(".login").on('click','.logout',function(){
	console.log(1)
	localStorage.clear()
	location.href="../pages/index.html"
})
$(".shop").click(function(){
	var id = $(this).attr('id');
	localStorage.setItem('id',id)
	location.href="../pages/shop.html"
})
$(".top").click(function(){
	location.href="#"
})

$(function(){
        //滚动条事件
        $(window).scroll(function(){
        //获取滚动条的滑动距离
        var scroH = $(window).scrollTop();
        //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
        if(scroH>=200){
            
			$(".head_logo").css({"position":"fixed","top":"27px","left":"38%"});
			$(".nav").css({"position":"fixed","top":"0","width":"100%"});
        }else if(scroH<200){
            $(".head_logo").css({"position":"relative","top":"","left":""});
			$(".nav").css({"position":"relative"});
        }
    })
    })
	//声明一个变量，下面的时候通过算术方法改变变量的值
	var current = 0;
	//初始化数据
	var timer = null;
	var pre = null;
	var nex = null;
	$(document).ready(function() {
	    var li_v = $('#banner ul li');
	    var i_v = $('.ra-show i');
	    //设置自动播放
	    function mover() {
	        //首先清除当前current以外的li_v的样式显示和伪圆标i_v的效果, 以下的同上
	        li_v.hide();
							
	        i_v.removeClass("active");
	        current = (current + 1) % (li_v.length);
	        
	        //当鼠标放在伪圆标时候获取当前的索引值，并把它赋给current从而实现了移出鼠标的时候跳转到下一个图片轮播
	        i_v.mouseover(function() {
	            current = $(this).index();
	            //                    console.log($(this).index());
	        });
	        //当鼠标放在伪圆标时候获取当前的索引值，并把它赋给current从而实现下一个图片轮播
	        li_v.eq(current).fadeIn(1000);
	        i_v.eq(current).addClass("active");
	    };
	    //设置自动轮播
	    timer = setInterval(mover, 4000);
	    //鼠标划入的时候停止轮播
	    li_v.mouseover(function() {
	        clearInterval(timer);
	    });
	    //鼠标移出的时候继续轮播
	    li_v.mouseout(function() {
	        timer = setInterval(mover, 2000);
	    });
	    //实现左右按钮事件
	    //点击左按钮事件
	    $(".last-img").click(function() {
	        //    首先清除定时器
	        clearInterval(timer);
	        clearInterval(pre);
	        //实现点击按钮显示上一个图片代码
	        function last_v() {
	            li_v.hide();
	            i_v.removeClass("active");
	            current = (current - 1 + li_v.length) % (li_v.length);
	            //console.log(current);
	            li_v.eq(current).fadeIn(1000);
	            i_v.eq(current).addClass("active");
	        };
	        pre = setTimeout(last_v, 10);
	        timer = setInterval(mover, 2000);
	    });
	    //点击右按钮事件
	    //只需继续轮播就可以
	    $(".next-img").click(function() {
	        //    首先清除定时器
	        clearInterval(timer);
	        clearInterval(nex);
	        //console.log(current);
	        //调用自动轮播的代码和点击上一张图片代码的setTimeout
	        nex = setTimeout(mover, 10);
	        timer = setInterval(mover, 8000);
	    });
	    //添加伪类下标圆标动事件
	    //鼠标碰到伪圆标的时候显示所对应的图片并且停止页面。
	    i_v.mouseover(function() {
	        clearInterval(timer);
	        i_v.removeClass("active");
	        li_v.hide();
	        li_v.eq($(this).index()).fadeIn(1000);
	        $(this).addClass("active");
	        //console.log($(this).index());
	    });
	});
