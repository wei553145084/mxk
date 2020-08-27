var check_un =/^(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6}))|(1[34578]\d{9})$/;
			var check_pw = 	/^[\w]{6,12}$/
			$('#sub').click(function(){
				$('.ps_1').text("")
				$('.ps_2').text("")
				$('.ps_3').text("")
				if($('#username').val()=="" || $('#password1').val()=="" ){
					if($('#password1').val()!=""){
						$('.ps_1').text("用户名不能为空")
					}else if($('#username').val()!=""){
						$('.ps_2').text("密码不能为空")
					}else{
						$('.ps_1').text("用户名不能为空")
						$('.ps_2').text("密码不能为空")
					}
				}else{
					if(!(check_pw.test($('#password1').val())) || !(check_un.test($('#username').val()))){
						if(check_pw.test($('#password1').val())){
							$('.ps_1').text("用户名不符合规范")
						}else if(check_un.test($('#username').val())){
							$('.ps_2').text("密码不符合规范")
						}else{
							$('.ps_1').text("用户名不符合规范")
							$('.ps_2').text("密码不符合规范")
						}
					}else{
						if($('#password').val() != $('#password1').val()){
							$('.ps_3').text("密码不一致，请重新输入！")
						}else{
							$.ajax({
								method:'post',
								url:'../../server/register.php',
								data:{
									username:$('#username').val(),
									password:$('#password').val()
								},
								success:function(data){
									if(data.code==1){
										//表示成功
										//跳转到登陆页面
										location.href="./login.html"
									}else{
										//表示失败
										$('.ps_1').text(data.msg)
									}
								},
								dataType:'json'
							})
						}
					}
				}
			})