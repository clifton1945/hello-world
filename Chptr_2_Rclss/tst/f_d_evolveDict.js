/**
 * f_evolve_dCSD.js
 * 160715  @1625 -> test("1  ***** USING .lensProp && .over update_a trgt_CSDs_D ***** STABLE
 *      not using .evolve || revolve and all its hassel.
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
var trgt_CSDs_D = {opacity: "1", fontSize: '100%'};
var _trnsfrm_theseCSDs_D;
var _pre_scaled_opacity;
test("0  ***** USING .evolve (and my revolve) BUT still hardcoded pre_wted), _revolveD trgt_CSDs_D *****", function (t) {
    let RET;
    let _wter = v => R.identity(v);
    var pre_wted = _wter(.3);
    let _pre_scaledN = R.multiply(pre_wted);// (N -> {*->N)
    _pre_scaled_opacity = R.compose(R.toString, _pre_scaledN, parseFloat);//N:wt -> S:propVal -> S:
    _trnsfrm_theseCSDs_D = {opacity: _pre_scaled_opacity}; // WORKS _pre_scaled_opacity is just one of many transforms
    RET = f_revolve_trgtDict(trgt_CSDs_D, _trnsfrm_theseCSDs_D);
    t.deepEquals(
        RET.opacity, "0.3", ' EXP: opacity:"1" -> "0.3"');
    t.end();
});
test("1  ***** USING .lensProp && .over update_a trgt_CSDs_D *****", function (t) {
    var RET;
    var _wter = v => R.identity(v);
    var _pre_scaled = R.multiply(_wter(.3));// (N -> {*->N)
    var trgt_CSDs_D = {opacity: "1", fontSize: '100%'};
    // update opacity
    var _pre_scaled_opacity = R.compose(R.toString, _pre_scaled, parseFloat);//N:wt -> S:propVal -> S:
    var opacityLens = R.lensProp("opacity");
    //noinspection UnnecessaryLocalVariableJS
    var trgt_opacity_CSD_D = R.over(opacityLens, _pre_scaled_opacity, trgt_CSDs_D);
    //noinspection UnnecessaryLocalVariableJS
    RET = trgt_opacity_CSD_D;
    t.deepEquals(RET.opacity, "0.3", ' EXP: opacity:"1" -> "0.3"');
    // update fontSize
    var _pre_scaled_fontSize = nScale => R.compose(R.flip(R.concat)('%'), R.toString, R.multiply(nScale), parseFloat);
    //N:wt -> S:propVal -> S:
    var fontSizeLens = R.lensProp("fontSize");
    //noinspection UnnecessaryLocalVariableJS
    var trgt_fontSize_CSD_D = R.over(fontSizeLens, _pre_scaled_fontSize(.6), trgt_CSDs_D);
    //noinspection UnnecessaryLocalVariableJS
    RET = trgt_fontSize_CSD_D;
    t.deepEquals(RET.fontSize, "60%", ' EXP: fontSize:"100" -> "60%"');
    t.end();
});
