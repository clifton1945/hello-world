/**
 *  main.js
 *  160823  @1230 _> FIX: './src/DEPR_set_RClss_Divs').L_Spans_TO_L_Span_outerHTML_Str
 *      @1225 WHY see 2 IN main.js
 *      @1155 -> WIP STABLE USING REFACTED ->  set_anElem_Style.set_SPAN_Style()
 // *      BUT it is unclear why the pst_div is not showing tapered styles ???
 *  160822  @0833 -> WIP STABLE  set_a_weightedSPAN_CSD:: S -> a -> SPAN  ->  SPAN
 *  NOW READY TO REFACT set_anElement_Style which mutates each span in a given Rclss.Div NL
 *  160819  @1850 -> STABLE && WIP:
 *  now using R.slice instead of _one_Sof_Rclss_Spans_BY_()
 *  IN FILE: -> UPDATES the 3 RClss DIVS. They are now stand alone DIVS and the Chptr_31 DIV is :hidden
 */

"use strict";
// requires♣
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
var _outerHTML_SPAN_L = require('./src/DEPR_set_RClss_Divs').L_Spans_TO_L_Span_outerHTML_Str;

// -> Rclss DIV DEFINITIONS set here SO THAT the CSS styles are in effect for the DIV
var pst_div = document.querySelector('.pst_div');// -> div.pst_div
var cur_div = document.querySelector('.cur_div');
var fut_div = document.querySelector('.fut_div');
// CONSTANTS
var SPAN_NL = document.querySelectorAll('.Chptr_31 span');// -> NL[52]:: [span, spam, ...]
var outerHTML_SPAN_L = _outerHTML_SPAN_L(SPAN_NL);// -> Array[52]:: [S:"<span> 1 And...", S, ...]


/**
 * ----------------- Visual Confirm w/ index.html::  setting Rclss Element Styles ---------------------------
 */
// THESE 3 lines set the 3 Rclss children
pst_div.innerHTML = R.slice(0, 10)(outerHTML_SPAN_L); // -> S[2617]:"<spam 1 And.....
cur_div.innerHTML = R.slice(10, 15)(outerHTML_SPAN_L);
fut_div.innerHTML = R.slice(15, 52)(outerHTML_SPAN_L);

var CUT, RET;
/**
 *  ----------------- WIP ON pst_div VISUAL TESTS-------------------------
 * @type {HTMLElement[]}
 */
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
C_Both("LOOK AT TODOS");
