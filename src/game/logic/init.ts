import cells from "./cells";
import gameConfig from "./gameConfig";
import loop from "./loop";
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

function registerTicker() {
    loop.registerTicker(cells);
}

function registerSavegameDataHandler() {
    savegame.addProvider('cells', cells);
    savegame.addProvider('gameConfig', gameConfig);
}

function setupSaveGameIntervall() {
    console.log('setupSaveGameIntervall');
    setInterval(() => {
        savegame.saveAll();
    }, gameConfig.configData.savegameIntervall)
}