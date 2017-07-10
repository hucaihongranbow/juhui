$(function  () {
	$("#confirm").click(function(){
		 // 6-20 位，字母、数字、字符
		 var $a=null;
		var number=/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,20}/
		var phone=/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
		if ($("#shouji").val()=="") {
			$("#iphone-a").show();
			var timer=setTimeout(function(){
				$("#iphone-a").hide();
			},1000)
		}
		else if(!number.test($("#shouji").val())){
            $("#iphone-b").show();
			var timer=setTimeout(function(){
				$("#iphone-b").hide();
			},1000)
		}
		else if ($("#chongzhi").val()=="") {
			$("#iphone1").show();
			var timer=setTimeout(function(){
				$("#iphone1").hide();
			},1000)
		}
		else if (!number.test($("#chongzhi").val())) {
			$("#iphone3").show();
			var timer=setTimeout(function(){
				$("#iphone3").hide();
			},1000)
		}
		else if ($("#queren").val()=="") {
			$("#iphone2").show();
			var timer=setTimeout(function(){
				$("#iphone2").hide();
			},1000)
		}
		else if ($("#chongzhi").val()!=$("#queren").val()) {
			$("#iphone4").show();
			var timer=setTimeout(function(){
				$("#iphone4").hide();
			},1000)
		}
        else{
        	$.get("http://juhuituan.boguyuan.com/juhuituan/loginApp?action=reg&acode=1&un="+$('#shouji').val()+"&pwd=111111&mcode="+a(1),{},function(data){
				$.get("	http://juhuituan.boguyuan.com/juhuituan/loginApp?action=pwd&acode=1&uid="+data.data.uid+"&pwd="+$("#chongzhi").val()+"&repwd="+$("#queren").val(),{},function(data){
				  $("#iphone5").show();
				  var timer=setTimeout(function(){
				$("#iphone5").hide();
				location.href="login.html?pwd="+data.data.pwd+"&un="+data.data.un;
			},3000)
					
				},"json")
			},"json")
        }

     function a(a){
		return location.href.split('?')[1].split('=')[a];
	}

	})
    
    
    // 返回上一页
    $("#back").click(function(){
         	history.go(-1);
         })
})