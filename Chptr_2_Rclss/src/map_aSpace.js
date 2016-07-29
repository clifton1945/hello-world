/**
 *  map_aSpace:: D -> L:elems -> L:elems
 *  160729  @1355 -> wip2 STABLE
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
var _n_calcWt = require('./calcWt')._n_calcWt;//        _n_calcWt:: D:lmntD -> L:fam -> Fn:(N:elemNdx -> N:wt)
// var _trgt_Csds = R.curry(require('./update_CsdD')._trgt_Csds);// _trgt_Csds:: (N:wt) -> D:inCsd -> D:outCSD
var _csds = require('./update_CsdD')._csds;// _csds:: D:inCsd -> (N:wt) ->  D:outCSD
//GLOBALS
console.log(JSON.stringify("IN map_aSpace.js."));
// TEST CONSTANTS
var csdLimits = {smlWt:0.4, lrgWt:0.9};
var nl_allVerses = document.querySelectorAll('.vers');
var wip, _map_thisSpace;

// MAIN CodeUnderTest

var fn1; // N:ndx -> N:wt
fn1 = _n_calcWt(csdLimits)(nl_allVerses);// fn1:: N -> N
// wip = R.compose(fn1);// N -> N
// _map_thisSpace = (e, ndx_e, fam_e) => console.log('m1->' + wip(ndx_e));

var fn2; // D:inCsdElem -> N:wtElem -> D:outCsdElem
fn2 = _csds({});// fn2:: N:ndx -> D:csd
wip = R.compose(fn2, fn1); // N -> D
_map_thisSpace = (e, ndx_e, fam_e) => console.log('wip2->' + wip(ndx_e).fontSize);
var fn3; // E:elem -> D:csdElem -> E:elem
// var fn4; // (N:ndx, L:famElem) -> E:elem
// var fn5; // (elem, ndxElem, famElem) -> E:elem

console.log(JSON.stringify("OUT map_aSpace.js."));

// _map_thisSpace:: (e, ndx_e, fam_e) ->  ??????
module.exports =  {_map_thisSpace};
//