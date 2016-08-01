/**
 *  main.js
 *  16080   @0810 -> SET each Verse CSD as a function of its Space parameters IS STABLE TESTS and lightly tested
 *      @0640   -> requiring just set_ElemStyle::Fn( E->N->L) - E
 *  IN FILE: main.js -> SET each Verse CSD as a function of its Space parameters.
 */
"use strict";
// requires
var R = require('ramda');
var C_Both = require('./src/h').C_Both;
var set_ElemStyle = require('./src/set_ElemStyle').set_ElemStyle;//
//GLOBALS
C_Both(JSON.stringify("IN main.js."));

// test data
let nl_allVerses = document.querySelectorAll('.vers');

// MAIN CodeUnderTest
let myMap = R.addIndex(R.map);
var CSD_L = myMap(set_ElemStyle)(nl_allVerses);// L of CSD for each element

C_Both(JSON.stringify("OUT main.js."));
