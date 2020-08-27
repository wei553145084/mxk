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
//加入购物车
$('.addToCart').click(function() {
	console.log(un)
	if (un == null) {
		location.href = "../pages/login.html"
	} else {
		$.ajax({
			url: '../../server/interface/addwq.php',
			dataType: 'json',
			data: {
				id: $arr.Id,
				name: $arr.name,
				num: $arr.num,
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
})

