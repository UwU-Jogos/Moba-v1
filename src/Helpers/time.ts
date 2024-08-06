export class TimeDisplay {
    private timeDisplay: HTMLDivElement;

    constructor() {
        this.timeDisplay = document.createElement('div');
        this.timeDisplay.style.position = 'absolute';
        this.timeDisplay.style.top = '10px';
        this.timeDisplay.style.left = '10px';
        this.timeDisplay.style.color = 'black';
        this.timeDisplay.style.fontSize = '20px';
        document.body.appendChild(this.timeDisplay);
    }

    update(elapsedTime: number) {
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = Math.floor(elapsedTime % 60);
        this.timeDisplay.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}
