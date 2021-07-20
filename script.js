let dianum = 0,
	factor = 1,
	displayedUpgrade = 0,
	animating = false,
	diapersec = 0,
	manualdiasec = 0

let select = element => document.querySelector(element)

function largeUnits(r) {
	const units = ['k', ' Mio.', ' Bio.', ' Trio.', ' Quad.', ' Quin.', ' Sext.', ' Sept.', ' Octi.', ' Noni.', ' Deci.', ' Unde.', ' Duod.', ' Tred.', ' Quatt.', ' Quind.', ' Sex.', ' Sept.', ' Octo.', ' Novem.', ' Vigin.']
	r = Number(r)

	for(var i = 0; i < units.length; i++) {
		if(r >= Number("1" + "0".repeat(3 * (i + 1))) && r < Number("1" + "0".repeat(3 * (i + 2)))) {
			return (r / Number("1" + "0".repeat(3 * (i + 1)))).toFixed(1) + units[i]
		}
	}

	if(r < 1000) {
		return r
	}

	if(r >= Number("1" + "0".repeat(3 * (units.length + 1)))) {
		if(Number(r / Number("1" + "0".repeat(3 * (units.length)))).toFixed(1) >= 1000000) {
			if(r == 'Infinity') {
				return 'Infinite'
			} else {
				if(r.toString().includes('e+')) {
					return Number((r).toString().split('e+')[0]).toFixed(1) + 'e+' + (r).toString().split('e+')[1]
				} else {
					return r
				}
			}
		} else {
			return (r / Number("1" + "0".repeat(3 * (units.length)))).toFixed(1) + units[units.length - 1]
		}
	}
}

const diamondspan = select('#diamondspan'),
			diapersecspan = select('#diapersecspan'),
			upgradeName = select('.upgrade-name'),
			upgradePrice = select('.upgrade-price'),
			upgradeNumber = select('.upgrade-number'),
			upgradeSecond = select('.upgrade-second')

let upgrades = {
	number: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	price: [30, 1e+3, 2e+4, 1e+6, 1e+7, 1e+9, 5e+11, 2e+13, 1e+17, 5e+24],
	second: [2, 60, 5e+2, 25e+3, 25e+4, 2e+8, 5e+9, 8e+11, 5e+13, 1e+22]
}

function refreshdiamonds() {
	diamondspan.innerHTML = largeUnits(Number(dianum.toFixed()))
}

function buttondiamond() {
	dianum += factor
	manualdiasec++
	refreshdiamonds()
}

diamondspan.addEventListener('click', buttondiamond)

function buy() {
	if(upgrades.price.length < displayedUpgrade + 1) {
		alert('Error when trying to buy item \'' + (displayedUpgrade + 1) + '\'!')
	} else {
		if(dianum >= upgrades.price[displayedUpgrade]) {
			dianum -= upgrades.price[displayedUpgrade]
			upgrades.number[displayedUpgrade] += 1
			refreshdiamonds()
			higherprice(displayedUpgrade)
			select('.upgradeplus').classList.add('pressed_plus')
			setTimeout(() => { select('.upgradeplus').classList.remove('pressed_plus') }, 300)
		} else {
			alert("Not enough diamonds!")
		}
	}
}

function higherprice(num) {
	if(upgrades.price.length < num + 1) {
		alert('Error when trying to change the price of item \'' + (num + 1) + '\'!')
	} else {
		upgrades.price[num] = Number((upgrades.price[num] + upgrades.price[num] * upgrades.number[num] * 0.05).toFixed())
		refreshprice()
	}
}

function refreshprice() {
	upgradeNumber.innerHTML = largeUnits(upgrades.number[displayedUpgrade])
	upgradePrice.innerHTML = largeUnits(upgrades.price[displayedUpgrade])
}

function refreshtimeuntil() {
	goal = 0
	already = false
	for(let i = 0; i < upgrades.number.length; i++) {
		if(!already && upgrades.number[i] == 0 && upgrades.price[i] > dianum) {
			already = i
			goal = upgrades.price[i]
		}
	}

	timenum = (goal - dianum) / diapersec
	let timename = 'seconds'
	if(timenum >= 60 && timenum < 3600) {
		timenum = timenum / 60
		timename = 'minutes'
	} else if(timenum >= 3600 && timenum < 86400) {
		timenum = timenum / 3600
		timename = 'hours'
	} else if(timenum >= 86400) {
		timenum = timenum / 86400
		timename = 'days'
	}
	if(Math.floor(timenum) == 1) {
		timename = timename.slice(0, -1)
	}
	timenum = Math.floor(timenum)
	if(!already && upgrades.number[upgrades.number.length - 1] != 0 || !already && upgrades.price[upgrades.price.length - 1] <= dianum) {
		times = 'Reaching even more diamonds every second'
	} else if(goal != 0 && timenum != Infinity) {
		times = 'Reaching ' + largeUnits(goal) + ' diamond' + ((goal != 1) ? 's' : '') + ' in ' + largeUnits(timenum) + ' ' + timename
	} else if(goal != 0 && timenum == Infinity && upgrades.price[0] > dianum) {
		times = 'Get diamonds by pressing the big \'' + dianum + '\' below'
	} else if(goal != 0 && timenum == Infinity && upgrades.price[0] <= dianum) {
		times = 'Buy your first upgrade to automate the process'
	}
	document.querySelector('#timeuntildia').innerHTML = times
}

function secondinterval() {
	if(dianum > 1.7976931e+308) {
		dianum = 1.7976931e+308
	}

	diapersec = 0
	for(let i = 0; i < 10; i++) {
		dianum += (upgrades.second[i] * upgrades.number[i]) / 10
		diapersec += upgrades.second[i] * upgrades.number[i]
	}
	diapersecspan.innerText = largeUnits(diapersec + manualdiasec)
	if(diapersec + manualdiasec == 1) {
		document.querySelector('#diapersec_s').innerText = ''
	} else {
		document.querySelector('#diapersec_s').innerText = 's'
	}
	refreshdiamonds()
	refreshtimeuntil()
}

function initUpgrades() {
	if(displayedUpgrade !== null) {
		upgradeName.innerText = 'upgrade ' + (displayedUpgrade + 1)
		upgradeNumber.innerText = upgrades.number[displayedUpgrade]
		upgradePrice.innerHTML = largeUnits(upgrades.price[displayedUpgrade])
		upgradeSecond.innerHTML = largeUnits(upgrades.second[displayedUpgrade])
	}
}

function changeViewed(mode) {
	if(mode && displayedUpgrade > 0 && animating == false) {
		displayedUpgrade -= 1
		animating = true
		upgradeName.style.animation = "middleToBottom 0.1s linear"
		upgradePrice.style.animation = "middleToBottom 0.1s linear"
		upgradeSecond.style.animation = "middleToBottom 0.1s linear"
		setTimeout(() => {
			upgradeName.style.animation = "topToMiddle 0.1s linear"
			upgradePrice.style.animation = "topToMiddle 0.1s linear"
			upgradeSecond.style.animation = "topToMiddle 0.1s linear"
			upgradeName.innerText = 'upgrade ' + (displayedUpgrade + 1)
			upgradeNumber.innerText = upgrades.number[displayedUpgrade]
			upgradePrice.innerHTML = largeUnits(upgrades.price[displayedUpgrade])
			upgradeSecond.innerHTML = largeUnits(upgrades.second[displayedUpgrade])
			setTimeout(() => { animating = false }, 100)
		}, 100)
	} else if(!mode && displayedUpgrade < upgrades.price.length - 1 && !animating) {
		displayedUpgrade += 1
		animating = true
		upgradeName.style.animation = "middleToTop 0.1s linear"
		upgradePrice.style.animation = "middleToTop 0.1s linear"
		upgradeSecond.style.animation = "middleToTop 0.1s linear"
		setTimeout(() => {
			upgradeName.style.animation = "bottomToMiddle 0.1s linear"
			upgradePrice.style.animation = "bottomToMiddle 0.1s linear"
			upgradeSecond.style.animation = "bottomToMiddle 0.1s linear"
			upgradeName.innerText = 'upgrade ' + (displayedUpgrade + 1)
			upgradeNumber.innerText = upgrades.number[displayedUpgrade]
			upgradePrice.innerHTML = largeUnits(upgrades.price[displayedUpgrade])
			upgradeSecond.innerHTML = largeUnits(upgrades.second[displayedUpgrade])
			setTimeout(() => { animating = false }, 100)
		}, 100)
	}
}

function keyListener(e) {
	switch(e.keyCode) {
		case 38:
			changeViewed(true)
			break
		case 40:
			changeViewed(false)
			break
	}
}

setInterval(secondinterval, 100)

setInterval(() => {
	manualdiasec = 0
}, 1000)

refreshprice()
initUpgrades()

select('.upgradeplus').addEventListener('click', () => { buy() })
select('.upgradeup').addEventListener('click', () => { changeViewed(true) })
select('.upgradedown').addEventListener('click', () => { changeViewed(false) })
document.addEventListener('keyup', keyListener)
