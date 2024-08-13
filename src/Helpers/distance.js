"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distance = void 0;
function distance(p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}
exports.distance = distance;
