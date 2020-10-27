$(function(){
 
  init();
  //数据验证
  checkItem();
  //提交表单位
   commitItem();
});
function init() {
	var sid=$("#sid").val(); 
	$.ajax({
		url:'sort_one.action',
		data:{sid:sid},
		dataType:'json',
		type:'post',
		success:function(mydata)
		{
			$("#sname").val(mydata.sname);
			
			$("#sid").val(mydata.sid);
		}
	});
	
};
/*****************************************/
/******************失去焦点事件****************************/
function checkItem()
{
	$("#sname").focusout(function(){
		var sname=$("#sname").val();
		if(sname.length==0)
			{
			   layer.tips('类型名称不能为空！','#sname',{tips:[2,'red']});
			}
		else
			{
			   $.ajax({
				   url:'sort_getAllName.action',
				   dataType:'json',
				   type:'post',
				   data:{sname:sname},
				   async : true,
				   success:function(mydata)
				   {
					   if(mydata==0)
						   {
						      $("#sname").addClass("newsuccess");
					          $("#sname").removeClass("newerror");
						   }
					   else
						   {
						       layer.tips('对不起类型已存在！','#sname',{tips:[2,'red']});
						   }
					   $("#botao").val(mydata);
				   }
			   });
			}
	});
}



/******************************提交表单********************************/
function commitItem()
{
	$(".btn").bind("click",function(){	
	var sname = $("#sname").val();
	var sid=$("#sid").val();
	if(sname.length==0)
		{
		   layer.tips('类型名称不能为空！','#sname',{tips:[2,'red']});
		   $("#sname").focus();
		   return false;
		}
	else if($("#botao").val()>0)
		{
		  layer.tips('对不起类型已存在！','#sname',{tips:[2,'red']});
		  $("#sname").focus();
		  return false;
		}
	else
		{
		   var mypart = "sort.sname=" + sname + "&sort.sid="+sid;
		   var i = layer.load(0);
		   $.post('sort_upp.action',mypart,function(mydata){
			 layer.close(i);
			 if(mydata==1)
				 {
				   parent.layer.msg('修改成功！', {icon : 6,time : 3000});
				   var index = parent.layer.getFrameIndex(window.name); //获取窗口索引(真正的关 )
				   parent.layer.close(index);
				 }
			 else
				 {
				     parent.layer.msg('修改失败', 2, 9);
				 }
		   },'json');
		}
	});
}