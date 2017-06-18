window.onload=function () {
	var nav=document.getElementsByClassName("nav")
	var R_content=document.getElementsByClassName("R_content")
	
	console.log(R_content)
	for (var i=0;i<nav.length;i++) {
		nav[i].index=i;
		nav[i].onclick=function () {
			 alert(this.index);
			for (var j=0;j<nav.length;j++) {
				R_content[j].style.display='block';
			}
			R_content[this.index].style.display='none';
		}
		
	}
}

//$(function () {
//	$('.nav').each(function (i,) {
//		
//	})
//})
