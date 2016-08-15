/**
 *  set_ElemCSD:: (f_the_csd, e, ndx_e, fam_e)
 *  160806  @0707   -> name change FROM set_ElementStyle
 *  IN FILE: set_ElemCSD.js -> SET each Verse CSD as a function of their Space parameters
 */
"use strict";
// requires
var R = require('ramda');
var assert = require('assert');
var h = require('./h');
var tapThis = h.myTap;
var assignStyle =  h.assign_DivStyle;

console.log(JSON.stringify("IN set_anElem_CSD.js."));

/**
 *        set_N_wt(L:[D_csdSpan, L_fam]):: N_elemNdx -> N_valu
 */
var f_set_N_wt = require('./set_N_wt').f_set_N_wt;// D -> N -> L  ->  N
/**
 *            _finalCSD};// _finalCSD:: CSD_in  -> N_valu ->  finalCSD
 * @type {_finalCSD}
 * @private
 */
var weight_merge_CSD_valus = R.curry(require('./DEPR_weight_merge_CSD_valus').weight_merge_CSD_valus);// weight_merge_CSD_valus:: CSD_in  -> N_valu ->  finalCSD

// TEST CONSTANTS
var csdLimitsD = {smlWt:0.4, lrgWt:0.90};
// var nl_allVerses = document.querySelectorAll('.vers');
var nl_allVerses = document.querySelectorAll('span');
// var baseCSD = {backgroundColor: 'lightGreen'};
let baseCSD = {};

// var wip, set_anElem_CSD;

// MAIN Export
var set_anElem_CSD = R.curry(function (e, ndxN_e, famL_e) {
    // first step by step
    var _set_N_wt = f_set_N_wt(csdLimitsD, famL_e); // equivalent of partial w/o [list of args]
    // var nvalu = _set_N_wt(ndxN_e);
    // var csds = weight_merge_CSD_valus(baseCSD)(nvalu);
    // var ret = assignStyle(e)(csds);// L:[CSD[0], CSD[1]...CSD[N-1]]
    var ret =  R.compose(h.assign_DivStyle(e), weight_merge_CSD_valus(baseCSD),  _set_N_wt)(ndxN_e); // L:[CSD[0], CSD[1]...CSD[N-1]]
    // console.log('lineHeight -> ' + ret.lineHeight);
    // console.log('opacity -> ' + ret.opacity);
    return ret
});
module.exports =  set_anElem_CSD;//:: (E:e, N:ndx_e, L:fam_e) ->  E:mutated

console.log(JSON.stringify("OUT set_anElem_CSD.js."));