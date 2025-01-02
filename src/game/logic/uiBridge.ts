import { Events } from "phaser";
import cells, { type CellsData } from "./cells";

let uiBridgeBus = new Events.EventEmitter();

export type Listener = (uiData: UiData) => void;

export interface UiData {
    cells: CellsData;
}

class UiBridge {
    offUpdate(uiUpdateEvent: Listener) {
        uiBridgeBus.off('uiUpdate', uiUpdateEvent);
    }
    onUpdate(listener: Listener) {
        uiBridgeBus.on('uiUpdate', listener);
        return listener;
    }

    emitUpdate() {
        uiBridgeBus.emit('uiUpdate', {
            cells: cells.getData()
        });
    }
}

export default new UiBridge();
