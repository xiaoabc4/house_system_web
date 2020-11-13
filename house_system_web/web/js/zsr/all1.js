var current = 1;
var up = 0;
var next = 0;
var allpages = 0;
var allcount = 0;
var editFlag = 0;//部门操作的表示1为添加部门 2为修改部门
var pflag=0;

var aid=0;
var sid=0;
var zt=-1;
$(function() {
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
    //查詢 
    getselect();
    //查看 
    mylook();
});

/***********************************/
function initJs() {
	$(".tablelist,.tablelist th").css("text-align", "center");
	//得到下拉框的内容
	$.ajax({
		url:urlone+'/mysort',
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
		url:urlone+'/myarea',
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
	//查询三个条件 aid--区域  sid--类别  出租状态
	getAll(1,aid,sid,zt);
}

/***********************************************/
function getAll(current,aid,sid,zt) {
	
	$(".tablelist").empty();
	$(".tablelist").append("<thead><tr align='center'><th align='center'>编号</th><th align='center'>房屋类型</th><th align='center'>片区</th><th align='center'>房子地址</th><th align='center'>房号</th><th align='center'>房子户型</th><th align='center'>面积</th><th align='center'>朝向</th><th align='center'>原定最低租金</th><th align='center'>出租状态</th></tr></thead>");
	
    $.ajax({
    	url:urlone+'/myhouse',
    	dataType:'json',
    	data:{current:current,aid:aid,sid:sid,zt:zt},
    	type:'post',
    	success:function(mydata)
    	{
    		if(mydata=="9999")
    			{
    			   window.location.href="../error.jsp";
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
    				    srt+='<td>'+xx.sname+'</td>';
    				    srt+='<td>'+xx.aname+'</td>';
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
    		  getAll(1,aid,sid,zt);
    	  });
      }
      
      function getUp()
      {
    	   $(".up").live("click",function(){
    		  getAll(up,aid,sid,zt);
    	  });
      }
      function getNext()
      {
    	    $(".next").live("click",function(){
    		  getAll(next,aid,sid,zt);
    	  });
      }
      function getLast()
      {
    	   $(".last").live("click",function(){
    		  getAll(allpages,aid,sid,zt);
    	  });
      }
      function getZhan()
      {
    	  $(".select").live("change",function(){
    		  getAll($(".select").val(),aid,sid,zt);
    	  });
      }
/********************************************/
      
      
      
function getselect()
{
	$(".sure").click(function(){
		 aid=$("#aid").val();
		 sid=$("#sid").val();
		 zt=$("#zt").val();
		getAll(1,aid,sid,zt);
	});
}


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
			content : $webName+'/house/mylook.jsp?hid='+hid,
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
				//getAll(current,sid);
			}
		});
		
	});
}