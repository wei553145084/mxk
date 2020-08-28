var t = new Date().getTime()+10*1000
	function getTime(date1,date2){
		//获取页面中所有的图片  
		var imgs = document.getElementsByTagName("img");
		var d_1 = date1;
		var d_2 = date2;
		var d = d_2 - d_1
		if(d>0){
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
				imgs[i].src = "img/"+arr[i]+".png"
			}
		}else{
			flagt = 1
		}
	}
	getTime();
	
	setInterval(function(){
		getTime(new Date().getTime(),t);
	},1000)