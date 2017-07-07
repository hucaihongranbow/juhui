window.onload = function (argument) 
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
	
}