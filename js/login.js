$(function () {
	var phone_boolean=false;
    var security_boolean=false;
    var pwd_boolean=false;
    var confirm_Boolean = false;
 
// //修改密码确认
// $('.pwds').blur(function () {
// 	if (($('.pwds').val())==($('.pwd').val())) {
// 		confirm_Boolean = true;
// 		alert('密码正确')
// 	} else{
// 		varconfirm_Boolean = false;
// 		alert('密码与上次不同')
// 	}
// })
//// 
// $('input').focus(function () {
// 	$(this.shuru).css('border','solid 1px pink');
// })
// 
 
 //登录数据请求
 $('#denglu').click(function () {
 	sendRequest();//调用请求
 });
 
 //登录数据请求封装
 function sendRequest() {
 	//获取登录数据
 	var url=document.URL;
 	var str=url.slice(url.indexOf('un'));
 	str = str.replace(/&/g,',');
 	console.log(str) 		
 	str = str.replace(/=/g,',');
 	console.log(str)
 	var str1 = str.split(',');
 	console.log(str1)
 	
 	
 	var str_reg=/^1[34578]\d{9}$/;
 	var str_pwd=/^[a-z0-9_-]{6,16}$/;
 	
 	var reg=$(".phone").val();
 	var pwd=$(".pwd").val();
 	console.log(str_reg.test(reg));
 	console.log(str_pwd.test(pwd));
 	console.log(reg===str1[1]);
 	console.log(pwd);
 	console.log(str1[3]);
 	if (str_reg.test(reg)&&str_pwd.test(pwd)&&reg===str1[1]&&pwd===str1[3]) {
 		alert('登录成功')
 	} else{
 	    alert('密码或账号错误');
 	    return;
 	}
 	
 }
 
 //找回密码
 $('.forget').click(function () {
 	 password_change()
 })
 
function password_change () {
window.location.href="pwd_find.html?un="+$('.phone').val();
}
 	
})

