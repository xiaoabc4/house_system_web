$(function(){
	init();
	//数据验证
	//checkItem();
	//提交表单位
	commitItem();
});
/****************获得焦点********************/
function init() {
	$("#zmoney").focus();
};
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
	var zmoney = $("#zmoney").val();
	var ztm = $("#ztm").val();
	var zremark = $("#zremark").val();
	var myage=/^[0-9]*$/;   //正则表达式
	var m=myage.test(zmoney);
	
	
	if(zmoney.length==0)
		{
		   layer.tips('支出金额不能为空！','#zmoney',{tips:[2,'red']});
		   $("#zmoney").focus();
		   return false;
		}
	else if(!m)
		{
		  layer.tips('支出金额只能为正数！','#zmoney',{tips:[2,'red']});
		  $("#zmoney").focus();
		  return false;
		}
	else if(zremark.length==0)
		{
		   layer.tips('支出备注不能为空！','#zremark',{tips:[2,'red']});
		  $("#zremark").focus();
		  return false;
		}
	else
		{
		   var mypart = "zc.zmoney="+zmoney+"&zc.ztm="+ztm+"&zc.zremark="+zremark;
		   var i = layer.load(0);
		   $.post('zhicAction_add.action',mypart,function(mydata){
			 layer.close(i);
			 if(mydata==1)
				 {
				   parent.layer.msg('添加成功！', {icon : 6,time : 3000});
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