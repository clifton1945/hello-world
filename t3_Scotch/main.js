/**
 * tst/t3_Scotch/main.js
 * 160725 @0545  getting 'required not recognized error and no debug???
 * 160722 re looked at to understand that
 *  even with browserify bundle a node.js test of main.js shows >>
 *  ReferenceError: document is not defined
 */
// main.js
"use strict";
var R = require('ramda');

var square = function square (x) { return x * x; };
var squares = R.chain(square);

document.getElementById('response').innerHTML = squares;

// var unique = require('uniq');
// var tapeTests = require('./tape_tests.js');
// var data =  [0,7, 1, 3, 3, 2, 3, 4, 5, 6];

// var uniq_squares = R.compose(squares, unique);
// document.getElementById('response').innerHTML = uniq_squares(data);

// data = [8, 1,2,2,3,7,4,4,6];
// console.log(JSON.stringify(unique(data)));
