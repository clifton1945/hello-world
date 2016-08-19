/**
     *  main.js
     *  160819  @1850 -> STABLE && WIP: now using R.slice instead of _one_Sof_Rclss_Spans_BY_()
     *      @1720 -> WIP && STABLE.  REFACT Names && ready to use R.slice instead of _one_Sof_Rclss_Spans_BY_()
 *      @1325 -> WIP BUT STABLE. can see opacity(ndx). Hardcoded for both pst_div && fut_div
 *      NXT move the set_anElem code to. guess what, set_anElem.js
 *      NXT add N_wt -> FORMATTING -> CSD_wt
 *  160816  @0650
 *      -> I recognize all the below working with separate Read Classes NEED TO BE consolidated.
 *      BUT first RETHINK a new main with two major FUNCTIONS: refresh the RClasses, refresh each spanStyle
 *  IN FILE: -> UPDATES the 3 RClss DIVS. They are now stand alone DIVS and the Chptr_31 DIV is :hidden
 */

"use strict";
// requires
var h = require('./src/h');
var C_Both = h.C_Both;
C_Both("IN  main.js");
// ------------------    REQUIRES
var R = require('ramda');
var t = require('assert');
//      -------------    external functions
var set_a_RclssElem = require('./src/set_anElem_Style').set_a_RclssElem;
var _outerHTML_SPAN_L = require('./src/set_RClss_Divs').L_Spans_TO_L_Span_outerHTML_Str;
// var _one_Sof_Rclss_Spans_BY_ = require('./src/set_RClss_Divs').L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_;

// Rclss DIV DEFINITIONS
var pst_div = document.querySelector('.pst_div');// -> div.pst_div
var cur_div = document.querySelector('.cur_div');
var fut_div = document.querySelector('.fut_div');
// CONSTANTS
var SPAN_NL = document.querySelectorAll('.Chptr_31 span');// -> NL[52]:: [span, spam, ...]

// TODO do I really need  this conversion?? And looking at the code HOW DOES IT WORK anyhow???
var outerHTML_SPAN_L = _outerHTML_SPAN_L(SPAN_NL);// -> Array[52]:: [S:"<span> 1 And...", S, ...]

/**
 * ----------------- Visual Confirm w/ index.html::  setting Rclss Element Styles ---------------------------
 */
// THESE 3 lines set the 3 Rclss children
pst_div.innerHTML = R.slice(0, 10)(outerHTML_SPAN_L); // Array[5]::[S, S, ...]
cur_div.innerHTML = R.slice(10, 15)(outerHTML_SPAN_L);
fut_div.innerHTML = R.slice(15, 52)(outerHTML_SPAN_L);

// TODO   I do not see how doing these to the Rclss div is needed.
// Why not just set the span for these n elements and THEN set the div.innerHTML???
// lets try using just SPAN_NL The old but stable code is set with //FIX

var L = pst_div.children;// ->[s0, s1,...]
var pst_wtRng = {smlWt: 0.9, lrgWt: 0.10};
var pst_fmlyLen = L.length;
var RET = R.addIndex(R.map)(set_a_RclssElem(pst_wtRng, pst_fmlyLen))(L);//Elem,N,L -> [Elem,...]

L = fut_div.children;// -> div:fut_div
pst_wtRng = {smlWt: 0.1, lrgWt: 0.90};
pst_fmlyLen = L.length;
RET = R.addIndex(R.map)(set_a_RclssElem(pst_wtRng, pst_fmlyLen))(L);//Elem,N,L -> [Elem,...]

/**
 * --------------- MAJOR REFACT: R.assoc() -----------------
 */
// var w = R.identity;// stand in for ndxN_TO_wtN()
// var fontSize_CSD = {fontSize:w('5px')};// -> CSD.fontSize:'5px'
// var opacity_CSD = {opacity:w('0.5')};// -> CSD
// // BUILD a reference List of HYMLElement.style CSDs
// var keyL = R.mergeAll([fontSize_CSD, opacity_CSD, {aKey:'aValue'}]);// -> L:
// var _fsCSD = R.assoc('fontSize'); // keyS -> keyL
// var _opCSD = R.assoc('opacity');
// var ndxN = 33;
// var _wt_oneCSD = ( ndxN) => R.compose(
//     _opCSD(w(ndxN)), _fsCSD(w(ndxN))
// );// keyL -> CSD:{k:v}
// // var RET = _wt_oneCSD(.75)()
//
// // var ndxN_TO_wtN_W_ = require('./src/set_N_wt').f_set_wtN;// (D -> N_fam -> N_ndx  ->  N_wt
//
// var _wt_allCSD = (d,n,l) => _wt_oneCSD(0.5 + n/10)([opacity_CSD]) ;//  -> N_ndx ->
// /**
//  * --------- use var N_ndx_TO_N_wt_W_ = require('./src/set_N_wt').f_set_N_wt;// (D -> L) -> N_ndx  ->  N_wt
//  */
// var  pstSpans_L = R.slice(0,5)(SPAN_NL);// L[5]:{span, span, ...]
// var newCSD_L = R.addIndex(R.map)(_wt_allCSD([opacity_CSD]))(pstSpans_L);// L:[span, span, ...] -> L:[spanCSD, spanCSD, ...]
// C_Both(JSON.stringify(newCSD_L));// -> oneCSD:{{}, {}, ...}

C_Both("OUT main.js");
