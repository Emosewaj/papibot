// Math stuff
// I know using eval is a stupid thing to do, but I should've blocked most, if not all dangerous keywords so fuck off

exports.calc = function(array) {
	let string = array.join(" ");
	if (string.includes("discord") || string.includes("process") || string.includes("require") || string.includes("self")) {return ("You've entered a forbidden keyword!");}
	
	let abs = Math.abs.bind(Math);
	let acos = Math.acos.bind(Math);
	let acosh = Math.acosh.bind(Math);
	let asin = Math.asin.bind(Math);
	let asinh = Math.asinh.bind(Math);
	let atan = Math.atan.bind(Math);
	let atanh = Math.atanh.bind(Math);
	let atan2 = Math.atan2.bind(Math);
	let cbrt = Math.cbrt.bind(Math);
	let ceil = Math.ceil.bind(Math);
	let clz32 = Math.clz32.bind(Math);
	let cos = Math.cos.bind(Math);
	let cosh = Math.cosh.bind(Math);
	let exp = Math.exp.bind(Math);
	let expm1 = Math.expm1.bind(Math);
	let floor = Math.floor.bind(Math);
	let fround = Math.fround.bind(Math);
	let hypot = Math.fround.bind(Math);
	let imul = Math.imul.bind(Math);
	let log = Math.log.bind(Math);
	let log1p = Math.log1p.bind(Math);
	let log10 = Math.log10.bind(Math);
	let log2 = Math.log2.bind(Math);
	let max = Math.max.bind(Math);
	let min = Math.min.bind(Math);
	let pow = Math.pow.bind(Math);
	let random = Math.random.bind(Math);
	let round = Math.round.bind(Math);
	let sign = Math.sign.bind(Math);
	let sin = Math.sin.bind(Math);
	let sinh = Math.sinh.bind(Math);
	let sqrt = Math.sqrt.bind(Math);
	let tan = Math.tan.bind(Math);
	let tanh = Math.tanh.bind(Math);
	let trunc = Math.trunc.bind(Math);
	
	array = array.join(" ").split("");
	let length = array.length
	for (i = 0;i < length;i++) {
		if(array[i] == " "){
			array.splice(i,1);
		}
	}
	try {
		var result = eval(array.join(""));
	} catch (e) {
		console.log(e);
	}
	if (typeof result == "number") {
		return (array.join("")+" = "+result);
	} else {
		return ("I couldn't get a numerical result from that!");
	}
}

exports.randomNo = function(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

exports.round = function(value, decimals) {
	let number = Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	if (isNaN(number)) {return 0;} else {return number;}
}

exports.die = function(sides) {
	if (!parseInt(sides)) sides = 6;
	let thrw = Math.floor(Math.random()*((parseInt(sides))-1+1)+1);
	return (`You roll a ${sides}-sided die, it shows a ${thrw}!`);
}
