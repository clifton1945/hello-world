/**
 *  main.js
 *  160808  @0845
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
var pst_div = R.reverse(document.querySelectorAll('.pst_div span'));
var cur_div  = document.querySelectorAll('.cur_div span');
var fut_div  = document.querySelectorAll('.fut_div span');
// var fut_par  = document.querySelectorAll('.fut_para span');//skip for initial tests
var aChptr = document.querySelectorAll('span');

// Rclsses keys as a List
// var RclssL =[pst_div, cur_div, fut_div, fut_par];// older w/ 4 Rclsses
var RclssL =[pst_div, cur_div, fut_div];// 17+2+34->53  use 3 Rclsses for initial confirm tests
RET = aChptr.length;
EXP=53;
assert.deepEqual(RET, EXP, `aChptr.length IS:${RET}. EXP:${EXP}`);
RET = pst_div.length;
EXP=17;
assert.deepEqual(RET, EXP, `pst_div.length IS:${RET}. EXP:${EXP}`);
RET = cur_div.length;
EXP=2;
assert.deepEqual(RET, EXP, `cur_div.length IS:${RET}. EXP:${EXP}`);
RET = fut_div.length;
EXP=34;
assert.deepEqual(RET, EXP, `fut_div.length IS:${RET}. EXP:${EXP}`);

//  NOW APPLY refresh_Rclss
var lmts = {beg: 17, end: 22};
var LIST = refresh_Rclsses(aChptr,lmts);//  17+5+31->53
// [pst_div, cur_div, fut_div] = refresh_Rclsses(aChptr,lmts);//  17+5+31->53

// test: confirm default cur_div length == 5
RET = LIST[1].length;
EXP=5;
assert.deepEqual(RET, EXP, `cur_div.length IS:${RET}. EXP:${EXP}`);
//
//
// // MAIN CodeUnderTest: apply set_ElemCSD to each verse of each Rclss
// // var map_anRclss = R.map(x => set_ElemCSD(x));
// // var map_aVerse =R.addIndex(R.map);
// // var set_anElemCSD =x=>_set_ElemCSD(x);
// // RclssL = myMap(set_ElemCSD)(RclssL );
// //
// // var [pst=0, cur=0, fut=0] = refresh_Rclsses(aChptr,lmts);//  17+5+31->53


C_Both(JSON.stringify("OUT main.js."));
