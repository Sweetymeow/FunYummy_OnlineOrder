// JavaScript Document
var selectBldg;
var orderArray = new Array();
var index = 0;

function getBldgName(bldgName){
	var mealNumber = document.getElementById('meal_num');
	var msg = "";
//	selectBldg = bldgName;
		
		if(orderArray.length <= 0){
		orderArray[index] = new orderList(bldgName, 1);
		index++;
	}else{
		for(var i =0; i < orderArray.length; i++){
			if(orderArray[i].bldg === bldgName){
				orderArray[i].number += 1;
				}
			else{
				orderArray[index] = new orderList(bldgName, 1);
				index++;
				}
			}
		}
	
	
	for(var j = 0; j < orderArray.length; j++){
		msg += '<h4><em>'+ orderArray[j].number +' to ' + orderArray[j].bldg +'</em></h4>';
	}
	mealNumber.innerHTML = msg;
}

