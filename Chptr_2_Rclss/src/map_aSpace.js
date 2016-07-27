/**
 *  map_aSpace:: D -> L:elems -> L:elems
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
// var _n_calcWt = require('./calcWt')._n_calcWt;
var _set_trgt_Csds = require('./update_CsdD')._set_trgt_Csds;//Fn:(* -> N:wt) -> N:ndx -> D:inCsd -> D:outCSD
//GLOBALS
console.log(JSON.stringify("In map_aSpace.js."));

// MAIN CodeUnderTest
var f_wter =  R.curry(( f_calcWt, e, n, l) => R.compose(
    Object.assign(e.style),
    _set_trgt_Csds(f_calcWt)(n)
)); //  Fn:(*-> N) -> D:csd -> E:
var _wter = R.curry(
    // (f_calcWt) => {
    (f_calcWt, e, n, l) => {
    var _trgt_Csds = _set_trgt_Csds(f_calcWt);//:     N:ndx -> D:inCsd -> D:outCsd
    var trgt_Csds = _trgt_Csds(n)({});//                D:csd
    var x = JSON.stringify(trgt_Csds);//                D:csd
    console.log(JSON.stringify(x));
    Object.assign(e.style, trgt_Csds);
    return n;
});// Fn:(*-> N) -> E:
// var myMap = R.addIndex(R.map);
// myMap(_wter);
// let fnX = (fn, csdD) =>  R.addIndex(R.map)(f_wter(fn, R.__));// E:html -> N:ndx
let _map_aSpace = (fn) =>  R.addIndex(R.map)(_wter(fn));// E:html -> N:ndx
module.exports =  { _map_aSpace};
//