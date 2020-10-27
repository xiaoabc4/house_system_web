var sid=0;
var aid=0;

$(function(){
 
  init();
  //数据验证
  //checkItem();
  //提交表单位
  // commitItem();
});
function init() {
	var hid=$("#hid").val(); 

	$.ajax({
		url:'house_look.action',
		data:{hid:hid},
		dataType:'json',
		type:'post',
		success:function(mydata)
		{
			$("#sid").val(mydata.sid);
			$("#aid").val(mydata.aid);
			$("#haddress").val(mydata.haddress);
			$("#hfh").val(mydata.hfh);
			$("#hhx").val(mydata.hhx);
			$("#hmj").val(mydata.hmj);
			$("#hcx").val(mydata.hcx);
			$("#hmoney").val(mydata.hmoney);
			$("#hwf").val(mydata.hwf);
			$("#hdx").val(mydata.hdx);
			$("#hsf").val(mydata.hsf);
			$("#hmq").val(mydata.hmq);
			$("#dkd").val(mydata.dkd);
			$("#skd").val(mydata.skd);
			$("#mkd").val(mydata.mkd);
			$("#hjp").val(mydata.hjp);
			$("#hremark").val(mydata.hremark);
			sid=mydata.sid;
			aid=mydata.aid;
			
		
			$("#img1").attr("src","../"+mydata.img1);
			$("#img2").attr("src","../"+mydata.img2);
			$("#img3").attr("src","../"+mydata.img3);
		}
	});
	
	
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
			   if(sid==xx.sid)
				   {
				    $("#sid").append("<option value="+xx.sid+" selected='selected'>"+xx.sname+"</option>");
				   }
			   else
				   {
				      $("#sid").append("<option value="+xx.sid+">"+xx.sname+"</option>");
				   }
			   
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
			   if(aid==xx.aid)
				   {
				     $("#aid").append("<option value="+xx.aid+" selected='selected'>"+xx.aname+"</option>");
				   }
			   else
				   {
				     $("#aid").append("<option value="+xx.aid+">"+xx.aname+"</option>");
				   }
			   
		   });
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