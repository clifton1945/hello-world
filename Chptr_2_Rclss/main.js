/**
 *  main.js
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
var _map_aSpace = require('./src/map_aSpace')._map_aSpace;
//GLOBALS

// test data
var nl_allVerses = document.querySelectorAll('.vers');
// var e_aVerse = nl_allVerses.item(2);
C_Both(JSON.stringify("In main.js"));

// MAIN CodeUnderTest
var csdLimits = {smlWt:0.4, lrgWt:0.9};
var _calcWt = _n_calcWt(csdLimits, nl_allVerses);//           :: E:lmntD -> L:fam -> (N:ndx -> N:wt)
_map_aSpace(_calcWt)( nl_allVerses);
// var noop = 1;
