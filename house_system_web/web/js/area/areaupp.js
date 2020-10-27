$(function(){
 
  init();
  //数据验证
  checkItem();
  //提交表单位
   commitItem();
});
function init() {
	var aid=$("#aid").val(); 
	$.ajax({
		url:'area_one.action',
		data:{aid:aid},
		dataType:'json',
		type:'post',
		success:function(mydata)
		{
			$("#aname").val(mydata.aname);
			
			$("#aid").val(mydata.aid);
		}
	});
	
};
/*****************************************/
/******************失去焦点事件****************************/
function checkItem()
{
	$("#aname").focusout(function(){
		var aname=$("#aname").val();
		if(aname.length==0)
			{
			   layer.tips('角色名称不能为空！','#aname',{tips:[2,'red']});
			}
		else
			{
			   $.ajax({
				   url:'area_getAllName.action',
				   dataType:'json',
				   type:'post',
				   data:{aname:aname},
				   async : true,
				   success:function(mydata)
				   {
					   if(mydata==0)
						   {
						      $("#aname").addClass("newsuccess");
					          $("#aname").removeClass("newerror");
						   }
					   else
						   {
						       layer.tips('对不起角色已存在！','#aname',{tips:[2,'red']});
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
	var aname = $("#aname").val();
	var aid=$("#aid").val();
	if(aname.length==0)
		{
		   layer.tips('角色名称不能为空！','#aname',{tips:[2,'red']});
		   $("#aname").focus();
		   return false;
		}
	else if($("#botao").val()>0)
		{
		  layer.tips('对不起角色已存在！','#aname',{tips:[2,'red']});
		  $("#aname").focus();
		  return false;
		}
	else
		{
		   var mypart = "area.aname=" + aname + "&area.aid="+aid;
		   var i = layer.load(0);
		   $.post('area_upp.action',mypart,function(mydata){
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