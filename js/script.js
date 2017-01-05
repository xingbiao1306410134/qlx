$(function(){
	//鼠标在图标上方，出现二维码
	$("#qq").mouseover(function(){
		$("#qq_pic").css("display","block");
	})
	$("#weixin").mouseover(function(){
		$("#weixin_pic").css("display","block");
	})
	$(".sns a").mouseout(function(){
		$(".sns a div").css("display","");
	})

	//section2标题变大,段落上浮
	$(".geo h3").mouseover(function(){
		move('.geo h3').scale(1.5).end();
		move('.geo div').set('margin-top','15px').end();
	})
	// 点击链接图片，在上方显示对应信息
	var sns = $("footer-sns a");
	sns.click(function(){
		$("footer-sns div").slidetoggle(1500,function(){

		})
	})
	
	// 子菜单

})
	
}