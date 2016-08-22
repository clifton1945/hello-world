/**
 *  main.js
 *  160822  @0833 -> WIP STABLE  set_a_weightedSPAN_CSD:: S -> a -> SPAN  ->  SPAN
 *  NOW READY TO REFACT set_anElement_Style which mutates each span in a given Rclss.Div NL
 *  160819  @1850 -> STABLE && WIP:
 *  now using R.slice instead of _one_Sof_Rclss_Spans_BY_()
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

// -> Rclss DIV DEFINITIONS set here SO THAT the CSS styles are in effect for the DIV
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
pst_div.innerHTML = R.slice(0, 10)(outerHTML_SPAN_L); // -> S[2617]:"<spam 1 And.....
cur_div.innerHTML = R.slice(10, 15)(outerHTML_SPAN_L);
fut_div.innerHTML = R.slice(15, 52)(outerHTML_SPAN_L);

// Why not just set the span for these n elements and THEN set the div.innerHTML???

/**
 *  ----- ----- set_a_weighterCSD::  Fn:((S -> a ) -> SPAN) -> SPAN             -----
 *      set_a_weighterCSD = function (key, valu) function MUTATES && returns the SPAN
 * @param key -> CSD property String
 * @param valu -> CSD property value
 */
var f_set_a_weightedCSD = function (key, valu) {
    return  R.assoc(key, valu);// THIS WORKS !!
};
var set_a_weighterCSD = R.curry(f_set_a_weightedCSD);

/**
 *  ----- ----- f_set_a_weightedSPAN_CSD::  a -> SPAN -> SPAN             -----
 *      set_a_weightedSPAN_CSD = function ( valu, span) MUTATES && returns the SPAN
 * @param span
 * @param weight
 * @return {*} same SPAN with a mutated CSD
 */
var f_set_a_weightedSPAN_CSD = function (weight, span) {
   var fn = R.compose(
       set_a_weighterCSD('fontSize', weight),
       set_a_weighterCSD('opacity', weight)
    );
    // var csd = R.assoc(key, valu, span);// THIS WORKS !!
    return Object.assign(span.style, fn(span));// this DOES mutate the span.style??
};
var set_a_weightedSPAN_CSD = R.curry(f_set_a_weightedSPAN_CSD);

/**
 *  ----------------- WIP ON pst_div -------------------------
 * @type {HTMLElement[]}
 */
var L = pst_div.children;// ->HTMLCollection[N]:: [span,[s0, s1,...]

// here is what these children look like
var whatIsThis = L[0].outerHTML; // -> S::"<span> 1 And .....]
whatIsThis = L[0].innerHTML; // -> S::" 1 And .....]
// stubs for testing
var pst_wtRng = {smlWt: 0.9, lrgWt: 0.10};
var pst_fmlyLen = L.length;
var aSpan = L[4];

set_a_weightedSPAN_CSD('175%', aSpan);

// below is soon to be deprecated code
var RET = R.addIndex(R.map)(set_a_RclssElem(pst_wtRng, pst_fmlyLen))(L);//Elem,N,L -> [Elem,...]
// lets try this instead
// var RET = R.addIndex(R.map)(set_a_RclssElem(pst_wtRng, pst_fmlyLen))(L);//Elem,N,L -> [Elem,...]


/**
 *  ----------------- WIP ON fut_div -------------------------
 * @type {HTMLElement[]}
 */
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
// C_Both("LOOK AT TODOS");
