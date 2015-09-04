var numdump = [];

function sumDigits(num, rec) {
	if(typeof(rec)==='undefined') {
		rec = false;
	}
	var str = num.toString();
		var sum = 0;
	for (var i = 0; i < str.length; i++) {
		sum += parseInt(str.charAt(i), 10);
	}
	if(rec) {
		if(sum > 9) sum = sumDigits(sum);
	}
		return sum;
}

function implode(glue, pieces) {  
	return ( ( pieces instanceof Array ) ? pieces.join ( glue ) : pieces );  
}  

function dumpDigits(num) {
	numdump.push.apply(numdump, num.toString().split(''));
}

function calculate(input) {
	if(typeof input === "string") {
		input = new Date(input)
	}
	if(input instanceof Date && input.toString() !== "Invalid Date") {
		input = {
			day: input.getDate(),
			month: input.getMonth()+1,
			year: input.getFullYear()
		}
	}
	if(typeof input !== "object" || isNaN(input.day) || isNaN(input.month) || isNaN(input.year)) {
		return {error: true}
	}
	numdump = [];
	dumpDigits(input.day); dumpDigits(input.month); dumpDigits(input.year);
	var rawsum = sumDigits(implode('',numdump), false);
	dumpDigits(rawsum);
	dumpDigits(sumDigits(rawsum, true));
	var doublefirst = parseInt(numdump[0]) ? numdump[0]*2 : numdump[1]*2;
	var rawdiff = rawsum - doublefirst;
	dumpDigits(rawdiff);
	dumpDigits(sumDigits(rawdiff));

	kvadrat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	for (var i = 0; i < numdump.length; i++) {
		if(numdump[i] > 0) kvadrat[numdump[i]]++;
	}
	
	var det = kvadrat[4] + kvadrat[5] + kvadrat[6];

	var day = "white";

	if(det == 3) day = "blue";
	if(det == 4) day = "yellow";
	if(det == 5) day = "red";
	if(det >= 6) day = "black";

	var output = {
		color: day,
		matrix: kvadrat,
		error: false
	}

	return output;
}

module.exports = calculate;