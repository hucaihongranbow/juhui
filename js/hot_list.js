
	var Util={
		tpl:function (id){
            return document.getElementById(id).innerHTML;
		}
	};
    //定义整体中间变量，便于参数传递
    var Index_;
    //模块组建一开始
	var home=Vue.extend({
		template:Util.tpl('home'),
		data:function (){
			return {
				data:" ",
			};
		},
		created:function (){
          var that=this;
          var xhr=new XMLHttpRequest();
          xhr.onreadystatechange=function (){
          	if(xhr.readyState==4){
               var lisOne=xhr.responseText;
               // console.log(lisOne);
               that.data=JSON.parse(lisOne).data;
          	};
          };
          var urlOne="http://juhuituan.boguyuan.com/juhuituan/reqData?";
              xhr.open("post",urlOne,true);
              xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
              xhr.send("action=listPro&acode=1&uid=25099&type=4");

		},
		methods:{
			clickId:function (Index_id){
				Index_=Index_id;
				//console.log(Index_);
			},
			clickIndex(Index_id){
				Index_=Index_id;
				//console.log(Index_id);
			}
			
		}
	});
	Vue.component('home', home);
	 //模块组建一结束
   
   //模块组件二开始
   //定义三个参数便于传向下一个模版
   var linkId;
   var fpri;
   var pri;
    var list=Vue.extend({
        template:Util.tpl('list'),
        data:function (){
        	return{data:""};
        },
        created:function (){
        	var that=this;
        	var xhr=new XMLHttpRequest();
        	xhr.onreadystatechange=function (){
        		if(xhr.readyState==4){
        			var listwo=xhr.responseText;
                       //console.log(listwo);
                       that.data=JSON.parse(listwo).data;
        		};
        	};
        	var urltwo="http://juhuituan.boguyuan.com/juhuituan/reqData?";
              xhr.open("post",urltwo,true);
              xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
              xhr.send("action=viewPro&acode=1&uid=25099&id="+Index_);
               //console.log(Index_);
        },
        methods:{
        	clickId(link_Id,fpri_,pri_)
        	{
	        	
	        	fpri=fpri_;
	        	pri=pri_;
	        	linkId=link_Id;
        	},
          share:function (){
            $(".baidu_share").show();
          },
          cancel:function (){
            $(".baidu_share").hide();
          }


        }
    });
    Vue.component('list', list);
   //模块组件二结束
     
     //模块组件三开始
     var product=Vue.extend({
     	 template:Util.tpl('product'),
     	 data:function (){
     	 	console.log(fpri);
	        console.log(pri);
	        console.log(linkId)
     	 	return{
                 data:[{
                 	link:linkId,
                 	fpri:fpri,
                 	pri:pri
                 }]
     	 	};
     	 }
     })
     Vue.component('product',product);
     //模块组件三结束
     

     // 四、全局实例化
	var app = new Vue(
	{
		el: '#app',
		data: {
			view: 'home',
			query:[],
			hideSearch: true
		}
    });

    // 五、路由切换
    var route = function () {
		// 每次当hash改变的时候，我们要将它获取出来，根据hash值来渲染页面
		// #list\type\1 =》 list\type\1
	    // var hash = location.hash.slice(1);
		var hash = location.hash;
		
        
        // #\list\type\1 或者 #list\type\1 => list
	    // 处理字符串
	    // 去掉#       替换特殊字符（\ 转义）
		hash = hash.slice(1).replace(/^\//, '');

		// 将字符串转化成数组
		hash = hash.split('/');
        
        // 根据hash值选择视图组件
		app.view = hash[0] || 'home';
	    app.query = hash.slice(1);
    };

	// 对hash改变注册事件
	window.addEventListener('hashchange', route);
	window.addEventListener('load', route);

// 底部点击切换部分？
    var naver=document.getElementsByClassName('naver');
	var  navImg=document.getElementsByClassName("navImg");
	var imgArry=['img/tg_select.png','img/rm_select.png','img/merchant_icon_select.png','img/user_select.png','img/more_select.png'];
	var imgAy=['img/tg_normal.png','img/rm_normal.png','img/merchant_icon_normal.png','img/user_normal.png','img/more_normal.png']

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
$(function (){
  $('#share').click(function (){
    $('.baidu_share').show();
  })
  $('#cancel').click(function (){
    $('.baidu_share').hide();
  })
})
  
