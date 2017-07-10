$(function  () {
			$("#confirm").click(function(){
		    var number = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
		    if($("#yanzheng").val()==""){
                      $("#iphone3").show();
		              var timer=setTimeout(function(){
		                $("#iphone3").hide();
		              },1000)
		      }else if (!number.test($("#yanzheng").val())) 
		      {
		             $("#iphone2").show();
		              var timer=setTimeout(function(){
		                $("#iphone2").hide();
		              },1000)
		      }else{
		      	 $.get("http://juhuituan.boguyuan.com/juhuituan/smsApp?action=sendCode&acode=1&un="+$("#yanzheng").val()+"&loginType=1&type=1",
                  function(data){
                    data=JSON.parse(data);
                    // console.log(data.sdCode);
                    // $("#yanzheng").val(data.sdCode);
                    location.href="verification.html?un="+data.sdCode;
                })
		      	 
		      }
		})

         // 箭头返回上一页
         $("#back").click(function(){
         	history.go(-1);
         })

})