import { cells } from "./constructions";
import type { GameTicker } from "./Loop";


export default class Automation implements GameTicker {
    onTick() {
        cells.getData().cores.forEach((element, i) => {
            // cells.buyCore(i, 3);
        });
    }
}