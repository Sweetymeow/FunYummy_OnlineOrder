// JavaScript Document
var orderArray = new Array(); // Home Page - temp keep order info

// Week Order Page
var d_names = new Array("Sunday", "Monday", "Tuesday",
"Wednesday", "Thursday", "Friday", "Saturday");
var d_menus = new Array("Mon Meal", "Tues Meal",
"Wed Meal", "Thur Meal", "Fri Meal");

var d = new Date();
var orderdays = new Array(5); // to save next 5 deliverable day
var inputDate = new Date();
var next_dvl_date;

var jsonWeekOrder = new Object(); // use to save JSON data


// 
$(function(){
	/*$("form").submit(function(e){
		var $year = $('input[name="year"]').val();
		var $month = $('input[name="month"]').val();
		var $date = $('input[name="date"]').val();
		var input_day = new Date($year, $month-1, $date);
		inputDate.setDate($date+1);
		
		inputDate = input_day;
		var nextdvlday = nextDeliveryDay(inputDate);
		$('p.inputDate').text(inputDate);
		$('p.inputDate').append(', inputDate is : '+inputDate.getDate());
		$('p#next-dvl-day').text(d_names[nextDeliveryDay(d)]);
		$('p#next-dvl-inputDate').text(d_names[nextdvlday]);
		//nextDlvWeek();
  });
  */
  
})




// Weekly Schedule page
$(function(){
	var next_dvl_day = nextDeliveryDay(d);
	
	// start day selected button
	$('a.bgnday:nth-child(1)').on('click', function(){
		console.log("Next Delivery Day is: ");
		
	});
	$('a.bgnday:nth-child(2)').on('click', function(){
		console.log("find next Monday");	
	});
})	

function showDate(){
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
	curr_month_name = m_names[curr_month];
	return curr_month_name;
	
}

function nextDeliveryDay(givenDate){ 
// Calculate the next deliverable day for Week Or Rush Order 
	var next_dvl_day; // day of week

	if(curr_day == 0){ // today is sunday
		next_dvl_day = givenDate.getDay() + 1;
	}else if (curr_day == 6){
		next_dvl_day = givenDate.getDay() - 5;
	}else{
		next_dvl_day = givenDate.getDay();
	}
	document.getElementById('next-dvl-day').textContent = d_names[next_dvl_day];
	
	return  next_dvl_day; // day of week, 0-6
}

// fill the orderDate Array with 5 day;
function nextDlvWeek(inputDate){
	var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
	
	var beginDate = inputDate;
	
	// if the beginDate is Monday, every day in this week is work day
	if(IsMonday(beginDate)){ 
		console.log(inputDate + " : is Monday");	
		for(var i = 0; i< orderdays.length ; i++){
			 var orderDate = new myDate(
				'd_names[beginDate.getDay()]',
				beginDate.getDate(), 
				'm_names[beginDate.getMonth()]', 
				beginDate.getFullYear());
	
			 orderdays[i] = orderDate;
			 
			 // Update the beginDate
			 var nextdate = beginDate.getDate()+1;
			 beginDate.setDate(nextdate); 
			 
		}// cycle arraylength times to fill orderdays array;
	}else if(IsWeekend(beginDate) == 1 || IsWeekend(beginDate) == 2){
		 // if the beginDate is Sun or Sat
		var nextdate = beginDate.getDate() + IsWeekend(beginDate);
		beginDate.setDate(nextdate);
		console.log("Update weekend to " + beginDate + " : is Monday");
		
		for(var i = 0; i< orderdays.length ; i++){
			 var orderDate = new myDate(
				'd_names[beginDate.getDay()]',
				beginDate.getDate(), 
				'm_names[beginDate.getMonth()]', 
				beginDate.getFullYear());
	
			 orderdays[i] = orderDate;
			
			// Update the beginDate
			var nextdate = beginDate.getDate()+1;
			beginDate.setDate(nextdate); 
		}			
	}else{ // begin day is a week day but isn't Monday
		for(var i = 0; i< orderdays.length ; i++){
			var orderDate = new myDate(
				'd_names[beginDate.getDay()]',
				beginDate.getDate(), 
				'm_names[beginDate.getMonth()]', 
				beginDate.getFullYear());
	
			 orderdays[i] = orderDate;
			 
			var nextdate = beginDate.getDate()+ 1;
			beginDate.setDate(nextdate);
			console.log("Update week day to " + beginDate);
			if(IsWeekend(beginDate) == 2){
				var nextdate = beginDate.getDate() + IsWeekend(beginDate);	
				beginDate.setDate(nextdate);
			}
		}
	} // begin from Thuesday
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
			case 0: 
			case 2: 
			case 4: 
			case 6: 
			case 7: 
			case 9: 
			case 11:
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

$(function(){
	var ist = $.cookie('IST');
	var $orderdiv = $('#tr-template').html();
	$('section#orderSum').append($orderdiv);
	
	$('section#orderSum').append('<div><p> This is test of cookie: ' + ist + '</p></div>');
	if(orderArray.length>0){
	$('section#orderSum').append('<div><p> This is test of array: ' + orderArray[1].bldg + '</p></div>');
	}
	$('section#orderSum').append('<div><p> || This is test of localStorage: ' + localStorage.getItem("IST") + '</p></div>');
})


$(function() {
    if (window.matchMedia('(max-width: 767px)').matches) {
         // do functionality on screens smaller than 768px
		 $('img.imagebtn').attr('src', 'images/pic01_mini.jpg');
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
