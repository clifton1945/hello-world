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
var _N_valu_set = require('./_N_valu_set')._N_valu_set;//    _N_valu_set(L:[D_csdSpan, L_fam]):: N_elemNdx -> N_valu
var _CSD_partial = require('./_CSD_final')._CSD_final;//       _CSD_partial:: D:inCsd -> (N:wt) ->  D:outCSD
//FIX  do not use partial if it is not R.partialled needing a parameter of type L
//GLOBALS

console.log(JSON.stringify("IN map_aSpace.js."));
// TEST CONSTANTS
var csdLimits = {smlWt:0.4, lrgWt:0.9};
var nl_allVerses = document.querySelectorAll('.vers');
var wip, _map_thisSpace;

// MAIN CodeUnderTest
var _N_valu = _N_valu_set([csdLimits, nl_allVerses]);           // _N_valu:: N:ndx -> N:elemWt
// var _CSD_final = _CSD_partial({});
var _CSD_final = R.compose(_CSD_partial({}), _N_valu); // N_ndx ->  CSD_final         //FIX

var fn = R.curry(function (e, ndx_e, fam_e) {
    var CSD_final  = _CSD_final(ndx_e);
    var x = Object.assign(e.style, CSD_final);
    console.log('wip3 -> ' + x.opacity);
    return x
});//
// _map_thisSpace:: (e, ndx_e, fam_e) ->  ??????
_map_thisSpace = fn;
module.exports =  {_map_thisSpace};

console.log(JSON.stringify("OUT map_aSpace.js."));

//