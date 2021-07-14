let dianum = 0,
	factor = 1,
	displayedUpgrade = 0,
	animating = false;

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

let workers = {
	one: 	{ number: 0, price: 30, 			second: 10, 				name: 'Miner' },
	two: 	{ number: 0, price: 1000, 			second: 250, 				name: 'Upgraded miner' },
	three: 	{ number: 0, price: 20000, 			second: 5000, 				name: 'Golden miner' },
	four: 	{ number: 0, price: 1000000, 			second: 25000, 				name: 'Magician' },
	five: 	{ number: 0, price: 10000000, 			second: 250000, 			name: 'Scientist' },
	six: 	{ number: 0, price: 1000000000,			second: 200000000, 			name: 'Mining robot' },
	seven: 	{ number: 0, price: 500000000000, 		second: 5000000000, 			name: 'Expert miner group' },
	eight: 	{ number: 0, price: 20000000000000, 		second: 800000000000, 			name: 'Mining machine' },
	nine: 	{ number: 0, price: 100000000000000000, 	second: 50000000000000, 		name: 'Upgraded mining machine' },
	ten: 	{ number: 0, price: 5000000000000000000000000, 	second: 10000000000000000000000, 	name: 'Ultimate diamond maker' }
};

function refreshdiamonds() {
	diamondspan.innerHTML = largeUnits(Number(dianum.toFixed()));
};

function buttondiamond() {
	dianum += factor;
	refreshdiamonds();
};

diamondspan.addEventListener('click', buttondiamond);

function buy() {
	if(workers[written_nums[displayedUpgrade]] == null) {
		console.log(workers[written_nums[displayedUpgrade]]);
	} else {
		if(dianum >= workers[written_nums[displayedUpgrade]].price) {
			dianum -= workers[written_nums[displayedUpgrade]].price;
			workers[written_nums[displayedUpgrade]].number += 1;
			refreshdiamonds();
			higherprice(written_nums[displayedUpgrade]);
			select('.upgradeplus').classList.add('pressed_plus');
			setTimeout(() => { select('.upgradeplus').classList.remove('pressed_plus'); }, 300);
		} else {
			alert("Not enough diamonds!");
		}
	}
};

function higherprice(num) {
	if(workers[num] == null) {
		alert("Error.");
	} else {
		workers[num].price = Number((workers[num].price + workers[num].price * workers[num].number * 0.2).toFixed());
		refreshprice();
	}
};

function refreshprice() {
	upgradeNumber.innerHTML = largeUnits(workers[written_nums[displayedUpgrade]].number);
	upgradePrice.innerHTML = largeUnits(workers[written_nums[displayedUpgrade]].price);
};

function secondinterval() {
	if(dianum > 1.7976931e+308) {
		dianum = 1.7976931e+308;
	}

	let diapersec = 0;
	for(let i = 0; i < 10; i++) {
		dianum += (workers[written_nums[i]].second * workers[written_nums[i]].number) / 10;
		diapersec += workers[written_nums[i]].second * workers[written_nums[i]].number;
	}
	diapersecspan.innerHTML = largeUnits(diapersec);
	refreshdiamonds();
};

function initUpgrades() {
	if(displayedUpgrade !== null) {
		upgradeName.innerText = workers[written_nums[displayedUpgrade]].name;
		upgradeNumber.innerText = workers[written_nums[displayedUpgrade]].number;
		upgradePrice.innerHTML = largeUnits(workers[written_nums[displayedUpgrade]].price);
	}
}

function changeUpgrade(mode) {
	if(mode && displayedUpgrade > 0 && animating == false) {
		displayedUpgrade -= 1;
		animating = true;
		upgradeName.style.animation = "middleToBottom 0.1s linear";
		upgradePrice.style.animation = "middleToBottom 0.1s linear";
		setTimeout(() => {
			upgradeName.style.animation = "topToMiddle 0.1s linear";
			upgradePrice.style.animation = "topToMiddle 0.1s linear";
			upgradeName.innerText = workers[written_nums[displayedUpgrade]].name;
			upgradeNumber.innerText = workers[written_nums[displayedUpgrade]].number;
			upgradePrice.innerHTML = largeUnits(workers[written_nums[displayedUpgrade]].price);
			setTimeout(() => { animating = false; }, 100);
		}, 100);
	} else if(!mode && displayedUpgrade < Object.keys(workers).length - 1 && animating == false) {
		displayedUpgrade += 1;
		animating = true;
		upgradeName.style.animation = "middleToTop 0.1s linear";
		upgradePrice.style.animation = "middleToTop 0.1s linear";
		setTimeout(() => {
			upgradeName.style.animation = "bottomToMiddle 0.1s linear";
			upgradePrice.style.animation = "bottomToMiddle 0.1s linear";
			upgradeName.innerText = workers[written_nums[displayedUpgrade]].name;
			upgradeNumber.innerText = workers[written_nums[displayedUpgrade]].number;
			upgradePrice.innerHTML = largeUnits(workers[written_nums[displayedUpgrade]].price);
			setTimeout(() => { animating = false; }, 100);
		}, 100);
	}
};

function keyListener(e) {
	switch(e.keyCode) {
		case 38:
			changeUpgrade(true);
			break;
		case 40:
			changeUpgrade(false);
			break;
	}
}

setInterval(function() {
	secondinterval();
}, 100);

refreshprice();
initUpgrades();

select('.upgradeplus').addEventListener('click', () => { buy() });
select('.upgradeup').addEventListener('click', () => { changeUpgrade(true) });
select('.upgradedown').addEventListener('click', () => { changeUpgrade(false) });
document.addEventListener('keyup', keyListener);
