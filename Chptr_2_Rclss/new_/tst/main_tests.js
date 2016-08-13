/**
 * Created by CLIF on 8/12/2016.
 */
/**
 *  main_tests.js
 *  160812  @0512
 *      -> ADDED the 3 RClss DIVs OUTSIDE of div.Chptr_31.
 *      -> USED set_one_DIV_RClss() TO SET RClssDIV.innerHTML!!
 *      <br
 *      @0410   -> pulled LIST_trsfrmedTO_LIST_of_outerHTML_STRs OUT OF set_one_DIV_RClss()
 *  160811  @1645 -> set_one_DIV_RClss() IS NEARLY FINISHED   WORKING w/o final set a DIV class
 *  so I can actually make a good LIST_trsfrmedTO_LIST_of_outerHTML_STRs
 *  IN FILE: /tst/newMain_tests.js
 */

"use strict";
// requires
var R = require('ramda');
var t = require('assert');

var h = require('../../src/h');
var C_Both = h.C_Both;
var mySlice = h._mySlice;

/**
 *  --- set_RClss_TO_::D_Lmits -> L_S_spans -> L_S_spans
 * @param d_rcLmits
 * @private
 */
var set_RClss_TO_ = require('./src/set_RClss_range');
/**
 *    --- Elm_TO_Elm_outerHTML:: El -> S_outerHTML
 * @param el
 * @private
 */
var Elm_TO_Elm_outerHTML = h.Elm_TO_Elm_outerHTML;// E_a -> S_a

/**
 *          ----- main helper functions -----
 */
// var update_L_RClss_NLs = require('./src/update_L_RClss_NLs');//
var set_ElemStyle = require('../src/set_anElem_CSD');//
//GLOBALS
C_Both("IN  newMain_tests.js.");

//GLOBALS
C_Both("IN  new_/tst/main_tests.js.");

// test data
var RET, TST, EXP;
var stub_Chptr_DIV = document.querySelector('.Chptr_31');//:: div.Chptr_31
var stub_HTMLColl_of_SPANS = stub_Chptr_DIV.children;//-> HTMLCollection
var stub_one_Span = stub_HTMLColl_of_SPANS[2];
var stub_rclmits = {beg: 0, nxt: 5};


/**
 *  ---     --- TESTS ---
 */
// // CAN return one Chptr SPAN as an outerHTML String:: El -> S
// RET = Elm_TO_Elm_outerHTML(stub_one_Span);//D -> S
// TST = R.slice(9, 17, RET);
// EXP = '3 Yea, a';
// t.equal(TST, EXP, `EXP:["${EXP}"], NOT:["${TST}"]`);
//
// // CAN RETURN a List/Array of Chptr SPANs AS outerHTML Strings:: L_SPANS -> L_SPAN_outerHTML_STR
// RET = get_LIST_of_outerHTML_STRs(stub_HTMLColl_of_SPANS);// L_Elems -> L_SPAN_STR
//
// // CONFIRM isArrayLike
// t.ok(R.isArrayLike(RET));
// // CONFIRM one of the list is a STR
// t.ok(R.is(String, RET[0]));
// //CONFIRM a list validity
// RET = RET[2];//-> STR
// TST = R.slice(9, 17, RET);
// EXP = '3 Yea, a';
// t.equal(TST, EXP, `EXP:["${EXP}"], NOT:["${TST}"]`);

// TEST: set_RClss_TO_
// RET = set_RClss_TO_({beg: 0, nxt: 5})(get_LIST_of_outerHTML_STRs(stub_HTMLColl_of_SPANS));
//
// // CONFIRM isArrayLike
// t.ok(R.isArrayLike(RET));
// t.ok(R.is(String, RET[0]), 'this is NOT a STR');
// //CONFIRMED
// // RET -> List[2] IS Valid
// RET = RET[2];// LOOK AT One_outerHTML_STR. RET -> List[2] IS Valid
// TST = R.slice(9, 17, RET);
// EXP = '3 Yea, a';
// t.equal(TST, EXP, `EXP:["${EXP}"], NOT:["${TST}"]`);

// /**
//  *  --- LIST_reducedTO_one_DIV_outerHTML_STR:: [S,S, ...] -> S
//  *  USE: reduces n SPAN.outerHTML Strings to one String.
//  *  @private
//  */
// const LIST_reducedTO_one_DIV_outerHTML_STR = R.reduce(R.concat, '');

/**
 *  --- set_one_DIV_RClss:: L -> D -> S
 *  set_one_DIV_RClss( D_RCss_NdxLmits) -> L_SPANS -> DIV_outerHTML_STR
 * @param d_rcLmits
 * @private
 */
const set_one_DIV_RClss = d_rcLmits => R.compose(
    R.reduce(R.concat, ''),
    set_RClss_TO_(d_rcLmits)
);

//TEST:: set_oneDIV_RClss
var rclmits = {beg:0, nxt:1};
var LIST1 = get_LIST_of_outerHTML_STRs(stub_HTMLColl_of_SPANS);
RET = set_one_DIV_RClss({beg:0, nxt:1})(LIST1);
t.ok(R.is(String, RET), 'DIV_RClss STR IS NOT a STR');

// OK NOW set a RClssDIV.innerHTML BY HAND
var pst_div = document.querySelector('.pst_div');
var cur_div = document.querySelector('.cur_div');
var fut_div = document.querySelector('.fut_div');
pst_div.innerHTML = set_one_DIV_RClss({beg:0, nxt:5})(LIST1);
cur_div.innerHTML = set_one_DIV_RClss({beg:5, nxt:7})(LIST1);
fut_div.innerHTML = set_one_DIV_RClss({beg:7, nxt:30})(LIST1);

// OK NOW and finally, set a RClssDIV.outerHTML BY HAND


C_Both("OUT new_/tst/main_tests.js.");
// // hard coded current Node Lists
// var A = stub_Chptr_DIV.children;//:; -> HTMLCollection[53]
// var B = stub_Chptr_DIV.children.item(5);// -> span
// var C = stub_Chptr_DIV.children.item(5).innerHTML;//:: -> S:
// var D = R.slice(4,6)(stub_Chptr_DIV.children);//::-> Array[2]
// var E = R.slice(4,6)(stub_Chptr_DIV.children).outerHTML;//::-> undefined
// var F = R.slice(4,6)(stub_Chptr_DIV.children)[1];//-> span
// var G = R.slice(4,6)(stub_Chptr_DIV.children)[1].innerHTML;//-> S: "And these...
// var H = R.slice(4,6)(stub_Chptr_DIV.children)[1].outerHTML;//-> S: "<span>And these ...
// var I = R.slice(4,6)(stub_Chptr_DIV.children).toString();//-> S: "[object HTML...
// var J = JSON.stringify(R.slice(4,6)(stub_Chptr_DIV.children));//-> S: "[{},{}]"
