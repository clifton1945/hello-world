/**
 * Created by CLIF on 8/12/2016.
 */
"use strict";
var mySlice = require('../../src/h')._mySlice;
var R = require('ramda');

/**
 *  --- set_RClss_TO_::D_Range -> L_S_spans -> L_S_spans
 * @param d_rcLmits
 * @private
 */
const set_RClss_TO_ = d_rcRange => {
    return mySlice(d_rcRange, R.__);
};// D_Range -> L_S_spans -> L_S_spans

module.exports = set_RClss_TO_;

