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
function match(game_obj, handlers) {
    switch (game_obj.kind) {
        case 'Wall':
            return handlers.Wall(game_obj.position, game_obj.width, game_obj.height);
        case 'Platform':
            return handlers.Platform(game_obj.position, game_obj.width, game_obj.height);
    }
}
exports.match = match;
