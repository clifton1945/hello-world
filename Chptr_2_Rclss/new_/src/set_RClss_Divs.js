/**
 * FILE: new_/set_RClss_Divs.js
 * 160813   @0900 exports  L_Spans_TO_L_Span_outerHTML_Str() && L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_()
 *  for general use. In this case new_/main
 */

"use strict";
var R = require('ramda');
var t = require('assert');
var h = require('../../src/h');

// var update_L_RClss_NLs = require('./src/update_L_RClss_NLs');//
//var set_ElemStyle = require('../src/set_anElem_CSD');//

/**
 *                  ----- main helper functions -----
 */
/**
 *          --- L_Spans_TO_L_RclssSpans_BY_::D_Lmits -> L_S_spans -> L_S_spans
 * @param d_rcLmits
 * @private
 */
var L_Spans_TO_L_RclssSpans_BY_ = h.L_to_L_by_D_beg_nxt;//::(d_lmits) -> L -> L_subset
/**
 *          --- L_RclssSpans_TO_one_Sof_Rclss_Spans:: L -> S
 *  reduces each Rclss Span to one outerHTML like Str.
 */
const L_RclssSpans_TO_one_Sof_Rclss_Spans = R.reduce(R.concat, '');

/**
 *      --- Elm_TO_S_Elm_outerHTML:: El -> S_outerHTML
 * @param el
 * @private
 */
var Elm_TO_Elm_outerHTML = h.Elm_TO_Elm_outerHTML;// E_a -> S_a

/**
 *      --- L_Spans_TO_L_Span_outerHTML_Str:: L_Elems -> L_STR
 *  @private
 */
exports.L_Spans_TO_L_Span_outerHTML_Str = R.map(Elm_TO_Elm_outerHTML);// L_SPANS -> L_SPAN_outerHTML_STR

//GLOBALS

/**
 *  --- L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_:: L -> D -> S
 *  L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_( D_RCss_NdxLmits) -> L_SPANS -> DIV_outerHTML_STR
 * @param d_rcLmits
 * @private
 */
exports.L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_ = d_rcLmits => R.compose(
    L_RclssSpans_TO_one_Sof_Rclss_Spans,
    L_Spans_TO_L_RclssSpans_BY_(d_rcLmits)
);
// module.exports = {L_RclssSpans_TO_one_Sof_Rclss_Spans_BY_};