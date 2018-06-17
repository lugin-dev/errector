import { el } from './parts/vanilla/_helper';

el('h1').on('click', function() {
    this.style.color = 'red'
})