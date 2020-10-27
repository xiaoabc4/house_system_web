$(function() {
	//加载页面数据
	initEmp();
	//查看一个
	getLook();
});

/***********************************/
function initEmp() {
	getAll();
}

/***********************************************/
function getAll() {
	$(".welcome_list").empty();
	$.ajax({
    	url:'zc_alltop.action',
    	dataType:'json',
    	data:'',
    	type:'post',
    	success:function(mydata)
    	{
    		$.each(mydata,function(index,xx){		
    				    var srt='<li class="notice"><a href="#" class="n"><span style="display: none;">'+xx.cid+'</span>'+xx.ctitle+'</a></li>';
    				    $(".welcome_list").append(srt); 
    		});
    	}
    });
}


function getLook()
{
	$(".n").live("click",function(){
		var cid = $(this).parents("li").find("span").text();
		
		
		layer.open( {
			type : 2,
			title : "新政",
			fix : false,
			shadeClose : true,
			area : [ '300px', '100px' ],
			content : $webName+'/zc_look.action?cid='+cid,
			skin : 'layui-layer-lan',
			shift: 4, 
			success : function(layero, index) {
				layer.style(index, {
					width : '800px',
					height : '500px',
					top : '100px',
					left : ($(window).width() - 500) / 2
				});
			},
			end : function() {
				//getAll(current);
			}
		});
		
		
		
	});
}
