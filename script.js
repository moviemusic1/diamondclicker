let dianum = 0,
	factor = 1,
	displayedUpgrade = 0,
	animating = false,
	diapersec = 0;

let select = element => document.querySelector(element);

function add_at_n(str, n) {
	var a = [];
	var len, i;

	for(i = 0, len = str.length; i < len; i += n) {
		a.push(str.substr(i, n));
	}

	return a;
};

function largeUnits(r) {
	const units = ['k', ' Mio.', ' Bio.', ' Trio.', ' Quad.', ' Quin.', ' Sext.', ' Sept.', ' Octi.', ' Noni.', ' Deci.', ' Unde.', ' Duod.', ' Tred.', ' Quatt.', ' Quind.', ' Sex.', ' Sept.', ' Octo.', ' Novem.', ' Vigin.'];
	r = Number(r);

	for(var i = 0; i < units.length; i++) {
		if(r >= Number("1" + "0".repeat(3 * (i + 1))) && r < Number("1" + "0".repeat(3 * (i + 2)))) {
			return (r / Number("1" + "0".repeat(3 * (i + 1)))).toFixed(1) + units[i];
		}
	}

	if(r < 1000) {
		return r;
	}

	if(r >= Number("1" + "0".repeat(3 * (units.length + 1)))) {
		if(Number(r / Number("1" + "0".repeat(3 * (units.length)))).toFixed(1) >= 1000000) {
			if(r == 'Infinity') {
				return 'Infinite';
			} else {
				if(r.toString().includes('e+')) {
					return Number((r).toString().split('e+')[0]).toFixed(1) + 'e+' + (r).toString().split('e+')[1];
				} else {
					return r;
				}
			}
		} else {
			return (r / Number("1" + "0".repeat(3 * (units.length)))).toFixed(1) + units[units.length - 1];
		}
	}
};

const diamondspan = select('#diamondspan');
const diapersecspan = select('#diapersecspan');
const upgradeName = select('.upgrade-name');
const upgradePrice = select('.upgrade-price');
const upgradeNumber = select('.upgrade-number');

let btn_default_values = ['Get diamonds', 'Upgrade button', 'Miner', 'Upgraded miner', 'Golden miner', 'Magician', 'Scientist', 'Mining robot', 'Expert miner group', 'Mining machine', 'Upgraded mining machine', 'Ultimate diamond maker'],
		written_nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

let upgrades = {
	number: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	price: [30, 1e+3, 2e+4, 1e+6, 1e+7, 1e+9, 5e+11, 2e+13, 1e+17, 5e+24],
	second: [10, 250, 5e+3, 25e+3, 25e+4, 2e+8, 5e+9, 8e+11, 5e+13, 1e+22]
}

function refreshdiamonds() {
	diamondspan.innerHTML = largeUnits(Number(dianum.toFixed()));
};

function buttondiamond() {
	dianum += factor;
	refreshdiamonds();
};

diamondspan.addEventListener('click', buttondiamond);

function buy() {
	if(upgrades.price.length < displayedUpgrade + 1) {
		alert('Error when trying to buy item \'' + (displayedUpgrade + 1) + '\'!');
	} else {
		if(dianum >= upgrades.price[displayedUpgrade]) {
			dianum -= upgrades.price[displayedUpgrade];
			upgrades.number[displayedUpgrade] += 1;
			refreshdiamonds();
			higherprice(displayedUpgrade);
			select('.upgradeplus').classList.add('pressed_plus');
			setTimeout(() => { select('.upgradeplus').classList.remove('pressed_plus'); }, 300);
		} else {
			alert("Not enough diamonds!");
		}
	}
};

function higherprice(num) {
	if(upgrades.price.length < num + 1) {
		alert('Error when trying to change the price of item \'' + (num + 1) + '\'!');
	} else {
		upgrades.price[num] = Number((upgrades.price[num] + upgrades.price[num] * upgrades.number[num] * 0.2).toFixed());
		refreshprice();
	}
};

function refreshprice() {
	upgradeNumber.innerHTML = largeUnits(upgrades.number[displayedUpgrade]);
	upgradePrice.innerHTML = largeUnits(upgrades.price[displayedUpgrade]);
};

function refreshtimeuntil() {
	goal = 0;
	already = false;
	for(let i = 0; i < upgrades.number.length; i++) {
		if(!already && upgrades.number[i] == 0 && upgrades.price[i] > dianum) {
			already = i;
			goal = upgrades.price[i];
		}
	}

	sec = largeUnits(Math.floor((goal - dianum) / diapersec));
	if(goal != 0 && sec != 'Infinite') {
		times = 'reaching ' + largeUnits(goal) + ' diamonds in ' + largeUnits(Math.floor((goal - dianum) / diapersec)) + ' seconds';
	} else if(goal != 0 && sec == 'Infinite') {
		times = 'get diamonds by pressing the big \'0\' below'
	}
	document.querySelector('#timeuntildia').innerHTML = times;
};

function secondinterval() {
	if(dianum > 1.7976931e+308) {
		dianum = 1.7976931e+308;
	}

	diapersec = 0;
	for(let i = 0; i < 10; i++) {
		dianum += (upgrades.second[i] * upgrades.number[i]) / 10;
		diapersec += upgrades.second[i] * upgrades.number[i];
	}
	diapersecspan.innerHTML = largeUnits(diapersec);
	refreshdiamonds();
	refreshtimeuntil();
};

function initUpgrades() {
	if(displayedUpgrade !== null) {
		upgradeName.innerText = 'upgrade ' + (displayedUpgrade + 1);
		upgradeNumber.innerText = upgrades.number[displayedUpgrade];
		upgradePrice.innerHTML = largeUnits(upgrades.price[displayedUpgrade]);
	}
}

function changeViewed(mode) {
	if(mode && displayedUpgrade > 0 && animating == false) {
		displayedUpgrade -= 1;
		animating = true;
		upgradeName.style.animation = "middleToBottom 0.1s linear";
		upgradePrice.style.animation = "middleToBottom 0.1s linear";
		setTimeout(() => {
			upgradeName.style.animation = "topToMiddle 0.1s linear";
			upgradePrice.style.animation = "topToMiddle 0.1s linear";
			upgradeName.innerText = 'upgrade ' + (displayedUpgrade + 1);
			upgradeNumber.innerText = upgrades.number[displayedUpgrade];
			upgradePrice.innerHTML = largeUnits(upgrades.price[displayedUpgrade]);
			setTimeout(() => { animating = false; }, 100);
		}, 100);
	} else if(!mode && displayedUpgrade < upgrades.price.length - 1 && !animating) {
		displayedUpgrade += 1;
		animating = true;
		upgradeName.style.animation = "middleToTop 0.1s linear";
		upgradePrice.style.animation = "middleToTop 0.1s linear";
		setTimeout(() => {
			upgradeName.style.animation = "bottomToMiddle 0.1s linear";
			upgradePrice.style.animation = "bottomToMiddle 0.1s linear";
			upgradeName.innerText = 'upgrade ' + (displayedUpgrade + 1);
			upgradeNumber.innerText = upgrades.number[displayedUpgrade];
			upgradePrice.innerHTML = largeUnits(upgrades.price[displayedUpgrade]);
			setTimeout(() => { animating = false; }, 100);
		}, 100);
	}
};

function keyListener(e) {
	switch(e.keyCode) {
		case 38:
			changeViewed(true);
			break;
		case 40:
			changeViewed(false);
			break;
	}
}

setInterval(function() {
	secondinterval();
}, 100);

refreshprice();
initUpgrades();

select('.upgradeplus').addEventListener('click', () => { buy() });
select('.upgradeup').addEventListener('click', () => { changeViewed(true) });
select('.upgradedown').addEventListener('click', () => { changeViewed(false) });
document.addEventListener('keyup', keyListener);
