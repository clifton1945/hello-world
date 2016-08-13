/**
 *  main.js
 *  160813  @1006 READY TO SET Elm.StyleObj  NOTE:
 *  READ Setting style in >>https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style
 *      @0923 -> moved set_RClss_Divs.js INTO bse Chptr_2_Rclss/src
 *      @0715 -> REFACT name: L_Spans_TO_L_RclssSpans_BY_()
 *  IN FILE: -> UPDATES the 3 RClss DIVS. They are now stand alone DIVS and the Chptr_31 DIV is :hidden
 */

"use strict";
// requires
var R = require('ramda');
var t = require('assert');
var h = require('./src/h');
var C_Both = h.C_Both;
var _L_Span_outerHTML_Str = require('./src/set_RClss_Divs').L_Spans_TO_L_Span_outerHTML_Str;
var _one_Sof_Rclss_Spans_BY_ = require('./src/set_RClss_Divs').L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_;

// CONSTANTS
var pst_div = document.querySelector('.pst_div');
var cur_div = document.querySelector('.cur_div');
var fut_div = document.querySelector('.fut_div');
var LIST0 = document.querySelectorAll('.Chptr_31 span');

var L_Span_outerHTML_Str = _L_Span_outerHTML_Str(LIST0); // KEEP SEPARATE it does not change much
// // OK NOW and finally, set a RClssDIV.outerHTML BY HAND
pst_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg:0, nxt:5})(L_Span_outerHTML_Str);
cur_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg:5, nxt:7})(L_Span_outerHTML_Str);
fut_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg:7, nxt:52})(L_Span_outerHTML_Str);

// OK NOW set each Rclss Elm.Style

// RET = L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_({beg:0, nxt:1})(L_Span_outerHTML_Str);
// t.ok(R.is(String, RET), 'DIV_RClss STR IS NOT a STR');

C_Both("OUT new_/main.js.");
