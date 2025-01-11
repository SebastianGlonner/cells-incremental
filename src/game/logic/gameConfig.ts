import deepCopy from "../lib/deepCopy";
import type { SavegameDataHandler } from "./savegame";

interface ConfigSaveData {
    savegameIntervall: number;
}

export const defaultGameConfig: ConfigSaveData = {
    savegameIntervall: 5000,
}

export default new class implements SavegameDataHandler<ConfigSaveData> {

    configData: ConfigSaveData;

    getSavegameData(): ConfigSaveData {
        return this.configData;
    }
    loadSavegameData(data: ConfigSaveData): void {
        console.log('load savegame');
        this.configData = data;
    }
    loadDefaultSavegameData() {
        this.configData = deepCopy<ConfigSaveData>(defaultGameConfig);
    }

}