<?php

header('content-type:text/html;charset=utf8');

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "user";
$id = $_REQUEST['id'];
//创建连接
$conn = mysqli_connect($servername,$username,$password,$dbname);
if(mysqli_connect_error()){
	die('连接失败');
}

//书写sql语句
$sql = "SELECT * FROM `shopping` WHERE `id`= $id";

//执行sql语句
$result = mysqli_query($conn,$sql);
if($result){	
	$arr = mysqli_fetch_all($result,MYSQL_ASSOC);
	echo json_encode(array("code"=>1,"data"=>$arr));
	
}else{	
	echo json_encode(array("code"=>0));
}
?>