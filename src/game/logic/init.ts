import Cells from "./cells.class";
import container from "./container";
import GameConfig from "./gameConfig.class";
import Loop from "./loop.class";
import savegame from "./savegame";
import UiBridge from "./uiBridge.class";


const bigIntPrototype = BigInt.prototype as any;
bigIntPrototype.toJSON = function() {
    return { $bigint: this.toString() };
}

let gameConfig: GameConfig;
let cells: Cells;
let loop: Loop;
let uiBridge: UiBridge;
function constructStuff() {
    gameConfig = container.registerNew(GameConfig);
    cells = container.registerNew(Cells);
    uiBridge = container.registerInstance(UiBridge, new UiBridge(cells));
    loop = container.registerInstance(Loop, new Loop(uiBridge));
}

function registerTicker() {
    loop.registerTicker(cells);
}

function registerSavegameDataHandler() {
    savegame.addProvider(cells);
    savegame.addProvider(gameConfig);
}

function setupSaveGameIntervall() {
    if (!gameConfig.configData.savegameIntervall) {
        return;
    }

    setInterval(() => {
        savegame.saveAll();
    }, gameConfig.configData.savegameIntervall)
}

export default async function() {
    constructStuff();
    registerSavegameDataHandler();
    await savegame.loadAll();

    setupSaveGameIntervall();

    registerTicker();
    container.resolve(Loop).start();
}