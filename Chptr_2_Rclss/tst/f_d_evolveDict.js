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
var _scale_fontSize_prcnt = nScale => R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(nScale), parseFloat);
// let _scaleN = f_scaleN(stubScale);
// var _scale_opacity = (wt, propVal) => R.compose(R.toString, f_scaleN(wt), parseFloat);// #1 N:wt -> S:propVal -> S:
var _scale_opacity = (nScale) => R.compose(R.toString, f_scaleN(nScale), parseFloat);// #2 N:wt -> S:propVal -> S:

/**
 *      f_revolve_trgtDict:: D:{k:v} -> F:{k:{v->v}} -> D:{k:v}
 *      typical use: _revolve_trgtDict = f_revolve_trgtDict(trgt_CSD); // partial now F:{k:{v->v}} -> D:{k:v}
 *      typical use:: newCSD = _revolve_trgtDict(_trnsfrm_theseCSDs_D)
 *          trgt_CSDs_D:  {opacity: 1, fontSize:'100%', ...} // typically a composite CSD for a verse:
 *          _trnsfrm_theseCSDs_D: {opacity: trnsfrm_opacity, fontSize: trnsfrm_fontSize}
 */
const f_revolve_trgtDict = R.flip(R.evolve);

/**  
 * -----------------------  EXPORTS --------------------
 */
module.exports = f_revolve_trgtDict;

// ---------------------- test: f_evolve_dCSD
let test = require('tape');
var trgt_CSDs_D =  {opacity: "1", fontSize:'100%'};
var _revolveCSD = f_revolve_trgtDict(trgt_CSDs_D); // NOW just needs the _trnsfrm_theseCSDs_D()
test("0  ***** _revolveD trgt_CSDs_D USING a partialed_scale_opacity(.5) *****", function (t) {
    var _partialed_scale_opacity = R.partial(_scale_opacity, [0.5]);//  WORKS w/ #2
    // var _trnsfrm_theseCSDs_D = {opacity: _partialed_scale_opacity(R.__)}; // WORKS _scale_opacity is just one of many transforms
    // var _trnsfrm_theseCSDs_D = {opacity: _partialed_scale_opacity}; // BREAKS needed ()_scale_opacity is just one of many transforms
    var _trnsfrm_theseCSDs_D = {opacity: _partialed_scale_opacity()}; // WORKS needs ()_scale_opacity is just one of many transforms
    t.deepEquals(_revolveCSD(_trnsfrm_theseCSDs_D).opacity, "0.5", ' EXP: opacity:"1" -> "0.5"');
    // another
    _partialed_scale_opacity = R.partial(_scale_opacity, [0.35]);//  WORKS w/ #2
    _trnsfrm_theseCSDs_D = {opacity: _partialed_scale_opacity()}; // WORKS needs ()_scale_opacity is just one of many transforms
    t.deepEquals(_revolveCSD(_trnsfrm_theseCSDs_D).opacity, "0.35", ' EXP: opacity:"1" -> "0.35"');
    t.end();
});
