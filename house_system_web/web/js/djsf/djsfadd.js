$(function(){
	init();
	//数据验证
	//checkItem();
	//提交表单位
	//下拉框联动事件
	myaddSe();
	commitItem();
});
/****************获得焦点同时得到两个下拉框的内容********************/
function init() {
	$("#myj").focus();
	//得到下拉框的值 
	$.ajax({
		url:'dj_allx.action',
		dataType:'json',
		type:'post',
		data:'',
		async : true,
		success:function(mydata)
		{
		   $.each(mydata,function(index,xx){
			   $("#cid").append("<option value="+xx.cid+">"+xx.cname+"</option>");
		   });
		}
	});
	
	$.ajax({
		url:'dj_ally.action',
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
					url:'dj_allh.action',
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
/****************************************************************************/

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
	var cid=$("#cid").val();
	var hid=$("#hid").val();
	var myj = $("#myj").val();
	var myzj = $("#myzj").val();
	var time=$("#time").val();
	var doc=$("#doc").val();
	

	var myage=/^[0-9]*$/;   //正则表达式
	var m=myage.test(myj);
	var n=myage.test(myzj);
	if(hid==0)
		{
		   layer.tips('请选择房屋！','#hid',{tips:[2,'red']});
		   $("#hid").focus();
		   return false;
		}
	else if(myj.length==0)
		{
		   layer.tips('出租押金不能为空！','#myj',{tips:[2,'red']});
		   $("#myj").focus();
		   return false;
		}
	else if(!m)
		{
		   layer.tips('出租押金只能为正数！','#myj',{tips:[2,'red']});
		   $("#myj").focus();
		   return false;
		}
	else if(myzj.length==0)
		{
		   layer.tips('预收租金不能为空！','#myzj',{tips:[2,'red']});
		   $("#myzj").focus();
		   return false;
		}
	else if(!n)
		{
		   layer.tips('预收租金只能为正数！','#myzj',{tips:[2,'red']});
		   $("#myzj").focus();
		   return false;
		}
	else if(time.length==0)
		{
		   layer.tips('时间不能为空！','#time',{tips:[2,'red']});
		   $("#time").focus();
		   return false;
		}
	else if(doc.length==0)
		{
		   layer.tips('合同不能为空！','#doc',{tips:[2,'red']});
		   $("#doc").focus();
		   return false;
		}
	else
		{
		   
		$.ajaxFileUpload({
	    url:'${pageContext.request.contextPath}/dj_add.action',
	    secureuri:false,//一般设置为false
	    fileElementId:['doc'],//上传对象 
	    data:{
		  "dj.mbegintime":time,
		  "dj.cid":cid,
		  "dj.hid":hid,
		  "dj.myj":myj,
		  "dj.myzj":myzj
		 }, //上传控件以外的控件对应的参数
	    dataType: 'json', 
	    success:function(mydata,status)
	    	 {
	    	     parent.layer.msg('增加成功!!',{icon:1});
		         var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	             parent.layer.close(index);
	    	 }
	    	  ,
             error: function (data, status, e)//服务器响应失败处理函数
              {
	    	      parent.layer.msg('增加成功!!',{icon:1});
		    	  var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	              parent.layer.close(index);
                                 
               }
	       });
		
		
		}
	});
}