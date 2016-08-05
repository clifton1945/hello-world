/**
 *  set_ElemStyle:: (f_the_csd, e, ndx_e, fam_e)
 *  160729  @1500 -> STABLE as seen as index.html; removed output of map_aSpace
 *      @0820   -> OK
 *  160726  @0355   ->
 *  -> SET each Verse CSD as a function of their Space parameters
 *  map_aSpace.js   -> SET each Verse CSD as a function of their Space parameters
 *  IN FILE: map_aSpace.js
 */
"use strict";
// requires
var R = require('ramda');
var assert = require('assert');
var h = require('./h');
var tapThis = h.myTap;
var assignStyle =  h.assign_DivStyle;

console.log(JSON.stringify("IN set_ElemStyle.js."));
/**
 *        set_N_valu(L:[D_csdSpan, L_fam]):: N_elemNdx -> N_valu
 */
var f_set_N_valu = require('./set_N_valu').f_set_N_valu;// D -> N -> L  ->  N
/**
 *            _finalCSD};// _finalCSD:: CSD_in  -> N_valu ->  finalCSD
 * @type {_finalCSD}
 * @private
 */
var merge_CSDs = R.curry(require('./merge_CSDs').merge_CSDs);// merge_CSDs:: CSD_in  -> N_valu ->  finalCSD

// TEST CONSTANTS
var csdLimitsD = {smlWt:0.4, lrgWt:0.85};
var nl_allVerses = document.querySelectorAll('.vers');
// var baseCSD = {backgroundColor: 'lightGreen'};
// var baseCSD = {lineHeight: 1};
let baseCSD = {};

// var wip, set_ElemStyle;

// MAIN CodeUnderTest
var set_ElemStyle = R.curry(function (e, ndxN_e, famL_e) {
    // first step by step
    var _set_N_valu = f_set_N_valu(csdLimitsD, famL_e); // equivalent of partial w/o [list of args]
    // var nvalu = _set_N_valu(ndxN_e);
    // var csds = merge_CSDs(baseCSD)(nvalu);
    // var ret = assignStyle(e)(csds);// L:[CSD[0], CSD[1]...CSD[N-1]]
    var ret =  R.compose(h.assign_DivStyle(e), merge_CSDs(baseCSD),  _set_N_valu)(ndxN_e); // L:[CSD[0], CSD[1]...CSD[N-1]]
    // console.log('lineHeight -> ' + ret.lineHeight);
    // console.log('opacity -> ' + ret.opacity);
    return ret
});//
// set_ElemStyle:: (E:e, N:ndx_e, L:fam_e) ->  E: mutated
module.exports =  {set_ElemStyle};

console.log(JSON.stringify("OUT set_ElemStyle.js."));

//