var hid = 0;
var aid = 0;
$(function() {

	init();
	//数据验证
	myaddSe();
	//提交表单位
	commitItem();
});
function init() {
	$("#dkd").focus();

	var bid = $("#bid").val();
	//查询基本信息
	$.ajax( {
		url : 'bs_one.action',
		data : {
			bid : bid
		},
		dataType : 'json',
		type : 'post',
		success : function(mydata) {
			$("#bremark").val(mydata.bremark);
			

			hid = mydata.hid;
			aid = mydata.aid;

			/**************得到下拉框的值 *************/
			$.ajax( {
				url : 'bs_ally.action',
				dataType : 'json',
				type : 'post',
				data : '',
				async : true,
				success : function(mydata) {
					$.each(mydata, function(index, xx) {
						if (aid == xx.aid) {
							$("#aid").append(
									"<option value=" + xx.aid
											+ " selected='selected'>"
											+ xx.aname + "</option>");
						} else {
							$("#aid").append(
									"<option value=" + xx.aid + ">" + xx.aname
											+ "</option>");
						}
					});
				}
			});
			/*****************************/

			/**************得到房子信息***********/
			$.ajax( {
				url : 'bs_allh.action',
				dataType : 'json',
				type : 'post',
				data : {
					aid : aid
				},
				async : true,
				success : function(mydata) {
					$.each(mydata, function(index, xx) {
						if (hid == xx.hid) {
							$("#hid").append(
									"<option value=" + xx.hid
											+ " selected='selected'>"
											+ xx.haddress + "</option>");
						} else {
							$("#hid").append(
									"<option value=" + xx.hid + ">"
											+ xx.haddress + "</option>");
						}

					});
				}
			});
			/*****************************/
		}
	});

};
/*****************************************/

function myaddSe() {
	$("#aid").bind(
			"change",
			function() {
				var aid = $(this).val();
				$("#hid").empty();
				if (aid != 0) {

					$.ajax( {
						url : 'bs_allh.action',
						dataType : 'json',
						type : 'post',
						data : {
							aid : aid
						},
						async : true,
						success : function(mydata) {
							$.each(mydata, function(index, xx) {
								$("#hid").append(
										"<option value=" + xx.hid + ">"
												+ xx.haddress + "</option>");
							});
						}
					});
				} else {
					$("#hid").append("<option value=0>---请选择房屋---</option>");
				}

			});
}

/******************失去焦点事件****************************/
function checkItem() {
	$("#sname").focusout(function() {
		var sname = $("#sname").val();
		if (sname.length == 0) {
			layer.tips('类型名称不能为空！', '#sname', {
				tips : [ 2, 'red' ]
			});
		} else {
			$.ajax( {
				url : 'sort_getAllName.action',
				dataType : 'json',
				type : 'post',
				data : {
					sname : sname
				},
				async : true,
				success : function(mydata) {
					if (mydata == 0) {
						$("#sname").addClass("newsuccess");
						$("#sname").removeClass("newerror");
					} else {
						layer.tips('对不起类型已存在！', '#sname', {
							tips : [ 2, 'red' ]
						});
					}
					$("#botao").val(mydata);
				}
			});
		}
	});
}

/******************************提交表单********************************/
function commitItem() {
   $(".btn").bind("click",function(){
	var hid = $("#hid").val();
	var bremark = $("#bremark").val();
	var bid=$("#bid").val();

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
	else if(bremark.length==0)
		{
		  layer.tips('备注不能为空！','#bremark',{tips:[2,'red']});
		  $("#bremark").focus();
		  return false;
		}
	
	else
		{
		   var mypart = "bs.hid="+hid+"&bs.bremark="+bremark+"&bs.bid="+bid;
		   var i = layer.load(0);
		   $.post('bs_upp.action',mypart,function(mydata){
			 layer.close(i);
			 if(mydata==1)
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