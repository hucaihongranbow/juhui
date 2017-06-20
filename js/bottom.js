window.onload=function(){
	var naver=document.getElementsByClassName('naver');
	var  navImg=document.getElementsByClassName("navImg");
	var imgArry=['img/tg_select.png','img/rm_select.png','img/merchant_icon_select.png','img/user_select.png','img/more_select.png'];
	var imgAy=['img/tg_normal.png','img/rm_normal.png','img/merchant_icon_normal.png','img/user_normal.png','img/more_normal.png']
	console.log(imgArry)
	for (var i=0;i<naver.length;i++) {
		naver[i].index=i;
		naver[i].onclick=function () {
		this.style.borderBottom='solid 2px rgb(254,148,148)';
		navImg[this.index].src=imgArry[this.index];
		
	  }
		
		naver[i].onmouseout=function () {
		this.style.borderBottom='';
		navImg[this.index].src=imgAy[this.index];
	  }
	}
	
}
