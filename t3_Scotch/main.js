/**
 * tst/t3_Scotch/main.js
 * 160725  WS help says comment  out the src = main.js
 * @0545  getting 'required not defined error and no debug????
 * 160722 re looked at to understand that
 *  even with browserify bundle a node.js test of main.js shows >>
 *  ReferenceError: document is not defined
 */

//main.js
"use strict";

var R = require('ramda');

var square = function square (x) { return x * x; };
var squares = R.chain(square, [1, 2, 3, 4, 5]);

document.getElementById('response').innerHTML = squares;