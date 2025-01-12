import { cells, loop } from "./constructions";
import gameConfig from "./gameConfig";
import savegame from "./savegame";


const bigIntPrototype = BigInt.prototype as any;
bigIntPrototype.toJSON = function() {
    return { $bigint: this.toString() };
}

export default async function() {
    registerSavegameDataHandler();
    await savegame.loadAll();

    setupSaveGameIntervall();

    registerTicker();
    loop.start();

    
}

function constructStuff() {

}

function registerTicker() {
    loop.registerTicker(cells);
}

function registerSavegameDataHandler() {
    savegame.addProvider('cells', cells);
    savegame.addProvider('gameConfig', gameConfig);
}

function setupSaveGameIntervall() {
    if (!gameConfig.configData.savegameIntervall) {
        return;
    }

    setInterval(() => {
        savegame.saveAll();
    }, gameConfig.configData.savegameIntervall)
}