"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var sm = require("@uwu-games/uwu-state-machine");
var uwuchat2_1 = require("uwuchat2");
var init_1 = require("./Game/init");
var when_1 = require("./Game/when");
var tick_1 = require("./Game/tick");
var draw_1 = require("./Game/draw");
var deserialize_1 = require("./Action/deserialize");
var serialize_1 = require("./Action/serialize");
var consts_1 = require("./Helpers/consts");
var time_1 = require("./Helpers/time");
// Types
// -----
var TPS = 32;
var PID = Math.floor(Math.random() * (Math.pow(2, 16)));
var PRADIUS = 10;
console.log("PID is:", PID);
// Main App
// --------
var players_in_the_room = [];
var room;
var mach;
var client = new uwuchat2_1.UwUChat2Client();
// Handle form submission
document.addEventListener('DOMContentLoaded', function () {
    setup_form_listener();
});
// Also set up the listener immediately in case DOMContentLoaded has already fired
setup_form_listener();
function setup_form_listener() {
    var login_form = document.getElementById('login-form');
    if (login_form) {
        login_form.addEventListener('submit', handle_form_submit);
    }
    else {
        console.error("Login form not found!");
    }
}
function handle_form_submit(e) {
    return __awaiter(this, void 0, void 0, function () {
        var room_input, room_id, name_input, name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    room_input = document.getElementById('room-number');
                    room_id = parseInt(room_input.value);
                    name_input = document.getElementById('nickname');
                    name = name_input.value;
                    // Start the game with the provided room ID
                    return [4 /*yield*/, start_game(room_id, name)];
                case 1:
                    // Start the game with the provided room ID
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Function to start the game
function start_game(room_id, name) {
    return __awaiter(this, void 0, void 0, function () {
        var leave, set_nick_action;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    room = room_id;
                    return [4 /*yield*/, client.init('ws://localhost:7171')];
                case 1:
                    _a.sent();
                    //await client.init('ws://server.uwu.games');
                    mach = sm.new_mach(TPS);
                    leave = client.recv(room, function (msg) {
                        try {
                            var deserialized_msg = (0, deserialize_1.deserialize)(msg);
                            if (deserialized_msg.$ == 'SetNick') {
                                players_in_the_room.push(deserialized_msg.pid);
                                update_lobby();
                                if (players_in_the_room.length === consts_1.PLAYERS_LIMIT) {
                                    start_countdown();
                                }
                            }
                            sm.register_action(mach, deserialized_msg);
                        }
                        catch (e) {
                            console.error("Error processing message:", e);
                        }
                    });
                    set_nick_action = {
                        $: "SetNick",
                        time: client.time(),
                        pid: PID,
                        name: name
                    };
                    sm.register_action(mach, set_nick_action);
                    client.send(room, (0, serialize_1.serialize)(set_nick_action));
                    // Set up key and mouse event listeners
                    window.addEventListener('keydown', handle_skill_event);
                    window.addEventListener('keyup', handle_skill_event);
                    window.addEventListener('mousemove', handle_mouse_move);
                    window.addEventListener('click', handle_mouse_click);
                    // Show lobby
                    show_lobby();
                    return [2 /*return*/];
            }
        });
    });
}
function show_lobby() {
    var login_container = document.getElementById('login-container');
    var lobby_container = document.getElementById('lobby-container');
    if (login_container && lobby_container) {
        login_container.style.display = 'none';
        lobby_container.style.display = 'block';
    }
    else {
        console.error("Could not find login or lobby container");
    }
}
function update_lobby() {
    var lobby_players = document.getElementById('lobby-players');
    if (lobby_players) {
        lobby_players.innerHTML = "Players in lobby: ".concat(players_in_the_room.length, "/").concat(consts_1.PLAYERS_LIMIT);
    }
}
function start_countdown() {
    var countdown = consts_1.TIME_TO_START_GAME;
    var countdown_element = document.getElementById('countdown');
    if (countdown_element) {
        countdown_element.style.display = 'block';
        var timer_1 = setInterval(function () {
            countdown_element.textContent = "Game starting in ".concat(countdown, " seconds");
            countdown--;
            if (countdown < 0) {
                clearInterval(timer_1);
                show_game_container();
            }
        }, 1000);
    }
}
function show_game_container() {
    var lobby_container = document.getElementById('lobby-container');
    var game_container = document.getElementById('game-container');
    if (lobby_container && game_container) {
        lobby_container.style.display = 'none';
        game_container.style.display = 'block';
    }
    else {
        console.error("Could not find lobby or game container");
        return;
    }
    // Start game loop
    game_loop();
}
// Input Handler
var key_state = {};
function handle_skill_event(event) {
    var key = event.key.toUpperCase();
    if (['Q', 'W', 'E', 'R'].includes(key)) {
        var down = event.type === 'keydown';
        if (key_state[key] !== down) {
            key_state[key] = down;
            var time = client.time();
            var act = { $: "SkillEvent", time: time, pid: PID, key: key, down: down, x: mouseX, y: mouseY };
            sm.register_action(mach, act);
            client.send(room, (0, serialize_1.serialize)(act));
        }
    }
}
// Mouse Click Handler
function handle_mouse_click(event) {
    if (event.button === 0 && event.target instanceof HTMLCanvasElement) {
        var time = client.time() + consts_1.ARTIFICIAL_DELAY;
        var x = event.clientX - event.target.offsetLeft;
        var y = event.clientY - event.target.offsetTop;
        var act = { $: "MouseClick", time: time, pid: PID, x: x, y: y };
        // Add to own action log
        sm.register_action(mach, act);
        // Send to server
        client.send(room, (0, serialize_1.serialize)(act));
    }
}
// Add mouse position tracking
var mouseX = 0;
var mouseY = 0;
function handle_mouse_move(event) {
    if (event.target instanceof HTMLCanvasElement) {
        mouseX = event.clientX - event.target.offsetLeft;
        mouseY = event.clientY - event.target.offsetTop;
    }
}
// Game Loop
function game_loop() {
    // Compute the current state
    var state = sm.compute(mach, { init: init_1.init, tick: tick_1.tick, when: when_1.when }, client.time());
    // Draw the current state
    (0, draw_1.draw)(state);
    // Calcula o tempo decorrido em segundos
    var elapsedTime = state.tick / TPS;
    // Atualiza o tempo decorrido
    timeDisplay.update(elapsedTime);
    // Schedule the next frame
    requestAnimationFrame(game_loop);
}
// Initialize TimeDisplay
var timeDisplay = new time_1.TimeDisplay();
