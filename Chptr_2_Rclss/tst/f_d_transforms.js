/**
 * f_d_transforms.js
 * 160714 @0840 -> a working stable test half way towards evolving transforms that evolve CscDs.
 *      In this case a verse _trnsfrm_opacity() function modified the CsdD transformed by scaling and offsetting.
 *      Next is to evolve the transformation Dict and
 *  @0625 NEW f_d_transforms.js branched from f_evolve_dCSD.js
 *  @0602 -> new day. LEARN to compose transforms for use in f_evolve_dCSD()

 */
"use strict";
let R = require('ramda');
// these will be generated from this{ndx, sibs) AND this:(beg, end}
// var stubScale = .5;
var stubScale = R.identity(.5); // why not just use .5????
var stubOffset = -.6;
// these are my base transform functions named for convenience:
const _scaleN_ = R.multiply(stubScale);// N -> N
const _offsetN = R.add(stubOffset); // N -> N
// ---------------------- Code Under Test: f_evolve_dCSD
/**
 * _scale_opacity:: N:wt -> S:a -> S:wt x a
 * @param wt
 */
var _scale_opacity = R.compose(R.toString, _scaleN_, parseFloat);
var _offset_opacity = R.compose(R.toString, _offsetN, parseFloat);
var _trnsfrm_opacity = R.compose(R.toString, _scaleN_, _offsetN, parseFloat);

/**
 *      _transformsD:: {k:{v->v}}
 * @type {{opacity: ((p1?:*)=>Function), fontSize: ((p1?:*)=>Function)}}
 * @private
 */
const transformsD =  {
    // opacity: _scale_opacity,
    // opacity: _offset_opacity,
    opacity: _trnsfrm_opacity, // CUT
}; // TODO  the keys are stable BUT re associate for whatever the new function values are

/**
 *      f_evolve_dCSD:: F:{k:{v->v}} -> D:{k:v} -> D:{k:v}
 *      D:{k:v}transformsD, D:dCSD, N:nScale -> D:dCSD
 *  scales CSD properties hardcoded into this D:: transformsD
 *  some configurations of this might include:
 *      transformsD as parameter,
 * @param dCSD ->
 * @return dCSD
 * @param _transformsD
 */
const f_evolve_dCSD = function f_evolve_dCSD(_transformsD, dCSD) {
    return R.evolve(_transformsD, dCSD); //F:{k:{v->v}} -> D:{k:v} -> D:{k:v}
};
const _evolve_dCSD = R.curry(f_evolve_dCSD);
// exports
module.exports = {_evolve_dCSD};

// ---------------------- test: f_evolve_dCSD
let test = require('tape');
// let _evolve_dCSD = // TODO MOVE these tests to its own file
test("0  ***** f_evolve_dCSD/ transformsD() *****", function (t) {
    // t.deepEquals(_evolve_dCSD(transformsD)({opacity: "1"}), {opacity: "0.5"}, ' _scale_opacity:"1"->"0.5"');
    // t.deepEquals(_evolve_dCSD(transformsD)({opacity: "1"}), {opacity: "0.4"}, ' _offset_opacity:"1"->"0.4"');
    t.deepEquals(_evolve_dCSD(transformsD)({opacity: "1"}), {opacity: "0.2"}, ' _trnsfrm_opacity:"1"->"0.2"');
    t.end();
});
// --------------------- ON HOLD BUT DO NOT FORGET
// var _scale_fontSize_prcnt = nScale => R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(nScale), parseFloat);


