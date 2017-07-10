
$(function(){


  // 手机短信模块
$("#verify").click(function(){
    var number = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    console.log($("#verify").val());
    if (!number.test($(".shouji").val())) 
      {
             $("#iphone1").show();
              var timer=setTimeout(function(){
                $("#iphone1").hide();
              },1000)
      }
      else{
        
                $.get("http://juhuituan.boguyuan.com/juhuituan/smsApp?action=sendCode&acode=1&un="+$(".shouji").val()+"&loginType=1&type=1",
                  function(data){
                    data=JSON.parse(data);
                    // console.log(data.sdCode);
                    $("#yanzheng").val(data.sdCode);
                })
      }
    })




	$(".confirm-a").click(function(){
            
           
           var nub=/^[a-zA-Z]\w{5,17}$/;
           if ($(".shouji").val()=="") {
           	$("#iphone").show();
              var timer=setTimeout(function(){
              	$("#iphone").hide();
              },1000)
           } 

           else if ($("#pwd").val()=="") {
           	    $("#password").show();
           	    var timer=setTimeout(function(){
              	$("#password").hide();
              },1000)
           } 

           else if (!nub.test($("#pwd").val())) {
		    	{
		    		$("#iphone2").show();
              var timer=setTimeout(function(){
                $("#iphone2").hide();
              },1000)

		    	}
		    }else if ($(".shouji").val()==""||$("#pwd").val()==""||$("#yanzheng").val()=="") {
      	return
       }else{
              $("#password2").show();
              var timer=setTimeout(function(){
                $("#password2").hide();
              },1000)
              
           var timer=setTimeout(function(){
            var tel=$('.shouji').val();
            var pwds=$('#pwd').val();
                  window.location.href="login.html?un="+tel+"&pwd="+pwds;
              },1000)                                            
          }

   



	})



 $("#back").click(function(){
          history.go(-1);
         })
})