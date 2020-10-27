$(function(){
	init();
	//数据验证
	checkItem();
	//提交表单位
	commitItem();
});
/****************获得焦点********************/
function init() {
	$("#aname").focus();
};
/******************失去焦点事件****************************/
function checkItem()
{
	$("#aname").focusout(function(){
		var aname=$("#aname").val();
		if(aname.length==0)
			{
			   layer.tips('片区名称不能为空！','#aname',{tips:[2,'red']});
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
						      $("#jname").addClass("newsuccess");
					          $("#jname").removeClass("newerror");
						   }
					   else
						   {
						       layer.tips('对不起片区已存在！','#aname',{tips:[2,'red']});
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
	
	if(aname.length==0)
		{
		   layer.tips('片区名称不能为空！','#aname',{tips:[2,'red']});
		   $("#aname").focus();
		   return false;
		}
	else if($("#botao").val()>0)
		{
		  layer.tips('对不起片区已存在！','#aname',{tips:[2,'red']});
		  $("#aname").focus();
		  return false;
		}
	else
		{
		   var mypart = "area.aname=" + aname +  "";
		   var i = layer.load(0);
		   $.post('area_add.action',mypart,function(mydata){
			 layer.close(i);
			 if(mydata==1)
				 {
				   layer.msg('添加成功！', {icon : 6,time : 3000});
				   var index = parent.layer.getFrameIndex(window.name); //获取窗口索引(真正的关 )
				   parent.layer.close(index);
				 }
			 else
				 {
				     parent.layer.msg('增加失败', 2, 9);
				 }
		   },'json');
		}
	});
}