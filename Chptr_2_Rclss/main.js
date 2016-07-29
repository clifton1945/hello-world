/**
 *  main.js
 *  160729  @0906 -> WIP & STABLE USING stub from _map_aSpace.
 *      @0815 -> BROKE seemingly due to weird _map_aSpace
 *  IN FILE: main.js -> SET each Verse CSD as a function of its Space parameters.
 */
"use strict";
// requires
var R = require('ramda');
var C_Both = require('./src/h').C_Both;
var _n_calcWt = require('./src/calcWt')._n_calcWt;
// _map_thisSpace:: (e, ndx_e, fam_e) -> (*->ndx_e)
var _map_thisSpace = require('./src/map_aSpace')._map_thisSpace;
//GLOBALS
C_Both(JSON.stringify("IN main.js."));

// test data
var nl_allVerses = document.querySelectorAll('.vers');
var csdLimits = {smlWt:0.4, lrgWt:0.9};

// MAIN CodeUnderTest
var myMap = R.addIndex(R.map);
var done = myMap(_map_thisSpace)(nl_allVerses);

C_Both(JSON.stringify("OUT main.js."));
// var noop = 1;
