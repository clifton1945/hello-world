/**
 * f_d_update_CsdD.js
 * 160718   @0950 -> STABLE: 1 **** USE calcWt(),.lensProp && trgt_CSDs_D() TO SET trgt_CSDs_D ****`
 *      still need refact to combine         _calcWt = and  _d_trgt_CSDs_D =
 *      @1830 -> ADDED calcWt FROM f_n_calcWt-compiled.js AND
 *      test("1  ***** USING calcWt WITH .lensProp&&.over to update trgt_CSDs_D ******" IS STABLE
 * f_d_update_CsdD.js -> update a Verse default Csd as a function of Space parameters.
 */
"use strict";
let R = require('ramda');
let calcWt = require('./f_n_calcWt');//// (D, L, N) -> D
let f_d_calcWt = R.curry(calcWt); // D -> L -> N -> D

// ---------------------- test: UPDATE a property Csd
let test = require('tape');
let dflt_CSDs_D = {opacity: "1", fontSize: '100%'};

// CODE UNDER TEST
 // NOTE: this IS later to be called calc_futWt: i.e. 0->n: big->sml
let _d_calcWt = (csdRngD, famL) => R.compose(R.toString, f_d_calcWt(csdRngD, famL)); // D -> L -> N -> D
let _calcWt; // N -> D

let f_d_trgt_CSDs_D = (lens, dfltD, calcWtF) => R.set(lens, calcWtF, dfltD);//
let _d_trgt_CSDs_D;
let _trgt_CSDs_D;
_trgt_CSDs_D = ndxN => _d_trgt_CSDs_D(ndxN);

test(`IN f_d_update_CsdD.js
1 **** USE calcWt(),.lensProp && trgt_CSDs_D() TO SET trgt_CSDs_D ****`,
    {skip: false}, function (t) {
        // CSD constants
        dflt_CSDs_D = {opacity: "1", fontSize: '100%'};
        var opacityLens = R.lensProp("opacity");
        const csdRng = {smlWt: 0.5, lrgWt: 0.9};
        // element Context constants
        const ary = [0, 1, 2, 3, 4, 5, 6];
        //CUT
        _calcWt = _d_calcWt(csdRng, ary, R.__);// N -> D
        _d_trgt_CSDs_D = ndxN => f_d_trgt_CSDs_D(opacityLens, dflt_CSDs_D, _calcWt(ndxN)); // N:ndx -> S:csdD

        t.deepEquals(_trgt_CSDs_D(0).opacity, "0.9", ' ndx:0 EXP: opacity:"1" SET TO "0.9"');
        t.deepEquals(_trgt_CSDs_D(6).opacity, "0.5", ' ndx:6 EXP: opacity:"1" SET TO "0.5"');
        t.deepEquals(_trgt_CSDs_D(3).opacity, "0.7", ' ndx;3 EXP: opacity:"1" SET TO "0.7"');
        t.end();
    });
/**
 * -----------------------  EXPORTS --------------------
 */
// module.exports = f_revolve_trgtDict;