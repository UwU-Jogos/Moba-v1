"use strict";
/// Takes damage from players life. 
///
/// # Args
///
/// * `player` - The player object to take life 
/// * `damage` - How much to take 
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.take_damage = void 0;
function take_damage(player, damage) {
    var updated_life = Math.max(0, player.life - damage);
    return __assign(__assign({}, player), { life: updated_life });
}
exports.take_damage = take_damage;
