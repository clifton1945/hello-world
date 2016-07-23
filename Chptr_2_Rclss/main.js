/**
 *  main.js
 *  160723  @ 0835 ->  READY TO set each verse csd NOW WITH  _set_trgt_Csds() from update_Csds.js
 *  IN Chptr_2_Rclss/.../tst/
 *  IN FILE: main.js -> SET each Verse CSD as a function of their Space parameters.
 */

// requires
var R = require('ramda');
var C_Both = require('src/h').C_Both;
var assert = require('assert');
var test = require('tape');
var _n_calcWt = require('src/calcWt')._n_calcWt;
var _set_trgt_Csds = require('./src/update_CsdD')._set_trgt_Csds;
//GLOBALS

// test data
var nl_allVerses = document.querySelectorAll('.vers');
var e_aVerse = nl_allVerses.item(2);
C_Both(JSON.stringify(e_aVerse.innerText));

// MAIN CodeUnderTest



