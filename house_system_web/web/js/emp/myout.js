$(function() {
	
	getWj();
	
});

function getWj()
{
	$(".look").click(function(){
		
		layer.open( {
			type : 2,
			title : "忘记密码",
			fix : false,
			shadeClose : true,
			area : [ '300px', '100px' ],
			content : './xx/bf1.jsp',
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
/***********************************/
