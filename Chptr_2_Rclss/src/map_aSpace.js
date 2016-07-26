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
var C_Both = require('./h').C_Both;// NOT NEEDED for asserts
// var f_n_calcWt = require('./calcWt').f_n_calcWt;
var _n_calcWt = require('./calcWt')._n_calcWt;
var _set_trgt_Csds = require('./update_CsdD')._set_trgt_Csds;
//GLOBALS
console.log(JSON.stringify(" I am in map_aSpace.js."));

// test data
// var nl_allVerses = document.querySelectorAll('.vers');
// var e_aVerse = nl_allVerses.item(2);
// var nl_stub = [0,1,2,3];
// var csdLimits = {smlWt:0.86, lrgWt:0.95};
// var _calcWt = _n_calcWt({smlWt:0.86, lrgWt:0.95}, [0,1,2,3]);//           :: D:lmntD -> L:fam -> N:ndx -> N:wt
// assert.equal(_calcWt(0), 0.95, 'EXP: _calcWt(0) -> 0.95 ');
// MAIN CodeUnderTest

var _wter = R.curry(
    (f_calcWt, e, n, l) => {
    var _trgt_Csds = _set_trgt_Csds(f_calcWt);//     N:ndx -> D:inCsd -> D:outCsd
    var trgt_Csds = _trgt_Csds(n)({});//                D:csd
    var x = JSON.stringify(trgt_Csds);//                D:csd
    console.log(JSON.stringify(x));
    Object.assign(e.style, trgt_Csds);
    return n;
});//           Fn:(*-> N) -> E:
var myMap = R.addIndex(R.map);
myMap(_wter);
let _map_aSpace = (fn, e, n, l) => R.curry(myMap(_wter(fn)));// E:html -> N:ndx
// var noop = 1;
module.exports =  { _map_aSpace};
