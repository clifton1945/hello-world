/**
 *  main.js
 *  160726  @1830 -> success: map which USES two Space attributes( csdLimitsD && versesNL ) MUTATE all elements
 *      Fn: _map_aSpace:: Fn:_calcWt -> L:nodeList -> Doc:Elem.style mutated
 *      Fn:: _calcWt:: USES two Space attributes( csdLimitsD && versesNL ) -> N;ndx -> N:wt
 *      L: nodelist -> L:[elem]
 *      TODO: CLEAN UP map_aSpace and calcWt.  probably switch _calcWt L param TO N
 *  160725  @0505 -> success. created map_aSpace.js removing all code except the csd limits Dict  FROM main.js
 *      @1712  ->  FINALLY SET each Verse CSD as a function of their Space parameters. CRUDELY
 *  160723  @ 0835 ->  READY TO set each verse csd NOW WITH  _set_trgt_Csds() from update_Csds.js
 *  IN Chptr_2_Rclss/.../tst/
 *  IN FILE: main.js -> SET each Verse CSD as a function of their Space parameters.
 */
"use strict";
// requires
var R = require('ramda');
// var assert = require('assert');
var C_Both = require('./src/h').C_Both;
var _map_aSpace = require('./src/map_aSpace')._map_aSpace;
var _n_calcWt = require('./src/calcWt')._n_calcWt;
// var _set_trgt_Csds = require('./src/update_CsdD')._set_trgt_Csds;
//GLOBALS

// test data
var nl_allVerses = document.querySelectorAll('.vers');
var e_aVerse = nl_allVerses.item(2);
C_Both(JSON.stringify(" I am in main.js"));

// MAIN CodeUnderTest
var csdLimits = {smlWt:0.35, lrgWt:0.95};
var _calcWt = _n_calcWt(csdLimits, nl_allVerses);//           :: E:lmntD -> L:fam -> (N:ndx -> N:wt)
_map_aSpace(_calcWt)( nl_allVerses);
// var noop = 1;
