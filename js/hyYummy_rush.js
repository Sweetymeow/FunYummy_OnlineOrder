// JavaScript Document
var orderArray = new Array(); // Home Page - temp keep order info
// Week Order Page & Rush Order
var d_names = new Array["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var bannerImgs = new Array("banner1.jpg","banner2.jpg","banner3.jpg","banner4.jpg","banner5.jpg");
var menu = ["Menu1 : Sweet Shrimp / Mapo Tofu / Yangzhou Fried Rice / apple / Cock ","Menu2 : Chicken with cashew nuts / Chicken with almond ding / Boneless Chicken","Menu3 : Pepper Steak with onion / Beef with snow pea pods / Beef with mixed chinese","Menu 4: Beef with tomato & pepper / Beef with black bean sauce" , "Menu5 : Beef with curry sauce / Beef with tomato & pepper / Beef with black bean sauce"]; 

var menuStr = "";
var taxpercent = 0.06;
var credittips = 0.15;
var mealprice = 12;

// save date for each time press img (Thursday Jan 15th 2015)
var orderdates = new Array(500);
// save mealItems each time press img button 
// mealItems(location,weekday,num, date, month, year)
var orderLists = new Array();  
var paymentBool = false;
// use to save JSON data 
var orderjson = new Object(); 

// Week Order Page
$(function(){
	var today = new Date();
	var beginDate = new Date();
	var orderIndex = 0;
	var menutext = $('<p id="ordermenu"><em>Menu: </em> this part is menu. </p>');
	// Menu content array
	var nextDvlDate = nextWorkDate(today);
	
	// Get next 5 work days and load to p#orderdate
	$('.tomorrowdetail h3:nth-child(1)').each(function(i){
		
		var htmlDate = printDate(nextDvlDate);
		$(this).text(htmlDate);
		// change Banner Image
		var bannerImgName = bannerImgs[nextDvlDate.getDay()-1];
		$("img#bannerImg").attr("src", "images/" + bannerImgName);
		// load menu from menu array
		$('.tomorrowdetail p:nth-child(2)').html(menu[nextDvlDate.getDay()-1]);
	});
	
	/* 	// 订单模板
		var $orderdiv = $('#order-template').html(); 
		$('section#orderSum').append($orderdiv);
	*/
	// Read Cookie
	var ist = $.cookie('ist');
	
	// test of cookie
	$('section#orderSum').append('<div><p> This is test of cookie: ' + ist + '</p></div>');
	
	$('section#orderSum').append('<div><p> || This is test of localStorage: ' + localStorage.getItem("ist") + ' </p></div>');
	
	
	var $orderdiv = $('#order-template').html();
	var rushOrderList = new Array();
	
	// 可以改进
	if(localStorage.getItem('IST')){
		rushOrderList[0] = localStorage.getItem('IST');
	}
	if(localStorage.getItem('Pollock')){
		rushOrderList[1] = localStorage.getItem('Pollock');
	}
	if(localStorage.getItem('Business')){
		rushOrderList[2] = localStorage.getItem('Business');
	}
	
	// create new order detail table by localstorage
	if(Object.keys(rushOrderList).length){
		for(var i = 0; Object.keys(rushOrderList).length; i++){
			$('section#orderSum').append($orderdiv);
		}
	}
	
	// fill next deliverable day's date to order detail table
	$('div.orderDetail').each(function(i) {
		var nextDateStr = printDate(nextDvlDate);
		$(this).find('th#dvl_date').text(nextDateStr);
		$(this).find("span").text(rushOrderList[i]);
		alert("order Date : " + nextDateStr + ". And Order Numver is : " + rushOrderList[i]);
    });
		
	// week menu button - 实现增加一个订单Detail的功能，但是日期不详细
	
	// building select was modify
	 $("body").on("change", "select#dvl_loc",function(){
		var $selectParent = $(this).parents("div.orderDetail");
		var index = $selectParent.index();
		orderLists[index].location = $(this).val();
		alert(" New select itms is " + orderLists[index].location);
	}); 

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
	
	// each time press img - update the total price
	$("body").on("click", "img", function(){
		var $meal_num = 0;
		$("th#meal-number > span").each(function(){
			$meal_num += parseInt($(this).text());
		});
		var total = mealprice*$meal_num;
		$('div#ordertotal').children("h4").html("<h2>Order Total : <em>$ " + total +".0 </em> </h4>");
		$('div#ordertotal').children("h4").css("color", "#FF0050");
	});
	
	// 注意是事件触发的冒泡顺序 - 当改变meal-num时，更新总价
	$(document).on("click", "th#meal-number > button", function(){
		var $meal_num = 0;
		$("span#meal-number").each(function(){
			$meal_num += parseInt($(this).text());
		});
		// alert("find meal number change !!!" + $meal_num);
		var total = mealprice*$meal_num;
		$('div#ordertotal').children("h4").html("<h2>Order Total : <em>$ " + total +".0 </em> </h4>");
		$('div#ordertotal').children("h4").css("color", "#FF0050");
		
		// Update the meal-number of orderLists
		var $numberParent = $(this).parents("div.orderDetail");
		var index = $numberParent.index();
		var number = $(this).parent().find("span").text();
		orderLists[index].num = Number(number);
		alert("Update the number in order lists！ INDEX : " + orderLists[index].num);
	});
	
	var paymentType;
	// choose payment type
	$(":button").click(function(){
		if(!paymentBool){
			$("input.button").css("background-color","#484848");
			$(this).css("background-color","#EB8384");
			paymentBool = true;
			paymentType = $( this ).attr("value");
			//alert("paymentBool is true! Payment is " + paymentBool);
		}else if(paymentBool){
			$("input.button").css("background-color","#484848");
			$(this).css("background-color","#484848");
			paymentBool = false;
		}
		
	});
		
	//POST Json Data
	$(":submit").click(function(e){
		// orderjson object store all order info
		e.preventDefault();
		orderjson['name']=$("input[name='name']").val(); //string
		orderjson['cellphone']=$("input[name='cellphone']").val(); 
		orderjson['email']=$("input[name='email']").val();
    	//orderjson['total'] = parseInt($('div#ordertotal').children("h4").text());
		var totaltext = $('div#ordertotal').children("h4").text();
		var date = totaltext.split(" ");
		var total = parseInt(date[4]);
		orderjson['tax'] = total*taxpercent;
		if(paymentBool){
			orderjson['paytype'] = paymentType;
		}else{
			$("ul.result").append('<p style="color:red">Please choose payment before check!</p>');
			}
		orderjson['paystate'] = false;
		orderjson['commment'] = "test";
		orderjson['orderday_num'] = Object.keys(orderjson).length; 
		
		for(var i = 0; i < orderLists.length; i++){
			var name = "order_" + i;
			orderjson[name] = orderLists[i];
		}
		alert("create order json : " + Object.keys(orderjson));
    	 //array
		var jsonOrderInfo = JSON.stringify(orderjson);
		var jqxhr = $.post('test.php', jsonOrderInfo, function(jsonOrderInfo){
			 alert( "success" );
		})
		.done(function() {
		alert( "second success" );
		})
		.fail(function() {
		alert( "error" );
		})
		.always(function() {
		alert( "finished" );
		});
		
		var test = jQuery.parseJSON(jsonOrderInfo);
 	 	$( ".result" ).text("json is success build : " + test.order_1);
});
	// next step : counting final total
	
	
	// clear all plan button
	$("a.clear").click(function(){
		$("div.orderDetail").remove();
		$('div#ordertotal').children("h4").html("<h2>Order Total : <em>$0 </em> </h4>");
		orderdates.length = 0;
		orderLists.length = 0; 
	});
})


/*$("section").load(function() {
	$(this).css("background-image", 'url("../images/banner2.jpg")');
	alert("load Banner !");
});
*/

/*
$("#week_order").load(function(e) {
    	// Add current class to week order - FOR HEADER
	$("nav#nav > ul").children("li:nth-child(1)").removeClass("current");
	$("nav#nav > ul").children("li:nth-child(2)").addClass("current");
	
});
*/

// 这个需要实现，计算order ID - 没写完
function createOrderNum(givenDate, orderIndex){
	var orderID  = "";
	// orderID = year + month + date + hour + minus + second
	
}

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
	
	//var prtdate =  "<em>" + d_names[prt_day]  + "</em> " + m_names[prt_month] + " " + prt_date  + sup + " " + prt_year;
	var prtdate =  d_names[prt_day] + ", "+ m_names[prt_month] + " " + prt_date  + sup + " " + prt_year;
	
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
