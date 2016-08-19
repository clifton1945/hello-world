/**
 *  main.js
 *  160816  @0650
 *      -> I recognize all the below working with separate Read Classes NEED TO BE consolidated.
 *      BUT first RETHINK a new main with two major FUNCTIONS: refresh the RClasses, refresh each spanStyle

 *  160815  @1730   -> expanded TEST INCLUDING USING computedStyle().prop rather than .style.prop
 *  @1503  Basic Tests
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


/**
 * ----------------- #1: refresh the RClasses: REFACT by consolidate soon ------------------------
 */

//      -------------    external functions
var _L_Span_outerHTML_Str = require('./src/set_RClss_Divs').L_Spans_TO_L_Span_outerHTML_Str;
var _one_Sof_Rclss_Spans_BY_ = require('./src/set_RClss_Divs').L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_;
// DEPRECATED var set_anElem_Style = require('./src/set_anElem_Style').set_anElem_Style;// Elem,N,L -> Elem

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
var pSpan = R.slice(0,5)(L_Span_outerHTML_Str);// -> Array[HTML::span, span..] where HTML::<span>
var pSpan_Str = R.slice(0,5)(L_Span_outerHTML_Str);// -> Array[Str::, S,...] where Str:: "<span> 1 And it came ...
// pst_div = R.slice(0,5)(Chptr_Span_NL);
// cur_div = R.slice(5,7)(Chptr_Span_NL);
// fut_div = R.slice(7,52)(Chptr_Span_NL);

/**
 *  --- finally, SET each  RClssDIV  - BY HAND FOR NOW - using outerHTML:
 *  There is probably a better why6 just using split REFACT _one_Sof_Rclss_Spans_BY_()
 */
pst_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg: 0, nxt: 5})(L_Span_outerHTML_Str);// -> S:"<span
cur_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg: 5, nxt: 7})(L_Span_outerHTML_Str);
fut_div.innerHTML = _one_Sof_Rclss_Spans_BY_({beg: 7, nxt: 52})(L_Span_outerHTML_Str);
// see test near end of this

/**
 *  ------------------------ #2 refresh each spanStyle ------------------------------
 */
/**
 *        ----- N_ndx_TO_N_wt_W_(L:[D_csdSpan, L_fam]):: N_elemNdx -> N_valu
 */
var N_ndx_TO_N_wt_W_ = require('./src/set_N_wt').f_set_N_wt;// (D -> L) -> N_ndx  ->  N_wt
/**
 *         -----    _CSD_to_CSD_weighted_w_::  N_wt -> CSD_in  -> CSD_final
 * @type {CSD}
 * @private
 */
// var csdTOwt_csd_ = require('./src/set_CSD_valu').CSD_to_CSD_weighted_w_;//  Fn:(N_wt -> CSD) -> CSD
var wtN_TO_wtCSD_W_ = require('./src/set_CSD_valu').CSD_to_CSD_weighted_w_;//  (N_wt) -> CSD -> CSD

var _setEachStyle = R.curry(
    (d_wtRng, l_famly, csd_init, n_ndx) => {//changed about @0720
        var _nwt = N_ndx_TO_N_wt_W_(d_wtRng, l_famly);// -> ndxN -> wtN
        var _nwt_csd = wtN_TO_wtCSD_W_(_nwt(n_ndx));// Fn:     HEY this with an N -> CSD
        return _nwt_csd;

        // var _nwt_csd = wtN_TO_wtCSD_W_(_nwt);//FIX this NOT _nwt(n_ndx). breakss
    });// Fn:((n_ndx) -> wtCSD

/**
 *         ----------------  CODE UNDER TEST: setEachStyle:: N_ndx -> CSD_wted -----------
 */
var CUT, RET, EXP;
// TEST CONSTANTS
var stub_csdWtRangeD = {smlWt: 0.5, lrgWt: 0.9};
var stub_famL = [0, 1, 2, 3, 4, 5];
var stub_csdInitD = {};
// CUT: _setEachStyle:: N -> CSD -> CSD
var wt = N_ndx_TO_N_wt_W_(stub_csdWtRangeD, stub_famL)(3);// -> .66
var nwncsd = wtN_TO_wtCSD_W_(.77)(stub_csdWtRangeD);// -> Obj
CUT = _setEachStyle(stub_csdWtRangeD, stub_famL, stub_csdInitD);
//TESTS OF: _setEachStyle()
RET = CUT(.3);
EXP = "66%";
t.equal(RET.fontSize, '66%', `EXP:${EXP}, NOT:${RET.fontSize}`);
t.equal(RET.key, 'myKey', `EXP:${EXP}, NOT:${RET.key}`);

/**
 *          BASIC TESTS   #1: refresh the RClasses   one Rclss DIV: cur_div
 */
t.ok(cur_div.tagName == 'DIV', 'cur_div SHOULD BE a DIV.');
t.ok(cur_div.firstElementChild.tagName == 'SPAN', 'cur_div.firstElementChild SHOULD BE a SPAN.');
t.ok(R.isArrayLike(cur_div.children), 'cur_div-children SHOULD BE a ArrayLike.');

/**
 *      LEARN && TEST -> getComputedStyle()
 */
// var CUT, RET;
// //CSS:  .pst_div { line-height: 60%;
var computedStyle = getComputedStyle(pst_div, null);
t.equal(computedStyle.lineHeight, '12px', 'pst CSS lineHeight SHOULD BE 12PX');
//CSS:   .cur_div { line-height: 150%;
computedStyle = getComputedStyle(cur_div, null);
t.equal(computedStyle.lineHeight, '30px', 'cur CSS lineHeight SHOULD BE 30px');


C_Both("OUT main.js");
