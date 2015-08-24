var today = new Date();

var numdump = [];

var colors = new Object();
colors['white'] = {
	day: 'Белый',
	title: 'Белодневка',
	description: 'Вы родились в белый день.<br>Вы считаетесь быдлом в клубе аноним.'
};
colors['blue'] = {
	day: 'Синий',
	title: 'Синедневка',
	description: 'Вы родились в голубой день.<br>Если вы родились в данный день, то вы не считаетесь быдлом. Но это нижний порог.'
};
colors['yellow'] = {
	day: 'Желтый',
	title: 'Желтодневка',
	description: 'Вы родились в желтый день.<br>Вам повезло.'
};
colors['red'] = {
	day: 'Красный',
	title: 'Краснодневка',
	description: 'Вы родились в красный день.<br>Вам ультрахардкорповезло! Бинго!! три семёрки и золотой дождь вы можете получить в ближайшем борделе!'
};
colors['black'] = {
	day: 'Черный',
	title: 'Чернодневка',
	description: 'Вы родились в черный день.<br>Природа черноднвок неизвестна и они по сути очень редко встречаются в природе.'
};

var ddesc = ["", //0 (leave blank)
"много единиц - человек любит соревноваться, активно учавствует в конкурсах, соревнованиях, человек часто хвастается тем, что он пришёл первым, тупо надрочил или тем, какая у него нереальная сила воли, и он выдержал благодаря своей силе воли огромное количество неприятностей.", //1
"много двоек - человек любит беседовать, причём в беседах выражает свою позицию, выставляется напоказ. Вполне возможно, что человек может реально посочувствовать и помочь другим людям.", //2
" много троек - человек любит исследовать что-либо, неважно что, изучает функции. Возможно, придумывает удобные вещи, облегчающие работу с предметами, при этом часто свои исследования он закрепляет своим авторством, пример - круги Буссинеска.", //3
" много четвёрок - много работает для достижения своей цели, при этом для достижения безопасности своей работы сам не замечает, что он создал нечто интересное и концептуальное. ", //4
" много пятёрок - самый интересный случай. Человек много работает, причём взаимодействуя с окружающим миром, много работает, объясняет как он работает, каким образом он работает, часто приводя в экстаз как себя, так и окружающих - и вот, работа закончена, а хочется поработать ещё.", //5
" много шестёрок - много работает для поддержания стабильности, исследует все фичи дела в работе", //6
"много семёрок - человек с использованием технологий создаёт нечто невообразимое. Творчество может иметь форму, которая кажется, достигнута при невероятной удаче - это активное использование кривых безье в создании, ярко наблюдается в автомобилестроении, самолётостроении и других вещах, где имеются сложные формы, которые трудно воссоздать без знания. ", //7
"много восьмёрок - человек может заботиться о других, человек доверяет другим. То есть - не нагло хапает, как животное, а отдаёт долги, а если долгов нет - проявляет заботу об окружающих, встаёт на их место.", //8
"девятки - давят на память. Человек с большим числом девяток творит, используя и совмещая, запомнившиеся ему образы."] //9

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

function fillmatrix(sel, arr) {
	var mid = sel + ' #';
	for(var i = 1; i <= 9; i++) {
		var txt = "";
		for(j = arr[i]; j > 0; j--) {
			txt += i;
		}
		$(mid+i).text(txt);
	}
}

function calculate(input) {
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
		_color: day,
		kvadrat: kvadrat
	}

	return output;
}

function checkprivilege(date) {
	var input = new Object();
	if(typeof date === 'undefined' || !(date instanceof Date)) {
		input.day = $('input[name="day"]').val();
		input.month = $('select[name="month"]').val();
		input.year = $('input[name="year"]').val();
	}
	else {
		input.day = date.getDate();
		input.month = date.getMonth()+1;
		input.year = date.getFullYear();
		$('input[name="day"]').val(input.day);
 		$('select[name="month"]').val(input.month);
 		$('input[name="year"]').val(input.year);
	}
	var result = calculate(input);
	var day = result._color;
	fillmatrix('#matrix', result.kvadrat);

	$("#dsc-title").removeClass().addClass("dt-"+day).text(colors[day]['title']);
	$("#dsc-text").html(colors[day]['description']);
	$("#results").fadeIn('fast').slideDown('fast');

	$('.hero-form').removeClass('cd-red cd-yellow cd-blue cd-white cd-black').addClass('cd-'+day);
	$('#day-indicator').text(colors[day].day + ' день');

	// router.sync(input.month+'/'+input.day+'/'+input.year)
	current.date = input.month+'/'+input.day+'/'+input.year;
	router.sync();
}

var current = {
	date: "",
	cyear: ""
}

var router = {
	follow: function(ev) {
		if(typeof ev !== 'undefined') 
			ev.preventDefault();
		var hash = document.location.hash ? document.location.hash.split('#')[1] : "",
		guro = hash.split('/');
		if(guro[0] == 'cal') {
			switchtab('cal');
			if(guro.length > 1 && !isNaN(guro[1])) {
				genCal(guro[1])
			}
			// else genCal(today.getFullYear())
		}
		if(guro[0] == 'faq' || guro[0] == 'util')
			switchtab(guro[0]) 
		else {
			if(guro[0] === 'day' || guro[0] === "") {
				if($('#results').css('display') === "none") {
					// console.log('seems fresh')
					checkprivilege(new Date());
				}
				switchtab('day')
			}
			else if(guro.length >= 3 && !isNaN(guro[0]) && !isNaN(guro[1]) && !isNaN(guro[2])) {
				checkprivilege(new Date(hash));
				switchtab('day');
			}
		}
	},
	sync: function(hash) {
		if($('a[href=#day]').hasClass('hs-on'))
			history.pushState(null, null, '#'+current.date);
		if($('a[href=#cal]').hasClass('hs-on')) {
			history.pushState(null, null, '#cal/'+current.cyear);
			$('#cyear').val(current.cyear);
		}
	}
}

function readyset() {
	$('#matrix .mx-cell').mouseenter(function() {
		var id = $(this).attr('id');
		$("#dsc-text").hide();
		$("#dsc-pup").hide().html(ddesc[id]).show();
	});
	$('#matrix .mx-cell').mouseleave(function() {
		$("#dsc-pup").hide();
		$("#dsc-text").show();
	});
	
	$('html').on('click', function(event) {
		event.stopPropagation();
		$('.xtoday').removeClass('xtoday');
		$('#popupmatrix').remove();
	});

	$('.logo-section').click(function() { 
		if($(window).width() > 550) return;
		var $smallLogo = $(this).find('#small-logo');
		var newHeight = $smallLogo.hasClass('menu-expanded') ? 0 : 70;
		$('.menu-item').toggleClass('hidden')
		$smallLogo.toggleClass('menu-expanded') 
	})

	genCal(today.getFullYear())
	router.follow()

	window.onhashchange = router.follow;
	//prevent jumping
	$('a.menu-item').click(function(ev) { 
		ev.preventDefault();
		document.location.hash = $(this).attr('href')
	});
	// checkprivilege(new Date());
	$('.transparent-input').on('change', checkprivilege);
}

function switchtab(id) {
	if($('#'+id).is(':visible')) return;
	$('.switchable').hide();
	$('#'+id).show();
	$('.menu-item').removeClass('hs-on');
	$('a[href="#'+id+'"]').addClass('hs-on')
	router.sync();
}
var dow = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
var dowfull = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
var moy = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

function valButton(btn) {
	var cnt = -1;
	for (var i = btn.length - 1; i > -1; i--) {
		if (btn[i].checked) {
			cnt = i;
			i = -1;
		}
	}
	if (cnt > -1) return btn[cnt].value;
	else return null;
}

function monthLength(month, year) {
	var dd = new Date(year, month, 0);
	return dd.getDate();
}

function setCell(f, day, col, result, today) {
	var c = [];
	var t = '<td class="';
	if (typeof result !== 'undefined') c.push('cd cd-' + result._color);
	if (f == 0) c.push('previous');
	if (col == 0 || col == 6) c.push('weekend');
	if (f == 9) c.push('next');
	if (today === true) c.push('today');
	t += (c.length > 0) ? ' '+c.join(' ') + '"' : '"';
	if (typeof result !== 'undefined') t += ' data-matrix="' + implode('|',result.kvadrat) + '"';
	t += '><span class="date">' + day + '<\/span><\/td>\n';
	return t;
}

function genCal(year) {
	current.cyear = year;
	router.sync();

	year = typeof year !== 'undefined' ? parseInt(year) : today.getFullYear();
	var mc = new Object();

	for(var m = 0; m < 12; m++) {
		mc.month = moy[m];
		mc.html = setCal(m, year);
		$('#mc-'+m).html('<h3 class="monhead">'+mc.month+'</h3>'+mc.html);
		if(((m == today.getMonth()) && ( year == today.getFullYear()))) {
			$('#mc-'+m).addClass('tomonth');
		}
		else {
			$('#mc-'+m).removeClass('tomonth');
		}
	}
	postcal(year);
}

function postcal(year) {
	$('.cd').on('click', function(event) {
		event.stopPropagation();
		$('.xtoday').removeClass('xtoday');
		$(this).addClass('xtoday');
		var date = {
			year: year,
			month: (+ $(this).parents('.cal-macrocell').attr('id').split('mc-')[1]) + 1 ,
			day: (+ $(this).text())
		}
		popupMatrix($(this).data('matrix').split('|'), event, date);
	});
}

function popupMatrix(matrix, e, date) {
	var popup = $('#popupmatrix');
	if(!popup.length) {
		popup = $('<div></div>').attr('id', "popupmatrix")
		.append($('#matrix').clone().attr('id', ''))
		.append($('<br><a class="day-link">Подробнее...</a>'));
		$('body').prepend(popup);
	}
	$('.day-link').attr('href', '#'+date.month+'/'+date.day+'/'+date.year);
	popup.css({	display: 'none',
			position: 'absolute',
			left: '',
			right:'',
			top: '',
			bottom: ''
		});
	if(e.clientY < ($(window).height() / 1.5)) { 
		popup.css({top:e.pageY+5}); 
	} else {
		popup.css({bottom:$(window).height()-e.pageY+5}); 
	}

	if(e.clientX < ($(window).width() / 1.5)) {
		popup.css({left:e.pageX+15}); 
	} else {
		popup.css({right:$(window).width()-e.pageX+15}); 
	}

	fillmatrix("#popupmatrix table",matrix);
	popup.fadeIn();
}

function setCal(m, y) {
	var input = new Object();	
	var thismonth = ((m == today.getMonth()) && ( y == today.getFullYear())) ? true : false;
	input.month = m+1;
	input.year = y;
		var c = new Date();
		c.setDate(1);
		c.setMonth(m);
		c.setFullYear(y);
		var x = 1;
		var s = (c.getDay() - x) % 7;
		if (s < 0) s += 7;
		var dm = monthLength(m, y);
		var h = '<table>\n<thead>\n<tr>\n';
		for (var i = 0; i < 7; i++) {
				h += '<th';
				if ((i + x) % 7 == 0 || (i + x) % 7 == 6) h += ' class="weekend"';
				h += '>' + dow[(i + x) % 7] + '<\/th>\n';
		}
		h += '<\/tr>\n<\/thead>\n<tbody>\n<tr>\n';
		for (var i = s; i > 0; i--) {
				h += setCell(0, dm - i + 1, (s - i + x) % 7);
		}
		dm = monthLength(m + 1, y);
		for (var i = 1; i <= dm; i++) {
			input.day = i;
				if ((s % 7) == 0) {
						h += '<\/tr><tr>\n';
						s = 0;
				}
				h += setCell(1, i, (s + x) % 7, calculate(input), (thismonth && i == today.getDate() ) );
				s++;
		}
		var j = 1;
		for (var i = s; i < 7; i++) {
				h += setCell(9, j, (i + x) % 7);
				j++;
		}
		h += '<\/tr>\n<\/tbody>\n<\/table>';
		return h;
}