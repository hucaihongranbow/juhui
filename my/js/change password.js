$(function  () {
	 var number=/^[a-zA-Z]\w{5,17}$/;
	$(".scuccus").click(function(){
		if ($("#user").val()=="" && $("#pwd").val()=="") {
			$("#none").show();
			 var timer=setTimeout(function(){
                $("#none").hide();
              },1000)
		}
		else if(!number.test($("#user").val())){
			$("#none").show();
			 var timer=setTimeout(function(){
                $("#none").hide();
              },1000)
		}
		else if (!number.test($("#pwd").val())) {
			$("#none").show();
			 var timer=setTimeout(function(){
                $("#none").hide();
              },1000)
		}
		else if ($("#user").val()!=$("#pwd").val()) {
			$("#no").show();
			 var timer=setTimeout(function(){
                $("#no").hide();
              },1000)
		}else {
			window.location.href="account management.html"
		}

	})

	$(".right").click(function  () {
		window.location.href="account management.html"
	})
})