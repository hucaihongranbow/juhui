$(function  () {
	$("#zz").val(location.href.split("=")[1]);
    $("#confirm").click(function(){
    	window.location.href="find success.html?code="+location.href.split("=")[1];
    })

     // 返回上一页
     $("#back").click(function(){
         	history.go(-1);
         })
})