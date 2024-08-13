"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeDisplay = void 0;
var TimeDisplay = /** @class */ (function () {
    function TimeDisplay() {
        this.timeDisplay = document.createElement('div');
        this.timeDisplay.style.position = 'absolute';
        this.timeDisplay.style.top = '10px';
        this.timeDisplay.style.left = '10px';
        this.timeDisplay.style.color = 'black';
        this.timeDisplay.style.fontSize = '20px';
        document.body.appendChild(this.timeDisplay);
    }
    TimeDisplay.prototype.update = function (elapsedTime) {
        var minutes = Math.floor(elapsedTime / 60);
        var seconds = Math.floor(elapsedTime % 60);
        this.timeDisplay.textContent = "Time: ".concat(minutes, ":").concat(seconds.toString().padStart(2, '0'));
    };
    return TimeDisplay;
}());
exports.TimeDisplay = TimeDisplay;
