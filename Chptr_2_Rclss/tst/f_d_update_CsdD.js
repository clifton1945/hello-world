/**
 * f_d_update_CsdD.js -> update a Verse default Csd as a function of Space parameters.
 * 160718 @ 1203 ->  ready to just REPLACE the present csd.value WITH a calculated weight FOR a given csd.key.
 *      in doing so I am skipping test#0 and #2 and deleting the fontSize test
 *  0650 ->  what do I want? How about for now - to get off the dime
 *  (2)USE 4 parameters to set a verse style CSD : valBeg, valEnd, ndxMe, lenFam
 *      with these the csd ~ valBeg +
 *  (1)USE default property as the startValue
 *      THEN ADD the calculated Weight to it:
 *          this is typically ndx/(len-1) ** SEE f_n_Wter fo details of Rclss difference
 *      WHICH has the following Problem: how set the endValue ??
 *          without the endValue
 * 160716 @ 1657 ->  see test #2 w/ QUESTION:
 *           FIX -- do I need to run compose against the  current value of say this opacity?? Do not think so: just scale_x_1, offset_plus_0  and format should be enough
 * @1046 -> ADDED offset TO
 * STABLE:: t.deepEquals(trgt_CSDs_D.fontSize, "90%", ' EXP: fontSize:"100" -> "90%"')
 *  @0916 STABLE but trying to consolidate code to just accept a scale factor and an offset
 * IN // update opacity
 * // COULD NOT ADD DEFAULT PARAMETERS -> f(a,b=1)(a*b)  BREAKS 160716
 * // COULD NOT R.compose ->opacity_scaled = (fctr) => R.compose(R.multiply, f_scaler(fctr));//BREAKS (N -> {*->N)
 *  0715 -> begin to add _pre_offset to transformations.
 *  @0645 -> REFACT: bringing into comparison both R.over and R.evole methods of updating CSDs.
 *      WAS f_evolve_dCSD.js
 *      WILL DO  (0) ADD offset and maybe mirror transforms (1) REFACT scale / weight as functions of (ndx and faml.length)
 * then map over all verses in Chptr Space
 * then add Rclss Space transforms
 * 160715  @1625 -> test("1  ***** USING .lensProp && .over update_a trgt_CSDs_D ***** STABLE
 *
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
var _pre_offset, opacity_scaled, opacity_scaled_CSD;
test("0  ***** USING .evolve (and my revolve) to update trgt_CSDs_D *****", {skip:true},
    function (t) {
    let RET;
    let _scaler = v => R.identity(v);
    opacity_scaled = R.multiply(_scaler(.3));// (N -> {*->N)
    // update opacity
    opacity_scaled_CSD = R.compose(R.toString, opacity_scaled, parseFloat);//N:wt -> S:propVal -> S:

    // The method of Transformation
    _trnsfrm_theseCSDs_D = {opacity: opacity_scaled_CSD}; // WORKS opacity_scaled_CSD is just one of many transforms
    var trgt_CSD_D = f_revolve_trgtDict(dflt_CSDs_D, _trnsfrm_theseCSDs_D);

    t.deepEquals(
        trgt_CSD_D.opacity, "0.3", ' EXP: opacity:"1" -> "0.3"');
    t.end();
});
test("1  ***** USING .lensProp&&.over to update trgt_CSDs_D ******", function (t) {
    var RET;
    var opacityLens = R.lensProp("opacity");
    // CUT what if  opacity_scaled just REPLACED the key:value ??
    opacity_scaled =  wt => R.always(wt);
    // opacity_scaled = R.multiply;//OK (N -> {*->N)
    opacity_scaled_CSD = scale_fctr => R.compose(R.toString, opacity_scaled(1234), parseFloat);//N:wt -> S:propVal -> S:
    trgt_CSDs_D = R.over(opacityLens, opacity_scaled_CSD("0.3"), dflt_CSDs_D); // CUT
    // trgt_CSDs_D = R.over(opacityLens, opacity_scaled_CSD("0.3"), dflt_CSDs_D); // CUT

    t.deepEquals(trgt_CSDs_D.opacity, "0.3", ' EXP: opacity:"1" SCALED TO "0.3"');
    t.end();
});
test("2  ***** USING BOTH opacity_scale() and opacity_offset().lensProp&&.over to update opacity_scale_CSDs_D ******", {skip:true},
    function (t) {
    var RET;

    var opacityLens = R.lensProp("opacity");
    var opacity_scale = R.multiply;//OK (N -> {*->N)
    var opacity_offset = R.add;// N ->
    /**
     *      opacity_trnsfrms_CSD:: (N:scale, N:offset_plus_0) -> D:CSD
     * @param scale_x_1 * 1 | 100
     * @param offset_plus_0 + 0
     */
    var opacity_trnsfrms_CSD = (scale_x_1, offset_plus_0 ) => R.compose(
        R.toString, opacity_offset(offset_plus_0), opacity_scale(scale_x_1), parseFloat);//N:wt -> S:propVal -> S:
    // FIX -- do I need to run compose against the  current value of say this opacity?? Do not think so: just scale_x_1, offset_plus_0  and format should be enough
    var dflt_CSDs_D = {opacity: "1", fontSize: '100%'};
    var trgt_CSDs_D = R.over(opacityLens, opacity_trnsfrms_CSD("1", "0"), dflt_CSDs_D); // CUT
    t.deepEquals(trgt_CSDs_D.opacity, "1", ' EXP: opacity:"1" SCALED(0, 1) TO "1"');

    var trgt_CSDs_D = R.over(opacityLens, opacity_trnsfrms_CSD("0", "0"), dflt_CSDs_D); // CUT
    t.deepEquals(trgt_CSDs_D.opacity, "0", ' EXP: opacity:"0" SCALED(0, 0) TO "0"');

    var trgt_CSDs_D = R.over(opacityLens, opacity_trnsfrms_CSD("1",".25"), dflt_CSDs_D); // CUT
    t.deepEquals(trgt_CSDs_D.opacity, ".25", ' EXP: opacity:"1" SCALED(1,0.6) TO "1.6"');

    var trgt_CSDs_D = R.over(opacityLens, opacity_trnsfrms_CSD("-0.2","0.25"), dflt_CSDs_D); // CUT
    t.deepEquals(trgt_CSDs_D.opacity, "8.2", ' EXP: opacity:"1" SCALED(-.2, .8) TO "0.32"');

    t.end();
});