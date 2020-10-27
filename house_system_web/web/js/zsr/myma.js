$(function() {

	init();
	checkItem();
	commitItem();

});

function init() {
	$("#oldpsw").focus();

}
function checkItem() {

	$("#oldpsw").focusout(function(){
		var oldpsw=$("#oldpsw").val();
		if(oldpsw.length==0)
			{
			   layer.tips('原始密码不能为空！','#oldpsw',{tips:[2,'red']});
			   $("#oldpsw").focus();
		       return false;
			}
		else
			{
			   $.ajax({
				   url:'emp_getOldPsw.action',
				   dataType:'json',
				   type:'post',
				   data:'',
				   async : true,
				   success:function(mydata)
				   {
				        
					    if(oldpsw!=mydata)
					    	{
					    	    layer.tips('你输入的原始密码不对！','#oldpsw',{tips:[2,'red']});
			                    $("#oldpsw").focus();
		                        return false;
					    	}
				   }
			   });
			}
	});
}

function commitItem()
{
	$(".btn").click(function(){
		var oldpsw=$("#oldpsw").val();
		var newpsw=$("#newpsw").val();
		var newpsw1=$("#newpsw1").val();
		if(newpsw.length==0)
			{
			      layer.tips('新密码不能为空！','#newpsw',{tips:[2,'red']});
			      $("#newpsw").focus();
		          return false;
			}
		else if(newpsw1.length==0)
			{
			   	  layer.tips('请再次输入新密码！','#newpsw1',{tips:[2,'red']});
			      $("#newpsw1").focus();
		          return false;
			}
		else if(newpsw!=newpsw1)
			{
			      layer.tips('再次密码不一到致！','#newpsw1',{tips:[2,'red']});
			      $("#newpsw1").focus();
		          return false;
			}
		else
			{
			      $.ajax({
				   url:'emp_uppPsw.action',
				   dataType:'json',
				   type:'post',
				   data:{psw:newpsw},
				   async : true,
				   success:function(mydata)
				   {
					    if(mydata==1)
						 {
						 
						   layer.msg('修改成功！', {icon : 6,time : 3000});
						   //var index = parent.layer.getFrameIndex(window.name); //获取窗口索引(真正的关 )
						   //parent.layer.close(index);
						   $("#oldpsw").val("");
						   $("#newpsw").val("");
						   $("#newpsw1").val("");
						 }
					 else
						 {
						     parent.layer.msg('修改失败', 2, 9);
						 }
				   }
			   });
			}
	});
}