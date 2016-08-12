/**
 *  newMain.js
 *  160811  0955  begin final compose to -> RClss_outerHTML
 *  IN FILE: newMain_tests.js
 */

"use strict";
// requires
var R = require('ramda');
var t = require('assert');

var C_Both = require('./src/h').C_Both;

/**
 *          ----- main helper functions -----
 */

// var update_L_RClss_NLs = require('./src/update_L_RClss_NLs');//
// var set_ElemStyle = require('./src/set_anElem_CSD');//
//GLOBALS
C_Both("IN  newMain.js.");
var RET, TST, EXP;

/**
 *    --- set_outerHTML_Str:: El -> S_outerHTML
 * @param el
 * @private
 */
const set_outerHTML_Str=el=>el.outerHTML;//:: E_a -> S_a

// test data
var DIV_tst = document.querySelector('.Chptr_31');//:: div.Chptr_31
var HTMLCol_Spans = DIV_tst.children;//-> HTMLCollection
// -------    FUNCTIONS
/**
 *  --- _Lset_outerHTML_Strs:: L_Els -> L_El_outerHTMLs
 */
const _Lset_outerHTML_Strs = R.map(set_outerHTML_Str);// L_Els -> L_El_outerHTMLs
/**
 *  --- _mySlice(d_lmits) -> L -> L_subset
 * @param d_lmits
 * @private
 */
const _mySlice = d_lmits => {
    var {beg, nxt} = d_lmits;// unpack
    return R.slice(beg, nxt)
};//:: D_lmits -> L -> L_subset
/**
 *  --- _RClssset_outerHTML_Str::D_Lmits -> L_S_spans -> L_S_spans
 * @param d_rcLmits
 * @private
 */
const _RClssset_outerHTML_Str = d_rcLmits => _mySlice(d_rcLmits);// D_Lmits -> L_S_spans -> L_S_spans

// WIP  NOW compose the whole thing:: HTMLCollections -> fn(D_lmits) -> S_RClss_innerHTML
var fn = d_lmits => R.compose(
    _RClssset_outerHTML_Str(d_lmits),
    _Lset_outerHTML_Strs
);// D_lmits -> L_ -> L_S_RClss
var lmits = {beg:0, nxt:5};
RET = fn(lmits)(HTMLCol_Spans);//::D_lmits -> L_ -> L_S_RClss

/**
 *  ---     --- TESTS ---
 */
// NOW reduce the list into one RClss.outerHTML
var spansList = HTMLCol_Spans;

// var RET = R.reduce(R.concat, "", HTMLCol_Spans);// L_Elems -> merge() -> S_HTML_span
// TST = R.slice(0,25, RET);
// EXP = '???';
// t.equal(TST, EXP, `EXP:["${EXP}"], NOT:["${TST}"]`);
//


//CONFIRMED composed fn -> subset of innerHTML strings
RET = RET[2];// L_Elems -> L_El_outerHTMLs[ndx] -> S_HTML_span
TST = R.slice(9,17, RET);
EXP = '3 Yea, a';
t.equal(TST, EXP, `EXP:["${EXP}"], NOT:["${TST}"]`);





// hard coded current Node Lists
var A = DIV_tst.children;//:; -> HTMLCollection[53]
var B = DIV_tst.children.item(5);// -> span
var C = DIV_tst.children.item(5).innerHTML;//:: -> S:
var D = R.slice(4,6)(DIV_tst.children);//::-> Array[2]
var E = R.slice(4,6)(DIV_tst.children).outerHTML;//::-> undefined
var F = R.slice(4,6)(DIV_tst.children)[1];//-> span
var G = R.slice(4,6)(DIV_tst.children)[1].innerHTML;//-> S: "And these...
var H = R.slice(4,6)(DIV_tst.children)[1].outerHTML;//-> S: "<span>And these ...
var I = R.slice(4,6)(DIV_tst.children).toString();//-> S: "[object HTML...
var J = JSON.stringify(R.slice(4,6)(DIV_tst.children));//-> S: "[{},{}]"

C_Both("OUT newMain.js.");
