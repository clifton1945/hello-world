/**
 * set_RClss_Divs.js:; fn:: Lens s a -> a -> D -> D:
 */

"use strict";
let R = require('ramda');

var pst_div = document.querySelector('.pst_div');// -> div.pst_div
var RC_curLens = R.lensPath(["pst_div"]);
var view_RC_curLens = R.view(RC_curLens);// D_doc -> S
module.exports = view_RC_curLens;