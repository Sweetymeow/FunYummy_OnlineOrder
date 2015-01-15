// JavaScript Document
var orderArray = new Array(); // Home Page - temp keep order info

// Week Order Page
var d_names = new Array("Sunday", "Monday", "Tuesday",
"Wednesday", "Thursday", "Friday", "Saturday");

var mealImgs = new Array("day1.jpg","day2.jpg","day3.jpg","day4.jpg","day5.jpg");
var mealminiImgs = new Array("day1.jpg","day2.jpg","day3.jpg","day4.jpg","day5.jpg");

var menu = new Array();
var menuStr = "";
var texpercent = 0.06;
var credittips = 0.15;

var orderdates = new Array(50);

var orderjson = new Object(); // use to save JSON data

// Week Order Page
$(function(){
	var today = new Date();
	var beginDate = new Date();
	//var beginDate = nextWorkDate(today);
	var orderIndex = 0;
	var menutext = $('<p id="ordermenu"><em>Menu: </em> this part is menu. </p>');
	// Menu content array
	var menu = ["Menu : Sweet Shrimp / Mapo Tofu / Yangzhou Fried Rice / Red bean soup / apple / Cock ","Menu : Chicken with cashew nuts / Chicken with snow pea pods / Chicken with almond ding / Boneless Chicken","Menu : Pepper Steak with onion / Beef with snow pea pods / Beef with chinese vegetables / Beef with mixed chinese","Menu : Beef with curry sauce / Beef with tomato & pepper / Beef with black bean sauce" , "Menu : Beef with curry sauce / Beef with tomato & pepper / Beef with black bean sauce"]; 
	
	// Add current class to week order
	$("nav#nav > ul").children("li:nth-child(1)").removeClass("current");
	$("nav#nav > ul").children("li:nth-child(2)").addClass("current");
		
	$('.daydetail p:nth-child(1)').each(function(i){
		var nextDvlDate = nextWorkDate(today);
		console.log("next date is" + nextDvlDate.getDate());
		var htmlDate = printDate(nextDvlDate);
		$(this).html(htmlDate);
		beginDate.setDate(nextDvlDate.getDate()); 
	});
	$('.daydetail p:nth-child(2)').each(function(i){
		$(this).html(menu[i]);
		i++;
	});
	
	// start day button - next Monday
	$('a#nextweek').click(function(){ 
		var d = new Date();
		beginDate = nextMonDate(nextWorkDate(d)); // this is next Monday
		$('.daydetail p:nth-child(1)').each(function(){
			var htmlDate = printDate(beginDate); // html string
			$(this).html(htmlDate);
			var nextDvlDate = nextWorkDate(beginDate);
			console.log("next date is" + nextDvlDate.getDate());
			beginDate.setDate(nextDvlDate.getDate()); 
		});
	});
	
	/* 	// 订单模板
		var $orderdiv = $('#order-template').html(); 
		$('section#orderSum').append($orderdiv);
	*/
	
	// week menu button - 实现增加一个订单Detail的功能，但是日期不详细
	$('img#day1').click(function(){
		var $orderdiv = $('#order-template').html();
		var dateText = $(this).parent().parent().find('p:first-child').text();
		var date = dateText.split(" ");
		$('section#orderSum').append($orderdiv);
		orderdates[orderIndex] = dateText; 
		orderIndex++;
		$('div.orderDetail').each(function(i) {
			$(this).find('th#dvl_date').text(orderdates[i]);
			console.log("order Date :" + orderdates[i]);
    	}); // 
		var mealdetail = new mealItems();
		mealdetail.location = "business";
		mealdetail.num = 1;
		mealdetail.weekday = date[0];
		mealdetail.date = date[2];
		mealdetail.month = date[1];
		mealdetail.year = date[3];
		orderdates[orderIndex] = mealdetail;
		//alert("order dates :" + orderdates[orderIndex-1]);
	});
	
	
	// 没有实现 - 有问题， 注意日期获得的部分
	$('img#day2').click(function(){
		//alert("click Week Tuesday Button!");
		var $orderdiv = $('#order-template').html();
		var dateText = $(this).parent().parent().find('p:first-child').text();
		var date = dateText.split(" ");
		$('section#orderSum').append($orderdiv);
		orderdates[orderIndex] = dateText; 
		orderIndex++;
		$('div.orderDetail').each(function(i) {
			$(this).find('th#dvl_date').text(orderdates[i]);
			console.log("order Date :" + orderdates[i]);
    	}); 
		var mealdetail = new mealItems();
		mealdetail.location = "business";
		mealdetail.num = 1;
		mealdetail.weekday = date[0];
		mealdetail.date = date[2];
		mealdetail.month = date[1];
		mealdetail.year = date[3];
		orderdates[orderIndex] = mealdetail;
	});
	
	$('img#day3').click(function(){
		//alert("click Week Wedday Button!");
		var $orderdiv = $('#order-template').html();
		var dateText = $(this).parent().parent().find('p:first-child').text();
		var date = dateText.split(" ");
		$('section#orderSum').append($orderdiv);
		orderdates[orderIndex] = dateText; 
		orderIndex++;
		$('div.orderDetail').each(function(i) {
			$(this).find('th#dvl_date').text(orderdates[i]);
			console.log("order Date :" + orderdates[i]);
    	}); 
		var mealdetail = new mealItems();
		mealdetail.location = "business";
		mealdetail.num = 1;
		mealdetail.weekday = date[0];
		mealdetail.date = date[2];
		mealdetail.month = date[1];
		mealdetail.year = date[3];
		orderdates[orderIndex] = mealdetail;
	});
	
	$('img#day4').click(function(){
		var $orderdiv = $('#order-template').html();
		var dateText = $(this).parent().parent().find('p:first-child').text();
		var date = dateText.split(" ");
		$('section#orderSum').append($orderdiv);
		orderdates[orderIndex] = dateText; 
		orderIndex++;
		$('div.orderDetail').each(function(i) {
			$(this).find('th#dvl_date').text(orderdates[i]);
			console.log("order Date :" + orderdates[i]);
    	}); 
		var mealdetail = new mealItems();
		mealdetail.location = "business";
		mealdetail.num = 1;
		mealdetail.weekday = date[0];
		mealdetail.date = date[2];
		mealdetail.month = date[1];
		mealdetail.year = date[3];
		orderdates[orderIndex] = mealdetail;
	});
	
	$('img#day5').click(function(){
		var $orderdiv = $('#order-template').html();
		var dateText = $(this).parent().parent().find('p:first-child').text();
		var date = dateText.split(" ");
		$('section#orderSum').append($orderdiv);
		orderdates[orderIndex] = dateText; 
		orderIndex++;
		$('div.orderDetail').each(function(i) {
			$(this).find('th#dvl_date').text(orderdates[i]);
			console.log("order Date :" + orderdates[i]);
    	}); 
		var mealdetail = new mealItems();
		mealdetail.location = "business";
		mealdetail.num = 1;
		mealdetail.weekday = date[0];
		mealdetail.date = date[2];
		mealdetail.month = date[1];
		mealdetail.year = date[3];
		orderdates[orderIndex] = mealdetail;
	});
	/*$('button#mealminus').click(function(){		
		var $cur_mealNum = $(this).parent().find("span").text();
		$(this).parent().find("span").text($cur_mealNum-1);
	}); 
	*/

	$("body").on( "click", "#mealplus", function() {	 // work as a delegate
		$(this).parent().find("span").css("font","red");
		var cur_meal_text = $(this).parent().find("span").text();
		var cur_meal_num = Number(cur_meal_text);
		$(this).parent().find("span").text(cur_meal_num+1);
		//alert("find meal number change !");
	});
	
	$("body").on( "click", "#mealminus",function() {		
		$(this).parent().find("span").css("font","red");
		var cur_meal_text = $(this).parent().find("span").text();
		var cur_meal_num = Number(cur_meal_text);
		//alert("click minus button : " + cur_meal_num);
		$(this).parent().find("span").text(cur_meal_num - 1);
	});
	
	$("body").on("click", "img", function(){
		var $meal_num = 0;
		$("th#meal-number > span").each(function(){
			$meal_num += parseInt($(this).text());
		});
		var total = 12*$meal_num;
		$('div#ordertotal').children("h4").html("<h2>Order Total : <em>$ " + total +".0 </em> </h4>");
		$('div#ordertotal').children("h4").css("color", "#FF0050");
	});
	
	
	// 注意是事件触发的冒泡顺序
	$(document).on("click", "th#meal-number > button", function(){
		var $meal_num = 0;
		$("span#meal-number").each(function(){
			$meal_num += parseInt($(this).text());
		});
		alert("find meal number change !!!" + $meal_num);
		var total = 12*$meal_num;
		$('div#ordertotal').children("h4").html("<h2>Order Total : <em>$ " + total +".0 </em> </h4>");
		$('div#ordertotal').children("h4").css("color", "#FF0050");
	});
	
	var paymentBool = false ;
	// choose payment type
	$("input.button").click(function(){
		if(!paymentBool){
			$("input.button").css("background-color","#484848");
			$(this).css("background-color","#EB8384");
			paymentBool = true;
		}else{
			$("input.button").css("background-color","#484848");
			$(this).css("background-color","#484848");
			paymentBool = false;
		}
		
	});
	
	// fack server file - POST Json Data
	/*$("input").post( "ajax/test.html", function( data ) {
		var obj = {};
		obj['name']=$("input[name='name']"); //string
		obj['cellphone']=$("input[name='cellphone']");
		obj['email']=$("input[name='email']");
    	obj['age'] = 32;  // integer.
		for(var i = 0; i <= orderIndex+1; i++){
			var name = "order_" + orderIndex;
			}
    	 //array
		JSON.stringify(obj);
 	 $( ".result" ).html( data );
});
	*/
	// next step : counting final total
  
})

// 这个需要实现，计算order ID
function createOrderNum(givenDate, orderIndex){
	var orderID  = "";
	// orderID = year + month + date + hour + minus + second
	
	}

// show today date on tag with id = today
function showDate(){
	var d = new Date();
	var curr_day = d.getDay();  // day of week
	var curr_date = d.getDate(); // date of month
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	
	var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	
    var sup = "";
    if (curr_date == 1 || curr_date == 21 || curr_date ==31){sup = "st";}
    else if (curr_date == 2 || curr_date == 22){sup = "nd";}
    else if (curr_date == 3 || curr_date == 23){sup = "rd";}
    else{sup = "th";}

	document.getElementById("today").innerHTML = "<p> Today is : <em>" + d_names[curr_day] + "</em> , " + curr_date + sup + " "+ m_names[curr_month] + " " + curr_year + "</p>";
}

// return string of day, date, month and year
function printDate(testDate){
	var givenDate = testDate;
	
	var prt_day = givenDate.getDay();  // day of week
	var prt_date = givenDate.getDate(); // date of month
	var prt_month = givenDate.getMonth();
	var prt_year = givenDate.getFullYear();
	
	var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	
    var sup = "";
    if (prt_date == 1 || prt_date == 21 || prt_date ==31){sup = "st";}
    else if (prt_date == 2 || prt_date == 22){sup = "nd";}
    else if (prt_date == 3 || prt_date == 23){sup = "rd";}
    else{sup = "th";}
	
	var prtdate =  "<em>" + d_names[prt_day]  + "</em> " + m_names[prt_month] + " " + prt_date  + sup + " " + prt_year;
	
	return prtdate;
}

function nextMonDate(testDate){
	var beginDate = testDate;
	
	if(IsMonday(beginDate)){
		var nextMon = beginDate.getDate()+7;
		beginDate.setDate(nextMon);
	}else if(beginDate.getDay() == 0){
		var nextMon = beginDate.getDate()+1;
		beginDate.setDate(nextMon);
	}else{
		var nextMon = beginDate.getDate()+8- beginDate.getDay();
		beginDate.setDate(nextMon);
	}
	
	return beginDate;
	}

// Calculate the next deliverable day for Week Or Rush Order
function nextDeliveryDate(testDate){ 
	var givenDate = testDate;

	if(givenDate.getHours() < 21){ 
		var nextdate = givenDate.getDate()+1;
		givenDate.setDate(nextdate);
		
		if(IsWeekend(givenDate) == 1 || IsWeekend(givenDate) == 2){
			// if the beginDate is Sun or Sat
			var nextdate = givenDate.getDate() + IsWeekend(givenDate);
			givenDate.setDate(nextdate);
			console.log("Next deliverable date is " + givenDate.getDate() + ", it is Monday");	
		}
	}else if(givenDate.getHours() >= 21){
		var nextdate = givenDate.getDate()+2;
		givenDate.setDate(nextdate);
		
		if(IsWeekend(givenDate) == 1 || IsWeekend(givenDate) == 2){
			// if the beginDate is Sun or Sat
			var nextdate = givenDate.getDate() + IsWeekend(givenDate);
			givenDate.setDate(nextdate);
			console.log("Next deliverable date is " + givenDate.getDate() + ", it is Monday");	
		}
	}
	return  givenDate; // day of week, string
}

// Calculate the next work day for Week Or Rush Order
function nextWorkDate(testDate){
	var givenDate = testDate;
	
	if(IsWeekend(givenDate) == 1 || IsWeekend(givenDate) == 2){
		// if the beginDate is Sun or Sat
		var nextdate = givenDate.getDate() + IsWeekend(givenDate);
		givenDate.setDate(nextdate);
		console.log("Next work date is " + givenDate.getDate() + ", it is Monday");	
	}else if(givenDate.getDay() === 5){ // This is Friday
		var nextdate = givenDate.getDate() + 3;
		givenDate.setDate(nextdate);
		console.log("Next work date is " + givenDate.getDate() + ", it is Monday");
	}else{
		var nextdate = givenDate.getDate()+1;
		givenDate.setDate(nextdate);
		//console.log("get next work day");
	}
	
	return  givenDate; // day of week, string
}

function dayofweek(givenDate){ 
// Calculate the next deliverable day for Week Or Rush Order 
	return  d_names[givenDate.getDay()]; // day of week, string
}


function myDate(weekday, date, month, year){
	this.weekday = weekday;
	this.date = date;
	this.month = month;
	this.year = year;
}

function IsMonday(givenDate) {
    return givenDate.getDay() == 1;
}

function IsWeekend(givenDate) {
	//return the day between next workday;
	if(givenDate.getDay() == 0){
		return 1;
	}else if(givenDate.getDay() == 6){
		return 2;
	}else{
		return 0;
	}
}
/* 闰年的计算方法：公元纪年的年数可以被四整除，即为闰年；世纪数被100整除为平年，被400整除的才为闰年
   格里历每月有月大、月小和月平的说法，月大为31天，月小为30天，月平只有2月，为28天（闰年29天）。
*/
function IsLastdayInMonth(givenDate) {
	//return 0, if givenDate isn't the last day in the month
	// return 1, if givenDate is 31th if month equal 1,3,5,7,8,10,12
	// return 1 if givenDate is 30th if month equal 4,6,9,11 or 29 in leap year or 28 in common	year
	var date = givenDate.getDate();
	var month = givenDate.getMonth();
	// alert("Date is " + date);
	
	if(date >= 28){
		switch(month){
			case 0: case 2: 	case 4: case 6: case 7: case 9:  case 11:
				if(givenDate.getDate() === 31){
					alert("It is last day!!!!!");
					return 1;}
				else{
					alert("It isn't last day");
					return 0;}
		
				break;
			case 1:
				if(givenDate.getYear()%4 != 0 && givenDate.getDate() === 28){return 1;
				}else if(givenDate.getYear()%4 === 0 && givenDate.getDate() === 29){return 1;
				}else{return 0;}
				break;
			default:
				if(givenDate.getDate() === 30){return 1;}
				else{return 0;}
			} // switch calculate when date is more than 28th
	}else{ // Current date is less than 28
		return 0;
	}
}

function IsWeekend(givenDate) {
	//return the day between next workday;
	if(givenDate.getDay() == 0){
		return 1;
	}else if(givenDate.getDay() == 0){
		return 2;
	}else{
		return 0;
	}
}

// test of local storage from Home to Rush Order
$(function(){
	var ist = $.cookie('IST');
	
	// test of cookie
	$('section#orderSum').append('<div><p> This is test of cookie: ' + ist + '</p></div>');
	// test of array
	if(orderArray.length>0){
		$('section#orderSum').append('<div><p> This is test of array: ' + orderArray[1].bldg + '</p></div>');
	}
	$('section#orderSum').append('<div><p> || This is test of localStorage: ' + localStorage.getItem("IST") + '</p></div>');
})


// 为每个menu button 放入合适的图片元素 - 这里包含src 
$(function() {
    $("img.imagebtn").each(function() {
        var dateText = $(this).parent().parent().find('p:first-child').text();
		var date = dateText.split(" ");
		var imgIndex = 0;
		switch(date[0]){
			case "Tuesday" : imgIndex = 1; break;
			case "Wednesday": imgIndex = 2; break;
			case "Thursday": imgIndex = 3; break;
			case "Friday": imgIndex = 4; break;
			default: imgIndex = 0; break;
			}
		var imgurl = "images/" + mealImgs[imgIndex];
		$(this).attr("src", imgurl);
    });
	
	if (window.matchMedia('(max-width: 767px)').matches) {
         // do functionality on screens smaller than 768px
		 /*$('img.imagebtn').attr('src', 'images/pic01_mini.jpg');
		 */
		 $("img.imagebtn").each(function() {
        var dateText = $(this).parent().parent().find('p:first-child').text();
		var date = dateText.split(" ");
		var imgIndex = 0;
		switch(date[0]){
			case "Tuesday" : imgIndex = 1; break;
			case "Wednesday": imgIndex = 2; break;
			case "Thursday": imgIndex = 3; break;
			case "Friday": imgIndex = 4; break;
			default: imgIndex = 0; break;
			}
		var imgurl = "images/" + mealminiImgs[imgIndex];
		$(this).attr("src", imgurl);
    });
		 console.log("screen minor than 767");
    } else {
        //...
    }
})

// Home Page Rush Orde Building Choice Btn
$(function(){
	var $bldgiCon = $('a.icon');
	var $mealLists = $('div.meal');
	var $mealClear = $('div#order_cancel');
	
	$bldgiCon.on('click', function(){
		var bldgName = $(this).attr('id');
		
		if(orderArray.length === 0){
			orderArray[0] = new orderList(bldgName, 1);
			$newMeal = $('<div' + ' class="meal" ' + ' id ="' + bldgName + '"> 1 meal to ' + bldgName + ' Building </div>');
			$('div.meal_num:last').after($newMeal);
			localStorage.setItem(bldgName, 1);
			
		}else if(orderArray.length > 0){
			var new_meal = false;
			
			for(var i = 0; i < orderArray.length; i++){
				if(orderArray[i].bldg === bldgName && !new_meal){
					orderArray[i].number++;
					var divname = "div#" + bldgName;
					$(divname).text(orderArray[i].number + ' meals to ' + bldgName +' Building ');
					new_meal = true;					
					var premealNum = Number(localStorage.getItem(bldgName)) + 1;
					localStorage.removeItem(bldgName);
					localStorage.setItem(bldgName, premealNum);
					break;
				}
			}
			if(!new_meal){
				var index = orderArray.length;
				orderArray[index] = new orderList(bldgName, 1);
				$newMeal = $('<div' + ' class="meal" ' + ' id ="' + bldgName + '"> 1 meal to ' + bldgName + ' Building </div>');
				$('div.meal_num:last').after($newMeal);
				localStorage.setItem(bldgName, 1);
			}
		}
		
		/*
		$newMeal = $('<div' + ' class="meal"'+ ' id ="' + $(this).attr('id') +'"' + '>1 meal to ' + $(this).attr('id') + '</div>');
		$('div.meal_num:last').after($newMeal);
		*/
		
	});
	
	$mealClear.on('click', function(){
		$('div.meal').remove();
		orderArray = [];
		localStorage.clear();
		});
})

// Home Page Rush Button - go to rush order page
$(function(){
	$('a#rushBtn').on('click', function(){
		var i;
		for(var i = 0; i < orderArray.length; i++){
			$.cookie(orderArray[i].bldg, orderArray[i].number);
		}
		});
})

function orderList(bldg, number){
	this.bldg = bldg;
	this.number = number;
	$.removeCookie();
}

function mealItems(location,weekday,num, date, month, year){
	this.location = location;
	this.weekday = weekday;
	this.num = num;
	this.date = date;
	this.month = month;
	this.year = year;
}

function mealItems(location,weekday,num, date, month, year){
	this.location = location;
	this.weekday = weekday;
	this.num = num;
	this.date = date;
	this.month = month;
	this.year = year;
}