<?php
require('./model/_connect.php');

$id = $_REQUEST['id'];
$type = $_REQUEST['type'];
// $id = '20200804';
// $type = 'add';
$sql = "SELECT * FROM `cart` WHERE `product_id`='$id'";
$res = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($res);
$num = $row['product_num'];
if($type=='add'){	
	$num = $num+1;
	$sql = "UPDATE `cart` SET `product_num`='$num' WHERE `product_id`='$id'";
}else{
	$num = $num-1;
	if($num>0){
		$sql = "UPDATE `cart` SET `product_num`='$num' WHERE `product_id`='$id'";
	}else{
		$num = 0;
		$sql = "UPDATE `cart` SET `product_num`='$num' WHERE `product_id`='$id'";
	}
}

$result = mysqli_query($conn,$sql);
if($result){
	echo json_encode(array("code"=>1,"num"=>"$num"));
}else{
	echo json_encode(array("code"=>0));
}
?>