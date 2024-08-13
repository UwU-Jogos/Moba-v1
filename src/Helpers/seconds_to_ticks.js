"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seconds_to_ticks = void 0;
var consts_1 = require("./consts");
function seconds_to_ticks(seconds) {
    return Math.round(seconds * consts_1.TPS);
}
exports.seconds_to_ticks = seconds_to_ticks;
