import { GAME_TIME } from "./consts";

export class TimeDisplay {
    private timeDisplay: HTMLDivElement;
    private remainingTime: number;
    private onTimeUp: () => void;

    constructor(onTimeUp: () => void) {
        this.timeDisplay = document.createElement('div');
        this.timeDisplay.style.position = 'absolute';
        this.timeDisplay.style.top = '10px';
        this.timeDisplay.style.left = '10px';
        this.timeDisplay.style.color = 'black';
        this.timeDisplay.style.fontSize = '20px';
        document.body.appendChild(this.timeDisplay);
        this.remainingTime = GAME_TIME;
        this.onTimeUp = onTimeUp;
    }

    update() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = Math.floor(this.remainingTime % 60);
        this.timeDisplay.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.remainingTime--;
        if (this.remainingTime <= 0) {
            this.onTimeUp();
        }
    }

    reset() {
        this.remainingTime = GAME_TIME;
    }

    isTimeUp(): boolean {
        return this.remainingTime <= 0;
    }
}
