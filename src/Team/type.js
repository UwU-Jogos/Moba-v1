"use strict";
/// Represents the teams in the game.
///
/// # Description
///
/// An enum defining the possible teams a player can belong to.
///
/// # Values
///
/// * `TEAM_RED` - Represents the red team
/// * `TEAM_BLUE` - Represents the blue team
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamType = void 0;
var TeamType;
(function (TeamType) {
    TeamType[TeamType["TEAM_RED"] = 0] = "TEAM_RED";
    TeamType[TeamType["TEAM_BLUE"] = 1] = "TEAM_BLUE";
})(TeamType || (exports.TeamType = TeamType = {}));
