var current = 1;
var up = 0;
var next = 0;
var allpages = 0;
var allcount = 0;
var editFlag = 0;//部门操作的表示1为添加部门 2为修改部门
var pflag=0;

var aid=0;
var sid=0;
var hid=-1;
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
    getLook();
    myaddSe();
    myaddSe1();
    getBack();
});

/***********************************/
function initJs() {
	$(".tablelist,.tablelist th").css("text-align", "center");
	//得到下拉框的内容
	$.ajax({
		url:urlone+"/mysort",
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
		url:urlone+"/myarea",
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
	getAll(1,aid,sid,hid);
}

function myaddSe()
{
	$("#aid").bind("change",function(){
		var aid=$(this).val();
		var sid=$("#sid").val();
		$("#hid").empty();
		if(aid!=0)
			{
					$.ajax({
					url:urlone+"/myhouse",
					dataType:'json',
					type:'post',
					data:{aid:aid,sid:sid},
					async : true,
					success:function(mydata)
					{
					   $("#hid").append("<option value='-1'>全部</option>"); 
					   $.each(mydata,function(index,xx){
						   $("#hid").append("<option value="+xx.hid+">"+xx.haddress+"</option>");
					   });
					}
				});
			}
		else
			{
			     $("#hid").append("<option value='-1'>全部</option>");  
			}
		
	});
}

function myaddSe1()
{
	$("#sid").bind("change",function(){
		var sid=$(this).val();
		var aid=$("#aid").val();
		$("#hid").empty();
		if(sid!=0)
			{
					$.ajax({
					url:urlone+"/myhouse",
					dataType:'json',
					type:'post',
					data:{aid:aid,sid:sid},
					async : true,
					success:function(mydata)
					{
					   $("#hid").append("<option value='-1'>全部</option>"); 
			           $.each(mydata,function(index,xx){
						   $("#hid").append("<option value="+xx.hid+">"+xx.haddress+"</option>");
					   });
					}
				});
			}
		else
			{
			     $("#hid").append("<option value='-1'>全部</option>"); 
			}
	});
}
/***********************************************/























function getAll(current,aid,sid,hid) {
	
	$(".tablelist").empty();
	$(".tablelist").append("<thead><tr align='center'><th  align='center'>编号</th><th align='center'>房屋地址</th><th  align='center'>房号</th><th  align='center'>客户姓名</th><th  align='center'>客户电话</th><th  align='center'>经办人</th><th  align='center'>登记时间</th><th  align='center'>押金</th><th >预收租金</th><th>房屋状态</th><th>续费过程明细</th></tr></thead>");
	
    $.ajax({
    	url:urlone+"/mydj",
    	dataType:'json',
    	data:{current:current,aid:aid,sid:sid,hid:hid},
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
		    			if(xx.mid!=null)
		    				{
		    				    var srt='<tr><td>'+xx.mid+'</td>';
		    				    srt+='<td>'+xx.haddress+'</td>';
		    				    srt+='<td>'+xx.hfh+'</td>';
		    				    srt+='<td>'+xx.cname+'</td>';
		    				    srt+='<td>'+xx.ctel+'</td>';
		    				    srt+='<td>'+xx.erealname+'</td>';
		    				    srt+='<td>'+xx.mdate+'</td>';
		    				    srt+='<td>'+xx.myj+'</td>';
		    				    srt+='<td>'+xx.myzj+'</td>';
		    				    if(xx.hflag==1)
		    				    	{
		    				    	   srt+='<td><font color=red><strong>正在出租中</strong></font></td>';
		    				    	}
		    				    else
		    				    	{
		    				    	   srt+='<td>待租</td>';
		    				    	}
		    				    srt+='<td><a href="#" class="mylook">续费过程明细</a></td>';
		    				    
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
    		  getAll(1,aid,sid,hid);
    	  });
      }
      
      function getUp()
      {
    	   $(".up").live("click",function(){
    		  getAll(up,aid,sid,hid);
    	  });
      }
      function getNext()
      {
    	    $(".next").live("click",function(){
    		  getAll(next,aid,sid,hid);
    	  });
      }
      function getLast()
      {
    	   $(".last").live("click",function(){
    		  getAll(allpages,aid,sid,hid);
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
		 hid=$("#hid").val();
		
		 if(hid==null)
			 {
			   hid=-1;
			 }
		getAll(1,aid,sid,hid);
	});
}


/**************************查看明细*******************************/
function getLook()
{
	$(".mylook").live("click",function(){
	    mid = $(this).parents("tr").children("td").eq(0).text();
		getAll1(1,mid);
		$("#x1").hide();
		$("#x2").hide();
		$("#x3").hide();
		$("#x4").hide();
		$("#x5").show();
	});
}
/***********************************开始********************************/
function getAll1(current,mid) {
	
	$(".tablelist").empty();			
	$(".tablelist").append("<thead><tr align='center'><th  align='center'>编号</th><th  align='center'>本次收取租金/元</th><th  align='center'>下次收租日期</th><th align='center'>经办人</th></tr></thead>");
	$.ajax({
    	url:'sf_allmx.action',
    	dataType:'json',
    	data:{begin:current,mid:mid},
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
    				    srt+='<td>'+xx.myzj+'</td>';
    				    srt+='<td><font color=red><strong>'+xx.mbegintime+'</strong></font></td>';
    				    srt+='<td>'+xx.erealname+'</td>';
    				    $(".tablelist").append(srt); 
    				}
    		 });
    		 //加尾巴
    	     $(".pagin > .message").empty().append('统计：共<i class="blue"> '+allcount+'</i> 条记录， 共<i class="blue"> '+allpages+' </i>页，当前显示第&nbsp;<i class="blue">'+current+'/'+allpages+'&nbsp;</i>页');
					$(".pagin > .message").append('<ul class="paginList">');
					$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="first1">首页</a></li>');
					$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="up1">上一页</a></li>');
					$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="next1">下一页</a></li>');
					$(".paginList").append('<li class="paginItem"><a href="javascript:void(0)" class="last1">尾页</a></li>');
					$(".pagin > .message").append('<SPAN style="float: right;margin-top:8px;"> 转到第 <select class=selectx style="border: 1px solid #3399d5; width:50px;"></select> 页</SPAN>');
					
    	     //给下拉框赋值
    		      for(var i=1;i<=allpages;i++)
    		        {
						$(".selectx").append("<option value='"+i+"'>"+i+"</option>");
					}
    		  //你当前正处在哪一页，就应该让几选中
			  //你当前正处在哪一页，就应该让几选中
    			  $(".selectx option:eq("+(parseInt(current)-1)+")").attr('selected',true);
    	}
    });
}
/**************************************************/
function getFirst1()
      {
    	  $(".first1").live("click",function(){
    		  getAll1(1,mid);
    	  });
      }
      
      function getUp1()
      {
    	   $(".up1").live("click",function(){
    		  getAll1(up,mid);
    	  });
      }
      function getNext1()
      {
    	    $(".next1").live("click",function(){
    		  getAll1(next,mid);
    	  });
      }
      function getLast1()
      {
    	   $(".last1").live("click",function(){
    		  getAll1(allpages,mid);
    	  });
      }
      function getZhan1()
      {
    	  $(".selectx").live("change",function(){
    		  getAll1($(".selectx").val(),mid);
    	  });
      }
      
      
function getBack()
{
	$("#x5").click(function(){
		history.back();
	});
}
/********************************************/
/***********************************结束*************************************/

