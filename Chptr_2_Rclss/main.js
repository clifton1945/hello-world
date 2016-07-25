/**
 *  main.js
 *  160725  @1712  ->  FINALLY SET each Verse CSD as a function of their Space parameters. CRUDELY
 *  160723  @ 0835 ->  READY TO set each verse csd NOW WITH  _set_trgt_Csds() from update_Csds.js
 *  IN Chptr_2_Rclss/.../tst/
 *  IN FILE: main.js -> SET each Verse CSD as a function of their Space parameters.
 */

// requires
var R = require('ramda');
var assert = require('assert');
// var test = require('tape');
var C_Both = require('./src/h').C_Both;
var _n_calcWt = require('./src/calcWt')._n_calcWt;
var _set_trgt_Csds = require('./src/update_CsdD')._set_trgt_Csds;
//GLOBALS

// test data
var nl_allVerses = document.querySelectorAll('.vers');
var e_aVerse = nl_allVerses.item(2);

C_Both(JSON.stringify(" I am here."));
// C_Both(JSON.stringify(e_aVerse.innerText));

// MAIN CodeUnderTest
var csdLimits = {smlWt:0.3, lrgWt:0.95};

var _wter = (e, n, l) => {
    // JSON.stringify(n);//        D:csd
    var  _calcWt = _n_calcWt(csdLimits, l);//        D->L->N -> N;wt
    var _trgt_Csds = _set_trgt_Csds(_calcWt);//      N:ndx -> D:inCsd -> D:outCsd
    var trgt_Csds = _trgt_Csds(n)({});//        D:csd
    var x = JSON.stringify(trgt_Csds);//        D:csd
    console.log(JSON.stringify(x));
    Object.assign(e.style, trgt_Csds);
    // console.log(trgt_Csds);
    return n;
};
var myMap = R.addIndex(R.map);
// myMap(_wter, nl_allVerses);
let l = myMap(_wter)(nl_allVerses);
var noop = 1;
