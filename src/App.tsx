import { createSignal } from 'solid-js';
import type { IRefPhaserGame } from './game/PhaserGame';
import { PhaserGame } from './game/PhaserGame';
import Phaser from 'phaser';
import { MainMenu } from './game/scenes/MainMenu';

const App = () => {

    // References to the PhaserGame component (game and scene are exposed)
    let phaserRef: IRefPhaserGame;

    const currentScene = (scene: Phaser.Scene) => {
        scene.events.on('second_gone', () => {
            console.log('second gone');
        });
    }

    return (
        <div id="app">
            <PhaserGame ref={(el: IRefPhaserGame) => phaserRef = el} currentActiveScene={currentScene}/>
        </div>
    );
};

export default App;
