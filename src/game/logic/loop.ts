import automation from "./automation";
import cells from "./cells";
import savegame from "./savegame";
import uiBridge from "./uiBridge";

let currentTime = Date.now();
let tickWaited = 0;

const intervallSpeed = 1 / 30 * 1000;
const tickTime = 300;

// const intervallSpeed = 1000;
// const tickTime = 1300;

const tick = () => {
    cells.tick();
    automation.tick();

    uiBridge.emitUpdate();
    
    savegame.doSaveGames();
}

class LoopController {

    start() {
        setInterval(() => {
            const nextTime = Date.now();
            const delta = nextTime - currentTime;

            tickWaited += delta;

            while (tickWaited >= tickTime) {
                tick();

                tickWaited -= tickTime;
            }

            currentTime = nextTime;
        }, intervallSpeed);
    }
}

export const loopController = new LoopController();