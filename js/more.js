window.onload = function (argument) 
{
	window.onresize = setFontSize;

	setFontSize();
	function setFontSize()
	{
		var windowWidth = document.documentElement.clientWidth;
		var top = document.getElementsByClassName('top')[0];

		//设计师的实际图600宽，600状态下的font-size我们自己设置了一个30px。
		//所以当前的字号就要按比例来：

		if (windowWidth<=768) 
		{
		    

		}
	}
}