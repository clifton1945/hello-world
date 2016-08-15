/**
 *  main.js
 *  160815  @1503  Basic Tests
 *  @1050 PLAN over all: now available 3 Rclss divs OF spanStrs
 *      then map(Fn, L_Spans)
 *      where Fn_callBack: updateEachSpan(E, N, L):: -> E_updatedStyleObj
 *      with pipeLike
 *      N_ndx-> N_wt -> CSD_valu ->
 *      where update Span -> Span_outerHTML_Str ->
 *  IN FILE: -> UPDATES the 3 RClss DIVS. They are now stand alone DIVS and the Chptr_31 DIV is :hidden
 */

"use strict";
// requires
var h = require('./src/h');
var C_Both = h.C_Both;
C_Both("IN  main.js");

var R = require('ramda');
var t = require('assert');

var _L_Span_outerHTML_Str = require('./src/set_RClss_Divs').L_Spans_TO_L_Span_outerHTML_Str;
var _one_Sof_Rclss_Spans_BY_ = require('./src/set_RClss_Divs').L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_;

// CONSTANTS
var pst_div = document.querySelector('.pst_div');
var cur_div = document.querySelector('.cur_div');
var fut_div = document.querySelector('.fut_div');

var Chptr_Span_NL = document.querySelectorAll('.Chptr_31 span');
var fut_NL = document.querySelectorAll('.fut_div');

var L_Span_outerHTML_Str = _L_Span_outerHTML_Str(Chptr_Span_NL); // KEEP SEPARATE it does not change much

// OK NOW and finally, set a RClssDIV.outerHTML BY HAND
pst_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg:0, nxt:5})(L_Span_outerHTML_Str);
cur_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg:5, nxt:7})(L_Span_outerHTML_Str);
fut_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg:7, nxt:52})(L_Span_outerHTML_Str);

// OK NOW set each Rclss Elm.Style
//  BASIC TESTS: cur_div
t.ok(cur_div.tagName == 'DIV', 'cur_div SHOULD BE a DIV.');
t.ok(cur_div.firstElementChild.tagName == 'SPAN', 'cur_div.firstElementChild SHOULD BE a SPAN.');
t.ok(R.isArrayLike( cur_div.children), 'cur_div-children SHOULD BE a ArrayLike.');
t.ok(R.isArrayLike( fut_NL), 'fut_NL SHOULD BE a ArrayLike.');

// some learning tests


C_Both("OUT main.js");
