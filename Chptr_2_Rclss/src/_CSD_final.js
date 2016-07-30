/**
 *  _CSD_final:: CSD -> N -> CSD
 *  160730      @1800   -> STABLE & test
 *  module.exports = {_CSD_final};// _CSD_final:: CSD_in  -> N_valu ->  CSD_final
 *  IN FILE: _CSD_final.js
 */
"use strict";

let R = require('ramda');
// HELPERS
let _CSD_valu_opacity = R.curry(require('./_CSD_values_set')._CSD_valu_opacity);//         N:wt -> CSD_valu
let _CSD_valu_fontSize = R.curry(require('./_CSD_values_set')._CSD_valu_fontSize); //      N:wt -> CSD_valu

//   * -----------------------  EXPORTS --------------------

/**
 *      _CSD_final:: (CSD_init -> N_valu -> CSD_final
 *      use: COMBINES an CSD init and the two weighted CSD INTO one CSD
 *      @return {{_CSD_final: *}}
 * @param CSD_init
 * @param N_valu
 */
const _CSD_final = R.curry(function _CSD_final(CSD_init, N_valu) {
    return R.mergeAll(
        [CSD_init,
            _CSD_valu_opacity(N_valu),
            _CSD_valu_fontSize(N_valu)
        ])
});
module.exports = {_CSD_final};// _CSD_final:: CSD_in  -> N_valu ->  CSD_final

//asserts
let assert = require('assert');
var cut = _CSD_final({backgroundColor: 'lightGreen'}, 0.5);
assert.equal(cut.fontSize, "50%", 'fontSize:: wt:.5 SET TO "50%" USING cut = _Csds({})');
assert.equal(cut.opacity, "0.500", 'opacity:: wt:.5 SET TO "0.500" USING cut = _Csds({})');
assert.equal(cut.backgroundColor, 'lightGreen', "_Csds.backgroundColor -> 'lightGreen' ");


