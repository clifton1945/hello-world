/**
 *  main.js
 *  160803  @0830 -> APPLYING set_ElemStyle TO 4 Rclss divs IN 2Nephi31_.html.
 *      WIP but STABLE.  Trying to learn CSS
 *  IN FILE: main.js -> SET each Verse CSD as a function of its Space parameters.
 */

"use strict";
// requires
var R = require('ramda');
var C_Both = require('./src/h').C_Both;
var set_ElemStyle = require('./src/set_ElemCSD').set_ElemStyle;//
//GLOBALS
// C_Both(JSON.stringify("IN main.js."));

C_Both(JSON.stringify("IN  main.js."));
// MAIN CodeUnderTest

let myMap = R.addIndex(R.map);
var CSD_L = myMap(set_ElemStyle);
let nl_allVerses;

nl_allVerses = R.reverse(document.querySelectorAll('.pst_div span'));
CSD_L(nl_allVerses);
nl_allVerses = document.querySelectorAll('.fut_div span');
// var noop =1;
CSD_L(nl_allVerses);
nl_allVerses = document.querySelectorAll('.fut_para span');
CSD_L(nl_allVerses);

C_Both(JSON.stringify("OUT main.js."));
