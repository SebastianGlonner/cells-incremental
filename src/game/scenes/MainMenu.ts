import { Scene } from 'phaser';
import { EventBus } from '../EventBus';


export class MainMenu extends Scene
{

    private elapsedTime = 0;
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        var timer = this.time.addEvent({
            delay: 500, // ms
            callbackScope: this,
            loop: true,
            callback: () => {
                console.log(timer.getElapsed());
            },
          });

          EventBus.emit('current-scene-ready', this);
          
    }

    update(time: number, delta: number): void {
        this.elapsedTime += delta;
        if (this.elapsedTime >= 1000) {
            this.events.emit("second_gone")
            this.elapsedTime = 0;
        }
    }
    
}
