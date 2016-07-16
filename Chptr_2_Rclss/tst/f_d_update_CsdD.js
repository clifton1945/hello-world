/**
 * f_d_update_CsdD.js -> update a Verse default Csd as a function of Space parameters.
 * 160716 0715 -> begin to add _pre_offset to transformations.
 *  @0645 -> REFACT: bringing into comparison both R.over and R.evole methods of updating CSDs.
 *      WAS f_evolve_dCSD.js
 *      TODO (0) ADD offset and maybe mirror transforms (1) REFACT scale / weight as functions of (ndx and faml.length)
 * then map over all verses in Chptr Space
 * then add Rclss Space transforms
 * 160715  @1625 -> test("1  ***** USING .lensProp && .over update_a trgt_CSDs_D ***** STABLE
 *      not using .evolve || revolve and all its hassle.
 *      now, just update the trgt_Csd_D with a wt or scale factor, then .lensProp and .over the change to the base CsdD
 *  @ 0800 -> STABLE test"0  ***** _revolveD trgt_CSDs_D USING a partialed_scale_opacity(.5, R.__) *****"
 *      REFACT _scale_opacity TO function w/ arity 2 allowing  new scale weight factor AND
 *      REBUILT evolve TO revolve: flipped to partial the nearly constant style property CSD dictionaries
 * 160714  @0602 -> new day. LEARN to compose transforms for use in f_evolve_dCSD()
 */
"use strict";
let R = require('ramda');

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
var dflt_CSDs_D = {opacity: "1", fontSize: '100%'};
var trgt_CSDs_D;
var _trnsfrm_theseCSDs_D;
var _pre_offset, _pre_scaled, _pre_scaled_CSD;
test("0  ***** USING .evolve (and my revolve) to update trgt_CSDs_D *****", function (t) {
    let RET;
    let _scaler = v => R.identity(v);
    _pre_scaled = R.multiply(_scaler(.3));// (N -> {*->N)
    // update opacity
    _pre_scaled_CSD = R.compose(R.toString, _pre_scaled, parseFloat);//N:wt -> S:propVal -> S:

    // The method of Transformation
    _trnsfrm_theseCSDs_D = {opacity: _pre_scaled_CSD}; // WORKS _pre_scaled_CSD is just one of many transforms
    var trgt_CSD_D = f_revolve_trgtDict(dflt_CSDs_D, _trnsfrm_theseCSDs_D);

    t.deepEquals(
        trgt_CSD_D.opacity, "0.3", ' EXP: opacity:"1" -> "0.3"');
    t.end();
});
test("1  ***** USING .lensProp && .over  to update trgt_CSDs_D *****", function (t) {
    var RET;
    var _scaler = v => R.identity(v);

    // update opacity
    _pre_scaled = R.multiply(_scaler(.3));// (N -> {*->N)
    var opacityLens = R.lensProp("opacity");
    _pre_scaled_CSD = R.compose(R.toString, _pre_scaled, parseFloat);//N:wt -> S:propVal -> S:
    // offset opacity
    var _offsetter = o => R.identity(o);
    _pre_offset = R.add(_offsetter('20%'));


    // The method of Transformation
    //noinspection UnnecessaryLocalVariableJS
    trgt_CSDs_D = R.over(opacityLens, _pre_scaled_CSD, dflt_CSDs_D);

    //noinspection UnnecessaryLocalVariableJS
    t.deepEquals(trgt_CSDs_D.opacity, "0.3", ' EXP: opacity:"1" -> "0.3"');

    // update fontSize
    _pre_scaled = R.multiply(_scaler(.3));// (N -> {*->N)
    var fontSizeLens = R.lensProp("fontSize");
    _pre_scaled_CSD = R.compose(R.flip(R.concat)('%'), R.toString, _pre_scaled, parseFloat);

    // The method of Transformation
    //noinspection UnnecessaryLocalVariableJS
    trgt_CSDs_D = R.over(fontSizeLens, _pre_scaled_CSD, dflt_CSDs_D);

    //noinspection UnnecessaryLocalVariableJS
    t.deepEquals(trgt_CSDs_D.fontSize, "30%", ' EXP: fontSize:"100" -> "30%"');
    t.end();
});
