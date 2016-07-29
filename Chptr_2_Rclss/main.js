/**
 *  main.js
 *  160729  @0815 -> BROKEN seemingly due to weird _map_aSpace
 *  160727  @0613 -> REFACTING
 *  160726  @1830 -> success: map which USES two Space attributes( csdLimitsD && versesNL ) MUTATE all elements
 *      Fn: _map_aSpace:: Fn:_calcWt -> L:nodeList -> Doc:Elem.style mutated
 *      Fn:: _calcWt:: USES two Space attributes( csdLimitsD && versesNL ) -> N;ndx -> N:wt
 *      L: nodelist -> L:[elem]
 *      TODO: CLEAN UP map_aSpace and calcWt.  probably switch _calcWt L param TO N
 *  IN FILE: main.js -> SET each Verse CSD as a function of their Space parameters.
 */
"use strict";
// requires
var R = require('ramda');
var C_Both = require('./src/h').C_Both;
var _n_calcWt = require('./src/calcWt')._n_calcWt;
// var _map_aSpace = require('./src/map_aSpace').fnX;
var _map_aSpace = require('./src/map_aSpace')._map_aSpace;
//GLOBALS
C_Both(JSON.stringify("IN main.js."));

// test data
var nl_allVerses = document.querySelectorAll('.vers');
var csdLimits = {smlWt:0.4, lrgWt:0.9};

// MAIN CodeUnderTest
var _calcWt = _n_calcWt(csdLimits, nl_allVerses);//           :: E:lmntD -> L:fam -> (N:ndx -> N:wt)
_map_aSpace(_calcWt)( nl_allVerses);// ?????????????

C_Both(JSON.stringify("OUT main.js."));
// var noop = 1;
