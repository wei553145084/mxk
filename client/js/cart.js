//登录判断
var un = localStorage.getItem('username')
if (un == null) {
	location.href = 'login.html'
} else {
	$('#username').text("欢迎您： " + un)
	$('.li_1').css({
		'border-left': "1px solid #f3f3f3"
	})
}
$('.logout').click(function() {
	localStorage.removeItem('username');
	location.href = 'login.html'
})

//显示购物车内容
function showCart() {
	$.ajax({
		url: '../../server/interface/showlist.php',
		dataType: 'json',
		success: function(res) {
			$.each(res.data, function(index, item) {
				$('table').append(
					`
					<tr >
						<td>${item.product_id}</td>
						<td>${item.product_name}</td>
						<td><img src="${item.product_img}" alt="" width="150px" height="100px" style="margin: 5px 0;"></td>
						<td>￥${item.product_price}</td>
						<td><button class="cutNum">-</button><input type="text" id=${item.product_id} style="width: 40px;padding-left:10px;height:26px;margin:0 10px;" class="num" value=${item.product_num} /><button class="addNum ">+</button></td>
						<td><button class="delProduct" style="width: 100px;height: 50px;background-color: #2295fe;color: #f1f1f1;border: 1px #00A5E3 solid;">删除该商品</button></td>
					</tr>
		            `
				)

			})
		}
	})
}
showCart()

//删除商品
$('body').on('click', '.delProduct', function() {
	
	var id = $(this).parent().parent().children().eq(0).html();
	$.ajax({
		url: "../../server/interface/delwq.php",
		data: {
			id: id
		},
		dataType: 'json',
		success: function(res) {
			if (res.code) {
				showCart()
				location.href="../pages/cart.html"
			}
		}
	})

})
//增加商品数量
$('body').on('click', '.addNum', function() {
	var id = $(this).parent().parent().children().eq(0).html();
	$.ajax({
		method: 'post',
		url: "../../server/interface/updatewq.php",
		dataType: 'json',
		data: {
			type: 'add',
			id:id
		},
		success: function(res) {
			if (res.code) {
				id = "#"+id
				$(id).val(res.num);
			}
		}
	})
})

//减少商品数量

$('body').on('click', '.cutNum', function() {
	var id = $(this).parent().parent().children().eq(0).html();
	$.ajax({
		method: 'post',
		url: "../../server/interface/updatewq.php",
		dataType: 'json',
		data: {
			type: 'cut',
			id: id
		},
		success: function(res) {
			if (res.code) {
				id = "#"+id
				$(id).val(res.num);
			}
		}
	})
})
