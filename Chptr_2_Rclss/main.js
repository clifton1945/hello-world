/**
 *  main.js
 *  160808  @02040 -> WIP refresh_Rclsses(with a new current limits)
 *      TRANSFORMS the three Rclss span NodeLists.
 *      THEN the 3 Rclss div classes are reset using innerHTML.
 *  160803  @0830 -> APPLYING set_ElemCSD TO 4 Rclss divs IN 2Nephi31_.html.
 *  IN FILE: main.js -> SET each Verse CSD as a function of its Space parameters.
 */

"use strict";
// requires
var R = require('ramda');
var C_Both = require('./src/h').C_Both;
// main helper functions
var set_ElemStyle = require('./src/set_ElemCSD');
var refresh_Rclsses = require('./src/refresh_Rclsses');
//GLOBALS
C_Both("IN  main.js.");
var RET, EXP;

// hard coded default Node Lists
var aChptr_NL = document.querySelectorAll('span');
// var RclssL = [pst_div, cur_div, fut_div ]);// default::  17+5+31->53



// USE refresh_Rclss  IN Tests - > NOW APPLY refresh_Rclss:: L->D -> L TO aChptr_NL WITH this a_limts_DD
var a_limts_D = {beg: 17, end: 22};

var [pst_NL, cur_NL, fut_NL ] =  refresh_Rclsses(aChptr_NL, a_limts_D);// NL->D -> L w/ lengths 17+2+34->53  IS hardcoded default
RET = aChptr_NL.length;
EXP = 53;
assert.deepEqual(RET, EXP, `aChptr_NL.length IS:${RET}. EXP:${EXP}`);
RET = pst_NL.length;
EXP = 17;
assert.deepEqual(RET, EXP, `pst_NL.length IS:${RET}. EXP:${EXP}`);
RET = cur_NL.length;
EXP = 5;
assert.deepEqual(RET, EXP, `cur_NL.length IS:${RET}. EXP:${EXP}`);
RET = fut_NL.length;
EXP = 31;
assert.deepEqual(RET, EXP, `fut_NL.length IS:${RET}. EXP:${EXP}`);

var pst_divNL = document.querySelectorAll('.pst_div span');
var cur_divNL = document.querySelectorAll('.cur_div span');

var pst_div = document.querySelector('.pst_div');
var cur_div  = document.querySelector('.cur_div');
var fut_div  = document.querySelector('.fut_div');

// WIP  trying to figure out how to transform the ..._NL lists
var inner_cur0 = cur_div.innerHTML;
cur_div.innerHTML = `<span> ${cur_NL[4].innerHTML}</span>
<span> ${cur_NL[3].innerHTML}</span>
<span> ${cur_NL[2].innerHTML}</span>
<span> ${cur_NL[1].innerHTML}</span>`
;  // this works   FIX BACKWARDS ON PURPOSE now transform the ..._NL NodelLists to an equivalent innerHTML
// cso map(f:)L:[l,l,l...]) -> S. where fn:: el=> compose( append_toS, add_span:: S, extract_innerHTML:: el->el.innerHTML)(el)
var inner_cur1 = cur_div.innerHTML;

var myMap = R.addIndex(R.map);


C_Both(JSON.stringify("OUT main.js."));
