  
	// 一、封装获取模板
	var Util = {
		// 获取模板内容
		tpl: function (id) {
			return document.getElementById(id).innerHTML;
		}
	};

	
    // 绑定数据data的不同点
	// 组件中的data绑定数据属性，跟我们vue实例化对象中的data绑定方式不一样的，
	// 在vue中，我们直接对data赋值一个对象
	// 在 Vue.extend 组件中data是一个函数，通过返回值来设置绑定的数据

	// 二、组件模板
	// 1  第一模块 首页
	var home = Vue.extend(
	{   
		// 1
		template: Util.tpl('home'),
		data:function () 
		{
			return {
				banner:"",
				ad:"",
				list:"",
				more:""

				// 商品详情
				// details:""
			};
		},
		created:function () 
		{
			var that = this;
            
            // banner 
            // 2
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function (argument) 
			{
				if (xhr.readyState == 4) 
				{
					var d1 = xhr.responseText;
					that.banner = JSON.parse(d1).data;

					// var d2 = JSON.parse(d1).data;
					// console.log(d2);
					// console.log(xhr.responseText)
				}
			};

			// 3
			var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";
			xhr.open("post",url,true);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send("action=listFocusAd&acode=1&uid=25177");




            // ad 八大模块
            // 1
			var ad = new XMLHttpRequest();
			ad.onreadystatechange = function (argument) 
			{
				if (ad.readyState == 4) 
				{
					var a1 = ad.responseText;
					var a2 = JSON.parse(a1).data.items;

					var a3 = a2.slice(0,7);
					that.ad = a3;
					

					var a4 = a2.slice(-1);
					// console.log(a4);
					that.more = a4;
				}
			};

			// 2
			var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";
			ad.open("post",url,true);
			ad.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			ad.send("action=listCate&acode=1&uid=25177&type=1");


			// list 商品列表
            // 1
			var list = new XMLHttpRequest();
			list.onreadystatechange = function (argument) 
			{
				if (list.readyState == 4) 
				{
					var a1 = list.responseText;
					that.list = JSON.parse(a1).data;

					var a2 = JSON.parse(a1).data;
					// console.log(a2);
					// console.log(ad.responseText)
				}
			};

			// 2
			var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";
			list.open("post",url,true);
			list.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			list.send("action=listPro&acode=1&uid=25177&type=1");

            
            // 调用函数  轮播
			this.lunbo();
		},
		methods:{
			// 去 商品详情  
			//banner
			clickId: function(Index_id)
			{   
				Index_ = Index_id;
			},

			// ad 下 list
			clickIndex(Index_id){
				Index_ = Index_id;
			},

			// 商品列表
			// list top  总
			all_list_id(Index_type){
				// 1 type = 1
				list_type = Index_type;

				list.img = "img/all_cate_pressed.png";
				list.ti = "全部分类";
			},

			// ad  分类  去全部商品列表
			classify_list_id(type,Index_id,img,ti){
				// 商品 展示
				list_type = type;
				list_id = Index_id;

				// 分类 图文
				ca_img =img;
				cate_ti = ti;

				// console.log(img);
				// console.log(ti);

			},
            
            // 定义
			lunbo(){
                
                // 窗口改变 获取宽度
				window.onresize =function () 
				{
					return $(window).width();
				    console.log(w);

				}
				var  ul = $(".banner");
				// console.log(ul);

				var w = $(window).width();
				// console.log(w);

                // setInterval(function () 
                // {
                	// console.log(w);
                	// console.log(ul);
					// console.log(1);
                // },1000);
				
				
			}

			

		}

	});
 
 
	// 2 第二模块  全部商品列表
    
    //商品展示
	var list_type;//类型  1 总 2 分类
	var list_id; // 分类  类别 信息

	// 分类图文
	var ca_img,cate_ti;

    var list = Vue.extend(
	{   
		// 1
		template: Util.tpl('list'),
		data:function () 
		{
			return {
				// 商品展示列表
				adlist:"",

				// 左 分类
				ti_img:[
				{
					img:"img/all_cate_pressed.png"||"http://juhuituan.boguyuan.com/juhuituan"+ca_img,
					ti:cate_ti||"全部分类"
			    }],

			    // 大类
			    all:"",
                
                // 各大类总量
			    num:"",

			    // 小类
			    sub_all:"",
                
                // 左 一级 顶部
			    top_img:"img/all_cate_pressed.png"

			};
		},

		created:function () 
		{   
			var that = this;
			// console.log(Index_);
			// console.log(list_id);

            // 商品列表
		    var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function (argument) 
			{
				if (xhr.readyState == 4) 
				{
					var d1 = xhr.responseText;
					// console.log("d1");
					var d2 = JSON.parse(d1).data;
					// console.log(d2);

					that.adlist = d2;
                    
	                
				}
			};

			// 3
			var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";
			xhr.open("post",url,true);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            
            // 总
			if (list_type==1) 
			{
			   xhr.send("action=listPro&acode=1&uid=25177&type=1");	
			}
            
            // 分类商品列表
			if (list_type==2){
				xhr.send("action=listPro&acode=1&uid=25177&type=2&id="+list_id);
			};

            

            // 分类信息
            var news = new XMLHttpRequest();
            news.onreadystatechange = function (argument) 
            {
            	if (news.readyState == 4) 
				{
					var d1 = news.responseText;
					// console.log("d1");
					var d2 = JSON.parse(d1).data;
					console.log(d2);
                    
                  
					that.all = d2;
                    
	                
				}
            }

            news.open("post",url,true);
            news.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            news.send("action=listCate&acode=1&uid=25177&type=4");



            
            


		},
		methods:{
			// 去商品详情
			click_adlist(id){
				Index_ = id;
				// console.log(id);
			},


			// 二级分类
			sub_cate(id,tnum,ti,img)
			{   
				var that = this;
				// 二级分类
	            var sub_all = new XMLHttpRequest();
			    var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";

	            sub_all.onreadystatechange = function (argument) 
	            {
	            	if (sub_all.readyState == 4) 
					{
						var d1 = sub_all.responseText;
						// console.log("d1");
						var d2 = JSON.parse(d1).data;

						// console.log(id);
						// console.log(d2);

						that.sub_all = d2;

						that.num = tnum;
	                    
		                
					}
	            };
         
	            sub_all.open("post",url,true);
	            sub_all.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	            sub_all.send("action=listCate&acode=1&uid=25177&type=3&id=" +id);


                // 左 换图文
                that.ti_img[0].ti = ti;
                that.ti_img[0].img = "http://juhuituan.boguyuan.com/juhuituan" + img; 

                // 一级顶部 白图
                that.top_img = "img/all_cate_normal.png";		
                // all_cate_normal

                // 
                $(".sub_cate").show();

                //
                this.first();

			},

			// 左分类 开关
			toggle(){
				$('.cate_bg').toggle();

				// $(".all_sort").on("click",function () {
				// 	$('.cate_bg').hide();
				// 	// $(".sort_way").hide();
				// })

			},
            
            // 一级分类顶部
			toggle_1(){
				$('.cate_bg').toggle();
				
				// 自己
				this.top_img = "img/all_cate_pressed.png";
                
                // 左分类
				this.ti_img[0].img = "img/all_cate_pressed.png";
				this.ti_img[0].ti = "全部分类";
				$(".sub_cate").hide();  
			},

			// 一级
			first(){

	            // 样式
                $(".first").on("click","li",function () 
                {
                    
                    $(this).css("background-color","#fff").siblings().css('background-color','');
                    
                }); 
			},

			// 右 排序
			toggle_sort(){
				$('.sort_way').toggle();
			}




		}    
		
    });


    // 第三模板 商品详情 
    // 传入参数 获取数据
    var Index_; 
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
			
			// console.log(Index_);

			var com_index = Index_;
            
            // function comdity_data() 
			// {   
				var that = this;
			    var xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function (argument) 
				{
					if (xhr.readyState == 4) 
					{
						var d1 = xhr.responseText;
						var d2 = JSON.parse(d1).data;
	                    
		                var proArry = [];
						proArry.push(d2);
						// console.log(proArry);

						that.details = proArry;
					}
				};

				// 3
				var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";
				xhr.open("post",url,true);
				xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xhr.send("action=viewPro&acode=1&uid=25177&id="+com_index);	
			// };

			// 自动展示
			// comdity_data();
            

            // 当前刷新展示
            // window.location.reload();
     //          window.location.reload = function function_name(argument) {
     //          	// body...
     //          };
			// window.onload = function (argument) 
			// {
			// };


		},

		methods:{
			// 到 图文详情
			clickUrl(url,fpri,pri,ti){
				link = url;
				// console.log("link");
				fpri_ = fpri;
				pri_ = pri;


				ti_ = ti;
			},
			back(){
				history.back();
			},
			// 到订单
			go_order_form(ti,fpri){
				order_ti= ti;
				order_pfri = fpri;

				// console.log(order_ti);
				// console.log(order_pfri);
			}


		}

    });

    //  4 模板四 图文详情    从商品详情 而来 -->
    var link,fpri_,pri_,ti_;
    var image_text = Vue.extend(
    {
    	template:Util.tpl("image_text"),
    	data:function () 
    	{
    		return{
    			img_txt:[
    			{
    				links:link,
    				fpri:fpri_,
    				pri:pri_,
    				ti:ti_ // 到订单 项目标题
    			}]
    		}
    		
    	},

    	created:function (argument) 
    	{
    		// console.log(link);
    	},
    	methods:{
    		back(){
				history.back();
			},

			// 去订单
			go_order_form(ti,fpri){
				order_ti=ti;
				order_pfri = fpri;

				// console.log(order_ti);
				// console.log(order_pfri);
			}
    	}
    });



    // 第六模板 搜索界面
    var seach = Vue.extend(
    {
    	template: Util.tpl('seach'),
    	data:function (argument) 
    	{
    		return {

    		}
    	},
    	methods:{
    		click_seach(){

    			// 搜索框
    			var seach_input = $("#seach_input");
    			// console.log(seach_input);
                
                // 商家 分类 关键字
    			var value = seach_input.val();
    			// console.log(value);


    			// 传参出去 区搜索 搜索结果
    			con = value;
    		},
    		delet(){
    				// 3、清空搜索框
				

				$('#delet').on('click',function () 
				{   
					
					
					$("#seach_input").val("");

				});
    		},

    		// bug
   //  		back(){
			// 	history.back();
			// }

    	}
    });

    
    // 模板七 搜索 结果

    var con;
	var seach_result = Vue.extend(
	{
		template:Util.tpl("seach_result"),
		data:function (argument) 
		{
			return {
				seach_data:"",
				keyword:[
    			{
    				txt:con
    			}]
			}
		},

		created:function (argument) 
		{
			var that = this;
			// console.log(con);


			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function (argument) 
			{
				if (xhr.readyState == 4) 
				{
					var d1 = xhr.responseText;
					// console.log("d1");
					var d2 = JSON.parse(d1).data;
					// console.log(d2);

					that.seach_data = d2;
                    
	                
				}
			};

			// 3
			var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";
			xhr.open("post",url,true);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            
            // 总
			// if (con=="") 
			// {
			//    xhr.send("action=listPro&acode=1&uid=25177&type=1");	
			// }
			// else{
				xhr.send("action=search&acode=1&con="+con)
			// }

		},

		// 传入  商品详情
		methods:{
			click_seach_Index(id){
				Index_ = id;
			}
		}
	});

	// 模板五 商品详情 来到  抢购订单
    var order_ti,order_pfri;
    // var num = 1;
    var order_form = Vue.extend(
    {
    	template:Util.tpl("order_form"),
    	data:function () 
    	{
    			
    		return{
    		    order_form:[
    		    {
    				orti:order_ti,// 项目
    				pfri:order_pfri,// 单价

    				num:1,//数量
    				all: order_pfri //总价
    			}]
    		}
    	},
    	created:function (argument) 
    	{

    	},
    	methods:{
    		
			add(){
				// 数量
				var num = $(".number").val();
				// console.log(num);

				num++;
				$(".number").val(num);

     

				// 总价
				var that = this; 
				// 单价 * 数量  总价
				var all = (order_pfri*num).toFixed(2);
				// console.log(all);
				that.order_form[0].all = all;
				// toFixed(2) 两位小数

				that.order_form[0].num = num;
                
				
			},
			reduce(){
				// 数量
				var num = $(".number").val();
				// console.log(num);

				num--;
				if (num<=1) {
					num=1;
				}
				$(".number").val(num);

     

				// 总价
				var that = this; 
				// 单价 * 数量 总价
				var all = (order_pfri*num).toFixed(2);
				// console.log(all);
				that.order_form[0].all = all;
				// toFixed(2) 两位小数 
            
				that.order_form[0].num = num;
			},

			// 去支付
			go_pay(ti,pri,num,all)
			{   

				p_ti = ti;
				p_pfri = pri;
				p_num = num;
				p_all = all;

		
			}

    	}
    });
 
    // 模板八 确认订单 支付
    var p_ti,p_pfri,p_num,p_all;
    var payment = Vue.extend(
    {
    	template:Util.tpl("payment"),
    	data:function () 
    	{   
    		// return 不能折行  折行就是空了
    		return{
    			pay_for:[{
	    			p_ti:p_ti,
	    			p_pfi:p_pfri,
	    			p_num:p_num,
	    			p_all:p_all
	    		}]
    	    };
    	},
    	created:function () 
    	{
    		
    	},
    	methods:
    	{
    	   	
    	}
    });

    // 模板九 更多分类
    var sup_id =[];
    var more = Vue.extend(
    {
    	template:Util.tpl("more"),
    	data:function ()
    	{
    		return{
    			all:"",
    			sub_all:""
    			// sup_id:""
    		}
    	},
    	created:function (argument) 
    	{
    		// 分类信息
    		var that = this;
    		var d3;
            var news = new XMLHttpRequest();
            news.onreadystatechange = function (argument) 
            {
            	if (news.readyState == 4) 
				{
					var d1 = news.responseText;
					// console.log("d1");
					var d2 = JSON.parse(d1).data;
					// console.log(d2);
                    
                  
					that.all = d2;

					d3 = d2.items;
					// console.log(d3[0]);
					// d3[i].id
					

					for (var i = 0; i < d3.length; i++) 
					{
						// sup_id.push(d3[i].id);
						// (function () 
						// {   
							that.lunbo(d3[i].id);
						// })(i)
						
						// console.log(sup_id);
                        
					}
					// console.log(d3.length);

				}
            }
            
			var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";

            news.open("post",url,true);
            news.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            news.send("action=listCate&acode=1&uid=25177&type=4");


   
            
            
    	},
    	methods:{
    		lunbo(id){
    			// console.log(id);
    			// console.log(d3);
    			var that = this;
    			var sub_all = new XMLHttpRequest();
			    var url = "http://juhuituan.boguyuan.com/juhuituan/reqData?";

	            sub_all.onreadystatechange = function (argument) 
	            {
	            	if (sub_all.readyState == 4) 
					{
						var d1 = sub_all.responseText;
						// console.log("d1");
						var d2 = JSON.parse(d1).data;

						// sup_id.push(d2);
						that.sub_all = d2;
						console.log(d2);
					}
	            };
	         
		        sub_all.open("post",url,true);
	            sub_all.setRequestHeader("Content-type","application/x-www-form-urlencoded");


		        sub_all.send("action=listCate&acode=1&uid=25177&type=3&id=" +id);
    		}
    	}
    });
   
    

    // 三、注册 全局
    // 1 首页
	Vue.component('home', home);

	// 2 商品列表
	Vue.component('list', list);

	// 3 商品详情
	Vue.component('product', product);
    
    // 4 图文详情
	Vue.component("image_text",image_text);
    
    // 5 搜索 界面
	Vue.component("seach",seach);

	// 6 搜索结果
	Vue.component("seach_result",seach_result);
    

	// 7 订单
	Vue.component("order_form",order_form);

	// 8 支付
	Vue.component("payment",payment);

	// 9 更多分类
	Vue.component("more",more);


    // 四、全局实例化
	var app = new Vue(
	{
		el: '#app',
		data: {
			view: '',
			query:[],
			hideSearch: true
		}
    });



    // 五、路由切换
    var route = function () 
    {
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
		// console.log(app.view);

	    app.query = hash.slice(1);
    };

	// 对hash改变注册事件
	window.addEventListener('hashchange', route);
	window.addEventListener('load', route);

