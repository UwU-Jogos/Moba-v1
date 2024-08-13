"use strict";
/// Matches an Action with corresponding handlers.
///
/// # Input
///
/// * `action` - The Action to match against
/// * `handlers` - An object containing handler functions for each Action type
///
/// # Output
///
/// The result of calling the appropriate handler function
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = void 0;
function match(action, handlers) {
    switch (action.$) {
        case 'SetNick':
            return handlers.SetNick(action.time, action.pid, action.name);
        case 'SkillEvent':
            return handlers.SkillEvent(action.time, action.pid, action.key, action.down, action.x, action.y);
        case 'MouseClick':
            return handlers.MouseClick(action.time, action.pid, action.x, action.y);
        default:
            throw new Error("Unknown action type");
    }
}
exports.match = match;
