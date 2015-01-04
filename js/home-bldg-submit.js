// JavaScript Document
var orderArray = new Array();

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
			$.cookie(bldgName, '1', { expires: 7, path: '/' });
			localStorage.setItem(bldgName, 1);
			
		}else if(orderArray.length > 0){
			var new_meal = false;
			
			for(var i = 0; i < orderArray.length; i++){
				if(orderArray[i].bldg === bldgName && !new_meal){
					orderArray[i].number++;
					var divname = "div#" + bldgName;
					$(divname).text(orderArray[i].number + ' meals to ' + bldgName +' Building ');
					new_meal = true;
					$.removeCookie(bldgName, { path: '/' });
					$.cookie(bldgName, orderArray[i].number, { expires: 7, path: '/' });
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
				$.cookie(bldgName, '1', { expires: 7, path: '/' });
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
}
)

$(function(){
	
	$('a#rushBtn').on('click', function(){
		var i;
		for(var i = 0; i < orderArray.length; i++){
			$.cookie(orderArray[i].bldg, orderArray[i].number);
		}
		} );
	
	}
)


function orderList(bldg, number){
	this.bldg = bldg;
	this.number = number;
	}
	
function showDate(){
　	var d_names = new Array("Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday");
    
    var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    
    var d = new Date();
	var curr_day = d.getDay();
    var curr_date = d.getDate();
    var sup = "";
    if (curr_date == 1 || curr_date == 21 || curr_date ==31){sup = "st";}
    else if (curr_date == 2 || curr_date == 22){sup = "nd";}
    else if (curr_date == 3 || curr_date == 23){sup = "rd";}
    else{sup = "th";}
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
	document.getElementById("today").innerHTML = "<p> Today is : <em>" + d_names[curr_day] + "</em> , " + curr_date + sup + " "+ m_names[curr_month] + " " + curr_year + "</p>";
	
}

function nextdlvdate(){
	var d_names = new Array("Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday");
	
	var d = new Date();
    var curr_day = d.getDay();
	var next_dvl_day = new Date();
	
	if(curr_day == 0){
		next_dvl_day = d.getDay() + 1;
	}else if (curr_day == 6){
		next_dvl_day = d.getDay() - 5;
	}else{
		next_dvl_day = d.getDay();
	}
	
	document.getElementById('next-dvl-date').textContent = d_names[next_dvl_day];
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
	
	
}

)