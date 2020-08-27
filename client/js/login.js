
/*
	选项卡
*/
var box = document.getElementById('login_top');
var btn = document.getElementsByClassName('lt');
var div = document.getElementsByClassName('content')

for(var i=0;i<btn.length;i++){
	btn[i].onclick = function(){
		for(var j=0;j<btn.length;j++){
			btn[j].id = ""
			div[j].id = "offbox"
		}
		this.id = "on"
		var index = this.getAttribute("index");
		div[index].id = 'onbox'
	}
}
/*
	登录验证
*/
$('#sub').click(function() {
			$('.ps_un').text("")
			$('.ps_pw').text("")
			$('.login').css({
				"height": "400px"
			})
			if ($('#username').val() == "" || $('#password').val() == "") {
				if ($('#password').val() != "") {
					$('.ps_un').text("用户名不能为空")
					$('.login').css({
						"height": "410px"
					})
				} else if ($('#username').val() != "") {
					$('.ps_pw').text("密码不能为空")
					$('.login').css({
						"height": "410px"
					})
				} else {
					$('.ps_un').text("用户名不能为空")
					$('.ps_pw').text("密码不能为空")
					$('.login').css({
						"height": "440px"
					})
				}
			} else {
				$.ajax({
					method: 'post',
					url: '../../server/login.php',
					data: {
						username: $('#username').val(),
						password: $('#password').val()
					},
					success: function(data) {

						if (data.code == 1) {
							//表示成功
							//把用户名存入本地存储
							localStorage.setItem('username', data.data.username)
							//跳转到购物车页面
							location.href = "./cart.html"
						} else {
							//表示失败
							$('.ps_un').text(data.msg)

						}
					},
					dataType: 'json'
				})
			}
		})