import { Events } from "phaser";
import type { CellsData } from "./cells.class";
import container from "./container";
import Cells from "./cells.class";

let uiBridgeBus = new Events.EventEmitter();

export type Listener = (uiData: UiData) => void;

export interface UiData {
    cells: CellsData;
}

export default class UiBridge {
    constructor(private cells: Cells) {
    }
    offUpdate(uiUpdateEvent: Listener) {
        uiBridgeBus.off('uiUpdate', uiUpdateEvent);
    }
    onUpdate(listener: Listener) {
        uiBridgeBus.on('uiUpdate', listener);
        return listener;
    }

    emitUpdate() {
        uiBridgeBus.emit('uiUpdate', {
            cells: this.cells.getData()
        });
    }
}
