var bool = auto_new = false;
var ball_odds = cl_hao = cl_dx = cl_ds = cl_zhdx = cl_zhds = cl_lh ='';
//限制只能输入1-9纯数字 
function digitOnly ($this) {
	var n = $($this);
	var r = /^\+?[1-9][0-9]*$/;
	if (!r.test(n.val())) {
		n.val("");
	}
}
//盘口信息
function loadinfo(){
	$.post("class/odds_0.php", function(data)
		{
			if(data.opentime>0){
				$("#open_qihao").html(data.number);
				ball_odds = data.oddslist;
				loadodds(data.oddslist);
				endtime(data.opentime);
				auto(1);
			}else{
				$(".bian_td_odds").html("-");
				$(".bian_td_inp").html("封盘");
				$("#autoinfo").html("已经封盘，请稍后进行投注！");
				$.jBox.alert('当前彩票已经封盘，请稍后再进行下注！<br><br>香港六合彩开盘时间为开奖日0点整', '提示');
				return false;
	
			}
		}, "json");
}
//更新赔率
function loadodds(oddslist){
	if (oddslist == null || oddslist == "") {
			$(".bian_td_odds").html("-");
			$(".bian_td_inp").html("封盘");
			return false;
	}
	for(var i = 1; i<10; i++){
		if(i==9){
			for(var s = 1; s<9; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i, s);
			}
		}else if(i==1){
			for(var s = 1; s<77; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}
	} 
	
}
//号码赔率
function hm_odds(ball){
	if (ball_odds == null || ball_odds == "") {
			$(".bian_td_odds").html("-");
			$(".bian_td_inp").html("封盘");
			return false;
	}
	for(var s = 1; s<77; s++){
		odds = ball_odds.ball[ball][s];
		$("#ball_1_h"+s).html(odds);
		loadinput(ball , s);
	} 
	for( var i = 0; i < 9; i++){
		if(i == ball-1){
		$('#menu_hm > li').eq(i).removeClass("current_n").addClass("current");
		$("#sm_txt").html(did(ball)+" 双面 波色");
		$("#sx_txt").html(did(ball)+" 生肖");
		if(ball == 8){
			$('#sm_tab').css("display","none");
			$("#sx_txt").html(did(ball)+" 一肖");
		}else{
			$('#sm_tab').css("display","inline");
		}
		}else{
		$('#menu_hm > li').eq(i).removeClass("current").addClass("current_n");
		}
	}
	
}
//更新投注框
function loadinput(ball , s){
	b = "ball_"+ball+"_"+s;
	n = "<input name=\""+b+"\" id=\""+b+"\" class=\"inp1\" onkeyup=\"digitOnly(this)\" onfocus=\"this.className='inp1m'\" onblur=\"this.className='inp1';\" type=\"text\" maxLength=\"5\"/>"
	if(ball<9){
		$("#ball_1_t"+s).html(n);
	}else if(ball==9){
		$("#ball_"+ball+"_t"+s).html(n);
	}
}
//封盘时间
function endtime(iTime)
{
	var iHour,iMinute,iSecond;
    var sHour="",sMinute="",sSecond="",sTime="";
	iHour = parseInt((iTime/3600)%24);
	if (iHour == 0){
		sHour = "00/";
	}
	if (iHour > 0 && iHour < 10){
		sHour = "0" + iHour + "/";
	}
	if (iHour >= 10){
    	sHour = iHour + "/";
    }
	iMinute = parseInt((iTime/60)%60);
	if (iMinute == 0){
		sMinute = "00" + "/";
    }
    if (iMinute > 0 && iMinute < 10){
    	sMinute = "0" + iMinute + "/";
    }
	if (iMinute >= 10){
    	sMinute = iMinute + "/";
    }
    iSecond = parseInt(iTime%60);
    if (iSecond >= 0 && iSecond < 10 ){
    	sSecond = "0" + iSecond;
    }
	if (iSecond >= 10 ){
    	sSecond =iSecond;
    }
    sTime= sHour + sMinute + sSecond;
    if(iTime==0){
		$("#look").html('<embed width="0" height="0" src="js/2.swf" type="application/x-shockwave-flash" hidden="true" />');
		var xnumbers = parseInt($("#numbers").html());
		var numinfo= '<span>正在开奖...</span>';
		$("#autoinfo").html(numinfo);
		var i=0;
		$('.kick').each(function(){
			var e=$(this).children('img');
			e.prop('src','images/open_1/x.png');
			i++;
		});
    }
	if(iTime==60){
		$(".bian_td_odds").html("-");
		$(".bian_td_inp").html("封盘");
		$("#look").html('<embed width="0" height="0" src="js/1.swf" type="application/x-shockwave-flash" hidden="true" />');
    }
	if(iTime<0){
		clearTimeout(fp);
		loadinfo();
    }else
    {
		iTime--;
		var t = 'time';
		if(iTime<60){
			t = 'times';
		}
		$('.colon1 > img').attr('src','images/'+t+'/10.png');
		$('.colon2 > img').attr('src','images/'+t+'/10.png');
		$('.hour > span > img').eq(0).attr('src','images/'+t+'/'+sTime.substr(0,1)+'.png');
		$('.hour > span > img').eq(1).attr('src','images/'+t+'/'+sTime.substr(1,1)+'.png');
		$('.minute > span > img').eq(0).attr('src','images/'+t+'/'+sTime.substr(3,1)+'.png');
		$('.minute > span > img').eq(1).attr('src','images/'+t+'/'+sTime.substr(4,1)+'.png');
		$('.second > span > img').eq(0).attr('src','images/'+t+'/'+sTime.substr(6,1)+'.png');
		$('.second > span > img').eq(1).attr('src','images/'+t+'/'+sTime.substr(7,1)+'.png');
		fp = setTimeout("endtime("+iTime+")",1000);
    }
}
//更新开奖号码
function auto(ball){
	$.post("class/auto_0.php", {ball : ball}, function(data)
		{
			$("#numbers").html(data.numbers);
			var openqihao = $("#open_qihao").html();
			if(auto_new == false || openqihao - data.numbers == 1){
				var numinfo='';
				numinfo = numinfo+'总和：<span>'+data.hms[0]+'</span><span>'+data.hms[1]+'</span><span>'+data.hms[2]+'</span>';
				$("#autoinfo").html(numinfo);
				var i=0;
				var fun=5;
				$('.kick').each(function(){
					var e=$(this).children('img');
					var nu=data.hm[i];
					setTimeout(function(){e.prop('src','images/open_0/'+nu+'.png');},fun*600);
					i++;
					fun--;
				});
				auto_new = true;
				if(openqihao - data.numbers != 1){xhm = setTimeout("auto(1)",3000);}
			}else{
				xhm = setTimeout("auto(1)",3000);
			}
			var auto_top = '<table width="100%" border="0" cellspacing="1" cellpadding="0" class="clbian">';
				for (var key in data.hmlist){
					auto_top = auto_top+'<tr class="clbian_tr_title"><td>第 <span class="qishu">'+key+'</span> 期 开奖号码</td></tr><tr class="clbian_tr_txt"><td class="haoma">'+data.hmlist[key]+'</td></tr>'
				}
			auto_top = auto_top+'</table>'
			$("#auto_list").html(auto_top);
		}, "json");
}
//投注提交
function order(){
	var tt = $("input.inp1");
	var mix = 10; cou = m = 0, txt = '', c=true;
	for (var i = 1; i < 10; i++){
		if(i==9){
			for(var s = 1; s < 5; s++){
				if ($("#ball_" + i + "_" + s).val() != "" && $("#ball_" + i + "_" + s).val() != null) {
					//判断最小下注金额
					if (parseInt($("#ball_" + i + "_" + s).val()) < mix) {
						c = false;
					}
					m = m + parseInt($("#ball_" + i + "_" + s).val());
					//获取投注项，赔率
					var odds = $("#ball_"+i+"_h" + s).html();
					var q = did(i);
					var w = wan9(s);
					txt = txt + q + '[' + w +'] @ ' + odds + ' x ￥' + parseInt($("#ball_" + i + "_" + s).val()) + '\n';
					cou++;
				}
			}
		}else{
			for(var s = 1; s < 77; s++){
				if ($("#ball_" + i + "_" + s).val() != "" && $("#ball_" + i + "_" + s).val() != null) {
					//判断最小下注金额
					if (parseInt($("#ball_" + i + "_" + s).val()) < mix) {
						c = false;
					}
					m = m + parseInt($("#ball_" + i + "_" + s).val());
					//获取投注项，赔率
					var odds = $("#ball_1_h" + s).html();
					var q = did(i);
					var w = wan(s);
					txt = txt + q + '[' + w +'] @ ' + odds + ' x ￥' + parseInt($("#ball_" + i + "_" + s).val()) + '\n';
					cou++;
				}
			}
		}
	}
	if (!c) {$.jBox.tip("最低下注金额："+mix+"￥");return false;}
	if (cou <= 0) {$.jBox.tip("请输入下注金额!!!");return false;}
	var t = "共 ￥"+m+" / "+cou+" 笔，确定下注吗？\n\n下注明细如下：\n\n";
	txt = t + txt;
	var ok = confirm(txt);
	if (ok)
	document.orders.submit()
	document.orders.reset()
}
//读取第几球
function did (type)
{
	var r = '';
	switch (type)
	{
		case 1 : r = '特码'; break;
		case 2 : r = '正一'; break;
		case 3 : r = '正二'; break;
		case 4 : r = '正三'; break;
		case 5 : r = '正四'; break;
		case 6 : r = '正五'; break;
		case 7 : r = '正六'; break;
		case 8 : r = '正码'; break;
		case 9 : r = '总和'; break;
	}
	return r;
}
//读取玩法
function wan (type)
{
	var r = '';
	switch (type)
	{
		case 1 : r = '01'; break;
		case 2 : r = '02'; break;
		case 3 : r = '03'; break;
		case 4 : r = '04'; break;
		case 5 : r = '05'; break;
		case 6 : r = '06'; break;
		case 7 : r = '07'; break;
		case 8 : r = '08'; break;
		case 9 : r = '09'; break;
		case 10 : r = '10'; break;
		case 11 : r = '11'; break;
		case 12 : r = '12'; break;
		case 13 : r = '13'; break;
		case 14 : r = '14'; break;
		case 15 : r = '15'; break;
		case 16 : r = '16'; break;
		case 17 : r = '17'; break;
		case 18 : r = '18'; break;
		case 19 : r = '19'; break;
		case 20 : r = '20'; break;
		case 21 : r = '21'; break;
		case 22 : r = '22'; break;
		case 23 : r = '23'; break;
		case 24 : r = '23'; break;
		case 25 : r = '25'; break;
		case 26 : r = '26'; break;
		case 27 : r = '27'; break;
		case 28 : r = '28'; break;
		case 29 : r = '29'; break;
		case 30 : r = '30'; break;
		case 31 : r = '31'; break;
		case 32 : r = '32'; break;
		case 33 : r = '33'; break;
		case 34 : r = '34'; break;
		case 35 : r = '35'; break;
		case 36 : r = '36'; break;
		case 37 : r = '37'; break;
		case 38 : r = '38'; break;
		case 39 : r = '39'; break;
		case 40 : r = '40'; break;
		case 41 : r = '41'; break;
		case 42 : r = '42'; break;
		case 43 : r = '43'; break;
		case 44 : r = '44'; break;
		case 45 : r = '45'; break;
		case 46 : r = '46'; break;
		case 47 : r = '47'; break;
		case 48 : r = '48'; break;
		case 49 : r = '49'; break;
		case 50 : r = '大'; break;
		case 51 : r = '小'; break;
		case 52 : r = '单'; break;
		case 53 : r = '双'; break;
		case 54 : r = '合大'; break;
		case 55 : r = '合小'; break;
		case 56 : r = '合单'; break;
		case 57 : r = '合双'; break;
		case 58 : r = '尾大'; break;
		case 59 : r = '尾小'; break;
		case 60 : r = '尾单'; break;
		case 61 : r = '尾双'; break;
		case 62 : r = '红波'; break;
		case 63 : r = '蓝波'; break;
		case 64 : r = '绿波'; break;
		case 65 : r = '鼠'; break;
		case 66 : r = '牛'; break;
		case 67 : r = '虎'; break;
		case 68 : r = '兔'; break;
		case 69 : r = '龙'; break;
		case 70 : r = '蛇'; break;
		case 71 : r = '马'; break;
		case 72 : r = '羊'; break;
		case 73 : r = '猴'; break;
		case 74 : r = '鸡'; break;
		case 75 : r = '狗'; break;
		case 76 : r = '猪'; break;
	}
	return r;
}
//读取玩法
function wan9 (type)
{
	var r = '';
	switch (type)
	{
		case 1 : r = '总和大'; break;
		case 2 : r = '总和小'; break;
		case 3 : r = '总和单'; break;
		case 4 : r = '总和双'; break;
	}
	return r;
}