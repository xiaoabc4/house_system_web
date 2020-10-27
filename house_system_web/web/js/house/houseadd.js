$(function(){
	init();
	//数据验证
	//checkItem();
	//提交表单位
	commitItem();
});
/****************获得焦点********************/
function init() {
	$("#haddress").focus();
	
	//得到下拉框的值 
	$.ajax({
		url:'house_allx.action',
		dataType:'json',
		type:'post',
		data:'',
		async : true,
		success:function(mydata)
		{
		   $.each(mydata,function(index,xx){
			   $("#sid").append("<option value="+xx.sid+">"+xx.sname+"</option>");
		   });
		}
	});
	
	$.ajax({
		url:'house_ally.action',
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
	var sid = $("#sid").val();
	var aid = $("#aid").val();
	var haddress = $("#haddress").val();
	var hfh = $("#hfh").val();
	var hhx = $("#hhx").val();
	var hmj = $("#hmj").val();
	var hcx = $("#hcx").val();
	var hmoney = $("#hmoney").val();
	var hwf = $("#hwf").val();
	var hdx = $("#hdx").val();
	var hsf = $("#hsf").val();
	var hmq = $("#hmq").val();
	var dkd = $("#dkd").val();
	var skd = $("#skd").val();
	var mkd = $("#mkd").val();
	var hjp = $("#hjp").val();
	var hremark = $("#hremark").val();
	
	var x1=$("#doc1").val();
	var x2=$("#doc2").val();
	var x3=$("#doc3").val();
	
	if(x1.length==0||x2.length==0||x3.length==0)
		{
		        
	    	     parent.layer.msg('必须上传三张相片！',{icon:2});
		        // var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	             //parent.layer.close(index);
		}
	else
		{
		    $.ajaxFileUpload({
	    url:'${pageContext.request.contextPath}/house_add.action',
	    secureuri:false,//一般设置为false
	    fileElementId:['doc1','doc2','doc3'],//上传对象 
	    data:{
		  "house.sid":sid,
		  "house.aid":aid,
		  "house.haddress":haddress,
		  "house.hfh":hfh,
		  "house.hhx":hhx,
		  "house.hmj":hmj,
		  "house.hcx":hcx,
		  "house.hmoney":hmoney,
		  "house.hwf":hwf,
		  "house.hdx":hdx,
		  "house.hsf":hsf,
		  "house.hmq":hmq,
		  "house.dkd":dkd,
		  "house.skd":skd,
		  "house.mkd":mkd,
		  "house.hjp":hjp,
		  "house.hremark":hremark
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