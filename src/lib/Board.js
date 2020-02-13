import { Line } from './Line';

export class Board {

    constructor() {
        this.lines = [];
        this.el = document.getElementById('game');
        this.context = this.el.getContext('2d');
        this.is_drawing = false;
        this.color = '#000';
        this.brush_size = 10;
        this.setup();
    }

    setup() {

        this.el.width = window.innerWidth;
        this.el.height = window.innerHeight;

        this.el.addEventListener('pointerdown', (e) => this.mouseDown(e));
        this.el.addEventListener('pointerup', (e) => this.mouseUp(e));
        this.el.addEventListener('pointermove', (e) => this.mouseMove(e));

        window.addEventListener('changecolor', (e) => this.changeColor(e));
        window.addEventListener('changebrushsize', (e) => this.changeBrushSize(e));

    }

    changeBrushSize(e) {
        this.brush_size = e.detail.brush_size;
    }

    changeColor(e) {
        this.color = e.detail.color;
    }

    mouseDown(e) {
        this.is_drawing = true;
        /*
            Create our line with our starting x/y position
        */
        const line = new Line(e.clientX, null, e.clientY, null, this.color, this.brush_size);
        this.current_line = line;
    }

    mouseUp(e) {
        this.is_drawing = false;
        this.current_line = null;
    }

    mouseMove(e) {
        if ( !this.is_drawing) { return; }
        /*
            Update our current line's ending x/y position
        */
        this.current_line.x2 = e.clientX;
        this.current_line.y2 = e.clientY;
        this.draw(this.current_line);
        /*
            We need to update the line's original x/y so
            it doesn't create a weird contiguous line thing
        */
        this.current_line.x1 = e.clientX;
        this.current_line.y1 = e.clientY;
    }

    clear() {
        this.context.clearRect(0, 0, this.el.width, this.el.height);
    }

    draw(line) {
        this.context.beginPath();
        this.context.lineJoin = 'round';
        this.context.strokeStyle = line.color;
        this.context.lineWidth = parseInt(line.size);
        this.context.moveTo(line.x1, line.y1);
        this.context.lineTo(line.x2, line.y2);
        this.context.closePath();
        this.context.stroke();
    }

    redraw(lines) {

    }

    undo(line) {

    }

    redo(line) {

    }

}