/**
 *  _map_aSpace:: (f_the_csd, e, ndx_e, fam_e)
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
var C_Both = require('./h').C_Both;
var _n_calcWt = require('./_N_valu_set')._n_calcWt;//    _n_calcWt:: D:lmntD -> L:fam -> Fn:(N:elemNdx -> N:elemWt)
var _csds = require('./update_CsdD')._csds;//       _csds:: D:inCsd -> (N:wt) ->  D:outCSD
//GLOBALS
console.log(JSON.stringify("IN map_aSpace.js."));
// TEST CONSTANTS
var csdLimits = {smlWt:0.4, lrgWt:0.9};
var nl_allVerses = document.querySelectorAll('.vers');
var wip, _map_thisSpace;

// MAIN CodeUnderTest
var _calcWt = _n_calcWt(csdLimits)(nl_allVerses);           // _calcWt:: N:ndx -> N:elemWt
var _frmttdCsdsD = _csds({});                               // _frmttdCsdsD:: N:elemWt -> D:outCsdElem
var _trgtCsdD = R.compose(_frmttdCsdsD, _calcWt);           // N -> D

var f_map_thisSpace = R.curry(function (f_the_csd, e, ndx_e, fam_e) {
    var x = Object.assign(e.style, f_the_csd(ndx_e));
    // console.log('wip3 -> ' + x.opacity)
});//
_map_thisSpace = f_map_thisSpace(_trgtCsdD);

console.log(JSON.stringify("OUT map_aSpace.js."));

// _map_thisSpace:: (e, ndx_e, fam_e) ->  ??????
module.exports =  {_map_thisSpace};
//