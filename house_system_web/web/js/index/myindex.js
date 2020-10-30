var ename;
var epsw;
$(function() {

	
	$(".loginuser").val("");
	$(".loginpwd").val("");
	
	
	$('.loginbox').css( {
		'position' : 'absolute',
		'left' : ($(window).width() - 692) / 2
	});
	$(window).resize(function() {
		$('.loginbox').css( {
			'position' : 'absolute',
			'left' : ($(window).width() - 692) / 2
		});
	});
	$(".loginuser").focus();
	//失去焦点事件
	getLogin();
	//提交事件
	mysub();
	//忘记密码
	getWj();
});
function getLogin()
{
	$(".loginuser").bind("blur",function(){
		var uname=$(".loginuser").val();
		var name = $(".loginuser").val();
		var psw = $(".loginpwd").val();
		 
		 if(uname.length==0)
			 {
			     layer.tips('对不起账号不能为空！','.loginuser',{tips:[2,'red']});
			 }
		 else
			 {
			       $.ajax({
				   url:urlone+'/myemp',
				   dataType:'json',
				   type:'post',
				   data:{ename:ename,epsw:epsw},
				   async : true,
				   success:function(mydata)
				   {

					   $.each(mydata,function(index,xx){
					   	if (xx.ename==name&&xx.epsw==psw){
							window.location.href="./main/main.html";
						}else{
							layer.tips('密码错误！','.loginpwd',{tips:[2,'red']});

							return false;
						}

					   })
					    // if(mydata>0)
					    // 	{
					    // 	  //有这个人
					    // 	}
					    // else
					    // 	{
					    // 	     layer.tips('对不起账号错误！','.loginuser',{tips:[2,'red']});
					    // 	}
				   }
			      });
			 }
	});
}


function mysub()
{
	$(".loginbtn").click(function(){
		
	var name = $(".loginuser").val();
	var psw = $(".loginpwd").val();
	if(name.length==0)
		{
		   layer.tips('账号不能为空！','.loginuser',{tips:[2,'red']});
		   $(".loginuser").focus();
		   return false;
		}
	else if(psw.length==0)
		{
		  layer.tips('密码不能为空！','.loginpwd',{tips:[2,'red']});
		  $(".loginuser").focus();
		  return false;
		}
	// else
	// 	{
	// 	   var mypart = "emp.ename=" + name + "&emp.epsw=" + psw+ "";
	// 	   var i = layer.load(0);
	// 	   $.post(urlone+'/myemp',mypart,function(mydata){
	// 		 layer.close(i);
	// 		 if(mydata>0)
	// 			 {
	// 			    window.location.href="./user_login.action";
	// 			 }
	// 		 else
	// 			 {
	// 			     layer.tips('密码错误！','.loginpwd',{tips:[2,'red']});
	// 	             $(".loginuser").focus();
	// 	             return false;
	// 			 }
	// 	   },'json');
	// 	}
		
	});
}


function getWj()
{
	$(".look").click(function(){
		
		layer.open( {
			type : 2,
			title : "忘记密码",
			fix : false,
			shadeClose : true,
			area : [ '300px', '100px' ],
			content : './xx/bf1.html',
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