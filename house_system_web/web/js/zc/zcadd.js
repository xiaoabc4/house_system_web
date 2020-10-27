$(function(){
	//init();
	//数据验证
	//checkItem();
	//提交表单位
	commitItem();
});

/******************************提交表单********************************/
function commitItem()
{
	$(".btn").bind("click",function(){
		
	var ctitle = $("#ctitle").val();
	//var t =document.getElementById("content7").value;
	//alert(t);
	var cremark  = $("#content7").val();
	

	if(ctitle.length==0)
		{
		   layer.tips('标题不能为空！','#ctitle',{tips:[2,'red']});
		   $("#ctitle").focus();
		   return false;
		}
	else if(cremark.length==0)
		{
		   layer.tips('内容不能为空！','#content7',{tips:[2,'red']});
		   $("#content7").focus();
		   return false;
		}
	
	else
		{
		   var mypart = "zc.ctitle=" + ctitle + "&zc.remark=" + cremark+ "";
		   var i = layer.load(0);
		   $.post('zc_add.action',mypart,function(mydata){
			 layer.close(i);
			 if(mydata==1)
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