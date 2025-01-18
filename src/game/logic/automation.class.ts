import type Cells from "./cells.class";
import type { GameTicker } from "./loop.class";


export default class Automation implements GameTicker {

    constructor(private readonly cells: Cells) {

    }

    onTick() {
        // this.doBuy();
    }

    doBuy() {
        const buyAll = () => {

            this.cells.getData().cores.forEach((element, i) => {
                this.cells.buyCore(i);
            });
        }

        for ( let i = 0; i < 15; i++) {
            buyAll();
        }
    }
}