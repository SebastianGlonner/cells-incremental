import cells from "./cells";
import uiBridge from "./uiBridge";

let currentTime = Date.now();
const tickTime = 300;
let tickWaited = 0;


const tick = () => {
    cells.tick();

    uiBridge.emitUpdate();
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
        }, 100);
    }
}

export const loopController = new LoopController();