/**
 *  new_/main.js
 *  160813  @0923 -> moved set_RClss_Divs.js INTO bse Chptr_2_Rclss/src
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

