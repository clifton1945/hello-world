/**
 *  Chptr_2_Rclss/main.js -> set_one_DIV_RClss() STABLE , no tests
 *  160812  @1150 -> REMOVED commented out remaining test
 *      @1125 ->   set_one_DIV_RClss() WORKS READY FOR weight CSD AND set Eleme
 *      @0930 REFACTFn Names and requires
 *      @0512
 *      -> ADDED the 3 RClss DIVs OUTSIDE of div.Chptr_31.
 *      -> USED set_one_DIV_RClss() TO SET RClssDIV.innerHTML!!
 *      <br
 *      @0410   -> pulled get_LIST_of_outerHTML_STRs OUT OF set_one_DIV_RClss()
 *  IN FILE: Chptr_2_Rclss/main.js -> set_one_DIV_RClss() UPDATES the 3 RClss DIVS.
 *  They are now stand alone DIVS and the Chptr_31 DIV is :hidden
 */

"use strict";
// requires
var R = require('ramda');
var t = require('assert');
var h = require('./src/h');

// var update_L_RClss_NLs = require('./src/update_L_RClss_NLs');//
//var set_ElemStyle = require('../src/set_anElem_CSD');//

/**
 *          ----- main helper functions -----
 */
var C_Both = h.C_Both;
var mySlice = h._mySlice;
/**
 *      --- set_RClss_TO_::D_Lmits -> L_S_spans -> L_S_spans
 * @param d_rcLmits
 * @private
 */
var set_RClss_TO_ = h.set_RClss_TO_;
/**
 *      --- get_outerHTML_Str:: El -> S_outerHTML
 * @param el
 * @private
 */
var get_outerHTML_Str = h.get_outerHTML_Str;// E_a -> S_a
/**
 *      --- get_LIST_of_outerHTML_STRs:: L_Elems -> L_STR
 *  @private
 */
const get_LIST_of_outerHTML_STRs = R.map(get_outerHTML_Str);// L_SPANS -> L_SPAN_outerHTML_STR

//GLOBALS
C_Both("IN  new_/main.js.");

// test data
var RET, TST, EXP;
// var stub_Chptr_DIV = document.querySelector('.Chptr_31');//:: div.Chptr_31
// var stub_HTMLColl_of_SPANS = stub_Chptr_DIV.children;//-> HTMLCollection
// var stub_one_Span = stub_HTMLColl_of_SPANS[2];
// var stub_rclmits = {beg: 0, nxt: 5};

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
// var rclmits = {beg:0, nxt:1};

// CONSTANTS
var pst_div = document.querySelector('.pst_div');
var cur_div = document.querySelector('.cur_div');
var fut_div = document.querySelector('.fut_div');
var LIST0 = document.querySelectorAll('.Chptr_31 span');


var LIST1 = get_LIST_of_outerHTML_STRs(LIST0); // KEEP SEPARATE it does not change much

pst_div.innerHTML = set_one_DIV_RClss({beg:0, nxt:5})(LIST1);
cur_div.innerHTML = set_one_DIV_RClss({beg:5, nxt:7})(LIST1);
fut_div.innerHTML = set_one_DIV_RClss({beg:7, nxt:52})(LIST1);

// OK NOW and finally, set a RClssDIV.outerHTML BY HAND


C_Both("OUT new_/main.js.");

// RET = set_one_DIV_RClss({beg:0, nxt:1})(LIST1);
// t.ok(R.is(String, RET), 'DIV_RClss STR IS NOT a STR');
// OK NOW set a RClssDIV.innerHTML BY HAND

