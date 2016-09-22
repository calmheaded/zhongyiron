var ug = navigator.userAgent.toLowerCase();
function check(reg) {
	return reg.test(ug);
}
function checkBrowser() {
    addMouseOver();
	var browserType = "";
	var ver = "";

	var IE = ug.match(/msie\s*\d+\.\d+/gi);
	var isIE = check(/msie/);
	if (isIE) {
		browserType = "Internet Explorer";
		ver = IE.join(" ").match(/[0-9]/g).join(".");
		if(ver=='6.0'){
			//alert("The version of IE is too low, please update it to Version 7.0 as least!");
			//window.location.href = _contextPath + "/indexIE6.html";
            //addMouseOver();
            // for ie 6 png transparent
            DD_belatedPNG.fix('img,div,span,li,a');
		}

	} else if(false) {
		var chrome = ug.match(/chrome\/(\d*\.)+\d*/gi);
		var isChrome = check(/chrome/);
		if (isChrome) {
			browserType = "Chrome";
			ver = chrome.join(" ").match(/\d+/g).join(".");
		} else {
			var firefox = ug.match(/firefox\/(\d*\.)+\d*/gi);
			var isFirefox = check(/firefox/);
			if (isFirefox) {
				browserType = "Firefox";
				ver = firefox.join(" ").match(/\d+/g).join(".");
			}
		}
	}
}

//for ie6 li hover
function addMouseOver(){
    $("#nav li").each(function(){
       var id=$(this).attr("id")+"_tab";
       $(this).mouseover(function(){
           $(this).addClass("lihover");
           $("#"+id).show();
       }).mouseout(function(){
           $(this).removeClass("lihover");
           $("#"+id).hide();
       });
    });
}

function highlightTab(id)
{
    $(".nav_choose").removeClass("nav_choose").children().removeClass("active");
    $(id).addClass("nav_choose").children().addClass("active");
}

function highlightLevel1Menu(id)
{
    $("li[id^='level1']").removeClass("highlighted");
    $(id).addClass("highlighted");

}

function highlightLevel2Menu(id)
{
    $("li[id^='level2']").removeClass("highlighted");
    $(id).addClass("highlighted");
}

$(function(){
    $(function () {
        $(window).scroll(function(){
            if ($(window).scrollTop()>100)
                $("#goTopBtn").fadeIn(500);
            else
                $("#goTopBtn").fadeOut(500);
        });
        $("#goTopBtn").click(function(){
            $('body,html').animate({scrollTop:0},500);
            return false;
        });
    });
});

/*
* 首页两个大图自动切换
* */
function slideSwitch() {
    clearInterval(t);
    var banner1 = $("#banner1");
    var banner1_1 = banner1.clone();
    var banner2 = $("#banner2");
    var banner2_2 = banner2.clone();

    var next = banner2_2;
    var i = 1;
    var t = setInterval(function(){
        banner1.attr("src",next.attr("src"));
        $("#banner div:first").animate({opacity:1.0},2000,function(){
           if(i==1){
               next = banner1_1;
               i++;
           }else if(i==2){
               next = banner2_2;
               i--;
           }
       });
    },5000);
}

function scrollBottomImg(){
    var num = $("#bottom_content .leftfloat").length;
    var current = 0;
    $("#bottom .left").click(function(){
      if(current <=-130 ) {
        $(".bottom_content_overflow").animate({"left": "+=130px"}, "slow");
        current +=130;
      }
    });
    $("#bottom .right").click(function(){
      if(current>=-130*(num-6)) {
        $(".bottom_content_overflow").animate({"left": "-=130px"}, "slow");
        current -=130;
      }
    });
}

var n = 0;var count=0;
function switchSmallImg() {
	count = $("#imgList div").length;
	$("#imgList div:not(:first-child)").hide();
	//$("#imgList div").each(function(){$(this).unbind().click(function(){window.open($(this).children("a").attr('href'), "_blank");});});
	$("#imgScroller li").each(function(){$(this).unbind().click(function() {
		var i = $(this).text() - 1;
		n = i;
		if (i >= count)
			return;
        //$("#imgList div p").filter(":visible").hide();
        $("#imgList div").filter(":visible").fadeOut(500);
        var tmp = i+1;
        //$("#imgList div:nth-child("+tmp+") p").show();
        $("#imgList div:nth-child("+tmp+")").fadeIn(1000);
		$(this).toggleClass("on");
		$(this).siblings().removeAttr("class");
	});});
	var t = setInterval("showAuto()", 6000);
	$("#imgScroller").hover(function() {
		clearInterval(t);
	}, function() {
		t = setInterval("showAuto()", 6000);
	});
}
function showAuto() {
	n = n >= (count - 1) ? 0 : ++n;
	$("#imgScroller li").eq(n).trigger('click');
}
