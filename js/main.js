var index = 0;
var imgWidth = 400;
var isGo = false;
var imgWidth = 400;
var imgLength = $(".imgbox img").length
$(".next").on('click',function(){
	if(isGo)
		return

	isGo = true

	var nowLeft =  carousel.offset(-imgWidth)
	$(".imgbox").animate({"margin-left":nowLeft},function(){
		index ++;
		if(carousel.margin()==-(imgLength-1)*imgWidth){
			index = 0
			carousel.reset(-imgWidth)
		}
		carousel.setDOt()
		isGo = false
	})
})
$(".prev").on('click',function(){
	if(isGo)
		return
	
	isGo = true

	var nowLeft =  carousel.offset(imgWidth)
	$(".imgbox").animate({"margin-left":nowLeft},function(){
		index --;
		if(carousel.margin()==-0){
			index = imgLength-3
			carousel.reset(-(imgLength-2)*imgWidth)
		}
		carousel.setDOt()
		isGo = false
	})
})

var carousel = {
	//临界条件重置位置
	reset(distance){
		$(".imgbox").css("margin-left",distance+"px")
	},
		
	//设置便宜距离
	offset(imgWidth){
		var nowLeft =  this.margin()+imgWidth;
		return nowLeft;
	},
	//获取当前距离margin-left距离
	margin(){
		return parseInt($(".imgbox").css('margin-left'))
	},
	//设置原点高亮
	setDOt(){
		$(".dot > span").eq(index).addClass('active').siblings().removeClass('active')
	},
	//定时器轮播
	timeSet(){
		return	setInterval(()=>{
			$(".next").trigger('click')
		},1000)
	}
}


//原点事件
$(".dot > span").on('click',function(){
	clearInterval(timeId)
	var nowIndex = $(this).index();
	var offsetIndex = (nowIndex - index)
	if(!offsetIndex){
		return;
	}
	oldOffset = carousel.margin() - offsetIndex*imgWidth
	$(".imgbox").animate({'margin-left':oldOffset})
	index = nowIndex
	carousel.setDOt()
})

var timeId = carousel.timeSet()




$(".imgbox,.next,.prev,.dot").on('mouseenter',function(){
	clearInterval(timeId)
})
$(".imgbox,.next,.prev,.dot").on('mouseleave',function(){
	clearInterval(timeId)
	timeId = carousel.timeSet()
})

