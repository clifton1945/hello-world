/**
 * f_scale_dCSD.js
 * 160712 -> @1415  WIP BROKEN how pass in the Mapper( key, function}s???
 *  @1235 ADDED scale_fontSize_prcnt && for the future scale_fontSize_px && test.2
 * 160707
 *  WIP STABLE and 1st test
 */
"use strict";
let R = require('ramda');

// ---------------------- Code Under Test: f_scale_dCSD
var scale_opacity = nScale => R.compose(R.toString, R.multiply(nScale), parseFloat);
var scale_fontSize_prcnt = nScale => R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(nScale), parseFloat);
// below: scale_fontSize_px is used in getComputerStyles CSD's
// var scale_fontSize_px = R.compose(R.flip(R.concat)('px'), R.toString, R.multiply(nScale), parseFloat);

var _dMappers = wt => R.always({
    opacity: scale_opacity(wt),
    fontSize: scale_fontSize_prcnt(wt)
});

/**
 *      f_scale_dCSD:: (D -> D) -> N -> D
 *      D:{k:v}_dMappers, D:dCSD, N:nScale -> D:dCSD
 *  scales CSD properties hardcoded into this D:: _dMappers
 *  some configurations of this might include:
 *      _dMappers as parameter,
 * @param _dMappers -> property keys with associated v functions
 * @param dCSD ->
 * @param nScale -> value to weight each csd property
 * @return dCSD
 */
const f_scale_dCSD = function f_scale_dCSD(dMappers, dCSD, nScale) {
    return R.evolve(dMappers, dCSD); //=> (D -> D) -> N -> D
};
const _scale_dCSD = R.curry(f_scale_dCSD);
// exports
module.exports = {_scale_dCSD};
// ---------------------- test: f_scale_dCSD
let test = require('tape');
//  FIX   problem with _dMappers needing wt ?????????????
test("0 f_scale_dCSD/ opacity:1->'0.5'", function (t) {
    t.deepEquals(_scale_dCSD({opacity: "1"})(0.5), {opacity: "0.5"}, '> opacity:".5"');
    t.deepEquals(_scale_dCSD({fontSize: "100%"}, 0.5), {fontSize: "50%"}, '> fontSize:"50%"');
    t.end();
});
