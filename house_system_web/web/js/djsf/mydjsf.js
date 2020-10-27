var current = 1;
var up = 0;
var next = 0;
var allpages = 0;
var allcount = 0;
var editFlag = 0;//部门操作的表示1为添加部门 2为修改部门
var pflag=0;
$(function() {
	//加载页面数据
	initEmp();
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
    //添加员工
	addEmp();
	//弹出修改页面
	outupdate();
	//删除
	mydel();
	//查询已经撤销的部门
	mydelAll();
	//返回查询
	getBack();
	//恢复部门
	getHuiFu();
	
});







/***********************************/
function initEmp() {
	$(".tablelist,.tablelist th").css("text-align", "center");
	getAll(1);
}

/***********************************************/
function getAll(current,flag) {
	
	
	$(".tablelist").empty();
	$(".tablelist").append("<thead><tr align='center'><th  align='center'>编号</th><th align='center'>房屋地址</th><th  align='center'>房号</th><th  align='center'>客户姓名</th><th  align='center'>客户电话</th><th  align='center'>经办人</th><th  align='center'>本次收租金/元</th><th>下次收租日期</th><th>修改</th></tr></thead>");
	$.ajax({
    	url:'sf_all.action',
    	dataType:'json',
    	data:{current:current,eflag:flag},
    	type:'post',
    	success:function(mydata)
    	{
    	
    		
    		$.each(mydata,function(index,xx){
    			
    		
    			//分页需要的参数
    			up=xx.up;
    			next=xx.next;
    			allpages=xx.allpages;
    			current=xx.current;
    			allcount=xx.allcount;
    			if(xx.yid!=null)
    				{
    				    var srt='<tr><td>'+xx.yid+'</td>';
    				    srt+='<td>'+xx.haddress+'</td>';
    				    srt+='<td>'+xx.hfh+'</td>';
    				    srt+='<td>'+xx.cname+'</td>';
    				    srt+='<td>'+xx.ctel+'</td>';
    				    srt+='<td>'+xx.erealname+'</td>';
    				    srt+='<td>'+xx.myzj+'</td>';
    				    srt+='<td><font color=red><strong>'+xx.mbegintime+'</strong></font></td>';
    				    
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
    });
}
/**************************************************/
function getFirst()
      {
    	  $(".first").live("click",function(){
    		  getAll(1);
    	  });
      }
      
      function getUp()
      {
    	   $(".up").live("click",function(){
    		  getAll(up);
    	  });
      }
      function getNext()
      {
    	    $(".next").live("click",function(){
    		  getAll(next);
    	  });
      }
      function getLast()
      {
    	   $(".last").live("click",function(){
    		  getAll(allpages);
    	  });
      }
      function getZhan()
      {
    	  $(".select").live("change",function(){
    		  getAll($(".select").val());
    	  });
      }
/********************************************/
      
      
      
      
      
//添加员工
function addEmp(){
	//点击添加按钮的绑定cilck事件	
	$(".addPart").bind("click",function() {
		layer.open( {
			type : 2,
			title : "登记收费",
			fix : false,
			shadeClose : true,
			area : [ '300px', '300px' ],
			content : $webName+'/djsf/add.jsp',
			skin : 'layui-layer-lan',
			shift: 4, //动画类型
			//弹出来后，设定层出现的位置
			success : function(layero, index) {
				layer.style(index, {
					width : '500px',
					height : '500px',
					top : '100px',
					left : ($(window).width() - 500) / 2
				});
			},
			//层被销毁回调
			end : function() {
				getAll(current);
			}
		});
	});
};
/**************************************************/


/************************弹出修改页面****************************/
function outupdate()
{
	$(".myupp").live("click",function(){
		var mid = $(this).parents("tr").children("td").eq(0).text();
		layer.open({
			type:2,
			title:'修改出租信息',
			fix:false,
			shadeClose:true,
			area : [ '300px', '300px' ],
			content : $webName+'/djrz/upp.jsp?mid='+mid,
			skin : 'layui-layer-lan',
			shift: 4, //动画类型
			//弹出来后，设定层出现的位置
			success : function(layero, index) {
				layer.style(index, {
					width : '500px',
					height : '500px',
					top : '100px',
					left : ($(window).width() - 500) / 2
				});
			},
			//层被销毁回调
			end : function() {
				getAll(current);
			}
		});
	});
}
/*********************************************/
/**********************删除********************/


function mydel() {
	$(".mydel").live("click", function() {

		var  id = $(this).parents("tr").children("td").eq(0).text();
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
		    	      $.post('${pageContext.request.contextPath}/emp_del.action?eid='+eid,'',function(data){
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
		var eid = $(this).parents("tr").children("td").eq(0).text();
		layer.confirm('你确定要恢复此员工吗？', 
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
		    	      $.post('${pageContext.request.contextPath}/emp_backdel.action?eid='+eid,'',function(data){
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