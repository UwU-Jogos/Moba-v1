"use strict";
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
exports.create = void 0;
function create(skill, owner_id, pos, target, damage) {
    var id = "".concat(skill.id, "-").concat(owner_id, "-").concat(Date.now());
    return [id, {
            id: id,
            skill_type: skill.type,
            owner_id: owner_id,
            pos: __assign({}, pos),
            target: target,
            remaining_distance: skill.range,
            remaining_duration: skill.duration,
            speed: skill.range / skill.duration,
            range: skill.range,
            damage: damage
        }];
}
exports.create = create;
