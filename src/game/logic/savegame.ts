import { Preferences } from '@capacitor/preferences';
import cells from './cells.class';
import { Big, BigDecimal } from 'bigdecimal.js';


// const bigIntPrototype = BigInt.prototype as any;
// bigIntPrototype.toJSON = function() {
//     return { $bigint: this.toString() };
// }

const bigDecimalPrototype = BigDecimal.prototype as any;
bigDecimalPrototype.toJSON = function() {
    console.log('toJson bigdecimal')
    return { $bigDecimal: this.toString() };
}

const reviver = (key: string, value: any) =>
    value !== null &&
    typeof value === "object" &&
    "$bigDecimal" in value &&
    typeof value.$bigDecimal === "string"
      ? Big(value.$bigDecimal)
      : value;

export interface SavegameDataHandler<T> {
    getSavegameData(): T;
    loadSavegameData(data: T): void;
    loadDefaultSavegameData(): void;
}

export default new class {

    private handler: Map<string, SavegameDataHandler<any>> = new Map();

    addProvider(handler: SavegameDataHandler<any>) {
        if (!handler.constructor.name) {
            throw 'SavegameDataHandler has no constructor name';
        }
        if (this.handler.get(handler.constructor.name)) {
            throw new Error('Duplicate save game handler name')
        }

        this.handler.set(handler.constructor.name, handler);
    }

    async saveAll() {
        const entries = this.handler.entries().toArray();
        for (let i = 0; i < entries.length; i++) {
            await this.saveSingle(entries[i]);
        }
    }

    async loadAll() {
        const entries = this.handler.entries().toArray();
        for (let i = 0; i < entries.length; i++) {
            await this.loadSingle(entries[i]);
        }

    }

    private async saveSingle(entry: [string, SavegameDataHandler<any>]) {
        const [name, handler] = entry;
        await Preferences.set({
            key: name,
            value: JSON.stringify(handler.getSavegameData())
        });
    }

    private async loadSingle(entry: [string, SavegameDataHandler<any>]) {
        const [name, handler] = entry;
        const dataString = await Preferences.get({key: name});
        if (typeof dataString.value === 'string') {
            handler.loadSavegameData(JSON.parse(dataString.value, reviver));
        } else {
            handler.loadDefaultSavegameData();
        }

    }
}