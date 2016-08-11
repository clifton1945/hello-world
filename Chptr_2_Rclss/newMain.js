/**
 *  newMain.js
 *  160811  @0601
 *  IN FILE: newMain.js -> SET each Verse CSD as a function of its Space parameters.
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
 *    --- _S_outerHTML:: El -> S_outerHTML
 * @param el
 * @private
 */
const _S_outerHTML=el=>el.outerHTML;//:: E_a -> S_a

// test data
var DIV_tst = document.querySelector('.Chptr_31');//:: div.Chptr_31
var HTMLCol_Spans = DIV_tst.children;//-> HTMLCollection

/**
 *  ---     --- TESTS ---
 */

// CAN return one Chptr SPAN as an outerHTML String:: El -> S
RET = _S_outerHTML(HTMLCol_Spans[2]);//D -> S
TST = R.slice(9,17, RET);
EXP = '3 Yea, a';
t.equal(TST, EXP, `EXP:["${EXP}"], NOT:["${TST}"]`);


/**
 *  --- _L_S_outerHTMLs:: L_Els -> L_El_outerHTMLs
 */
const _L_S_outerHTMLs = R.map(_S_outerHTML);// L_Els -> L_El_outerHTMLs

// CAN return a List/Array of Chptr SPANs as outerHTML Strings:: L_Els -> L_El_outerHTMLs
RET = _L_S_outerHTMLs(HTMLCol_Spans)[2];// L_Elems -> L_El_outerHTMLs[ndx] -> S_HTML_span
TST = R.slice(9,17, RET);
EXP = '3 Yea, a';
t.equal(TST, EXP, `EXP:["${EXP}"], NOT:["${TST}"]`);

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
 *  --- _RClss_S_outerHTML::D_Lmits -> L_S_spans -> L_S_spans
 * @param d_rcLmits
 * @private
 */
const _RClss_S_outerHTML = d_rcLmits => _mySlice(d_rcLmits);// D_Lmits -> L_S_spans -> L_S_spans

//CAN return a sliced set of outerHTML Strings:: D_Lmits -> L_S_elements -> L_S_elements
RET = _RClss_S_outerHTML({beg:0, nxt:5})(_L_S_outerHTMLs(HTMLCol_Spans));
TST = RET.length;
EXP = 5;
t.equal(TST, EXP, `EXP:["${EXP}"], NOT:["${TST}"]`);

//CONFIRMED _RClss_S_outerHTML(limits, spanStrings) -> subset of innerHTML strings
RET = RET[2];// L_Elems -> L_El_outerHTMLs[ndx] -> S_HTML_span
TST = R.slice(9,17, RET);
EXP = '3 Yea, a';
t.equal(TST, EXP, `EXP:["${EXP}"], NOT:["${TST}"]`);


// NOW compose the whole thing
var fn = d_lmits => R.compose(_RClss_S_outerHTML(d_lmits), _L_S_outerHTMLs);
RET = fn({beg:0, nxt:5})(HTMLCol_Spans);

//CONFIRMED _RClss_S_outerHTML(limits, spanStrings) -> subset of innerHTML strings
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
