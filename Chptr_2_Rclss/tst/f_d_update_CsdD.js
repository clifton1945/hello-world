/**
 * f_d_update_CsdD.js
 * 160718  @1830 -> ADDED calcWt FROM f_n_calcWt-compiled.js AND
 *      test("1  ***** USING calcWt WITH .lensProp&&.over to update trgt_CSDs_D ******" IS STABLE
 *
 *  @ 1203 ->  ready to just REPLACE the present csd.value WITH a calculated weight FOR a given csd.key.
 *      in doing so I am skipping test#0 and #2 and deleting the fontSize test
 *  0650 ->  what do I want? How about for now - to get off the dime
 *  (2)USE 4 parameters to set a verse style CSD : valBeg, valEnd, ndxMe, lenFam
 *      with these the csd ~ valBeg +
 *  (1)USE default property as the startValue
 *      THEN ADD the calculated Weight to it:
 *          this is typically ndx/(len-1) ** SEE f_n_Wter fo details of Rclss difference
 *      WHICH has the following Problem: how set the endValue ??
 *          without the endValue
 * f_d_update_CsdD.js -> update a Verse default Csd as a function of Space parameters.
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
var _pre_offset, opacity_weighter, opacity_weighter_CSD;
test("0  ***** USING .evolve (and my revolve) to update trgt_CSDs_D *****", {skip:true},
    function (t) {
    let RET;
    let _scaler = v => R.identity(v);
    var opacity_scaled = R.multiply(_scaler(.3));// (N -> {*->N)
    // update opacity
    var opacity_scaled_CSD = R.compose(R.toString, opacity_scaled, parseFloat);//N:wt -> S:propVal -> S:

    // The method of Transformation
    _trnsfrm_theseCSDs_D = {opacity: opacity_scaled_CSD}; // WORKS opacity_scaled_CSD is just one of many transforms
    var trgt_CSD_D = f_revolve_trgtDict(dflt_CSDs_D, _trnsfrm_theseCSDs_D);

    t.deepEquals(
        trgt_CSD_D.opacity, "0.3", ' EXP: opacity:"1" -> "0.3"');
    t.end();
});
test("1  ***** USING calcWt WITH .lensProp&&.over to update trgt_CSDs_D ******", function (t) {
    var RET;
    /**
     *      calcWt():: ( D:spanCsd -> L:famlElem) -> N:ndxElem -> N: wter
     *      USED: typically to weight element property CSD: e.g. opacity, fontSize, etc
     *          the L:fam and N:ndx will be returned by indexedMaps typically
     *
     * @param sObj  -> style Property beg and end limits
     * @param l_fam -> list of this elements family
     * @param n_ndx -> the index of this elem in the family list
     * @returns {*} -> an Element weight for this context.
     */
    // var calcWt = require('./f_n_calcWt'); //
    var calcWt = require('./f_n_calcWt-compiled'); //
    var _calcWt = R.curry(calcWt); //

    const rng = {smlWt:0.5, lrgWt:0.9};
    const ary = [0,1,2,3,4,5,6];
    var ndx = 6;
    opacity_weighter =  R.always(_calcWt(rng, ary)(ndx)); // NOTE: apply ndx BEFORE the compose!!!!
    opacity_weighter_CSD = R.compose(R.toString, opacity_weighter, parseFloat);//N:wt -> S:propVal -> S:

    var opacityLens = R.lensProp("opacity");
    trgt_CSDs_D = R.over(opacityLens, opacity_weighter_CSD, dflt_CSDs_D); // CUT
    // trgt_CSDs_D = R.over(opacityLens, opacity_weighter_CSD("0.3"), dflt_CSDs_D); // CUT
    t.deepEquals(trgt_CSDs_D.opacity, "0.5", ' EXP: opacity:"1" SCALED TO "0.5"');
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