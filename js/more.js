window.onload = function (argument) 
<<<<<<< HEAD
{    
    var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";

    // 当前版本
    var v1 = $(".versions span").html();

	$(".versions").click(function () 
	{   

		$.get(url+"action=version&acode=1&uid=22285&ver=2.2&type=1&verType=2",function (data) 
		{   
			var data = data;

			console.log(v1);
            

			console.log(data);

			 // 最新版
			alert(data.msg);

			// 比较

			// $(".versions span").html(data.msg);
			
		},"json");
	});
	
=======
{
	window.onresize = setFontSize;

	setFontSize();
	function setFontSize()
	{
		var windowWidth = document.documentElement.clientWidth;
		var top = document.getElementsByClassName('top')[0];

		//设计师的实际图600宽，600状态下的font-size我们自己设置了一个30px。
		//所以当前的字号就要按比例来：

		if (windowWidth<=768) 
		{
		    

		}
	}
>>>>>>> origin/master
}