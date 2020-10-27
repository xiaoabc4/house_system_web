var current = 1;
var up = 0;
var next = 0;
var allpages = 0;
var allcount = 0;
var editFlag = 0;//部门操作的表示1为添加部门 2为修改部门
var pflag=0;
var sid=0;
$(function() {
	sid=$("#sid").val();
	//加载页面数据
	initJs();
	 //点击首页
    getFirst();
    //点击上一页
    getUp();
    //点击下一页
    getNext();
    //点击尾页
    getLast();
    //点击转到第几页
    getZhan();
    //添加角色
	addJs();
	//弹出修改页面
	outupdate();
	//删除
	//mydel();
	//查询已经撤销的部门
	//mydelAll();
	//返回查询
	//getBack();
	//恢复部门
	//getHuiFu();
	mylook();
	
});

/***********************************/
function initJs() {
	
	
	$(".tablelist,.tablelist th").css("text-align", "center");
	getAll(1,sid);
}

/***********************************************/
function getAll(current,id) {
	

	$(".tablelist").empty();
	//$(".tablelist").append("<thead><tr align='center'><th align='center'>编号</th><th align='center'>类型名称</th><th align='center'>片区</th><th align='center'>房子地址</th><th align='center'>房号</th><th align='center'>房子户型</th><th align='center'>面积</th><th align='center'>朝向</th><th align='center'>原定最低租金</th><th align='center'>网费</th><th align='center'>电费单价</th><th align='center'>水费单价</th><th align='center'>煤气单价</th><th align='center'>电刻度</th><th align='center'>水刻度</th><th align='center'>煤刻度</th><th align='center'>房子简拼</th><th  align='center'>修改</th></tr></thead>");
	$(".tablelist").append("<thead><tr align='center'><th align='center'>编号</th><th align='center'>房屋类型</th><th align='center'>片区</th><th align='center'>房子地址</th><th align='center'>房号</th><th align='center'>房子户型</th><th align='center'>面积</th><th align='center'>朝向</th><th align='center'>原定最低租金</th><th align='center'>出租状态</th><th  align='center'>修改</th></tr></thead>");
	
    $.ajax({
    	url:'http://localhost:8089/house_system/house',
    	dataType:'json',
    	data:{current:current,sid:id},
    	type:'post',
    	success:function(mydata)
    	{
    	if(mydata=="9999")
    			{
    			   window.location.href="../error.html";
    			}
    		else
    			{
    		
    		$.each(mydata,function(index,xx){
    			
    		
    			//分页需要的参数
    			up=xx.up;
    			next=xx.next;
    			allpages=xx.allpages;
    			current=xx.current;
    			allcount=xx.allcount;
    			if(xx.hid!=null)
    				{
    				    var srt='<tr><td>'+xx.hid+'</td>';
    				    //srt+='<td>'+xx.sname+'</td>';
    				    //srt+='<td>'+xx.aname+'</td>';
						srt+='<td>'+xx.sid+'</td>';
						srt+='<td>'+xx.aid+'</td>';
    				    srt+='<td><a href="#" class=mylook>'+xx.haddress+'</a></td>';
    				    srt+='<td>'+xx.hfh+'</td>';
    				    srt+='<td>'+xx.hhx+'</td>';
    				    srt+='<td>'+xx.hmj+'</td>';
    				    srt+='<td>'+xx.hcx+'</td>';
    				    srt+='<td>'+xx.hmoney+'</td>';
    				    if(xx.hflag==1)
    				    	{
    				    	  srt+='<td><font color=red><strong>已经出租</strong></font></td>';
    				    	}
    				    else
    				    	{
    				    	   srt+='<td>待租中</td>';
    				    	}
    				    
    				    //srt+='<td>'+xx.hdx+'</td>';
    				   // srt+='<td>'+xx.hsf+'</td>';
    				   // srt+='<td>'+xx.hmq+'</td>';
    				    //srt+='<td>'+xx.dkd+'</td>';
    				   // srt+='<td>'+xx.skd+'</td>';
    				   // srt+='<td>'+xx.mkd+'</td>';
    				    //srt+='<td>'+xx.hjp+'</td>';
    				    srt+='<td><a href="#" class="myupp">修改</a></td>';
    				    $(".tablelist").append(srt); 
    				}
    			
    		});
    		 //加尾巴
    	     
    	     $(".pagin > .message").empty().append('统计：共<i class="blue"> '+allcount+'</i> 条记录， 共<i class="blue"> '+allpages+' </i>页，当前显示第&nbsp;<i class="blue">'+current+'/'+allpages+'&nbsp;</i>页');
					$(".pagin > .message").append('<ul class="paginList">');
					$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="first">首页</a></li>');
					$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="up">上一页</a></li>');
					$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="next">下一页</a></li>');
					$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="last">尾页</a></li>');
					$(".pagin > .message").append('<SPAN style="float: right;margin-top:8px;"> 转到第 <select class=select></select> 页</SPAN>');
					
    	     
    	     
    	     //给下拉框赋值
    		      for(var i=1;i<=allpages;i++)
    		        {
						$(".select").append("<option value='"+i+"'>"+i+"</option>");
					}
    		  //你当前正处在哪一页，就应该让几选中
					 //你当前正处在哪一页，就应该让几选中
    			  $(".select option:eq("+(parseInt(current)-1)+")").attr('selected',true);
    			 
    		}
    	}
    });
}
/**************************************************/
function getFirst()
      {
    	  $(".first").live("click",function(){
    		  getAll(1,sid);
    	  });
      }
      
      function getUp()
      {
    	   $(".up").live("click",function(){
    		  getAll(up,sid);
    	  });
      }
      function getNext()
      {
    	    $(".next").live("click",function(){
    		  getAll(next,sid);
    	  });
      }
      function getLast()
      {
    	   $(".last").live("click",function(){
    		  getAll(allpages,sid);
    	  });
      }
      function getZhan()
      {
    	  $(".select").live("change",function(){
    		  getAll($(".select").val(),sid);
    	  });
      }
/********************************************/
//添加角色 
function addJs(){
	//点击添加按钮的绑定cilck事件	
	$(".addPart").bind("click",function() {
		layer.open( {
			type : 2,
			title : "添加房子",
			fix : false,
			shadeClose : true,
			sort : [ '300px', '100px' ],
			content : '../house/add.html',
			skin : 'layui-layer-lan',
			shift: 4, //动画类型
			//弹出来后，设定层出现的位置
			success : function(layero, index) {
				layer.style(index, {
					width : '750px',
					height : '580px',
					top : '100px',
					left : ($(window).width() - 500) / 2
				});
			},
			//层被销毁回调
			end : function() {
				getAll(current,sid);
			}
		});
	});
};
/**************************************************/


/************************弹出修改页面****************************/
function outupdate()
{
	$(".myupp").live("click",function(){
		
		var hid = $(this).parents("tr").children("td").eq(0).text();
		
		layer.open({
			type:2,
			title:'修改房屋信息',
			fix:false,
			shadeClose:true,
			sort : [ '300px', '100px' ],
			content : '../house/upp.html?hid='+hid,
			skin : 'layui-layer-lan',
			shift: 4, //动画类型
			//弹出来后，设定层出现的位置
			success : function(layero, index) {
				layer.style(index, {
					width : '750px',
					height : '580px',
					top : '100px',
					left : ($(window).width() - 500) / 2
				});
			},
			//层被销毁回调
			end : function() {
				getAll(current,sid);
			}
		});
	});
}
/*********************************************/
/**********************删除********************/
/***********************查看房子信息***************************/
function mylook()
{
	$(".mylook").live("click",function(){
		var hid = $(this).parents("tr").children("td").eq(0).text();
		
		layer.open({
			type:2,
			title:'房屋详细信息',
			fix:false,
			shadeClose:true,
			sort : [ '300px', '100px' ],
			content : '../house/mylook.html?hid='+hid,
			skin : 'layui-layer-lan',
			shift: 4, //动画类型
			//弹出来后，设定层出现的位置
			success : function(layero, index) {
				layer.style(index, {
					width : '640px',
					height : '680px',
					top : '100px',
					left : ($(window).width() - 500) / 2
				});
			},
			//层被销毁回调
			end : function() {
				getAll(current,sid);
			}
		});
		
	});
}



function mydel() {
	$(".mydel").live("click", function() {

		var aid = $(this).parents("tr").children("td").eq(0).text();
		layer.confirm('你确定要删除吗？', 
			    {
			      btn : [ '确定', '取消' ],
			      title : '撤销',
		          skin : 'layui-layer-lan',
		          shift : 4, //动画类型
		          shadeClose : true,
		          top : '30px',
		          left : ($(window).width() - 400) / 2
				}
		       , function() 
		          {
		    	      $.post('${pageContext.request.contextPath}/sort_del.action?aid='+aid,'',function(data){
	    	    	      if(data==1)
	    	    	    	  {
	    	    	    	  
	    	    	    	  layer.msg('删除成功！', {icon : 6,time : 3000});
			
	    	    	    	    getAll(current);
	    	    	    	  }
	    	    	      else
	    	    	    	  {
	    	    	    	      layer.msg('删除失败！', {icon : 6,time : 3000});
	    	    	    	  }
	    	    	    },'json');
				  }
		         , function() {
					 //    
				   });
	});
}
/**********************************************************/
function mydelAll()
{
	$(".delPart").bind("click",function(){
		$(".tablelist,.tablelist th").css("text-align", "center");
	    getAll(1,1);
	    $(".addPart").hide();
	    $(".delPart").hide();
	    $(".backPart").show();
	});
}
function getBack()
{
	$(".backPart").bind("click",function(){
		$(".tablelist,.tablelist th").css("text-align", "center");
	    getAll(1,0);
	    $(".addPart").show();
	    $(".delPart").show();
	    $(".backPart").hide();
	});
}
function getHuiFu()
{
	$(".backdel").live("click",function(){
		var pid = $(this).parents("tr").children("td").eq(0).text();
		layer.confirm('你确定要恢复此部门吗？', 
			    {
			      btn : [ '确定', '取消' ],
			      title : '恢复',
		          skin : 'layui-layer-lan',
		          shift : 4, //动画类型
		          shadeClose : true,
		          top : '30px',
		          left : ($(window).width() - 400) / 2
				}
		       , function() 
		          {
		    	      $.post('${pageContext.request.contextPath}/part_backdel.action?pid='+pid,'',function(data){
	    	    	      if(data==1)
	    	    	    	  {
	    	    	    	  
	    	    	    	  layer.msg('恢复成功！', {icon : 6,time : 3000});
			
	    	    	    	    getAll(current);
	    	    	    	  }
	    	    	      else
	    	    	    	  {
	    	    	    	      layer.msg('恢复失败！', {icon : 6,time : 3000});
	    	    	    	  }
	    	    	    },'json');
				  }
		         , function() {
					 //    
				   });
	
	});
}