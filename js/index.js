
//数据请求
$(document).ready(function () {
	//刷新请求数据
//  sort();
//  details();
//  sell_sort();
//  p_sort();
//  fp_sort();
	
	sendRequest();
	listRequest();
	sellRequest();
	console.log(location.href)
$('.ad').click(function () {
  	history.back();
  	$(window).reload();
  })
});
//封装轮播数据请求
var data1=[];
ur="http://juhuituan.boguyuan.com/juhuituan"
function sendRequest() {
	$.ajax({
		'type':'get',
		'url':ur+'/reqData?action=listFocusAd&acode=1&uid=25109',
     'success':function (data) {
     	data=JSON.parse(data)
     	console.log(data);
     	console.log(data.data.items.length)
     	var test=data.data.items
     	for (var i=0;i<test.length;i++) {     		
     		data1.push({"id":test[i].inid,"url":ur+test[i].img})
     	}
     },
     error:function () {
			alert('请求不成功')
		}
	})
};

//类目列表数据请求封装
var data2=[];
function listRequest() {
	$.ajax({
		'type':"get",
		'url':ur+"/reqData?action=listCate&acode=1&uid=25109&type=1",
		'success':function (datas) {
			data=JSON.parse(datas);
			console.log(data)
			console.log(data.data.items.length)
			var content=data.data.items;
			for (var j=0;j<content.length;j++) {
				data2.push({"id":j,"url":ur+content[j].img,"title":content[j].ti,"Ids":content[j].id})
			}
		},
		error:function () {
			alert('请求不成功')
		}
	});
};

//热门团购模块数据请求封装
var data3=[];
function sellRequest() {
	$.ajax({
		'type':"get",
		'url':ur+"/reqData?action=listPro&acode=1&uid=25109&type=1",
		"success":function (dats) {
			data=JSON.parse(dats);
			console.log(data)
			console.log(data.data.items.length)
			var produt=data.data.items;
			for (var k=0;k<produt.length;k++) {
				data3.push({"id":k,"Id":produt[k].id,"url":ur+produt[k].img,"title":produt[k].ti,"content":produt[k].con,"price":produt[k].pri,"num":produt[k].num,"fpri":produt[k].fpri})
				console.log(data3);
			}
		},
		error:function () {
			alert('请求不成功')
		}
	})
};

var Util = {
	// 获取模板内容
	tpl: function (id) {
		return document.getElementById(id).innerHTML;
	}
};

//构造首页组件

var data4=[];
var data5=[];
var data6=[];
var Home = Vue.extend({
	template: Util.tpl('tpl_home'),
//	data:data,
	data: function () {
		return{			
			lunbo:data1,//轮播图			
			types:data2,//图片列表
			product:data3			
		}
	},
	methods:{
		clicks:type_list,
		click_P:details,
		C_banner:banner,
		All_type:all_type
	}//由于组件作用域是独立的  所以所有的方法都只能写在组件内才能使用
});

function type_list (pid) {
			alert(pid);
			$.ajax({
				'type':"post",
				'url':'http://juhuituan.boguyuan.com/juhuituan/reqData?action=listPro&acode=1&uid=25109&type=2&id='+pid,
				
				success:function  (data1) {
					data=JSON.parse(data1);
			        console.log(data)
			        var prot = data.data.items;
			        for (var m=0;m<prot.length;m++) {			        	data4.push({"id":m,"img":ur+prot[m].img,"title":prot[m].ti,"con":prot[m].con,"fpri":prot[m].fpri,"pri":prot[m].pri,"num":prot[m].num});
			        	console.log(data4);
			        }
				}
			})	
			
			
			$.ajax({
				'type':"post",
				'url':'http://juhuituan.boguyuan.com/juhuituan/reqData?action=listCate&acode=1&uid=25109&type=4&id='+pid,
				
				success:function  (data2) {
					data=JSON.parse(data2);
			        console.log(data)
			        var prote = data.data.items;
			        for (var n=0;n<prote.length;n++) {			        	data5.push({"id":n,"img":ur+prote[n].img,"title":prote[n].ti,"num":prote[n].tnum});
			        	console.log(data5);
			        }
			},
			error:function (){
				alert("你好")
			}
	})				
		}

//所有分类列表数据
function xianshi () {
     $(".all_types").slideToggle();
	
}

function right () {
     $(".sort_ul").slideToggle();
	
}

var all_types = [];
function all_type () {
	
	$.ajax({
		type:"post",
		url:"http://juhuituan.boguyuan.com/juhuituan/reqData?action=listCate&acode=1&uid=22285&type=1",
		
		success:function (type){
			alert("类型")
			data = JSON.parse(type);
			console.log(data)
			var all = data.data.items;
			console.log(all.length)
			for (var a=0;a<all.length;a++) {
				all_types.push({"id":all[a].id,"img":ur+all[a].img,"ti":all[a].ti,"tnum":all[a].tnum})
				console.log(all_types)
			}
			
		},
		async:true
	});
}

//构造分类列表组件
var List = Vue.extend({
	template:Util.tpl('tpl_list'),
	data:function  () {
		return{
			goods:data4,
			G_list:data5,
			all_Type:all_types
		}
	},
	methods:{
		Sort:sort,
		Sell_sort:sell_sort,
		Fp_sort:fp_sort,
		P_sort:p_sort,
		Xianshi:xianshi,
		Right:right
	}
}) 

function banner (ban) {
	         alert(ban)
	//轮播区
			$.ajax({
				"type":"post",
				"url":"http://juhuituan.boguyuan.com/juhuituan/reqData?action=viewPro&acode=1&uid=25109&id="+ban,
				success:function (bans) {
					data = JSON.parse(bans);
					console.log(data)
					var detail1 = data.data;
					console.log(detail1);	
					data6.push({"imgs":ur+detail1.img,"fpri":detail1.fpri,"pri":detail1.pri,"num":detail1.num,"dt":detail1.dt,"ti":detail1.ti,"con":detail1.con,"jcon":detail1.jcon,"scon":detail1.scon,"xcon":detail1.xcon,"pjper":detail1.pjper,"scsta":detail1.scsta,"score":detail1.score})
				var number = 0;
			        	
			        var dingdan = {"id":number,"ti":detail1.ti,"pri":detail1.pri};
			        	console.log(dingdan)
			        dingdn.push(dingdan)
			        console.log(dingdn)	
				}
			})
	
}

 var dingdn=[];   
function details (pids) {
			//列表区
			$.ajax({
				'type':"post",
				'url':'http://juhuituan.boguyuan.com/juhuituan/reqData?action=viewPro&acode=1&uid=25109&id='+pids,
				success:function (datas) {
					data=JSON.parse(datas);
			        console.log(data)
			        var detail = data.data;
			        console.log(detail);
			        	data6.push({"imgs":ur+detail.img,"fpri":detail.fpri,"pri":detail.pri,"num":detail.num,"dt":detail.dt,"ti":detail.ti,"con":detail.con,"jcon":detail.jcon,"scon":detail.scon,"xcon":detail.xcon,"pjper":detail.pjper,"scsta":detail.scsta,"score":detail.score})
			        	
			        	console.log(data6)
			        	var number = 0;
			        	
			        var dingdan = {"id":number,"ti":detail.ti,"pri":detail.pri};
			        	console.log(dingdan)
			        dingdn.push(dingdan)
			        console.log(dingdn)
			       			        
				}
			});			
		}



//$window.location.reload();
//默认排序  
function sort (sort){ 
	$(".sort_ul").css('display','none')
	$.ajax({
		type:"post",
		url:"http://juhuituan.boguyuan.com/juhuituan/reqData?action=ordPro&acode=1&uid=22285&id=12&ord=0",
		success:function (s_data) {
			data = JSON.parse(s_data);
			console.log(data);
			var sort = data.data.items;
			console.log(sort.length)			
			for (var q=0;q<sort.length;q++) {
				data4.push({"img":ur+sort[q].img,"title":sort[q].ti,"con":sort[q].con,"fpri":sort[q].fpri,"pri":sort[q].pri,"num":sort[q].num})
			}
			
		},
		ccache:true,
		error:function(){
			alert("请求失败")
		}
	});
}

//销量排序
function sell_sort (sorts) {
	$.ajax({
		type:"post",
		url:"http://juhuituan.boguyuan.com/juhuituan/reqData?action=ordPro&acode=1&uid=22285&id=12&ord=2",
		success:function (sell) {
			data = JSON.parse(sell);
			console.log(data);
			var sort = data.data.items;
			for (var p=0;p<sort.length;p++) {
				data4.push({"img":ur+sort[p].img,"title":sort[p].ti,"con":sort[p].con,"fpri":sort[p].fpri,"pri":sort[p].pri,"num":sort[p].num})
			}
		},
		error:function(){
			alert("请求失败")
		}
	});
}

//价格高
function p_sort (sorts) {
	$.ajax({
		type:"post",
		url:"http://juhuituan.boguyuan.com/juhuituan/reqData?action=ordPro&acode=1&uid=22285&id=12&ord=4",
		success:function (p_sell) {
			alert("价格最低")
			data = JSON.parse(p_sell);
			console.log(data);
			var sort = data.data.items;
			for (var p=0;p<sort.length;p++) {
				data4.push({"img":ur+sort[p].img,"title":sort[p].ti,"con":sort[p].con,"fpri":sort[p].fpri,"pri":sort[p].pri,"num":sort[p].num})
			}
		},
	});
}

//价格低
function fp_sort (sorts) {
	$.ajax({
		type:"post",
		url:"http://juhuituan.boguyuan.com/juhuituan/reqData?action=ordPro&acode=1&uid=22285&id=12&ord=3",
		success:function (fp_sell) {
			alert("价格最低")
			data = JSON.parse(fp_sell);
			console.log(data);
			var sort = data.data.items;
			for (var p=0;p<sort.length;p++) {
				data4.push({"img":ur+sort[p].img,"title":sort[p].ti,"con":sort[p].con,"fpri":sort[p].fpri,"pri":sort[p].pri,"num":sort[p].num})
			}
		}
	});
}


//详情组件
var Product = Vue.extend({
	template:Util.tpl('pro_list'),
	data:function  () {
		return{
			details:data6
		}
		console.log(details.con)
	}
})

//搜索组件
var Search = Vue.extend({
	template:Util.tpl('search_list'),
	data:function  () {
		return{
//			search:
		}
//		console.log(details.con)
	}
})

var Search = Vue.extend({
	template:Util.tpl('search_list'),
	data:function  () {
		return{
//			search:
		}
//		console.log(details.con)
	}
})

//订单组件
var Indent = Vue.extend({
	template:Util.tpl('indent_list'),
	data:function  () {
		return{
			Dingdan:dingdn
		}
//		console.log(details.con)
	},
	methods:{    		        
		     	add:function (num) {
		     		var number = 1;
		     		number++;
		     		console.log(number)
		     		$("#D_num").html(number)
		     		
		     		var DJia = $(".t_dd").html();
		     		console.log(DJia)
		     		
		     		$("#zj").html(number*DJia)
		     	},
		     	
		     	minus:function (num) {
		     		var number = 1;
		     		number--;
		     		console.log(number)
		     		$("#D_num").html(number)
		     		
		     		var DJia = $(".t_dd").html();
		     		console.log(DJia)
		     		
		     		$("#zj").html(number*DJia)
		     	}
		     }
})
//注册首页组件
Vue.component('home', Home);
Vue.component('list',List);
Vue.component('product',Product);
Vue.component('search',Search);
Vue.component('indent',Indent);

var app = new Vue({
	el: '#app',
	data: {
		view: '',
		query: []
	},
});



// 路由
var route = function () {
	// 每次当hash改变的时候，我们要将它获取出来，根据hash值来渲染页面
	
	var hash = location.hash;
	// 处理字符串
	hash = hash.slice(1).replace(/^\//, '');
	// 将字符串转化成数组
	hash = hash.split('/')

	// 列表页失效问题产生的原因
	// 当前页面的view组件是list(app.view)，搜索后得到的view组件还是list(hash[0])
	if (app.view === hash[0] && hash[0] === 'list') {
		// 父组件向子组件发送消息 成功通过父组件app向子组件发送消息
		app.query = hash.slice(1)
		app.$broadcast('reload-list')
		return ;
	}
 
	// 根据hash值选择视图组件
	app.query = hash.slice(1)
	app.view = hash[0] || 'home';
	
	// console.log(111)
}

// 对hash改变注册事件
window.addEventListener('hashchange', route)
window.addEventListener('load', route)
//window.onload=function(){
//	clicks();
//}


//商品排序数据接口
//1、默认排序：http://juhuituan.boguyuan.com/juhuituan/reqData?action=ordPro&acode=1&uid=22285&id=12&ord=0

//2、销量最高：http://juhuituan.boguyuan.com/juhuituan/reqData?action=ordPro&acode=1&uid=22285&id=12&ord=2

//3、价格最低：http://juhuituan.boguyuan.com/juhuituan/reqData?action=ordPro&acode=1&uid=22285&id=12&ord=3

//4、价格最高：http://juhuituan.boguyuan.com/juhuituan/reqData?action=ordPro&acode=1&uid=22285&id=12&ord=0

//全部分类数据接口
//http://juhuituan.boguyuan.com/juhuituan/reqData?action=allCate&acode=1&uid=22285


//分类第二页列表数据：http://juhuituan.boguyuan.com/juhuituan/reqData?action=listCate&acode=1&uid=22285&type=4


//正餐列表http://juhuituan.boguyuan.com/juhuituan/reqData?action=listCate&acode=1&uid=22285&type=3&id=12    注：14：冷饮甜品  18:娱乐  101：丽人   13：运动休闲   185：抵用券    231：鲜花蛋糕    16：生活服务     155:旅游

//搜索数据接口：http://juhuituan.boguyuan.com/juhuituan/reqData?action=search&acode=1&con=美酒

//列表分类接口《第二页》
//http://juhuituan.boguyuan.com/juhuituan/reqData?action=listCate&acode=1&uid=22285&type=3&id=12
