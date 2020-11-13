$(function(){
	init();
	//数据验证
	//checkItem();
	//提交表单位
	commitItem();
});
/****************获得焦点同时得到两个下拉框的内容********************/
function init() {
	$("#erealname").focus();
	//得到下拉框的值 
	$.ajax({
		url:urlone+'/dept',
		dataType:'json',
		type:'post',
		data:'',
		async : true,
		success:function(mydata)
		{
		   $.each(mydata,function(index,xx){
			   $("#pid").append("<option value="+xx.pid+">"+xx.pname+"</option>");
		   });
		}
	});
	
	$.ajax({
		url:urlone+'/myjs',
		dataType:'json',
		type:'post',
		data:'',
		async : true,
		success:function(mydata)
		{

		   $.each(mydata,function(index,xx){
			   $("#jid").append("<option value="+xx.jid+">"+xx.jname+"</option>");
		   });
		}
	});
};
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
	var erealname = $("#erealname").val();
	var pid = $("#pid").val();
	var jid = $("#jid").val();
	var ename = $("#ename").val();
	var epsw = $("#epsw").val();
	var etel = $("#etel").val();
	var eaddress = $("#eaddress").val();
	var eremark = $("#eremark").val();
	if(erealname.length==0)
		{
		   layer.tips('员工真实姓名不能为空！','#erealname',{tips:[2,'red']});
		   $("#erealname").focus();
		   return false;
		}
	else if(ename.length==0)
		{
		   layer.tips('员工账号不能为空！','#ename',{tips:[2,'red']});
		   $("#ename").focus();
		   return false;
		}
	else
		{
		   var mypart = "emp.myjs.jid=" + jid + "&emp.mydept.pid=" + pid+ "&emp.ename="+ename+"&emp.epsw="+epsw+"&emp.erealname="+erealname+"&emp.etel="+etel+"&emp.eaddress="+eaddress+"&emp.eremark="+eremark;
		   var i = layer.load(0);
		   $.post(urlone+"/addemp",mypart,function(mydata){
			 layer.close(i);
			 if(mydata=="1")
				 {
                   parent.layer.msg('增加成功！', {icon : 6,time : 3000});
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