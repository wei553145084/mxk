"use strict";var check_un=/^(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6}))|(1[34578]\d{9})$/,check_pw=/^[\w]{6,12}$/;$("#sub").click(function(){$(".ps_1").text(""),$(".ps_2").text(""),$(".ps_3").text(""),""==$("#username").val()||""==$("#password1").val()?""!=$("#password1").val()?$(".ps_1").text("用户名不能为空"):(""!=$("#username").val()||$(".ps_1").text("用户名不能为空"),$(".ps_2").text("密码不能为空")):check_pw.test($("#password1").val())&&check_un.test($("#username").val())?$("#password").val()!=$("#password1").val()?$(".ps_3").text("密码不一致，请重新输入！"):$.ajax({method:"post",url:"../../server/register.php",data:{username:$("#username").val(),password:$("#password").val()},success:function(s){1==s.code?location.href="./login.html":$(".ps_1").text(s.msg)},dataType:"json"}):check_pw.test($("#password1").val())?$(".ps_1").text("用户名不符合规范"):(check_un.test($("#username").val())||$(".ps_1").text("用户名不符合规范"),$(".ps_2").text("密码不符合规范"))});