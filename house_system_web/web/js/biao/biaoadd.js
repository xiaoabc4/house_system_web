$(function(){
	init();
	//数据验证
	//checkItem();
	myaddSe();
	//提交表单位
	commitItem();
});
/****************获得焦点********************/
function init() {
	$("#dkd").focus();
	
	//得到下拉框的值 
	
	$.ajax({
		url:urlone+'/myarea',
		dataType:'json',
		type:'post',
		data:'',
		async : true,
		success:function(mydata)
		{
		   $.each(mydata,function(index,xx){
			   $("#aid").append("<option value="+xx.aid+">"+xx.aname+"</option>");
		   });
		}
	});
};


function myaddSe()
{
	$("#aid").bind("change",function(){
		var aid=$(this).val();
		  $("#hid").empty();
		if(aid!=0)
			{
			      
					$.ajax({
					url:urlone+'/myhouse',
					dataType:'json',
					type:'post',
					data:{aid:aid},
					async : true,
					success:function(mydata)
					{
			
					   $.each(mydata,function(index,xx){
						   $("#hid").append("<option value="+xx.hid+">"+xx.haddress+"</option>");
					   });
					}
				});
			}
		else
			{
			     $("#hid").append("<option value=0>---请选择房屋---</option>"); 
			}
		
	});
}

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
	var hid = $("#hid").val();
	var dkd = $("#dkd").val();
	var skd = $("#skd").val();
	var mkd = $("#mkd").val();
	
	var myage=/^[0-9]*$/;   //正则表达式
	var m=myage.test(dkd);
	var n=myage.test(skd);
	var k=myage.test(mkd);
	
	
	if(hid.length==0)
		{
		   layer.tips('房子名称不能为空！','#hid',{tips:[2,'red']});
		   $("#hid").focus();
		   return false;
		}
	else if(hid==0)
		{
		   layer.tips('房子名称不能为空！','#hid',{tips:[2,'red']});
		   $("#hid").focus();
		   return false;
		}
	else if(dkd.length==0)
		{
		  layer.tips('电表刻度不能为空！','#dkd',{tips:[2,'red']});
		  $("#dkd").focus();
		  return false;
		}
	else if(!m)
		{
		  layer.tips('电表刻度只能是正数！','#dkd',{tips:[2,'red']});
		  $("#dkd").focus();
		  return false;
		}
	else if(skd.length==0)
		{
		  layer.tips('水表刻度不能为空！','#skd',{tips:[2,'red']});
		  $("#skd").focus();
		  return false;
		}
	else if(!n)
		{
		  layer.tips('水表刻度只能是正数！','#skd',{tips:[2,'red']});
		  $("#skd").focus();
		  return false;
		}
	else if(mkd.length==0)
		{
		  layer.tips('煤气表刻度不能为空！','#mkd',{tips:[2,'red']});
		  $("#mkd").focus();
		  return false;
		}
	else if(!k)
		{
		  layer.tips('煤气表刻度只能是正数！','#mkd',{tips:[2,'red']});
		  $("#mkd").focus();
		  return false;
		}
	else
		{
		   var mypart = "biao.skd="+skd+"&biao.dkd="+dkd+"&biao.mkd="+mkd+"&biao.hid="+hid;
		   var i = layer.load(0);
		   $.post(urlone+'/addmybiao',mypart,function(mydata){
			 layer.close(i);
			 if(mydata=="1")
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