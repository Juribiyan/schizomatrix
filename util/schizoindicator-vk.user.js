// ==UserScript==
// @name         Schizomatrix indicator for vk.com
// @namespace    http://snyb.tk/
// @version      0.1
// @description  Displays birthday color on vk.com profile pages
// @author       Juribiyan
// @match        vk.com/*
// @grant        none
// ==/UserScript==

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

  var day;

  if(det < 3 || det > 5) {
    day = "white";
  }
  else if(det == 3) {
    day = "blue";
  }
  else if(det == 4) {
    day = "yellow";
  }
  else if(det == 5) {
    day = "red";
  }

  var output = {
    _color: day,
    kvadrat: kvadrat
  }

  return output;
}

function _main() {
  var $bday = document.querySelector('[href*=bday]'), $byear = document.querySelector('[href*=byear]');
  if($bday && $byear && !document.querySelectorAll('.schizoindicator').length) {
    var day = /\[bday\]=([0-9]{1,2})/.exec($bday.href)
    var month = /\[bmonth\]=([0-9]{1,2})/.exec($bday.href)
    var year = /\[byear\]=([0-9]{1,2})/.exec($byear.href)
    if(day && month && year) {
      var color = calculate({
        day: day[1], month: month[1], year: year[1]
      });
      $byear.insertAdjacentHTML('afterend', generateIndicator(color));
    }
  }
}

_main();

function generateIndicator(color) {
  var style = 'display: inline-block; '
  style += 'height: 10px; '
  style += 'width: 10px; '
  style += 'background-color: '+color._color+'; '
  style += 'vertical-align: middle; '
  style += 'margin: 0 4px; '
  style += 'box-shadow: 0 0 1px black;'
  return '<div class="schizoindicator" style="'+style+'"></div>';
}

var MO = window.MutationObserver || window.WebKitMutationObserver;
if(MO) {
  var target = document.querySelector('head > title');
  var observer = new MO(function(mutations) {
      mutations.forEach(function(mutation) {
          _main();
      });
  });
  observer.observe(target, { subtree: true, characterData: true, childList: true });
}