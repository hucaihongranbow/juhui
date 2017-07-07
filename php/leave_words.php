<?php
   
   $text = $_POST["text"];
   // echo "有";
   if ($text=="") 
   {
   	echo "<script>alert('不能为空');history.go(-1)</script>";
   }
   else{
   	// 上传数据库
   	echo "<script>alert('反馈成功');history.go(-2);</script>";
   	// echo "<script>window.location.href = 'more.html';</script>";


   }
?>