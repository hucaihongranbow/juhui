  var uid="";
  var Util={
    tpl:function (id){
            return document.getElementById(id).innerHTML;
    }
  };
    //定义整体中间变量，便于参数传递
    var Index_;
    //模块组建一开始即热卖部分
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
   //模块组建一结束即热卖部分
   
   //模块组件二开始
   //定义三个参数便于传向下一个模版
   var linkId;
   var fpri;
   var pri;
   var ti;
   var num_;
   var num1_;
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
          clickShop(fpri_,ti_)
          {   ti=ti_;
              fpri=fpri_;
      
          },
          share:function (){
            $(".baidu_share").show();
          },
          cancel:function (){
            $(".baidu_share").hide();
          },
          shop_right:function (){
            alert("是否登录成功");

              // if(uid=""){
              //   alert("请先登录");
              // }else{
              //  alert("提交订单模块")
              // }

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
     
    //模块组件四开始
      var shop_list=Vue.extend({
       template:Util.tpl('shop_list'),
       data:function (){
          console.log(fpri);
        return{
                 data:[{
                  fpri:fpri,
                  ti:ti,
                  all:fpri
                 }]
        };
       },
       methods:{
        add:function (){
           var that=this;
           var num=$(".num").val();
            num++;
            
            var all=fpri*num;
            that.data[0].all=all;
            $(".num").val(num);
        },
        reduce:function (){
          var that=this;
          var num=$(".num").val();
          num--;
          if(num<=0){
            num=1;
          };
          
          var all=fpri*num;
          that.data[0].all=all;
          $(".num").val(num);
        },
        indent(num,num1){
            num=($(".num").val());
             num1=($(".num1").val());
             num_=num;
             num1_=num1;
        }
       }
     })
     Vue.component('shop_list',shop_list);
     //模块组件四结束


     // 模块组件五开始
     var true_pay=Vue.extend({
        template:Util.tpl('true_pay'),
        data:function (){
          return {
            data:[{
                 fpri:fpri,
                  ti:ti,
                  nu:num_,
                  nu1:num1_
            }]
          }
        }

     });
     Vue.component("true_pay",true_pay);
     // 模块组件五结束
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
  
