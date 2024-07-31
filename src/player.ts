import { List } from "immutable";
import { Player } from "./types";

export function newPlayer(pid: number, name: string): Player {
    return {
        id: pid,
        name: name,
        position: { x: 0, y: 0 },
        w: false,
        a: false,
        s: false,
        d: false
    };
}

export function getPlayerById(playerId: number, players: List<Player>): Player | undefined {
    return players.find(player => player.id === playerId);
}

export function updatePlayer(updatedPlayer: Player, players: List<Player>): List<Player> {
    return players.map(player => player.id === updatedPlayer.id ? updatedPlayer : player);
}

export function addPlayer(newPlayer: Player, players: List<Player>): List<Player> {
    return players.push(newPlayer);
}
