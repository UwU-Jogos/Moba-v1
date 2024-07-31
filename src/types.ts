import { List } from "immutable";

export type Position = {
    x: number;
    y: number;
};

export enum MessageType {
    COMMAND,
    SET_NICK
}

export type Player = {
    id: number;
    name: string;
    position: Position;
    w: boolean;
    a: boolean;
    s: boolean;
    d: boolean;
};
export type GameMessage =
    | { tag: MessageType.COMMAND, user: number, time: number, key: Uint8Array }
    | { tag: MessageType.SET_NICK, user: number, name: string };

export type GameState = {
    players: List<Player>;
    tick: number;
    messages: GameMessage[];
    tickSet: boolean;
};

export type StateHistory = GameState[]
