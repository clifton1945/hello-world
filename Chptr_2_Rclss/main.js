/**
 *  main.js
 *  160825  @1230   STABLE WIP hardcoded -> USING set_RclssDIVs.js/set_RclssDIVs()
 *  160824  @0715 -> WIP ADD key events for Reading next verse
 *      -> RENAMED DEPR back to './src/set_RClss_Divs').L_Spans_TO_L_Span_outerHTML_Str
 *  IN FILE: -> UPDATES the 3 RClss DIVS. They are now stand alone DIVS and the Chptr_31 DIV is :hidden
 */
//
"use strict";
var h = require('./src/h');
var C_Both = h.C_Both;
C_Both("IN  main.js");
// ------------------    REQUIRES
var R = require('ramda');
var t = require('assert');
//      -------------    EXTERNAL REQUIRED Functions  ------------------------
/**
 *      ----- set_SPAN_Style::(D, N) -> Fn:( (E, N, L) -> E))
 */
var set_SPAN_Style = R.curry(require('./src/set_anElem_Style').set_SPAN_Style);//
var _outerHTML_SPAN_L = require('./src/set_RClss_Divs').L_Spans_TO_L_Span_outerHTML_Str;
// CUT
var set_RclssDIVs = require('./src/set_RclssDIVs').set_RclssDIVs;// (N_cur, L_spans) -> N_curSpans -> L:[[pst],[cur],[fut]]

// -> Rclss DIV DEFINITIONS set here SO THAT the CSS styles are in effect for the DIV
var pst_div = document.querySelector('.pst_div');// -> div.pst_div
var cur_div = document.querySelector('.cur_div');
var fut_div = document.querySelector('.fut_div');
// CONSTANT Lists of Spans
var SPAN_NL = document.querySelectorAll('.Chptr_31 span');// -> NL[52]:: [span, spam, ...]
var outerHTML_SPAN_L = _outerHTML_SPAN_L(SPAN_NL);// -> Array[52]:: [S:"<span> 1 And...", S, ...]

/**
 * ----------------- Visual Confirm w/ index.html::  setting Rclss Element Styles ---------------------------
 */
// here is a list of the three Rclss set from set_RclssDIVs
var _L_Rclss = set_RclssDIVs(2, outerHTML_SPAN_L);// partialed. N_page  -> L_
var L_Rclss = _L_Rclss(15);
// THESE 3 lines set the 3 Rclss children
pst_div.innerHTML = L_Rclss[0]; // -> S[2617]:"<spam 1 And.....
cur_div.innerHTML = L_Rclss[1];
fut_div.innerHTML = L_Rclss[2];

/**
 *  ----------------- WIP ON pst_div VISUAL TESTS-------------------------
 * @type {HTMLElement[]}
 */
var CUT, RET;
// var L = R.reverse(pst_div.children);// -> HTMLCollection[N]:: [span,[s0, s1,...]
// var rclss_wtRng = {smlWt: 0.1, begWt: 0.8};
// NOTE:  these above two definitions produce the same tapering as the two below.
var L = pst_div.children;// -> HTMLCollection[N]:: [span,[s0, s1,...]
var rclss_wtRng = {endWt: 0.85, begWt: 0.10};

var rclss_fmlyLen = L.length;
CUT = set_SPAN_Style(rclss_wtRng, rclss_fmlyLen);
// RET = R.addIndex(R.map)(CUT, L); // THIS WORKS
RET = R.addIndex(R.map)(CUT)( L); // THIS WORKS
// RET = R.addIndex(R.map(CUT, L)); NOTE this NOT taper the spans

/**
 *  ----------------- WIP ON fut_div VISUAL TESTS -------------------------
 * @type {HTMLElement[]}
 */
L = fut_div.children;// -> HTMLCollection[N]:: [span,[s0, s1,...]
rclss_fmlyLen = L.length;
rclss_wtRng = {endWt: 0.1, begWt: 0.90};
CUT = set_SPAN_Style(rclss_wtRng, rclss_fmlyLen);
RET = R.addIndex(R.map)(CUT)(L);//Elem,N,L -> [Elem,...]

C_Both("OUT main.js");
// C_Both("LOOK AT TODOS");
