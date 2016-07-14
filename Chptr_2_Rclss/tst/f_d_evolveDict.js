/**
 * f_evolve_dCSD.js
 * 160714  @0602 -> new day. LEARN to compose tranforms for use in f_evolve_dCSD()
 * 160713 -> @0900 WIP somehow apply scale wt to the evolve  transformers.
 *      STABLE because hardcoded.
 * 160712 -> @1415  WIP BROKEN how pass in the Mapper( key, function}s???
 *  @1235 ADDED _scale_fontSize_prcnt && for the future scale_fontSize_px && test.2
 * 160707
 *  WIP STABLE and 1st test
 */
"use strict";
let R = require('ramda');

var stubScale = .5;
var stubOffset = -.6;
let f_offset_N = R.add;
let f_scaleN_ = R.multiply; //N->N->N
// ---------------------- Code Under Test: f_evolve_dCSD
let _scaleN_ = f_scaleN_(stubScale);
/**
 * _scale_opacity:: N:wt -> S:a -> S:wt x a
 * @param wt
 */
var _scale_opacity = R.compose(R.toString, _scaleN_, parseFloat);
var _scale_fontSize_prcnt = nScale => R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(nScale), parseFloat);
// below: scale_fontSize_px is used in getComputerStyles CSD's
// var scale_fontSize_px = R.compose(R.flip(R.concat)('px'), R.toString, R.multiply(nScale), parseFloat);
// WIP FIX
var scale_fontSize = wt => _scale_fontSize(wt);
/**
 *      _dMappers:: {k:{v->v}}
 * @type {{opacity: ((p1?:*)=>Function), fontSize: ((p1?:*)=>Function)}}
 * @private
 */
const f_dMappers =  {
    opacity: _scale_opacity,
};

/**
 *      f_evolve_dCSD:: F:{k:{v->v}} -> D:{k:v} -> D:{k:v}
 *      D:{k:v}f_dMappers, D:dCSD, N:nScale -> D:dCSD
 *  scales CSD properties hardcoded into this D:: f_dMappers
 *  some configurations of this might include:
 *      f_dMappers as parameter,
 * @param dCSD ->
 * @return dCSD
 * @param _dMappers
 */
const f_evolve_dCSD = function f_evolve_dCSD(_dMappers, dCSD) {
    return R.evolve(_dMappers, dCSD); //=> (D -> D) -> N -> D
};
const _scale_dCSD = R.curry(f_evolve_dCSD);


// exports
module.exports = {_scale_dCSD};


// ---------------------- test: f_evolve_dCSD
let test = require('tape');
// FIX TESTS PASS because the f_mappers have hardcoded wt factors!
test("0  ***** f_evolve_dCSD/ _scale_dCSD() *****", function (t) {
    t.deepEquals(_scale_dCSD(f_dMappers)({opacity: "1"}), {opacity: "0.5"}, ' opacity:".5"');
    // t.deepEquals(_scale_dCSD(f_dMappers)({fontSize: "100%"}), {fontSize: "50%"}, ' fontSize:"50%"');
    t.end();
});
