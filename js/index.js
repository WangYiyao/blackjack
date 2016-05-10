var dealerSum = 0, meSum = 0;   //初始化总点数
var arr = [Math.round(Math.random() * 51 + 1)];  //生成第一个随机数
var bet;//赌注
var money;
/***********************************下注************************************/
function getBet(){
	var arr = $('dd');
	var betSpan = $('.bet-number>span');
	$(arr[0]).click(function(){betSpan.text('¥ 1');bet = parseInt(betSpan.text().substr(-1));});
	$(arr[1]).click(function(){betSpan.text('¥ 3');bet = parseInt(betSpan.text().substr(-1));});
	$(arr[2]).click(function(){betSpan.text('¥ 5');bet = parseInt(betSpan.text().substr(-1));});
}




/**********************************界面初始化**************************************/
function initScreen(){
	//根据设备大小动态调整高度
	var screenHeight = window.innerHeight;
	var screenWidth = window.innerWidth;
	var body = $('body');
	var bodyWidth = document.body.clientWidth;
	console.log('screenWidth-----------'+screenWidth);
	console.log('screenHeight----------'+screenHeight);
	console.log('bodyWidth---------------'+bodyWidth);

	if(screenWidth < 1100 && screenWidth > screenHeight){  //移动设备横屏
		 body.css('height',screenHeight+'px');	
	 }
	 else{
	 	 body.css('height',bodyWidth*0.5+'px');
	 }
	
	

	//根据屏幕大小动态调整扑克牌图片大小
	var showHit = document.getElementById('showHit');
	var h = showHit.clientHeight;
	var w = showHit.clientWidth;
	if(w<105){
		$(showHit).css('background-size',w*13+'px '+h*4+'px');
		$('.card-dealer').css('background-size',w*13+'px '+h*4+'px');
		$('#dealerBack').css('background-size','100% 100%');
	}
}


/**********************生成一个1~52（包含）且不重复的随机数************************/
function rand(){
	var num = Math.round(Math.random() * 51 + 1);
	len = arr.length;
	for(var i = 0; i < len; i++){
		if(num != arr[i]){
			arr.push(num);
			return num;
		}
		else{
			rand();
		}
	}
}

/*********************************给庄家发牌****************************************/
function dealingDealerCards(i){
	/*if(dealerSum > 18){
		location.reload();
	}*/
	
	var a = 10+5*i+'%';
	var b = 10+5*i+'%';
	var arr = ['#dealer0','#dealer1','#dealer2','#dealer3','#dealer4','#dealer5','#dealer6','#dealer7','#dealer8','#dealer9','#dealer10'];
	var num = rand();
	var col = parseInt(num/13);
	var row = num%13-1;
	if(row == -1){  //最后一行特殊处理
		col--;
		row = 12;
	}
	var number = 10<(row+1) ? 10 : (row+1);
	var showHit = $('#showHit');
	showHit.css('background-position',8.333*row+'% '+33.333*col+'%');
	showHit.css('visibility','visible');
	var showDealer = $(arr[i]);
	var styleElement = document.getElementById('hitPosition');
	styleElement.innerHTML = "@keyframes hitD{0%{left:82%;top:0;} 100%{left: "+a+";top:33%;}}"+
	"@-webkit-keyframes hitD{0%{left:82%;top:0;} 100%{left: "+a+";top:33%;}}"+
		"@-moz-keyframes hitD{0%{left:82%;top:0;} 100%{left: "+a+";top:33%;}}"+
	"@-o-keyframes hitD{0%{left:82%;top:0;} 100%{left: "+a+";top:33%;}}";
	showHit.css({'animation':'hitD 1s ease-out infinite',
				  '-webkit-animation':'hitD 1s ease-out infinite'});
	setTimeout(function(){
			styleElement.innerHTML = '';
			showHit.css({'animation':'',
				  '-webkit-animation':''});
			showHit.css('visibility','hidden');
			showDealer.css({'background-position':8.333*row+'% '+33.333*col+'%',
					'visibility':'visible',
					'left':b,
					'z-index':i});
			dealerSum += number;
			$("#dealerSum").text(dealerSum);
			if(judge()){
				//showHit.css('visibility','hidden');
				//setTimeout(function(){location.reload();},1000);
				// dealerSum = dealerResult;			
				showResult();
			}
	},1000);
}



/************************************给玩家发牌*****************************************/
function dealingMeCards(i){
//if(flag){
	
	var a = 110+5*i+'%';
	var b = 10+5*i+'%';
	var arr = ['#me0','#me1','#me2','#me3','#me4','#me5','#me6','#me7','#me8','#me9','#me10'];
	var num = rand();
	var col = parseInt(num/13);
	var row = num%13-1;
	if(row == -1){  //最后一行特殊处理
		col--;
		row = 12;
	}
	var number = 10<(row+1) ? 10 : (row+1);
	var showHit = $('#showHit');
	showHit.css('background-position',8.333*row+'% '+33.333*col+'%');
	showHit.css('visibility','visible');
	var showDealer = $(arr[i]);
	var styleElement = document.getElementById('hitPosition');
	styleElement.innerHTML = "@keyframes hit{0%{left:82%;top:0;} 100%{left: "+a+";top:33%;}}"+
	"@-webkit-keyframes hit{0%{left:82%;top:0;} 100%{left: "+a+";top:33%;}}"+
		"@-moz-keyframes hit{0%{left:82%;top:0;} 100%{left: "+a+";top:33%;}}"+
	"@-o-keyframes hit{0%{left:82%;top:0;} 100%{left: "+a+";top:33%;}}";
	showHit.css({'animation':'hit 1s ease-out infinite',
				  '-webkit-animation':'hit 1s ease-out infinite'});

	setTimeout(function(){
			showDealer.css({'background-position':8.333*row+'% '+33.333*col+'%',
					'visibility':'visible',
					'left':b,
					'z-index':i});
			styleElement.innerHTML = '';
			showHit.css({'animation':'',
				  '-webkit-animation':''});
			showHit.css('visibility','hidden');
			meSum += number;
			$("#meSum").text(meSum);
			if(judge()){
				// showHit.css('visibility','hidden');
				// setTimeout(function(){location.reload();},1000);
				showResult();
			}
	},1000);
//}
}


/*********************************发一张背面的牌****************************************/
function dealingBackCards(){
	var showDealer = $('#dealerBack');
	var backHit = $("#backHit").css({'animation':'backHit 1s ease-out 1',
									'-webkit-animation':'backHit 1s ease-out 1'});
	var styleElement = document.getElementById('hitPosition');
	styleElement.innerHTML = "@keyframes backHit{0%{left:82%;top:0;} 100%{left: 15%;top:33%;}}"+
	"@-webkit-keyframes backHit{0%{left:82%;top:0;} 100%{left: 15%;top:33%;}}"+
		"@-moz-keyframes backHit{0%{left:82%;top:0;} 100%{left: 15%;top:33%;}}"+
	"@-o-keyframes backHit{0%{left:82%;top:0;} 100%{left: 15%;top:33%;}}";
	setTimeout(function(){
			styleElement.innerHTML = '';
			backHit.css({'animation':'',
						'-webkit-animation':''})
			showDealer.css('visibility','visible');
			
	},1000);	
}

/*********************************翻转牌****************************************/
function transform(){
	$("#showHit").css('visibility','hidden');
	//翻转背面
	var rotYINT;
	var ny = 0;
	var y;
	function rotateYDIV()
	{
		y=document.getElementById("dealerBack");
		clearInterval(rotYINT);
		rotYINT=setInterval(function(){
			ny=ny+1;
			y.style.transform="rotateY(" + ny + "deg)";
			y.style.webkitTransform="rotateY(" + ny + "deg)";
			y.style.OTransform="rotateY(" + ny + "deg)";
			y.style.MozTransform="rotateY(" + ny + "deg)";
	    	if (ny==90){
				clearInterval(rotYINT);
				if (ny>=90)
					ny=0;
			}
		},10);
	}	
	rotateYDIV();

	//随机显示庄家背面的牌
	var num = rand();
	var col = parseInt(num/13);
	var row = num%13-1;
	if(row == -1){
		col--;
		row = 12;
	}
	var number = 10<(row+1) ? 10 : (row+1);
	var showDealer = $('#dealer1');
	setTimeout(function(){
			showDealer.css({'background-position':8.333*row+'% '+33.333*col+'%',
					'visibility':'hidden',
					'left':'15%',
					'z-index':1});			
	},1000);


	//显示正面
	var rotINT;
	var n = -90;
	var x;
	function rotateDIV()
	{

		x=document.getElementById("dealer1");
		setTimeout(function(){x.style.visibility = 'visible';},100);
		clearInterval(rotINT);
		rotINT=setInterval(function(){
			n=n+1;
			x.style.transform="rotateY(" + n + "deg)";
			x.style.webkitTransform="rotateY(" + n + "deg)";
			x.style.OTransform="rotateY(" + n + "deg)";
			x.style.MozTransform="rotateY(" + n + "deg)";
	    	if (n==0){
				clearInterval(rotINT);
				if (n>=0)
					n=-90;
			}
		},10);
	}	
	setTimeout(function(){
			rotateDIV();
			dealerSum += number;
			$("#dealerSum").text(dealerSum);
			if(judge()){

				// setTimeout(function(){location.reload();},1000);	
				// dealerSum = dealerResult;	
				showResult();
			}
	},1000);

	
}

/*********************************判断输赢****************************************/
function judge(){
	/*var meSum = $("#meSum").text();
	console.log("meSum"+meSum);
	var dealerSum = $("#dealerSum").text();
	console.log("dealerSum"+dealerSum);*/
	var showHit = $('#showHit');
	var result = $('#result');
	if(meSum == 21){
		if(result.text() == ''){
			result.text('你赢啦 ~^o^~');
		}
		return 1;
	}
	else if(meSum > 21){
		if(result.text() == ''){
		result.text('你输了 (ㄒoㄒ)');
		}
		return 1;
	}
	else if(dealerSum == 21){
		if(result.text() == ''){
		result.text('你输了 (ㄒoㄒ)');
		}
		return 1;
	}
	else if(dealerSum > 21){
		if(result.text() == ''){
			result.text('你赢啦 ~^o^~');
		}
		return 1;
	}
	else if(dealerSum < meSum && 18 < dealerSum){
		if(result.text() == ''){
			result.text('你赢啦 ~^o^~');
		}
		return 1;
	}
	else if(meSum < dealerSum && 18 < dealerSum){
		if(result.text() == ''){
		result.text('你输了 (ㄒoㄒ)');
		}
		return 1;
	}
	else{
		return 0;
	}
}

/*********************************显示结果****************************************/
function showResult(){
		$('.show-wrapper').css('visibility','hidden');
		$('.ctrl-wrapper').css('visibility','hidden');
		$('.wrapper-result').css('display','block');
		$('.me-sum').text(meSum);
		var dealerS = $('.dealer-sum');
		var resultMoney = $('.result-money span');
		if(dealerS.text() == 0){
			$('.dealer-sum').text(dealerSum);
		}
		if($("#result").text() == "你输了 (ㄒoㄒ)"){
			money -= bet;
			if(resultMoney.text() == 0){
				resultMoney.text(money);
				sessionStorage.setItem("money",money);
			}
		}
		if($("#result").text() == "你赢啦 ~^o^~"){
			money += bet;
			if(resultMoney.text() == 0){
				resultMoney.text(money);
				sessionStorage.setItem("money",money);
			}
		}
}

/*********************************开始游戏****************************************/
function gameStart(){
	if(bet == undefined){
		console.log('nothing');
	}
	if(bet != undefined){
		console.log('bet-----'+bet);
		$('.wrapper-result').css('display','none');
		$('.wrapper-curtain').css('display','none');
		$('.show-wrapper').css('visibility','visible');
		$('.ctrl-wrapper').css('visibility','visible');
		// $('.show-wrapper').css('display','block');
		// $('.ctrl-wrapper').css('display','block');
		// $('.card-dealer').css("background","url('./img/jack.jpg') no-repeat border-box");
		dealingMeCards(0);
		setTimeout(function(){dealingMeCards(1);},1200);
		setTimeout(function(){dealingDealerCards(0);},2400);
		setTimeout(function(){dealingBackCards();},3600);
		// var button = document.getElementsByClassName('hitLi');
		// button[1].innerHTML = "<span id='take'>翻倍</span>"	;
		// button[2].innerHTML = "<span id='flop'>开牌</span>";
		$("#flop").click(function(){flopCard();});
		$("#take").click(function(){take();});
		$('#doubleBet').click(function(){doubleBet();});
		$('#dealerBack').click(function(){flopCard();});		
		}
	
}

/*********************************再来一局****************************************/
function reStart(){
	$('.wrapper-result').css('display','none');
	$('.wrapper-curtain').css('display','block');
	$('.show-wrapper').css('visibility','hidden');
	$('.ctrl-wrapper').css('visibility','hidden');
	money = parseInt($('.dealer-sum').text());
	$(".money span").text(money);
}


/*********************************玩家拿牌****************************************/
var meNum = 2;
function take(){
	dealingMeCards(meNum);
	meNum++;
}


/***********************************赌注翻倍****************************************/
function doubleBet(){
	bet *= 2;
	flopCard();
}

/*********************************停牌****************************************/
function flopCard(){
	transform();
	setTimeout(function(){dealingDealerCards(2);},1200);	
	setTimeout(function(){dealingDealerCards(3);},2400);	
	setTimeout(function(){dealingDealerCards(4);},3600);	
	setTimeout(function(){dealingDealerCards(5);},4800);	
	setTimeout(function(){dealingDealerCards(6);},6000);	
	setTimeout(function(){dealingDealerCards(7);},7200);	
	setTimeout(function(){dealingDealerCards(8);},8400);	
	setTimeout(function(){dealingDealerCards(9);},9600);	
	setTimeout(function(){dealingDealerCards(10);},10800);	
}

$(function(){
	// $(".show-wrapper").css('display','none');
	// $(".ctrl-wrapper").css('display','none');
	getBet();
	$('#start').click(function(){gameStart();});
	initScreen();
	dealerSum = 0;
	meSum = 0;
	// var button = document.getElementsByClassName('hitLi');
	// button[1].innerHTML = '';
	// button[2].innerHTML = '';
	$('#reStart').click(function(){location.reload();});
	

	var a = sessionStorage.getItem("money");
	if(a == null){
		money = 100;
	}
	else{
		money = parseInt(a);
	}
	console.log("acdd---"+a);
	$(".money span").text(money);
})