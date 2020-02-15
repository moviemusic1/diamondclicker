// CREATED BY HTTPS://WWW.GITHUB.COM/MOVIEMUSIC1
var dianum = 0;
var factor = 1;
var diamondspan = document.querySelector('#diamondspan');
var factorspan = document.querySelector('#factorspan');
var btn1 = document.querySelector('#btn1');
var btn2 = document.querySelector('#btn2');
var btn3 = document.querySelector('#btn3');
var btn4 = document.querySelector('#btn4');
var btn5 = document.querySelector('#btn5');
var btn6 = document.querySelector('#btn6');
var btn7 = document.querySelector('#btn7');
var btn8 = document.querySelector('#btn8');
var btn9 = document.querySelector('#btn9');
var btn10 = document.querySelector('#btn10');
var btn11 = document.querySelector('#btn11');
var btn12 = document.querySelector('#btn12');
var workers = {
	one: {
		number: 0,
		price: 30,
		second: 1
	},
	two: {
		number: 0,
		price: 1000,
		second: 5
	},
	three: {
		number: 0,
		price: 20000,
		second: 5000
	},
	four: {
		number: 0,
		price: 1000000,
		second: 25000
	},
	five: {
		number: 0,
		price: 1500000000,
		second: 250000000
	},
	six: {
		number: 0,
		price: 1000000000000,
		second: 200000000000
	},
	seven: {
		number: 0,
		price: 5000000000000000,
		second: 50000000000000
	},
	eight: {
		number: 0,
		price: 20000000000000000000 /* Zwanzig Trillionen */,
		second: 8000000000000000
	},
	nine: {
		number: 0,
		price: 10000000000000000000000,
		second: 500000000000000000
	},
	ten: {
		number: 0,
		price: 500000000000000000000000000000,
		second: 100000000000000000000000000
	}
}

function refreshdiamonds() {
	diamondspan.innerHTML = dianum.toFixed(2);
	factorspan.innerHTML = factor.toFixed(2);
	btn1.value = "Get diamonds | " + factor;
	btn2.value = "Upgrade button | " + factor * factor;
	btn3.value = "Miner | " + workers['one'].number;
	btn4.value = "Upgraded miner | " + workers['two'].number;
	btn5.value = "Golden miner | " + workers['three'].number;
	btn6.value = "Magician | " + workers['four'].number;
	btn7.value = "Scientist | " + workers['five'].number;
	btn8.value = "Mining robot | " + workers['six'].number;
	btn9.value = "One of the best miners ever | " + workers['seven'].number;
	btn10.value = "Mining machine | " + workers['eight'].number;
	btn11.value = "Upgraded mining machine | " + workers['nine'].number;
	btn12.value = "Ultimate diamond maker | " + workers['ten'].number;
}

function buttondiamond() {
	dianum += factor;
	refreshdiamonds();
}

function upgradebutton() {
	if(dianum >= factor * factor) {
		dianum -= factor * factor;
		factor += 1;
	}
	refreshdiamonds();
}

function buy(num) {
	if(workers[num] == null) {
		alert("Error.");
	} else {
		if(dianum >= workers[num].price) {
			dianum -= workers[num].price;
			workers[num].number += 1;
			refreshdiamonds();
			higherprice(num);
		} else {
			alert("Not enough diamonds!");
		}
	}
}

function higherprice(num) {
	if(workers[num] == null) {
		alert("Error.");
	} else {
		workers[num].price = workers[num].price + workers[num].price * workers[num].number * 0.2;
		refreshprice();
	}
}

function refreshprice() {
	document.querySelector('#price1').innerHTML = workers['one'].price;
	document.querySelector('#price2').innerHTML = workers['two'].price;
	document.querySelector('#price3').innerHTML = workers['three'].price;
	document.querySelector('#price4').innerHTML = workers['four'].price;
	document.querySelector('#price5').innerHTML = workers['five'].price;
	document.querySelector('#price6').innerHTML = workers['six'].price;
	document.querySelector('#price7').innerHTML = workers['seven'].price;
	document.querySelector('#price8').innerHTML = workers['eight'].price;
	document.querySelector('#price9').innerHTML = workers['nine'].price;
	document.querySelector('#price10').innerHTML = workers['ten'].price;
}

function secondinterval() {
	var beginningdia = dianum;
	dianum += workers['one'].second*workers['one'].number;
	dianum += workers['two'].second*workers['two'].number;
	dianum += workers['three'].second*workers['three'].number;
	dianum += workers['four'].second*workers['four'].number;
	dianum += workers['five'].second*workers['five'].number;
	dianum += workers['six'].second*workers['six'].number;
	dianum += workers['seven'].second*workers['seven'].number;
	dianum += workers['eight'].second*workers['eight'].number;
	dianum += workers['nine'].second*workers['nine'].number;
	dianum += workers['ten'].second*workers['ten'].number;
	var enddia = dianum;
	document.querySelector('#diapersecspan').innerHTML = enddia - beginningdia;
	refreshdiamonds();
}

setInterval(function() {
	secondinterval();
}, 1000);

refreshprice();
