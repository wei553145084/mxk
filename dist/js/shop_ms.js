"use strict";var id=localStorage.getItem("id");function showCart_shop(){$.ajax({url:"../../server/interface/showlist_shop.php",dataType:"json",method:"post",data:{id:id},success:function(a){a.code?($("#name").html(a.data[0].name),$("#price").html(a.data[0].price),$(".imgbox").css({background:'\n\t\t\t\t\turl("'.concat(a.data[0].img,'") no-repeat\n\t\t\t\t\t')}),localStorage.setItem(id,JSON.stringify(a.data[0])),$arr=JSON.parse(localStorage.getItem(id))):alert("服务器错误")}})}showCart_shop(),$("#addNum").click(function(){var a=parseInt($arr.num);a+=1,$arr.num=a,$(".num").val($arr.num)}),$("#cutNum").click(function(){var a=parseInt($arr.num);0<a?(--a,$arr.num=a,$(".num").val($arr.num)):$(".num").val(0)});var un=localStorage.getItem("username"),flagt=0;console.log(flagt),$(".addToCart").click(function(){1==flagt?null==un?location.href="../pages/login.html":$.ajax({url:"../../server/interface/addwq.php",dataType:"json",data:{id:$arr.Id,name:$arr.name,num:1,img:$arr.img,price:$arr.price},success:function(a){a.code&&alert("已添加至购物车")}}):0==flagt?alert("秒杀尚未开始"):alert("限制购买")}),20200802==id&&($(".addToCart").text("秒杀"),$(".addToCart").css({"font-size":"25px"}));var t=(new Date).getTime()+1e4;function getTime(a,t){var e=document.getElementsByTagName("img"),r=t-a;if(0<=r){var n=Math.floor(r/36e5);r-=1e3*n*60*60;var o=Math.floor(r/6e4);r-=1e3*o*60;for(var i=Math.floor(r/1e3),l=[parseInt(n/10),n%10,parseInt(o/10),o%10,parseInt(i/10),i%10],c=0;c<6;c++)e[c].src="../images/"+l[c]+".png"}else flagt=1}setInterval(function(){getTime((new Date).getTime(),t)},1e3);