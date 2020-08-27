<?php
/* 
    接收POST请求
    接收的参数有:username和password
    返回数据格式:
        {
            code:1,   //1表示成功,0表示失败
            msg:"错误信息",    //msg表示错误信息,如果code是0有这个键值对
            data:{        //data表示登陆成功的用户名,如果code是1有这个键值对
                username:"用户名"
            }   
        }
*/
//接收数据
$username = $_POST['username'];
$password = $_POST['password'];

//连接数据库
$conn = mysqli_connect('localhost','root','root','user');

//SQL
$sql = "SELECT * FROM `info` WHERE `username`='$username' AND `password`='$password'";

//执行SQL
$result = mysqli_query($conn,$sql);

//解析
$data = mysqli_fetch_assoc($result);

if($data){
	$arr = array('code'=>1,'data'=>array('username'=>$username));
}else{
	$arr = array('code'=>0,'msg'=>'用户名或密码错误');
}

//返回json数据
echo json_encode($arr);
?>