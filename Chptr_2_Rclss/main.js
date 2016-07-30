/**
 *  main.js
 * 160730   @1224 -> quick test in main.js shows _calc_N_valu WORKS as a compose.
 * 160729   @0745 -> REFACT var names
 * _n_calcWt:: (D->L) -> N:elemNdx -> N:wt

 *  160729  @0906 -> WIP & STABLE USING stub from _map_aSpace.
 *      @0815 -> BROKE seemingly due to weird _map_aSpace
 *  IN FILE: main.js -> SET each Verse CSD as a function of its Space parameters.
 */
"use strict";
// requires
var R = require('ramda');
var C_Both = require('./src/h').C_Both;
var _n_calcWt = require('./src/calc_N_valu')._n_calcWt;
var _map_thisSpace = require('./src/map_aSpace')._map_thisSpace;
//GLOBALS
C_Both(JSON.stringify("IN main.js."));

// test data
let nl_allVerses = document.querySelectorAll('.vers');
let csdLimits = {smlWt:0.1, lrgWt:1.5};

// MAIN CodeUnderTest
let myMap = R.addIndex(R.map);
var done = myMap(_map_thisSpace)(nl_allVerses);

//quick test in main.js shows _calc_N_valu WORKS as a compose.
let _calc_N_valu = require('./src/calc_N_valu')._calc_N_valu;
let fn = function fn ( el, nd, fam) {
    //R.partial(f_calc_N_valu);//:: L:[D_csdSpan, L_fam] -> N_elemNdx -> N_valu
    var x = R.compose(_calc_N_valu([csdLimits, fam]))(nd); //WORKS
    C_Both('N_valu:' + x);
    return x
};
myMap(fn, nl_allVerses);

C_Both(JSON.stringify("OUT main.js."));
// var noop = 1;
