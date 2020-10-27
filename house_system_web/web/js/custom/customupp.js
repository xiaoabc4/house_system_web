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
		url:'custom_one.action',
		data:{cid:cid},
		dataType:'json',
		type:'post',
		success:function(mydata)
		{
			$("#cname").val(mydata.cname);
			
			var t=mydata.csex;
			if(t=='男')
				{
				   $("#sex1").attr('checked','checked');
				}
			else
				{
				   $("#sex2").attr('checked','checked');
				}
			
		
			$("#ctel").val(mydata.ctel);
			$("#ctel1").val(mydata.ctel1);
			$("#etel").val(mydata.etel);
			$("#ccard").val(mydata.ccard);
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
	var cname = $("#cname").val();
	var csex =  $('input:radio[name="csex"]:checked').val();
	var ctel = $("#ctel").val();
	var ctel1 = $("#ctel1").val();
	var ccard = $("#ccard").val();
	var cid=$("#cid").val();
	if(cname.length==0)
		{
		   layer.tips('客户姓名不能为空！','#cname',{tips:[2,'red']});
		   $("#cname").focus();
		   return false;
		}
	else if(ctel.length==0)
		{
		   layer.tips('客户电话不能为空！','#ctel',{tips:[2,'red']});
		   $("#ctel").focus();
		   return false;
		}
	else if(ccard.length==0)
		{
		   layer.tips('客户身份证不能为空！','#ccard',{tips:[2,'red']});
		   $("#ccard").focus();
		   return false;
		}
	else
		{
		    var mypart = "cus.cname=" + cname + "&cus.csex=" + csex+ "&cus.ctel="+ctel+"&cus.ctel1="+ctel1+"&cus.ccard="+ccard+"&cus.cid="+cid;
		    var i = layer.load(0);
		   $.post('custom_upp.action',mypart,function(mydata){
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