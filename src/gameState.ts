import { List } from "immutable";
import { GameState, GameMessage, Player } from "./types";

export function addMessageToQueue(state: GameState, message: GameMessage): GameState {
    return {
        ...state,
        messages: state.messages.concat(message)
    };
}

export function newGameState(players: List<Player>, tick: number, messages: GameMessage[], tickSet: boolean): GameState {
    return {
        players,
        tick,
        messages,
        tickSet
    };
}
