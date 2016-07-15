/**
 * f_evolve_dCSD.js
 * 160715 @ 0800 -> STABLE test"0  ***** _revolveD trgt_CSDs_D USING a partialed_scale_opacity(.5, R.__) *****"
 *      REFACT _scale_opacity TO function w/ arity 2 allowing  new scale weight factor AND
 *      REBUILT evolve TO revolve: flipped to partial the nearly constant style property CSD dictionaries
 * 160714  @0602 -> new day. LEARN to compose transforms for use in f_evolve_dCSD()
 * 160713 -> @0900 WIP somehow apply scale wt to the evolve  transformers.
 *      STABLE because hardcoded.
 * 160712 -> @1415  WIP BROKE how pass in the Mapper( key, function}s???
 *  @1235 ADDED _scale_fontSize_prcnt && for the future scale_fontSize_px && test.2
 * 160707
 *  WIP STABLE and 1st test
 */
"use strict";
let R = require('ramda');

// var stubScale = .5;
// var stubOffset = -.6;
let f_offsetN = R.add;
let f_scaleN = R.multiply; //N->N->N
// ---------------------- Code Under Test: f_evolve_dCSD
// let _scaleN = f_scaleN(stubScale);
var _scale_opacity = (wt, propVal) => R.compose(R.toString, f_scaleN(wt), parseFloat);// N:wt -> S:propVal -> S:

var _scale_fontSize_prcnt = nScale => R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(nScale), parseFloat);
// below: scale_fontSize_px is used in getComputerStyles CSD's
// var scale_fontSize_px = R.compose(R.flip(R.concat)('px'), R.toString, R.multiply(nScale), parseFloat);
// WIP FIX
/**
 *      f_revolve_trgtDict:: D:{k:v} -> F:{k:{v->v}} -> D:{k:v}
 *
 *      typical use:: newCSD = f_revolve_trgtDict( trgt_CSDs_D)(_trnsfrm_theseCSDs_D)
 *          trgt_CSDs_D:  {opacity: 1, fontSize:'100%', ...} // typically a composite CSD for a verse:
 *          _trnsfrm_theseCSDs_D: {opacity: trnsfrm_opacity, fontSize: trnsfrm_fontSize}
 */
const f_revolve_trgtDict = R.flip(R.evolve);

// exports
// module.exports = {????????????};

// ---------------------- test: f_evolve_dCSD
let test = require('tape');
var trgt_CSDs_D =  {opacity: "1", fontSize:'100%'};
var _revolveCSD = f_revolve_trgtDict(trgt_CSDs_D); // NOW just needs the _trnsfrm_theseCSDs_D()
test("0  ***** _revolveD trgt_CSDs_D USING a partialed_scale_opacity(.5, R.__) *****", function (t) {
    var _partialed_scale_opacity = _scale_opacity(0.5, R.__);//
    var _trnsfrm_theseCSDs_D = {opacity: _partialed_scale_opacity}; // _scale_opacity is just one of many transforms
    t.deepEquals(_revolveCSD(_trnsfrm_theseCSDs_D).opacity, "0.5", ' EXP: opacity:"1" -> "0.5"');
    // t.deepEquals(_scale_dCSD(f_dMappers)({fontSize: "100%"}), {fontSize: "50%"}, ' fontSize:"50%"');
    t.end();
});
