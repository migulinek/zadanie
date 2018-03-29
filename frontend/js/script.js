// document.getElementById('myForm').addEventListener('submit', sendNumber);
let ul = document.getElementById('logs');

let min = document.getElementById('min');
let max = document.getElementById('max');

var guessInteger = setInterval(function(){

	let xhr = new XMLHttpRequest();

	xhr.open('POST', 'http://127.0.0.1:8081', true);

	let minVal = parseInt(min.innerText);
	let maxVal = parseInt(max.innerText);
	let params = 'num=' + nextNumberToTry(minVal, maxVal);

	xhr.onload = function(){
		let res = xhr.responseText;
		ul.insertAdjacentHTML('afterbegin', '<li>' + res + '</li>');
		if (JSON.parse(res).msg === 'ok') clearInterval(guessInteger);
		if (JSON.parse(res).msg === 'toosmall'){
			min.innerText = (JSON.parse(res).send + 1);
		}
		if (JSON.parse(res).msg === 'toobig'){
			max.innerText = (JSON.parse(res).send - 1);

		}

	};

	xhr.send(params);

}, 500);

function nextNumberToTry(minVal, maxVal){
	return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}
