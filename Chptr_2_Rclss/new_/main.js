/**
 *  new_/main.js ->  L_Spans_TO_S__Rclss_Spans(). BUT removed Tests
 *  160813  @0715 -> REFACT name: L_Spans_TO_L_RclssSpans_BY_()
 *  IN FILE: -> UPDATES the 3 RClss DIVS. They are now stand alone DIVS and the Chptr_31 DIV is :hidden
 */

"use strict";
// requires
var R = require('ramda');
var t = require('assert');
var h = require('../src/h');
var C_Both = h.C_Both;
var _L_Span_outerHTML_Str = require('./src/set_RClss_Divs').L_Spans_TO_L_Span_outerHTML_Str;
var _one_Sof_Rclss_Spans_BY_ = require('./src/set_RClss_Divs').L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_;
//
// // var update_L_RClss_NLs = require('./src/update_L_RClss_NLs');//
// //var set_ElemStyle = require('../src/set_anElem_CSD');//
//
// /**
//  *          ----- main helper functions -----
//  */
// /**
//  *      --- L_Spans_TO_L_RclssSpans_BY_::D_Lmits -> L_S_spans -> L_S_spans
//  * @param d_rcLmits
//  * @private
//  */
// var L_Spans_TO_L_RclssSpans_BY_ = h.L_to_L_by_D_beg_nxt;//::(d_lmits) -> L -> L_subset
// /**
//  *  --- L_RclssSpans_TO_one_Sof_Rclss_Spans:: L -> S
//  *  reduces each Rclss Span to one outerHTML like Str.
//  */
// const L_RclssSpans_TO_one_Sof_Rclss_Spans = R.reduce(R.concat, '');
//
// /**
//  *      --- Elm_TO_S_Elm_outerHTML:: El -> S_outerHTML
//  * @param el
//  * @private
//  */
// var Elm_TO_S_Elm_outerHTML = h.Elm_TO_S_Elm_outerHTML;// E_a -> S_a
//
// /**
//  *      --- L_Spans_TO_L_Span_outerHTML_Str:: L_Elems -> L_STR
//  *  @private
//  */
// const L_Spans_TO_L_Span_outerHTML_Str = R.map(Elm_TO_S_Elm_outerHTML);// L_SPANS -> L_SPAN_outerHTML_STR
//
// //GLOBALS
// C_Both("IN  new_/main.js.");
//
// // test data
// var RET, TST, EXP;
// // var stub_Chptr_DIV = document.querySelector('.Chptr_31');//:: div.Chptr_31
// // var stub_HTMLColl_of_SPANS = stub_Chptr_DIV.children;//-> HTMLCollection
// // var stub_one_Span = stub_HTMLColl_of_SPANS[2];
// // var stub_rclmits = {beg: 0, nxt: 5};
//
//
/**
 *  --- L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_:: L -> D -> S
 *  L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_( D_RCss_NdxLmits) -> L_SPANS -> DIV_outerHTML_STR
 * @param d_rcLmits
 * @private
 */
// const L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_ = d_rcLmits => R.compose(
//     L_RclssSpans_TO_one_Sof_Rclss_Spans,
//     L_Spans_TO_L_RclssSpans_BY_(d_rcLmits)
// );

// CONSTANTS
var pst_div = document.querySelector('.pst_div');
var cur_div = document.querySelector('.cur_div');
var fut_div = document.querySelector('.fut_div');
var LIST0 = document.querySelectorAll('.Chptr_31 span');


var LIST1 = _L_Span_outerHTML_Str(LIST0); // KEEP SEPARATE it does not change much

pst_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg:0, nxt:5})(LIST1);
cur_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg:5, nxt:7})(LIST1);
fut_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg:7, nxt:52})(LIST1);
//
// // OK NOW and finally, set a RClssDIV.outerHTML BY HAND
//

C_Both("OUT new_/main.js.");

// RET = L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_({beg:0, nxt:1})(LIST1);
// t.ok(R.is(String, RET), 'DIV_RClss STR IS NOT a STR');
// OK NOW set a RClssDIV.innerHTML BY HAND

