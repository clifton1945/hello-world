/**
 * tst/t3_Scotch/main.js
 * 160701
 *  @0746: building and learning .gitignore
 *  @0730: 1st commit:tst\ t3_Scotch tutorial#3 IN Brwsrfy/tst
 */
// main.js
"use strict";
var R = require('ramda');
var unique = require('uniq');
var tapeTests = require('./tape_tests.js');


var square = function square (x) { return x * x; };
var data =  [0,7, 1, 3, 3, 2, 3, 4, 5, 6];
var squares = R.chain(square);
var uniq_squares = R.compose(squares, unique);
document.getElementById('response').innerHTML = uniq_squares(data);

data = [8, 1,2,2,3,7,4,4,6];
console.log(JSON.stringify(unique(data)));
