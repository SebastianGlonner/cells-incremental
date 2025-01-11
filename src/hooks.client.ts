import savegame from "./game/logic/savegame";

const bigIntPrototype = BigInt.prototype as any;
bigIntPrototype.toJSON = function() {
    return { $bigint: this.toString() };
}

export const init = () => {
    savegame.loadAll();
}
