window.onload = function () {
    var initX;
    var drag_content = document.querySelector(".drag");
    var drag_to_refresh = document.querySelector(".drag_to_refresh");
    var refresh = document.querySelector(".refresh");

    drag_content.addEventListener("touchmove",drag);
    drag_content.addEventListener("touchstart",dragStart);
    drag_content.addEventListener("touchend",dragEnd);

    function dragStart(e){
        initY = e.touches[0].pageY;
        console.log(initX);
    }

    function drag (e){
        drag_to_refresh.style.display = "block";
        drag_to_refresh.style.height = (e.touches[0].pageY - initY) + "px";
        console.log(drag_to_refresh.style.height);
        if(parseInt(drag_to_refresh.style.height)>=100){
            // 注意：因为height得到的值是px为单位，所以用parseInt解析
            drag_to_refresh.style.height = "100px";
            if(parseInt(drag_to_refresh.style.height)>80){
                drag_to_refresh.style.lineHeight = drag_to_refresh.style.height;
                drag_to_refresh.innerHTML  = "松开刷新";
            }
        }
    }

    function dragEnd (e){
        if(parseInt(drag_to_refresh.style.height)>80){
            refresh.style.display = "block";
            setTimeout(reload,1000);
        }
        drag_to_refresh.style.display = "none"; 
    }

    function reload () {
        location.reload();
    }



// 返回上一页
    $(function(){
        $(".right").click(function(){
            history.go(-1);
        })
    })


 


}
 
