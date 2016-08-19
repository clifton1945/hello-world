/**
 *  set_anElement_Style.js
 *  160819  @1900 -> exports a new Fn: set_a_RclssElem() which need REFACT
 *  160816  @0700 -> TRYING FOR AN ALL INCLUSIVE set_anElem_Style DOES NOT WORK because
 *      (1) set_N_wt needs a current D_Nwt_Range and a current L_family OR N_family length
 *      (2) set_CSD_valu needs a current CSD_init - ALTHOUGH should just set a defaultCSD:{}
 *  IN FILE: set_anElement_Style.js -> SET each Verse CSD as a function of their Space parameters
 */
"use strict";
// requires
var R = require('ramda');
var h = require('./h');
var tapThis = h.myTap;

console.log("IN set_anElem_Style.js.");

var f_s_w = require('./set_N_wt').f_set_wtN;// f_set_wtN(D_csdLmts ->  N_famLen -> N_elemNdx  ->   N_wt
var f_set_wtN = R.curry(f_s_w);

exports.set_a_RclssElem = (d_wtRng, n_fmly)=> {
    // helpers
    let Elem_to_wtElem_w_wtN = R.curry((elem, ndxN_to_wtN_w_) => {
        Object.assign(elem.style, {opacity: ndxN_to_wtN_w_});
    });// Elem  -> N ->  -> Elem
    let ndxN_to_wtN_w_ = R.curry(f_set_wtN(d_wtRng, n_fmly));// (D, L)::  -> N  ->  N
    let ndxN_to_wtElem = R.curry(function ndxN_to_wtElem (e_e, n_e, l_e) {// (Elem -> N -> L)  ->  Elem
        let ret = R.compose(
            Elem_to_wtElem_w_wtN(e_e), // N -> E
            // wtN_to_wtCSD_w_
            // h.myTap, BROKEN ???
            ndxN_to_wtN_w_ //N -> N
        )(n_e);// this returns
        return e_e
    });
    return ndxN_to_wtElem
};

var assert = require('assert');
// TEST CONSTANTS
// var csdLimitsD = {smlWt:0.4, lrgWt:0.90};
// var stubList = [0,1,2,3,4];
// assert( N_ndx_TO_N_wt_W_())

console.log("OUT set_anElem_Style.js.");