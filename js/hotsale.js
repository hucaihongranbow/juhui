window.onload=function (){
	// 封装获取模版
	var Util={
		// 获取模版内容
		tpl:function (id)
		{
			return document.getElementById(id).innerHTML;

		 }
	};
// 组建模版
// 第一开模块
var Index_;
var home=Vue.extend({
	template: Util.tpl('home'),
	data:function ()
	{
		return {
             banner:"",
             adt:"",
             
             // list:""
		}
	},
	created:function ()
	{
         var that=this;
         //这是请求健康吃部分（第一层）
         var xhr=new XMLHttpRequest();
         xhr.onreadystatechange=function (argument)
        {
         	if(xhr.readyState==4)
         	{
              
               var why=xhr.responseText;
               that.banner=JSON.parse(why).data;
                // console.log(that); 
         	}
        }

        xhr.open("post","http://juhuituan.boguyuan.com/juhuituan/reqData?action=sellerMainFocus",true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send("code=1&uid=25070&cateId=18");

        //这是七张图的（第一层）
        var ad=new XMLHttpRequest();
        ad.onreadystatechange=function (argument)
        {
            if(ad.readyState==4)
            {
               var ads=ad.responseText;
               that.adt=JSON.parse(ads).data;
               //console.log(ads);
            }
        };
        var url="http://juhuituan.boguyuan.com/juhuituan/reqData?";
        ad.open("post",url,true);
        ad.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        ad.send("action=sellerCate&cateId=18&uid=25070");



	},
	methods:{
			//商品详情
			clickId: function(Index_id)
			{   
				Index_ = Index_id;				
			},
			clickIndex(Index_id){
				Index_ = Index_id;
				// console.log(Index_);
			}
		}
});

 
// 健康吃大图（第二层）
   var product = Vue.extend(
    {
    	template: Util.tpl('product'),
    	data: function () {
			return {
				// 我们请求数据data是个对象，不是数组，所以我们给product定义为一个对象
				details: ""
			};
	    },
	    created:function () 
		{   
			var that = this;
			// console.log(Index_);

		    var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function (argument) 
			{
				if (xhr.readyState == 4) 
				{
					var why = xhr.responseText;
					that.details = JSON.parse(why).data;
					// console.log(why);                    	               
				}
			};

			
			var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";
			xhr.open("post",url,true);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send("action=sellerCateFocus&cateId=18&productId="+Index_);
		}

    })

// 七张图进去的内容(第二层)
 var list = Vue.extend(
    {
    	template: Util.tpl('list'),
    	data: function () {
			return {
				// 我们请求数据data是个对象，不是数组，所以我们给product定义为一个对象
				adlist: "",
				// 显示剩余的图片列表				
			};
	    },
	    created:function () 
		{   
			var that = this;
			// console.log(Index_);
		    var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function (argument) 
			{
				if (xhr.readyState == 4) 
				{
					var why = xhr.responseText;
					  that.adlist=JSON.parse(why).data;

					  var d  = JSON.parse(why).data;
					  console.log(d);
				}
			};

			var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";
			xhr.open("post",url,true);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send("action=sellerList&cateId="+Index_);				    
		},
		methods:{
			sellerId:function(sellerId){
				sellerId = sellerId;
			}
		}
    });
// 七张图进去的内容(第二层第二页)
 var other = Vue.extend(
    {
    	template: Util.tpl('list'),
    	data: function () {
			return {
				// 我们请求数据data是个对象，不是数组，所以我们给product定义为一个对象
				other: "",
				// 显示剩余的图片列表				
			};
	    },
	    created:function () 
		{   
			var that = this;
			// console.log(Index_);
		    var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function (argument) 
			{
				if (xhr.readyState == 4) 
				{
					var why = xhr.responseText;
					  that.adlist=JSON.parse(why).data;

					  var d  = JSON.parse(why).data;
					  console.log(d);
				}
			};

			var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";
			xhr.open("post",url,true);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send("action=sellerList&pgnm=1&cateId="+Index_);				    
		},
		methods:{
			sellerId:function(sellerId){
				sellerId = sellerId;
			}
		}
    });





// 7张图片的子页的子页(第三层)
    var sellerId;
    var mean = Vue.extend(
    {
    	template: Util.tpl('mean'),
    	data: function () {
			return {
				// 我们请求数据data是个对象，不是数组，所以我们给product定义为一个对象
				admean: ""
			};
	    },
	    created:function () 
		{   
			var that = this;
			console.log(sellerId);
		    var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function (argument) 
			{
				if (xhr.readyState == 4) 
				{
					var what = xhr.responseText;		  
					  that.admean=JSON.parse(what).data;
					  console.log(what);
				}
			}; 

			var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";
			xhr.open("post",url,true);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send("action=sellerInfo&sellerId="+sellerId);
		}

    });

//搜索组件(首页第一层)
var Search = Vue.extend({
	template:Util.tpl('search_list'),
	data:function  () {
		return{
//			search:
		}
//		console.log(details.con)
	}
})

//搜索组件（子页第二层）
var searches = Vue.extend({
	template:Util.tpl('search_biao'),
	data:function  () {
		return{
			
		}
//		console.log(details.con)
	}
})

// 注册全局
Vue.component('home',home);
Vue.component('product',product);
Vue.component('list',list);
Vue.component('mean',mean);
Vue.component('search',Search);
Vue.component('searchs',searches);
Vue.component('other',other);
var app=new Vue({
	el:'#app',
	data:{
		view:'home',
		query:[],
	    hideSearch: true
	}

});
// 路由切换
	var route=function (){
		var hash=location.hash;
		hash = hash.slice(1).replace(/^\//, '');

		// 将字符串转化成数组
		hash = hash.split('/');
        
        // 根据hash值选择视图组件
		app.view = hash[0] || 'home';
	    app.query = hash.slice(1);
	}
	window.addEventListener('hashchange', route);
	window.addEventListener('load', route);

};



// http://juhuituan.boguyuan.com/juhuituan/reqData?action=sellerInfo&sellerId=22674&code=1&msg=1&data=1&obj=1&items&pgnm&totaINum&pageNum&pageSize