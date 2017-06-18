$(function () {
	var phone_boolean=false;
    var security_boolean=false;
    var pwd_boolean=false;
    var confirm_Boolean = false;
    
	//注册数据请求
 $('#gain').click(function () {
 	if ((/^1[34578]\d{9}$/).test($('.phone').val())) {
		phone_boolean=true;
		console.log("填写正确")
	} else{
		phone_boolean=false;
		alert("填写错误")
	}
 	sendRequestphone();
 })
 
 //注册数据请求封装
 function sendRequestphone() {
 	if (phone_boolean) {
 		var accounts=$('.phone').val();
// 		var srcs='un='+accounts;
 		$.ajax({
 			'type':'get',
 			'url':'http://juhuituan.boguyuan.com/juhuituan/smsApp?action=sendCode&acode=1&un='+accounts+'&loginType = 1&type=1',
 		    'data':{
 		    	'un':accounts
 		    },
 		    
 		    //成功的事
 		    'success':function (data) {
 		    	var data=JSON.parse(data);
 		    	alert(data.msg);
   		    	var yzm=$('.yanzheng').val(data.sdCode);
 		    	console.log(typeof data)
 		    	
 		    	$('.sigin').click(function() {
 		    		if ((/^[a-z0-9_-]{6,16}$/).test($(".pwd").val())) {
 		                   pwd_boolean=true;
 		                      console.log("密码正确");
 		                      var pwds=$('.pwd').val();
 		                      $.ajax({
 		                      	"type":"get",
 		                      	"url":"http://juhuituan.boguyuan.com/juhuituan/loginApp?action=reg&&acode=1&un"+accounts+"&pwd="+pwds+"&mcode="+data.sdCode,
 		                      	'data':{
 		    	                    'un':accounts,
 		    	                    'mcode':data.sdCode,
 		    	                    'pwd':pwds
 		                          },
 		                        
 		                      	'success':function (data) {
 		                      		alert('注册成功');
 		                      		console.log(data);
 		                      		window.location.href="login.html?un="+accounts+"&pwd="+pwds;
 		                      	},
 		                      	
 		                      	"error" : function (XMLHttpRequest, textStatus, errorThrown){
 				                       alert(errorThrown)
 			                        }
 		                      	
 		                      });
 	                           } else{
 		                     pwd_boolean=false;
 		                       console.log("密码错误");
 	                        }
 		    	})
 		    },
 		    //错误信息
 			"error" : function (XMLHttpRequest, textStatus, errorThrown){
 				alert(errorThrown)
 			}
 		})		
 	} else{
 		alert('输入不正确')
 	}
 }
})
