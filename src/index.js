import { Board } from './lib/Board';

// Assigning to window so I can test
window.board = new Board();

// Toolbox stuff here
// @TODO move this elsewhere

document.querySelectorAll('.colors input[type="checkbox"]').forEach(c => {
    
    c.addEventListener('click', function(e) {
        const value = e.target.value;
        const changeColor = new CustomEvent('changecolor', { detail: { color: value } });
        window.dispatchEvent(changeColor);
    });

})

document.querySelectorAll('.brushes input[type="checkbox"]').forEach(c => {
    
    c.addEventListener('click', function(e) {
        const value = e.target.value;
        const changeSize = new CustomEvent('changebrushsize', { detail: { brush_size: value } });
        window.dispatchEvent(changeSize);
    });

})