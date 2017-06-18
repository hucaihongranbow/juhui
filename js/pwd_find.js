$(function(){
	var phone_boolean=false;
    var security_boolean=false;
    var pwd_boolean=false;
    var confirm_Boolean = false;
    
    $('.sigins').click(function () {
    	$('.tijiao1').css('display','none')
 		$('.tijiao2').css('display','block')
    	if ((/^1[34578]\d{9}$/).test($('.phone').val())) {
		phone_boolean=true;
		console.log("填写正确")
		
		var accounts=$('.phone').val();
 		$.ajax({
 			'type':'get',
 			'url':'http://juhuituan.boguyuan.com/juhuituan/smsApp?action=sendCode&acode=1&un='+accounts+'&loginType = 1&type=1',
 		    'data':{
 		    	'un':accounts,
// 		    	'mcode':data.sdCode
 		    },
 		    
 		    //成功的事
 		    'success':function (data) {
 		    	var data=JSON.parse(data);
 		    	$('.sure').val(data.sdCode);
 		    	alert(data.msg);  		    	
 		    	console.log(typeof data)
 		    	
 		    	$('.tijao').click(function () {
 		    		$('.tijiao2').css('display','none')
 		    		$('.tijiao3').css('display','block')
 		    	})
 		    	
   		    	$('.sigins1').click(function () {
   		    		if ((/^[a-z0-9_-]{6,16}$/).test($(".pwd1").val())) {
   		    			if (($('.pwds').val())==($('.pwd1').val())) {
   		    				alert('修改成功，请返回登录')
   		    				var pwds=$('.pwds').val();
   		    				$.ajax({
 		                      	"type":"get",
 		                      	"url":"http://juhuituan.boguyuan.com/juhuituan/loginApp?action=reg&&acode=1&un"+accounts+"&pwd="+pwds,
 		                      	'data':{
 		    	                    'un':accounts,
 		    	                    'pwd':pwds
 		                          },
 		                        
 		                      	'success':function (data) {
 		                      		alert('修改成功');
 		                      		console.log(data);
 		                      		window.location.href="login.html?un="+accounts+"&pwd="+pwds;
 		                      	},
 		                      	
 		                      	"error" : function (XMLHttpRequest, textStatus, errorThrown){
 				                       alert(errorThrown)
 			                        }
 		                      	
 		                      });
   		    				//待写
   		    			} else{
   		    				alert('两次密码不相同')
   		    			}
   		    		} else{
   		    			alert('密码格式错误')
   		    		}
   		    	})//待定
 		    }
 		  });
		
		
	} else{
		phone_boolean=false;
		alert("填写错误")
	}
   })
})
