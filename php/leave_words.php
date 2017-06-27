<?php
   
   $text = $_POST["text"];
   if ($text=="") 
   {
   	echo "<script>alert('留言不能为空！')history.go(-1);</script>";
   }
   else{
   	echo "<script>alert('留言成功！'); history.go(-1);</script>";
   }
?>