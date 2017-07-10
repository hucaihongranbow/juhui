//数据请求
$(document).ready(function () {	
	 
	
	sendRequest();
	listRequest();
	sellRequest();
	console.log(location.href)
//	var urls=document.URL;
//	var str=urls.slice(urls.indexOf('pid'));
//	str = str.replace(/&/g,'?');
// 	console.log(str)
// 	str = str.replace(/=/g,'?');
// 	console.log(str)
	
$('#ad').click(function () {
  	history.back();
  })
});
//封装轮播数据请求
var data1=[];
ur="http://juhuituan.boguyuan.com/juhuituan"
function sendRequest() {
	$.ajax({
		'type':'get',
		'url':ur+'/reqData?action=listFocusAd&acode=1&uid=22285',
     'success':function (data) {
     	data=JSON.parse(data)
     	console.log(data);
     	console.log(data.data.items.length)
     	var test=data.data.items
     	for (var i=0;i<test.length;i++) {     		
     		data1.push({"id":i,"url":ur+test[i].img})
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
		'url':ur+"/reqData?action=listCate&acode=1&uid=22285&type=1",
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
		'url':ur+"/reqData?action=listPro&acode=1&uid=22285&type=1",
		"success":function (dats) {
//			alert("请求成功")
			data=JSON.parse(dats);
			console.log(data)
			console.log(data.data.items.length)
			var produt=data.data.items;
			for (var k=0;k<produt.length;k++) {
				data3.push({"id":k,"Id":produt[k].id,"url":ur+produt[k].img,"title":produt[k].ti,"content":produt[k].con,"price":produt[k].pri,"num":produt[k].num})
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
		click_P:details
	}//由于组件作用域是独立的  所以所有的方法都只能写在组件内才能使用
});

function details (pids) {
			alert(pids);
			$.ajax({
				'type':"post",
				'url':'http://juhuituan.boguyuan.com/juhuituan/reqData?action=viewPro&acode=1&uid=25109&id='+pids,
				success:function (datas) {
					alert("获得数据")
					data=JSON.parse(datas);
			        console.log(data)
			        var detail = data.data;
			        console.log(detail);
			        data6.push({"img":ur+detail.img,"fpri":detail.fpri,"pri":detail.pri,"num":detail.num,"dt":detail.dt,"ti":detail.ti,"con":detail.con,"jcon":detail.jcon,"scon":detail.scon,"xcon":detail.xcon})
			        console.log(data6)			        
				}
			})
			
		}


function type_list (pid) {
			alert("去详情页")
			alert(pid);
			$.ajax({
				'type':"post",
				'url':'http://juhuituan.boguyuan.com/juhuituan/reqData?action=listPro&acode=1&uid=25109&type=2&id='+pid,
				
				success:function  (data1) {
					alert("获得数据")
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
					alert("列表数据")
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
//type_list();
//console.log(data5)
//构造分类列表组件
var List = Vue.extend({
	template:Util.tpl('tpl_list'),
	data:function  () {
		return{
			goods:data4,
			G_list:data5
		}
	}
})

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
//注册首页组件
Vue.component('home', Home);
Vue.component('list',List);
Vue.component('product',Product);
Vue.component('search',Search);

var app = new Vue({
	el: '#app',
	data: {
		view: '',
		query: []
	}
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