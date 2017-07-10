



// $(function (){
//   var Url="http://juhuituan.boguyuan.com/juhuituan/";
 
  
//     $.get(Url+"guanggai.json",
//       function (data){
//       console.log(data.data.items);
//       var items=data.data.items;
//       for(var i=0;i<items.length;i++){
//         var a=data.data.items[i].imgUrl;
//         var sub_div=document.createElement("div");
//         var sub_img=document.createElement("img");
//         sub_img.style.width=100+"%";
//         // sub_img.style.height=100+"%";
//            sub_img.src=a;
//            sub_div.className="on";        
//         sub_div.appendChild(sub_img);
//         $('.hot_data').append(sub_div);
//       }

//     },"json");
//     $.get(Url+"guanggai.json",
//       function (data){
    
//       var items=data.data.items;
//       for(var i=0;i<items.length;i++){
//         // var b=data.data.items[0].imgUrl;
//         var sub_div=document.createElement("div");
//         var sub_img=document.createElement("img");
//         // sub_img.style.marginLeft=5+'%';
//         sub_img.style.width=100+"%";
//         // sub_img.style.height=100+"%";
//            sub_img.src=items[i].imgUrl;
//         sub_div.appendChild(sub_img);
//         $('.hot_data1').append(sub_div);
//       }
//     },"json");

// $(".hot_data1 items[1]").click(function (){


//   $.get(Url+"/reqData?action=sellerList&cateId=127",
//       function (data){
//       var items=data.data;
//       var sell=data.data.items;
//       console.log(data);
//       // console.log(items);
//       // console.log(sell);
//       for(var i=0;i<items.length;i++){
        
//         var sub_div=document.createElement("div");
//         var sub_img=document.createElement("img");
        
//         // sub_img.style.marginLeft=5+'%';
//         sub_img.style.width=100+"%";
//         // sub_img.style.height=100+"%";
//            sub_img.src=items[i].imgUrl; 
//         sub_div.appendChild(sub_img);
//         $('.hot_data2').append(sub_div);
//       }
//     },"json");
//   // })      
// })
  var imgUrl=$('hot_data1').val();
  var password=$('hot_data1').val();
  var name=$('hot_data1').val();
var src='imgUrl='+imgUrl+'&sellerId='+password+'&sellerName'+name;
$.ajax({
        //请求类型
        "type"  :"post",

        "url":"http://juhuituan.boguyuan.com/juhuituan/reqData?action=sellerCate"+src,
        "items8":{
          "imgUrl":imgUrl,
          "sellerId" :password,
          "sellerName":name,
        },
        //成功做的事情
        "success" : function(data){
          var data=JSON.parse(data);
          console.log(data)
        },
        //错误做的事情
        "error" :   function(XMLHttpRequest, textStatus, errorThrown){
          alert(errorThrown);
        }
      });

