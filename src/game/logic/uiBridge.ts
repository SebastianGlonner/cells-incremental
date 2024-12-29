import { Events } from "phaser";
import { cellServer } from "./cells";

let uiBridgeBus = new Events.EventEmitter();

export type Listener = (uiData: UiData) => void;

export interface UiData {
    currentAmountOfCells: number;
}

class UiBridge {
    onUpdate(listener: Listener) {
        uiBridgeBus.on('uiUpdate', listener);
    }

    emitUpdate(uiData: UiData) {
        uiBridgeBus.emit('uiUpdate', uiData);
    }


    action_buyCell() {
        cellServer.buyCell();
    }
}

export const uiBridge = new UiBridge();
