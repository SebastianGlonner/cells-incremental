import deepCopy from "../lib/deepCopy";
import type { SavegameDataHandler } from "./savegame";

interface ConfigSaveData {
    savegameIntervall: number;
}

export const defaultGameConfig: ConfigSaveData = {
    savegameIntervall: 0,
}

export default class GameConfig implements SavegameDataHandler<ConfigSaveData> {

    configData: ConfigSaveData;

    getSavegameData(): ConfigSaveData {
        return this.configData;
    }
    loadSavegameData(data: ConfigSaveData): void {
        this.configData = data;
    }
    loadDefaultSavegameData() {
        this.configData = deepCopy<ConfigSaveData>(defaultGameConfig);
    }

}