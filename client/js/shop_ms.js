//查询并显示商品
var id = localStorage.getItem('id')

function showCart_shop() {
	$.ajax({
		url: '../../server/interface/showlist_shop.php',
		dataType: 'json',
		method: 'post',
		data: {
			id: id,
		},
		success: function(res) {
			if (res.code) {
				$('#name').html(res.data[0].name);
				$('#price').html(res.data[0].price);
				$('.imgbox').css({
					"background": `
					url("${res.data[0].img}") no-repeat
					`
				});
				localStorage.setItem(id, JSON.stringify(res.data[0]));
				$arr = JSON.parse(localStorage.getItem(id));
			} else {
				alert('服务器错误')
			}
		}
	})
}
showCart_shop()
//获取商品详细信息


//增加商品数量
$('#addNum').click(function() {

	var n = parseInt($arr.num);
	n = n + 1;
	$arr.num = n;
	$('.num').val($arr.num)

})

//减少商品数量
$('#cutNum').click(function() {

	var n = parseInt($arr.num);
	if (n > 0) {
		n = n - 1;
		$arr.num = n;
		$('.num').val($arr.num)
	} else {
		$('.num').val(0)
	}


})
var un = localStorage.getItem('username')
var flagt = 0
//秒杀
console.log(flagt)
$('.addToCart').click(function() {
	if(flagt == 1){
		if (un == null) {
			location.href = "../pages/login.html"
		} else {
			$.ajax({
				url: '../../server/interface/addwq.php',
				dataType: 'json',
				data: {
					id: $arr.Id,
					name: $arr.name,
					num: 1,
					img: $arr.img,
					price: $arr.price
				},
				success: function(res) {
					if (res.code) {
						alert('已添加至购物车')
					} else {

					}
				}
			})
		}
	}else if(flagt == 0){
		alert("秒杀尚未开始")
	}else{
		alert("限制购买")
	}
})


// 秒杀功能
if(id==20200802){
	$(".addToCart").text("秒杀")
	$(".addToCart").css({"font-size":"25px"})
}



var t = new Date().getTime()+10*1000
	function getTime(date1,date2){
		//获取页面中所有的图片  
		var imgs = document.getElementsByTagName("img");
		var d_1 = date1;
		var d_2 = date2;
		var d = d_2 - d_1
		if(d>=0){
			var hour = Math.floor(d/(1000*60*60))
			d = d - hour*1000*60*60
			var minute = Math.floor(d/(1000*60))
			d = d - minute*1000*60
			var second = Math.floor(d/1000)
			//将时  分  秒 对应的时间存入到数组中      
			var arr = [
						parseInt(hour/10),hour%10,
						parseInt(minute/10),minute%10,
						parseInt(second/10),second%10,
					  ];
			//通过循环  设置每一张图片的路径 路径的值 就是数组中的时间数据
			for( var i = 0 ; i < 6 ; i++){
				imgs[i].src = "../images/"+arr[i]+".png"
			}
		}else{
			flagt = 1
		}
	}
	
	setInterval(function(){
		getTime(new Date().getTime(),t);
	},1000)