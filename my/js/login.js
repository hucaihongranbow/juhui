$(function  () {
  // 登录判断
    $("#sumbit").click(function(){
         if ($("#user").val()=="") {
            $("#iphone1").show();
              var timer=setTimeout(function(){
                $("#iphone1").hide();
              },1000)
           } else if($("#pwd").val()==""){
            $("#iphone2").show();
              var timer=setTimeout(function(){
                $("#iphone2").hide();
              },1000)
           }else{
            window.location.href="After login.html";
           }
    })


    // 忘记密码跳转事件
    $(".remmber").click(function(){
      window.location.href="forget.html";
    })

   $(".right").click(function(){
      window.location.href="../login home.html";
    })





})
    






