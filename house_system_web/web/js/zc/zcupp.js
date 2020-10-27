var pid=0;
var jid=0;

$(function(){
  init();
  //数据验证
  //checkItem();
  //提交表单位
   commitItem();
});
function init() {
	var cid=$("#cid").val(); 
	
	$.ajax({
		url:'zc_one.action',
		data:{cid:cid},
		dataType:'json',
		type:'post',
		success:function(mydata)
		{
			$("#ctitle").val(mydata.ctitle);
	        $("#content").val(mydata.remark);
	        $("#cid").val(mydata.cid);
		}
	});
};
/*****************************************/
/******************失去焦点事件****************************/
function checkItem()
{
	$("#pname").focusout(function(){
		var pname=$("#pname").val();
		if(pname.length==0)
			{
			   layer.tips('部门名称不能为空！','#pname',{tips:[2,'red']});
			}
		else
			{
			   $.ajax({
				   url:'part_getAllName.action',
				   dataType:'json',
				   type:'post',
				   data:{pname:pname},
				   async : true,
				   success:function(mydata)
				   {
					   if(mydata==0)
						   {
						      $("#pname").addClass("newsuccess");
					          $("#pname").removeClass("newerror");
						   }
					   else
						   {
						       layer.tips('对不起部门已存在！','#pname',{tips:[2,'red']});
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
	var ctitle = $("#ctitle").val();
	var cremark  = $("#content").val();
	var cid=$("#cid").val();
	if(ctitle.length==0)
		{
		   layer.tips('标题不能为空！','#ctitle',{tips:[2,'red']});
		   $("#ctitle").focus();
		   return false;
		}
	else if(cremark.length==0)
		{
		   layer.tips('内容不能为空！','#txt',{tips:[2,'red']});
		   $("#txt").focus();
		   return false;
		}

	else
		{
		    var mypart = "zc.ctitle=" + ctitle + "&zc.remark=" + cremark+ "&zc.cid="+cid;
		    var i = layer.load(0);
		   $.post('zc_upp.action',mypart,function(mydata){
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