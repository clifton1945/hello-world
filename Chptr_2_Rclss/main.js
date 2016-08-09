// /**
//  *  main.js
//  *  160808  @02040 -> WIP update_L_RClss_NLs(with a new current limits)
//  *      TRANSFORMS the three Rclss span NodeLists.
//  *      THEN the 3 Rclss div classes are reset using innerHTML.
//  *  160803  @0830 -> APPLYING set_ElemCSD TO 4 Rclss divs IN 2Nephi31_.html.
//  *  IN FILE: main.js -> SET each Verse CSD as a function of its Space parameters.
//  */
//
"use strict";
// requires
var R = require('ramda');
var C_Both = require('./src/h').C_Both;

/**
 *          ----- main helper functions -----
 */
var update_L_RClss_NLs = require('./src/update_L_RClss_NLs');//
var set_ElemStyle = require('./src/set_anElem_CSD');//
//GLOBALS
C_Both("IN  main.js.");
var RET, EXP;

// hard coded current Node Lists
var aChptr_NL = document.querySelectorAll('span'); // -> NL:[span, span...]
// default aChptr_NL Rclsses::  17+5+31->53

/**
 * -------------  update the3 Rclss NodeLists: pst_, cur_, fut_NL
 */
var stub_D_ndxLmits = {beg: 17, end: 22};
var [pst_NL, cur_NL, fut_NL ] =  update_L_RClss_NLs(aChptr_NL, stub_D_ndxLmits);

// NL->D -> L w/ lengths 17+2+34->53  IS hardcoded default
// some tests
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

/**
 * ----------- NEXT transform 3 Rclss NodeList into a new Chptr.innerHTML String -------
 */

/**
 *  --------------- SET the -> Rclss ..._divs ------------
 * @type {Element}
 */
var pst_div = document.querySelector('.pst_div');// -> div.pst_div
var cur_div = document.querySelector('.cur_div');
var fut_div = document.querySelector('.fut_div');

/**
 * -------  TRANSFORM the _NL lists ->  S:innerHTML  -----------
 */

var inner_cur0 = cur_div.innerHTML;//  TEST: -> SEE innerHTML -> S

var pst_test = R.map(function (el) {
    return '<span>' + el.innerHTML + '</span>';
})(pst_NL);
var cur_test = R.map(function (el) {
    return '<span>' + el.innerHTML + '</span>';
})(cur_NL);
var fut_test = R.map(function (el) {
    return '<span>' + el.innerHTML + '</span>';
})(fut_NL);

pst_div.innerHTML = R.reduce((a, b)=>a + b, '')(pst_test);// L -> S
cur_div.innerHTML = R.reduce((a, b)=>a + b, '')(cur_test);
fut_div.innerHTML = R.reduce((a, b)=>a + b, '')(fut_test);
// tests:   see results
var inner_cur1 = cur_div.innerHTML;// S -> S
var aChptr_NL1 = document.querySelectorAll('span');// -> NL:[span, span...]

/**
 * --------------  Map all Spans with set_ElemStyle//:: (E:e, N:ndx_e, L:fam_e) ->  E: mutated
 */
var myMap = R.addIndex(R.map);
//noinspection JSUnusedLocalSymbols
var out = myMap(set_ElemStyle)(aChptr_NL1);

// END
C_Both(JSON.stringify("OUT main.js."));
