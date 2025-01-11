import cells from "./cells";
import loop from "./loop";
import savegame from "./savegame";


const bigIntPrototype = BigInt.prototype as any;
bigIntPrototype.toJSON = function() {
    return { $bigint: this.toString() };
}

export default function() {
    registerSavegameDataHandler();
    savegame.loadAll();

    registerTicker();

    loop.start();
}

function registerTicker() {
    loop.registerTicker(cells);
}

function registerSavegameDataHandler() {
    savegame.addProvider('cells', cells);
}