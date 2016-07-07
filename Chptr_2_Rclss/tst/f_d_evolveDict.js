/**
 * f_d_evolveDict.js
 * 160707
 *  WIP STABLE and 1st test
 *
 *  NOTE:// compose creates a function like JSON.stringify(pickRequired(layer))
 var getRefHash = R.compose(JSON.stringify.bind(JSON), pickRequired);
 */
"use strict";

let R = require('ramda');

// ---------------------- Code Under Test: f_d_evolveDict

/**
 *      f_d_evolveDict: D:dObj, N:nScaler -> D:dObj
 */
const f_d_evolveDict = R.curry(function (dObj, nScaler) {
    var wt_opacity = R.compose(R.toString, R.multiply(nScaler), parseFloat);
    var wt_fontSize = R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(nScaler), parseFloat);
    var transform = {
        opacity: wt_opacity,
        fontSize: wt_fontSize
    };
    return R.evolve(transform, dObj); //=> D->N->D
});
module.exports ={f_d_evolveDict};
// ---------------------- test: f_d_evolveDict
let test = require('tape');

test('#0 f_d_evolveDict/ ', function(t) {
    t.deepEquals(f_d_evolveDict({opacity:1}, 0.5), {opacity: "0.5"}, '> opacity:".5"');
    t.end();
});
