import { Application, Graphics, Text } from 'pixi.js';
import { Pane } from 'tweakpane';

const PARAMS = {
    factor: 123,
    title: 'hello',
    color: '#ff0055',
};

const pane = new Pane();

pane.addBinding(PARAMS, 'factor');
pane.addBinding(PARAMS, 'title');
pane.addBinding(PARAMS, 'color');

async function main() {
    const app = new Application();

    await app.init({
        width: 600,
        height: 400,
        backgroundColor: 0x1099bb,
        antialias: true,
        view: document.createElement('canvas') as HTMLCanvasElement, // Type assertion
    });

    const mainContent = document.querySelector('.main-content') as HTMLDivElement;
    mainContent.appendChild(app.canvas);

    const graphics = new Graphics();
    graphics.fill(0xFF0000);
    graphics.rect(0, 0, 100, 100);
    const text = new Text('DVD', { fill: 0xFFFFFF });
    text.x = 20;
    text.y = 40;
    graphics.addChild(text);

    app.stage.addChild(graphics);

    const inputText = document.getElementById('input-text') as HTMLTextAreaElement;
    const inputButton = document.getElementById('input-button') as HTMLButtonElement;
    const outputText = document.getElementById('output-text') as HTMLTextAreaElement;
    const outputButton = document.getElementById('output-button') as HTMLButtonElement;

    inputButton.addEventListener('click', () => {
        outputText.value = `Processed: ${inputText.value}`;
    });

    outputButton.addEventListener('click', () => {
        outputText.value = '';
    });

    // ticker example
    app.ticker.add((ticker) => {
        graphics.x += ticker.deltaTime;
    });

}

main();