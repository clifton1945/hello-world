/**
 *  main.js
 *  160819  @1325 -> WIP BUT STABLE. can see opacity(ndx). Hardcoded for both pst_div && fut_div
 *      NXT move the set_anElem code to. guess what, set_anElem.js
 *      NXT add N_wt -> FORMATTING -> CSD_wt
 *  160816  @0650
 *      -> I recognize all the below working with separate Read Classes NEED TO BE consolidated.
 *      BUT first RETHINK a new main with two major FUNCTIONS: refresh the RClasses, refresh each spanStyle

 *  160815  @1730   -> expanded TEST INCLUDING USING computedStyle().prop rather than .style.prop
 *  @1503  Basic Tests
 *  @1050 over all: now available 3 Rclss divs OF spanStrs
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


/**
 * ----------------- #1: refresh the RClasses: REFACT by consolidate soon ------------------------
 */

//      -------------    external functions
var _L_Span_outerHTML_Str = require('./src/set_RClss_Divs').L_Spans_TO_L_Span_outerHTML_Str;
var _one_Sof_Rclss_Spans_BY_ = require('./src/set_RClss_Divs').L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_;
// BREAKS var set_anElem_Style = require('./src/set_anElem_Style').set_anElem_Style;// Elem,N,L -> Elem

// CONSTANTS
var Chptr_Span_NL = document.querySelectorAll('.Chptr_31 span');// -> NL
var pst_div = document.querySelector('.pst_div');// -> div.pst_div
var cur_div = document.querySelector('.cur_div');
var fut_div = document.querySelector('.fut_div');

// KEEP SEPARATE it does not change much
var L_Span_outerHTML_Str = _L_Span_outerHTML_Str(Chptr_Span_NL);

/**
 *              R.slice:: look at a better simpler way to handle <spans>
 */
var pSpan = R.slice(0, 5)(L_Span_outerHTML_Str);// -> Array[HTML::span, span..] where HTML::<span>
var pSpan_Str = R.slice(0, 5)(L_Span_outerHTML_Str);// -> Array[Str::, S,...] where Str:: "<span> 1 And it came ...
// pst_div = R.slice(0,5)(Chptr_Span_NL);
// cur_div = R.slice(5,7)(Chptr_Span_NL);
// fut_div = R.slice(7,52)(Chptr_Span_NL);

/**
 *  --- finally, SET each  RClssDIV  - BY HAND FOR NOW - using outerHTML:
 *  There is probably a better why6 just using split REFACT _one_Sof_Rclss_Spans_BY_()
 */
pst_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg: 0, nxt: 6})(L_Span_outerHTML_Str);// -> S:"<span
cur_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg: 6, nxt: 9})(L_Span_outerHTML_Str);
fut_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg: 9, nxt: 52})(L_Span_outerHTML_Str);



//
/**
 *  --------------- TRY set_anElem_Style--------------------
 */
var f_s_w = require('./src/set_N_wt').f_set_wtN;// f_set_wtN(D_csdLmts ->  N_famLen -> N_elemNdx  ->   N_wt
var f_set_wtN = R.curry(f_s_w);

// var _set_wtN = R.curry(d_rng => l_fam => n_ndx => {// D -> L -> N  ->  N
//     return f_set_wtN(d_rng, l_fam.length, R.__);
// });
var _set_wtElem = R.curry( (elem, n_wt)  => {
    Object.assign(elem.style, {opacity: n_wt});
});// Elem  -> N ->  -> Elem

var CUT = (e_e, n_e, l_e) => {// (Elem -> N -> L)  ->  Elem
    let n_wt = R.curry(f_set_wtN({smlWt: 0.1, lrgWt: 0.90}, l_e.length));// (D, L)::  -> N  ->  N
    var ret = R.compose(
        _set_wtElem(e_e),
        // h.myTap, BROKEN ???
        n_wt
    )(n_e);// this returns
    return e_e
};
// this will be pst_div
var L = R.reverse(pst_div.children);// ->[s6, s5,...]
var RET = R.addIndex(R.map)(CUT)(L);//Elem,N,L -> [Elem,...]
// this will be fut_div
L = fut_div.children;
RET = R.addIndex(R.map)(CUT)(L);//Elem,N,L -> [Elem,...]
// REFACT  TOO LONG C_Both(JSON.stringify(RET));// -> [{}, {}.,...] not instructive

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
// var  pstSpans_L = R.slice(0,5)(Chptr_Span_NL);// L[5]:{span, span, ...]
// var newCSD_L = R.addIndex(R.map)(_wt_allCSD([opacity_CSD]))(pstSpans_L);// L:[span, span, ...] -> L:[spanCSD, spanCSD, ...]
// C_Both(JSON.stringify(newCSD_L));// -> oneCSD:{{}, {}, ...}

C_Both("OUT main.js");
